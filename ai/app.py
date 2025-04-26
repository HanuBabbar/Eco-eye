from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from torchvision import models, transforms
import torch
from PIL import Image
import io

app = FastAPI()

# Load model
model = models.resnet18()
model.fc = torch.nn.Linear(model.fc.in_features, 2)  # adjust based on your classes
model.load_state_dict(torch.load("waste_classifier_best.pth", map_location="cpu"))
model.eval()

# Define transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
])

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()

    image = Image.open(io.BytesIO(contents)).convert("RGB")
    input_tensor = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(input_tensor)
        probs = torch.softmax(outputs, dim=1)
        confidence, pred = torch.max(probs, 1)

    return JSONResponse({
        "prediction": int(pred),
        "confidence": float(confidence)
    })
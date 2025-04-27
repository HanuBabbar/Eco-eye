p# Create and Activate Virtual Environment
    1. cd ai
    2. python -m venv venv
    3. venv\Scripts\activate

# Install Required Packages
    pip install -r requirements.txt

# Starting Server
    uvicorn app:app --host 0.0.0.0 --port 8000

# For testing
    curl -X POST "http://localhost:8000/predict" -F "file=@{Image Path}"
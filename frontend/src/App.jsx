// import AdminCard from "./components/admin_card";
import UserLogin from "./components/user_card";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import SignupForm from "./components/SignupForm";
import ImageUpload from "./components/ImageUpload";
import Admin from "./pages/Admin";
import UserDashboard from "./pages/User_Dash";
import Edit from "./components/Edit";

import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useEffect } from "react";

function App() {

    useEffect(() => {
        axios.get("http://localhost:8888/").then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    })




    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} ></Route>
                    {/* <Route path="/dashboard" element={<Dashboard />} ></Route> */}

                    <Route path="/Signup" element={<SignupForm />} />
                    <Route path="/login" element={<UserLogin />} />

                    <Route path="/image-upload" element={<ImageUpload />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/user" element={<UserDashboard />} />
                    <Route path="/edit" element={<Edit />}/>


                </Routes>

            </BrowserRouter>

            {/* <SignupForm />
            <UserLogin /> */}

        </>
    );
}
export default App;
import AdminCard from "./components/admin_card";
import UserLogin from "./components/user_card";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import SignupForm from "./components/SignupForm";
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} ></Route>

                    <Route path="/Signup" element={<SignupForm />} />
                    <Route path="/login" element={<UserLogin />} />
                </Routes>
            </BrowserRouter>

            {/* <SignupForm />
            <UserLogin /> */}

        </>


    );
}
export default App;
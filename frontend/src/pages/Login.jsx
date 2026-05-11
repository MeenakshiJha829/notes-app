import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



function Login() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();

    const handleLogin =async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    email,
                    password
                }
            );

            localStorage.setItem('token',res.data.token);
            alert('Login Successful');
            navigate('/Dashboard')
        }catch(err){
            console.log(err);
        }
    };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96">
        <input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} className="w-full border p-3 rounded mb-4"/>
        <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} className="w-full border p-3 rounded mb-4"/>
        <button type="submit"  className="w-full bg-blue-500 text-white p-3 rounded">
            Login
        </button>
        <p className="text-center mt-4">
  Don't have an account?

  <span
    onClick={() => navigate('/signup')}
    className="text-blue-500 cursor-pointer ml-1"
  >
    Signup
  </span>
</p>

    </form>
    </div>
  )
}

export default Login

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          email,
          password
        }
      );

      alert('Signup successful');

      navigate('/');

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-zinc-100">

      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >

        <h1 className="text-4xl font-bold text-center mb-6">
          Signup
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded"
        >
          Signup
        </button>

      </form>

    </div>
  );
}

export default Signup;
import axios from 'axios';
import React from 'react'
import { useState } from 'react'

const Signup = () => {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post("http://localhost:5000/api/auth/signup", formData)

            console.log(res.data);

            alert("Signup successfully")

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }


    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <form onSubmit={handleSubmit} className='bg-white p-8 rounded-xl shadow-md w-[400px]'>
                <h1 className='text-3xl font-bold mb-6 text-center'>SignUp</h1>
                <input className='w-full border p-3 rounded mb-4' type="text" name="fullName" placeholder='Full name' onChange={handleChange} />
                <input className='w-full border p-3 rounded mb-4' type="email" name="email" placeholder='email' onChange={handleChange} />
                <input className='w-full border p-3 rounded mb-4' type="password" name="password" placeholder='password' onChange={handleChange} />

                <button className='w-full bg-black text-white p-3 rounded' type='submit'>Signup</button>
            </form>
        </div>
    )
}

export default Signup

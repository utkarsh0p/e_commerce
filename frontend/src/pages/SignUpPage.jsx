import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore.js';

const SignUpPage = () => {

  const {signup} = useUserStore()

  const [info, setInfo]=useState({
    name:"",
    email:"",
    password:""
  })

  const setInfoFunction = (e)=>{
    const {name, value} = e.target
    setInfo((info)=>({
      ...info,
      [name]:value
    }))
  }

  const submitHandler = (e)=>{
    e.preventDefault()
    console.log("going for signup->", info)
    signup(info)
  }

  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-tan">
      <form className="bg-oxford w-full max-w-sm rounded-lg p-6" onSubmit={submitHandler}>
        <h2 className="text-white text-xl font-semibold mb-6 text-center">
          Sign Up
        </h2>

        <div className="flex flex-col gap-4">
          <input
            required
            name="name"
            value={info.name}
            type="text"
            placeholder="Name"
            className="border border-tan rounded px-3 py-2 bg-white"
            onChange={setInfoFunction}
          />

          <input
            required
            name="email"
            type="email"
            value={info.email}
            placeholder="email@gmail.com"
            className="border border-tan rounded px-3 py-2 bg-white"
            onChange={setInfoFunction}
          />

          <input
            required
            name="password"
            value={info.password}
            type="password"
            placeholder="********"
            className="border border-tan rounded px-3 py-2 bg-white"
            onChange={setInfoFunction}
          />

          <button className="bg-tan text-oxford py-2 rounded font-medium hover:opacity-90">
            Sign Up
          </button>

          <p className="text-tan text-sm text-center">Already have account <a onClick={()=>navigate('/login')} className="text-blue-500 cursor-pointer">Log In</a></p> 
        </div>
      </form>
    </div>
  );
};


export default SignUpPage
import {useState} from 'react'
import {useNavigate} from "react-router-dom"
const LogInPage = () => {
  const [info, setInfo]=useState({
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
    console.log(info)
  }

  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-tan">
      <form className="bg-oxford w-full max-w-sm rounded-lg p-6" onSubmit={submitHandler}>
        <h2 className="text-white text-xl font-semibold mb-6 text-center">
          Log In
        </h2>

        <div className="flex flex-col gap-4">
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
            Log In
          </button>

          <p className="text-tan text-sm text-center">Don't have an account <a onClick={()=>navigate('/signup')} className="text-blue-500 cursor-pointer">Sign Up</a></p> 
        </div>
      </form>
    </div>
  );
};


export default LogInPage
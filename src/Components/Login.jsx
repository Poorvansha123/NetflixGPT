 //instead of updating our  data after getting it in both signin signup and set it in our redux store we use firebase api onAuthStateChange(called when user signup,sign,signout)
 import Header from "./Header"
 import { useNavigate } from "react-router-dom"
 import {useState,useRef} from "react"
import {checkValidateData} from "../utils/validate"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../utils/firebase"
const Login=()=>{
 const [isSignInForm,setIsSignInForm]=useState(true)
 const [errorMessage,setErrorMessage]=useState(null)
 const navigate=useNavigate()
 const email=useRef(null);
 const password=useRef(null);
 const handleButtonClick=()=>{
 
  //validate form data
  //console.log(email.current.value). gives email
  const message=checkValidateData(email.current.value,password.current.value);

  setErrorMessage(errorMessage)
  //after this do signup sign in
  if(message) return
//SignIn signup logic now
if(!isSignInForm){

 createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
    navigate("/browse")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
setErrorMessage(errorCode+errorMessage)

  });
}else{
signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    navigate("/browse")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+errorMessage)
  });
}
 }
 const toggleSignInForm=()=>{
  setIsSignInForm(!isSignInForm)

 }
return (
 <div>
  <Header/>
  <div className="absolute">
  <img className="w-screen h-screen object-cover" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6Ii9mL2Y1NjJhYWY0LTVkYmItNDYwMy1hMzJiLTZlZjZjMjIzMDEzNi9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.FScrpAAFnKqBVKwe2syeiOww6mfH6avq-DRHZ_uFVNw" alt="background"/>
  </div>
  <div className="flex justify-center items-center h-screen ">
  
  <form  onSubmit={(e)=>e.preventDefault()} className=" w-3/12 mx-auto relative  p-12  bg-black/70 rounded-lg">
   <h1 className="font-bold text-2xl text-white pb-2 ">{isSignInForm?"Sign In":"Sign Up"}</h1>
  { !isSignInForm && <input type="text" placeholder="Name" className="p-2 m-2 w-full bg-gray-700" />}
   <input ref={email} type="text" placeholder="Email Address" className="p-2 m-2 w-full bg-gray-700" />
   <input ref={password} type="text" placeholder="Password" className="p-2 m-2  w-full bg-gray-700" />
   <p className="text-red-500">{errorMessage}</p>
   <button className="p-4 m-2 bg-red-700 w-full text-white rounded-lg" onClick={handleButtonClick}>{isSignInForm?"Sign In":"Sign Up"}</button>
   <p className="text-white py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm?"New to Netflix?Sign Up now":"Already Registered? Sign In"}</p>
  </form>
  </div>
 </div>
)

}
export default Login
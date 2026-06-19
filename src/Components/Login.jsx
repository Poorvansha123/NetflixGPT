 //instead of updating our  data after getting it in both signin signup and set it in our redux store we use firebase api onAuthStateChange(called when user signup,sign,signout)
 import Header from "./Header"

 import {useState,useRef} from "react"
import {checkValidateData} from "../utils/validate"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth"
import {auth} from "../utils/firebase"
import { useDispatch } from "react-redux"
import {addUser,removeUser} from "../utils/userSlice"
import {BACKGROUND} from "../utils/constants"
const Login=()=>{
 const [isSignInForm,setIsSignInForm]=useState(true)
 const [errorMessage,setErrorMessage]=useState(null)

 const dispatch=useDispatch()
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
    updateProfile(user, {
  displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
  // Profile updated!
  // ...
  const {uid,email,displayName} = auth.currentUser;// to get updated fresh data and then set it
    dispatch(addUser({uid:uid,email:email,displayName:displayName}))
  
}).catch((error) => {
  // An error occurred
  // ...
});

    // ...
    
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
  <img className="w-screen h-screen object-cover" src={BACKGROUND} alt="background"/>
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

// updateProfile() is used after signup to add additional user information such as displayName and photoURL. createUserWithEmailAndPassword() only creates the account with email and password, so we use updateProfile() to enrich the user's profile and then store the updated data in Redux.
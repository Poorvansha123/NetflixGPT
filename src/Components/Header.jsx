import {auth} from "../utils/firebase"
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react"
import {  onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux"
import {addUser,removeUser} from "../utils/userSlice"
import {LOGO,ACCOUNT} from "../utils/constants"
const Header=()=>{
 const navigate=useNavigate()
 const dispatch=useDispatch()
 const user=useSelector((store)=>store.user); 
 const handleSignOut=()=>{

signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
   navigate("/error")
});

 }
 useEffect(()=>{
 const unsubscribe=onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const {uid,email,displayName} = user;
    dispatch(addUser({uid:uid,email:email,displayName:displayName}))
    navigate("/browse")
   
  } else {
    // User is signed out
 
    dispatch(removeUser())
    navigate("/")
  }
});
//cleanup function
return ()=>unsubscribe();
},[])
return(
 <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-20 flex justify-between">
<img  className="w-36 "
 src={LOGO} alt="logo"/>
 {user && <div className="flex p-12">
  <img className="w-12 h-12 " src={ACCOUNT}/>
   <button onClick={handleSignOut} className="font-bold text-white">Sign Out</button>
 </div>}

 </div>
)
}
export default Header
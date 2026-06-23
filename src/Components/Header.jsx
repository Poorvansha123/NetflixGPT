import {auth} from "../utils/firebase"
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react"
import {  onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux"
import {addUser,removeUser} from "../utils/userSlice"
import {toggleGptSearchView} from "../utils/gptSlice"
import {changeLanguage} from "../utils/configSlice"
import {LOGO,ACCOUNT,SUPPORTED_LANGUAGES} from "../utils/constants"
const Header=()=>{
 const navigate=useNavigate()
 const dispatch=useDispatch()

 const user=useSelector((store)=>store.user); 
 const showGptSearch=useSelector((store)=>store.gpt.showGptSearch)
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
const handleGptSearchClick=()=>{
  //Toggle Gpt Search
  dispatch(toggleGptSearchView())
}
const handleLanguageChange=(e)=>{
dispatch(changeLanguage(e.target.value))
}
return(
 <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-20 flex justify-between">
<img  className="w-36 "
 src={LOGO} alt="logo"/>
 {user && <div className="flex p-12">
  {showGptSearch && <select className="p-2 m-2 bg-gray text-white " onChange={handleLanguageChange}>
    {SUPPORTED_LANGUAGES.map((lang=><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>))}
   

  </select>}
  <button className="py-2 px-4 m-2 bg-purple-800 text-white rounded-lg " onClick={handleGptSearchClick}>{showGptSearch?"HomePage":"GPT Search"}</button>
  <img className="w-12 h-12 " src={ACCOUNT}/>
   <button onClick={handleSignOut} className="font-bold text-white">Sign Out</button>
 </div>}

 </div>
)
}
export default Header
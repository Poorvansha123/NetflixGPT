import { useSelector } from "react-redux"
import lang from "../utils/languageConstants"
import { useRef } from "react"
import openai from "../utils/openai"
import {API_OPTIONS} from "../utils/constants"
import { useDispatch } from "react-redux"
import {addGptMovieResult} from "../utils/gptSlice"
const GptSearchBar=()=>{
  const dispatch=useDispatch()
 const searchText=useRef(null)
 const langKey=useSelector((store)=>store.config.lang)
 //search movie in tmdb
 const searchMovieTMDB=async (movie)=>{
  const data=await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1",API_OPTIONS)
  const json=await data.json()
  return json.results;
 }
 const handleGPTSearchClick=async()=>{
  //make api call to get movie resultsct
const gptMovies="Andaz Apna Apna, Hera Pheri,Chupke Chupke,Jaane Bhi Do Yaaro,Padosan".split(",")
const promiseArray=gptMovies.map((movie)=>searchMovieTMDB(movie))// array of promises i.e 5 promises in array  [Promise,Promise,Promise,Promise,Promise]
const tmdbResults=await Promise.all(promiseArray)
console.log(tmdbResults,"tmdbResults")
dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}))
 }
 return(
  <div className="pt-[10%] flex justify-center">
   <form className=" w-1/2 bg-black grid grid-cols-12" onSubmit={(e)=>e.preventDefault()}>
    <input  type="text" ref={searchText} className="p-4 m-4 text-black bg-white col-span-9 " placeholder={lang[langKey].gptSearchPlaceholder}
    />
<button className="col-span-3 py-2 px-4 m-4 bg-red-700 text-white rounded-lg" onClick={handleGPTSearchClick}>{lang[langKey].search}</button>
   </form>
  </div>
 )
}
export default GptSearchBar
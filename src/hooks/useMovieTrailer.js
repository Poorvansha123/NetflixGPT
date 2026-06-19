import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react"
import {addTrailerVideo} from "../utils/movieSlice"
import { API_OPTIONS } from "../utils/constants"
const useMovieTrailer=(movieId)=>{
 const dispatch=useDispatch()
 const getMovieTrailer=async()=>{
  const data=await fetch("https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",API_OPTIONS)
  const json=await data.json()
  
  const filterData=json.results.filter((movie)=>movie.type==="Trailer")
  const trailer=filterData.length?filterData[0]:json.results[0]
   console.log(trailer,"json")
  dispatch(addTrailerVideo(trailer));


 }
 useEffect(()=>{
  getMovieTrailer()
 },[])
}
export default useMovieTrailer
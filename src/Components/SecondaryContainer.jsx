import MovieList from "./MovieList"
import { useSelector } from "react-redux"
import {addNowPlayingMovies,addPopularMovies} from "../utils/movieSlice"
const  SecondaryContainer=()=>{
 const movies=useSelector((store)=>store.movies?.addNowPlayingMovies)
 const popularMovies=useSelector((store)=>store.movies?.addPopularMovies)
 console.log(movies,"moviestop")
return(
 movies && (
 <div className="bg-black"> 
 <div className="-mt-56 pl-12 relative z-20">
  <MovieList title={"Now Playing"} movies={movies}/>
  <MovieList title={"Trending"} movies={movies}/>
    <MovieList title={"Popular"} movies={popularMovies}/>
     <MovieList title={"Upcoming Movies"} movies={movies}/>
      <MovieList title={"Horror Movies"} movies={movies}/>
      </div>
 </div>
 )
)
}
export default SecondaryContainer
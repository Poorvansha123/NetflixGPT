import Header from "./Header"
import MainContainer from "./MainContainer"
import GptSearchComponent from "./GptSearchComponent"
import SecondaryContainer from "./SecondaryContainer"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import usePopularMovie from "../hooks/usePopularMovie"
import {toggleGptSearchView} from "../utils/gptSlice"
import { useSelector } from "react-redux"

const Browse=()=>{
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch)
 useNowPlayingMovies()
 usePopularMovie()
 return(
  <div>

<Header/>
{showGptSearch ? <GptSearchComponent/> :(
  <>
  <MainContainer/>
<SecondaryContainer/>
  </>
)}

  </div>
 )
}
export default Browse

// Absolutely.

// You could write:
// dispatch(
//   addNowPlayingMovies({
//     movies: json.results
//   })
// )
// Then your reducer would need:
// addNowPlayingMovies: (state, action) => {
//   state.addNowPlayingMovies = action.payload.movies;
// }



// also when we reun dispatch()
// dispatch(addNowPlayingMovies({...}))
// is equal to 
// dispatch({
//   type: "movies/addNowPlayingMovies",
//   payload: {
//     movies: json.results
//   }
// })
import Header from "./Header"
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import usePopularMovie from "../hooks/usePopularMovie"
const Browse=()=>{
 useNowPlayingMovies()
 usePopularMovie()
 return(
  <div>
<Header/>
<MainContainer/>
<SecondaryContainer/>
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
import { API_OPTIONS } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../utils/movieSlice';
const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies=useSelector((store)=>store.movies.addNowPlayingMovies)
  const getNowPlayingMovies = async () => {
    try {
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?page=1',
        API_OPTIONS,
      );
      const json = await data.json();

      dispatch(addNowPlayingMovies(json.results));
    } catch (error) {
      console.log('FETCH ERROR:', error);
    }
  };
  useEffect(() => {
    if(!nowPlayingMovies){
    getNowPlayingMovies();
    } //api is called two times becoz of rEACT.strictMode it is done by react(rendering twice) to check inconsistency in react rendering cycle and only happens in your development,when u build and deploy on prod it wont happen
  }, []);
};
export default useNowPlayingMovies;

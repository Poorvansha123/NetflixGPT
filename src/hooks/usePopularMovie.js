import { API_OPTIONS } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPopularMovies } from '../utils/movieSlice';
const usePopularMovie = () => {
  const dispatch = useDispatch();
  const getPopularMovie = async () => {
    try {
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/popular?page=1',
        API_OPTIONS,
      );
      const json = await data.json();

      dispatch(addPopularMovies(json.results));
    } catch (error) {
      console.log('FETCH ERROR:', error);
    }
  };
  useEffect(() => {
    getPopularMovie(); //api is called two times becoz of rEACT.strictMode it is done by react(rendering twice) to check inconsistency in react rendering cycle and only happens in your development,when u build and deploy on prod it wont happen
  }, []);
};
export default usePopularMovie;

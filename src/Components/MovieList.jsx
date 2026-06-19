import MovieCard from './MovieCard';
const MovieList = ({ title, movies }) => {
   if (!movies) return null;
  console.log(movies, 'movies');
  return (
    <div className='px-2 bg-black'>
      <h1 className='text-3xl font-bold py-4 text-white'>{title}</h1>
      <div className='flex overflow-x-scroll'>
        
        <div className='flex'>
         {movies.map((movie)=> <MovieCard key={movie?.id} posterPath={movie?.poster_path}/>)}
     
        </div>
      </div>
    </div>
  );
};
export default MovieList;

import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import { db } from "./config/firebase"
import { getDocs, collection, doc } from 'firebase/firestore';


function App() {
  const [movieList, setMovieList] = useState([])
  
  const moviesCollectionRef = collection(db, "movies")

  useEffect(() => {
    const getMovieList = async () => {
      //Read the data from the db
      // set movie list
      try {
        const data = await getDocs(moviesCollectionRef)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
        setMovieList(filteredData)
      } catch (err) {
        console.error(err)
      }
      
    }
    getMovieList()
  }, [])
  

  return (
    <div className="App">
      <Auth />

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import { db } from "./config/firebase"
import { getDocs, collection } from 'firebase/firestore';


function App() {
  const [movieList, setMovieList] = useState([])
  
  const moviesCollectionRef = collection(db, "movies")

  useEffect(() => {
    const getMovieList = async () => {
      //Read the data from the db
      // set movie list
      try {
        const data = await getDocs(moviesCollectionRef)
        console.log(data)
      } catch (err) {
        console.error(err)
      }
      
    }
    getMovieList()
  }, [])
  

  return (
    <div className="App">
      <Auth />
    </div>
  );
}

export default App;

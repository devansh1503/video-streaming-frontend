import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Obs from './pages/Obs';
import Stream from './pages/Stream';
import { useEffect, useState } from 'react';
import Login from './pages/Login';

function App() {
  const[isLoggedIn, setLogin] = useState(false);
  useEffect(()=>{
    const userCreds = JSON.parse(localStorage.getItem("userCred"))
    if(userCreds && userCreds.streamKey){
      setLogin(true)
    }
  },[])
  return (
    <div className="App">
      <BrowserRouter>
      {isLoggedIn ? 
          <div>
            <Header/>
            <Routes>
              <Route path='/' element={<Obs/>}></Route>
              <Route path='/stream' element={<Stream/>}></Route>
            </Routes>
          </div>
          :
          <Login setLogin={setLogin}/>
      }
      </BrowserRouter>
    </div>
  );
}

export default App;

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Obs from './pages/Obs';
import Golive from './pages/Golive';
import Stream from './pages/Stream';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Obs/>}></Route>
          <Route path='/go-live' element={<Golive/>}></Route>
          <Route path='/stream' element={<Stream/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

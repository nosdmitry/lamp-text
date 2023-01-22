import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import MainField from './components/LampText/MainFiled';
import MainFieldTwoD from './components/MainField/MainFieldTwoD';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/3d' element={<MainField />} />
          <Route path='/' element={<MainFieldTwoD />} />
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;

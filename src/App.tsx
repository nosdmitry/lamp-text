import { Route, Routes } from 'react-router-dom';
import './App.scss';
import MainField from './components/LampText/MainFiled';
import MainFieldTwoD from './components/MainField/MainFieldTwoD';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainFieldTwoD />} />
        <Route path='/3d' element={<MainField />} />
      </Routes>
    </div>
  );
}

export default App;

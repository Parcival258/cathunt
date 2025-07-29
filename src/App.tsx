import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from './view/HomeView'
import ViewPoint from './view/ViewPoint'
import HardMode from './view/HardMode';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeView />}></Route>
        <Route path="/viewpoint" element={<ViewPoint />} />
        <Route path="/HardMode" element={<HardMode />} />
      </Routes>
    </Router>
  )
}

export default App

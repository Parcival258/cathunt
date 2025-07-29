import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from './view/HomeView'
import ViewPoint from './view/ViewPoint'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeView />}></Route>
        <Route path="/viewpoint" element={<ViewPoint />} />
      </Routes>
    </Router>
  )
}

export default App

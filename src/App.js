
import './App.css';
import Home from './home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<Home />}></Route>
        </Routes>
      </Router>

    </>
  );
}

export default App;

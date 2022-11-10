import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

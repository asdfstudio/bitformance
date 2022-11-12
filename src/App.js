import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
//Pages
import HomePage from './pages/HomePage'
//layout components
import SidePanel from './components/SidePanel'
import TopBar from './components/TopBar'

//TODO: create mobile layout
const MainLayout = ({ path, children }) => (
  <div className="flex flex-row">
    <SidePanel />
    <div className="w-full h-screen overflow-y">
      <TopBar />
      {children}
    </div>
  </div>
)

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<MainLayout><HomePage /></MainLayout>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

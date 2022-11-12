import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
//Pages
import HomePage from './pages/HomePage'
//layout components
import SidePanel from './components/SidePanel'
import TopBar from './components/TopBar'
import BFModal from './components/BFModal'

import { useState } from 'react'

//TODO: create mobile layout
const MainLayout = ({ showModalType, setShowModalType, children }) => {

  return(
    <>
      {showModalType && <BFModal showModalType={showModalType} setShowModalType={setShowModalType} />}
      <div className="flex flex-row">
        <SidePanel setShowModalType={setShowModalType} />
        <div className="w-full h-screen overflow-y">
          <TopBar />
          {children}
        </div>
      </div>
    </>
  )
}

function App() {

  const [showModalType, setShowModalType] = useState('')

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <HomePage />
            </MainLayout>
          } />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

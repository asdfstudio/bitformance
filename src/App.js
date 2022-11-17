import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
//Pages
import HomePage from './pages/HomePage'
import BrowsePage from './pages/BrowsePage'
import ComparePage from './pages/ComparePage'
import CryptoPage from './pages/CryptoPage'
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
          <TopBar setShowModalType={setShowModalType} />
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
          }/>
          <Route exact path="/indexes/browse" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <BrowsePage />
            </MainLayout>
          }/>
          <Route exact path="/compare" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <ComparePage />
            </MainLayout>
          }/>
          <Route exact path="/indexes/browse/:id" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <CryptoPage />
            </MainLayout>
          }/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;

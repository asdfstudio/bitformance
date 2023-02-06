import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
//Pages
import HomePage from './pages/HomePage'
import BrowsePage from './pages/BrowsePage'
import CoinsPage from './pages/CoinsPage'
import SingleCoinPage from './pages/SingleCoinPage'
import MyIndexesPage from './pages/MyIndexesPage'
import MyFavoritesPage from './pages/MyFavoritesPage'
import ComparePage from './pages/ComparePage'
import CryptoPage from './pages/CryptoPage'
import CreateIndexPage from './pages/CreateIndexPage'
import SettingsPage from './pages/SettingsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsPage from './pages/TermsPage'

//
import ResetPasswordPage from './pages/ResetPasswordPage'
import EmailConfirmPage from './pages/EmailConfirmPage'

//layout components
import SidePanel from './components/SidePanel'
import TopBar from './components/TopBar'
import BFModal from './components/BFModal'

import { useState } from 'react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({ showModalType, setShowModalType, children }) => {
  return(
    <>
      <ToastContainer />
      {showModalType && <BFModal showModalType={showModalType} setShowModalType={setShowModalType} />}
      <div className="flex flex-row">
        <SidePanel setShowModalType={setShowModalType} />
        <div className="w-full h-screen overflow-y">
          <TopBar showModalType={showModalType} setShowModalType={setShowModalType} />
          {children}
        </div>
      </div>
    </>
  )
}

function App() {

  const [showModalType, setShowModalType] = useState('')

  //TODO: add auth guard to my indexes, my favorites
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <HomePage />
            </MainLayout>
          }/>

          <Route exact path="/coins" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <CoinsPage />
            </MainLayout>
          }/>

          <Route exact path="/coins/:symbol" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <SingleCoinPage />
            </MainLayout>
          }/>

          <Route exact path="/indexes/browse" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <BrowsePage />
            </MainLayout>
          }/>
          <Route exact path="/indexes/browse/:id" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <CryptoPage isAuth={false} />
            </MainLayout>
          }/>
          <Route exact path="/indexes/my-indexes" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <MyIndexesPage />
            </MainLayout>
          }/>
          <Route exact path="/indexes/my-indexes/:id" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <CryptoPage isAuth={true} />
            </MainLayout>
          }/>
          <Route exact path="/indexes/my-favorites" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <MyFavoritesPage />
            </MainLayout>
          }/>
          <Route exact path="/compare" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <ComparePage />
            </MainLayout>
          }/>
  
          <Route exact path="/indexes/create-index" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <CreateIndexPage />
            </MainLayout>
          }/>
          <Route exact path="/settings" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <SettingsPage setShowModalType={setShowModalType} />
            </MainLayout>
          }/>

          <Route exact path="/privacy-policy" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <PrivacyPolicyPage />
            </MainLayout>
          }/>

          <Route exact path="/terms-of-services" element={
            <MainLayout showModalType={showModalType} setShowModalType={setShowModalType}>
              <TermsPage/>
            </MainLayout>
          }/>          

          <Route exact path="/reset-link/:token" element={
            <ResetPasswordPage />
          }/>

          <Route exact path="/email-confirmed/:token" element={
            <EmailConfirmPage />
          }/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;

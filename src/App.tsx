import React from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Header/Navbar'
import Routers from './routers/Routers'
import Footer from './components/Footer/Footer'

const App: React.FC = () => {
  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-white min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />
        <div className="pt-16 flex-grow overflow-x-hidden">
          <Routers />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App

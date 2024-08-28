import React from 'react'
import { YTPlaylist } from './components' // Adjust the import path as needed
import { Navbar, Footer } from './layout'

const App: React.FC = () => (
  <>
    <Navbar />
    <YTPlaylist />
    <Footer />
  </>
)

export default App

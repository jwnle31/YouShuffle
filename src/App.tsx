import React from 'react'
import { YTPlaylist } from './components' // Adjust the import path as needed
import { Navbar, Footer } from './layout'
import { SpeedInsights } from '@vercel/speed-insights/react'

const App: React.FC = () => (
  <>
    <Navbar />
    <YTPlaylist />
    <Footer />
    <SpeedInsights />
  </>
)

export default App

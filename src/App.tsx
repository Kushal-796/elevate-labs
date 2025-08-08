import React from 'react'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Process } from './components/Process'
import { Projects } from './components/Projects'
import { Showcase } from './components/Showcase'
import { TechStack } from './components/TechStack'
import { Contact } from './components/Contact'
import { Toaster } from './components/Toaster'

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Projects />
      <Process />
      {/* <Showcase /> */}
      <TechStack />
      <Contact />
      <Toaster />
    </div>
  )
}

export default App
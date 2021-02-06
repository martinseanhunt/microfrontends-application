import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Header } from './components/Header'
import { MarketingApp } from './components/remote/MarketingApp'

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <MarketingApp />
    </BrowserRouter>
  )
}

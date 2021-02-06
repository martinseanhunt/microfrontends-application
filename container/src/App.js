import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'

import { Header } from './components/Header'
import { MarketingApp } from './components/remote/MarketingApp'

const generateClassName = createGenerateClassName({
  // Prefixing all minified classnames with a string unique to this micro FE to avoid class naem collisoins.
  productionPrefix: 'ct',
})

export function App() {
  return (
    <>
      {/* 
      Giving styles provider an extra option  to make sure that classnames are sufficently random
      when minified for production. This fixes an issue where there can be style name conflicts across
      different micro FE's in prod. See https://www.udemy.com/course/microfrontend-course/learn/lecture/23207132#content
      for more info.
    */}
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <Header />
          <MarketingApp />
        </BrowserRouter>
      </StylesProvider>
    </>
  )
}

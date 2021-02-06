import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'

import { Landing } from './components/Landing'
import { Pricing } from './components/Pricing'

const generateClassName = createGenerateClassName({
  // Prefixing all minified classnames with a string unique to this micro FE to avoid class naem collisoins.
  productionPrefix: 'ma',
})

export const App = () => (
  <div>
    {/* 
      Giving styles provider an extra option  to make sure that classnames are sufficently random
      when minified for production. This fixes an issue where there can be style name conflicts across
      different micro FE's in prod. See https://www.udemy.com/course/microfrontend-course/learn/lecture/23207132#content
      for more info.
    */}
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/pricing" component={Pricing} />
          <Route path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  </div>
)

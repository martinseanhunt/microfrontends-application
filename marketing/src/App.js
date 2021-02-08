import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
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

export const App = ({ history }) => (
  <div>
    {/* 
      Giving styles provider an extra option  to make sure that classnames are sufficently random
      when minified for production. This fixes an issue where there can be style name conflicts across
      different micro FE's in prod. See https://www.udemy.com/course/microfrontend-course/learn/lecture/23207132#content
      for more info.
    */}
    <StylesProvider generateClassName={generateClassName}>
      {/* 
        Here we want to use memory history instead of browser history to avoid conflicts / race conditions
        between different services. Only use a browser history within a container app.

        Router allows you to create and provide the history object you want to use rather than have it created for you
      */}
      <Router history={history}>
        <Switch>
          <Route exact path="/pricing" component={Pricing} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    </StylesProvider>
  </div>
)

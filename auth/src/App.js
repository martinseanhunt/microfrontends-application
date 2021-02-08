import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'

import { SignUp } from './components/Signup'
import { SignIn } from './components/Signin'

const generateClassName = createGenerateClassName({
  // Prefixing all minified classnames with a string unique to this micro FE to avoid class naem collisoins.
  productionPrefix: 'au',
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
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />
        </Switch>
      </Router>
    </StylesProvider>
  </div>
)

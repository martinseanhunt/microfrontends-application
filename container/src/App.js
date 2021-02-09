import React, { lazy, Suspense, useState, useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'

import { Header } from './components/Header'
import { Progress } from './components/Progress'

// Lazy load the components responsible for mounting the micro front ends so we only load the JS
// when they are going to be shown in the browser.
// Need to use default exports with these
const MarketingLazy = lazy(() => import('./components/remote/MarketingApp'))
const Authlazy = lazy(() => import('./components/remote/AuthApp'))
const Dashboardlazy = lazy(() => import('./components/remote/DashboardApp'))

const generateClassName = createGenerateClassName({
  // Prefixing all minified classnames with a string unique to this micro FE to avoid class naem collisoins.
  productionPrefix: 'ct',
})

// Manually create a browser history so we can access it and programatically redirect the user when
// the value of isSingedIn is updated. Otherwise getting access to history in the comonet with the router
// is challenging.
const history = createBrowserHistory()

export function App() {
  // signed in state to be passed down to all micro FE's and set via a callback passed to auth micro FE.
  // in the real world this state could be stored in some global state management solution or just a context along
  // with anything else we want to store globally.
  const [isSignedIn, setIsSignedIn] = useState(false)

  // handle logic around auth based redirects / route access
  useEffect(() => {
    console.log(history.location)
    if (isSignedIn) history.push('/dashboard')
    if (!isSignedIn && history.location.pathname === '/dashboard')
      history.push('/')
  }, [isSignedIn])

  return (
    <>
      {/* 
        Giving styles provider an extra option  to make sure that classnames are sufficently random
        when minified for production. This fixes an issue where there can be style name conflicts across
        different micro FE's in prod. See 
        https://www.udemy.com/course/microfrontend-course/learn/lecture/23207132#content
        for more info.
      */}
      <StylesProvider generateClassName={generateClassName}>
        {/* 
          BrowserRouter uses browser history which is what we should be using in a container app. 
          Remotes should use memory histroy to avoid child apps from reading the path in address bar.
          https://www.udemy.com/course/microfrontend-course/learn/lecture/23241682#content

          We're now using a regular router and creating the browser history manually so we can easily programatically 
          redirect when auth changes. 
        */}
        <Router history={history}>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          {/* 
            using suspense with lazy to make sure micro FE code isn't loaded before it's neeed 
            fallback is shown while the code for auth or marketing is being loaded 
          */}
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <Authlazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard" component={Dashboardlazy} />
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </Router>
      </StylesProvider>
    </>
  )
}

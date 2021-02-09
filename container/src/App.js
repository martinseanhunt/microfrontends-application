import React, { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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

const generateClassName = createGenerateClassName({
  // Prefixing all minified classnames with a string unique to this micro FE to avoid class naem collisoins.
  productionPrefix: 'ct',
})

export function App() {
  // signed in state to be passed down to all micro FE's and set via a callback passed to auth micro FE.
  // in the real world this state could be stored in some global state management solution or just a context along
  // with anything else we want to store globally.
  const [isSignedIn, setIsSignedIn] = useState(false)

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
        */}
        <BrowserRouter>
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
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </StylesProvider>
    </>
  )
}

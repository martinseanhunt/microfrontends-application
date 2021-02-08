import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'

import { App } from './App'

// Mount function to start up the app. Takes the element where the app is to be rendered as well as
// some options. onNavigate is to be called when we navigate from within our app so that the cotnainers browser
// history can be updated.
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  // Create a memory history to be used by react router.
  // creating the history object here so we can sync the history of this remote with that of the
  // container. Rather than simply sharing react routers history object we're creating our own generic
  // history object so that services are not locked in to using react router and cross service communication
  // remains implementation detail agnostic

  // use defaulthistory when runnign in isolation
  const history =
    defaultHistory ||
    createMemoryHistory({
      // Giving creatememory histroy and initial state for it's path. This fixes a bug where the auth FE
      // can show a blank page on first load... As the onParentNavigate function is not called when first
      // navigating to this page from within the cotnainer. memory history assumes we're at /
      // More info: https://www.udemy.com/course/microfrontend-course/learn/lecture/23275298#content
      initialEntries: [initialPath],
    })

  // memory history has a listen method which will call the provided finction whjenever any navigation occurs
  history.listen(onNavigate)

  ReactDOM.render(<App history={history} />, el)

  // Returns an object so we can provide the container with some callbacks it can call to pass things
  // down to this child FE.
  return {
    // receives location object with pathname
    onParentNavigate({ pathname: nextPathName }) {
      // Tell the memory history for this FE to reflect the navigation which has happened at the container level.
      const { pathname } = history.location
      if (nextPathName !== pathname) history.push(nextPathName)
    },
  }
}

// If in development mode and running in isolation mount the app directly
if (process.env.NODE_ENV === 'development') {
  // look for a unique element ID which is not going to be present on other frontends
  const el = document.querySelector('#_auth-frontend-development-only')

  // making sure we can use a BrowserRouter when in running isolation so we can see the path update in browser
  if (el)
    mount(el, {
      onNavigate: () => null,
      defaultHistory: createBrowserHistory(),
    })
}

// otherwise export mount so that the host frontend can decide how, when and where to mount
export { mount }

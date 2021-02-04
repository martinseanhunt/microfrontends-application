import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'

// Mount function to start up the app
const mount = (el) => {
  ReactDOM.render(<App />, el)
}

// If in development mode and running in isolation mount the app directly
if (process.env.NODE_ENV === 'development') {
  // look for a unique element ID which is not going to be present on other frontends
  const el = document.querySelector('#_marketing-frontend-development-only')

  if (el) mount(el)
}

// otherwise export mount so that the host frontend can decide how, when and where to mount
export { mount }

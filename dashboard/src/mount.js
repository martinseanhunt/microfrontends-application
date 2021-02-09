import { createApp } from 'vue'
import Dashboard from './components/Dashboard'

// Mount function to start up the app. Takes the element where the app is to be rendered
const mount = (el) => {
  const app = createApp(Dashboard)
  app.mount(el)
}

// If in development mode and running in isolation mount the app directly
if (process.env.NODE_ENV === 'development') {
  // look for a unique element ID which is not going to be present on other frontends
  const el = document.querySelector('#_dashboard-frontend-development-only')

  // making sure we can use a BrowserRouter when in running isolation so we can see the path update in browser
  if (el) mount(el)
}

// otherwise export mount so that the host frontend can decide how, when and where to mount
export { mount }

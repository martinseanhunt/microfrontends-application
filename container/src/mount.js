import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'

// We don't need a mount function like in other FE's because the
// container is never being run from within another FE.
ReactDOM.render(<App />, document.querySelector('#root'))

import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// Importing the mount function from the remote marketing FE.
// Remember, the mount function is allowing us to pass an element where we want to mount the FE

// Another way we could do this is to simply have FE's export components. However, in doing that we would
// lose the flexibility to use frameworks other than react.
import { mount } from 'auth/AuthApp'

export default function AuthApp() {
  const ref = useRef()
  const history = useHistory()

  useEffect(() => {
    // Passing the ref of the div where we want to mount the marketing FE as well as some options
    // mount returns an object with some methods for passing data down to a child FE.
    const { onParentNavigate } = mount(ref.current, {
      // A calback to be called when the child application updates it's memory history so we can reflect that in
      // the browser history / address bar.

      // We send the onNavigate function the new location as an argument. location contains the pathname which
      // we rename to nextPathName
      onNavigate: ({ pathname: nextPathName }) => {
        // updating the containers history object when the path changes in marketing app. only if the new pathname
        // is not the same as the current pathname. This avoids an infinite loop!
        const { pathname } = history.location
        if (pathname !== nextPathName) history.push(nextPathName)
      },

      // setting the initial path that the FE loads since this FE has nothing at / and memory history assumes
      // we start at / by default
      // https://www.udemy.com/course/microfrontend-course/learn/lecture/23275298#content
      // techincally the marketing app suffers from the same issue but because we're loading / by default it doesn't
      // ever manfiest.
      initialPath: history.location.pathname,
    })

    // listner to detect changes in navigation to the continae and pass them down to the child
    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
}

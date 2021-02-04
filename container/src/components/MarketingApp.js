import React, { useRef, useEffect } from 'react'

// Importing the mount function from the remote marketing FE.
// Remember, the mount function is allowing us to pass an element where we want to mount the FE

// Another way we could do this is to simply have FE's export components. However, in doing that we would
// lose the flexibility to use frameworks other than react.
import { mount } from 'marketing/MarketingApp'

export function MarketingApp() {
  const ref = useRef()

  useEffect(() => {
    // Passing the ref of the div where we want to mount the marketing FE
    mount(ref.current)
  }, [])

  return <div ref={ref} />
}

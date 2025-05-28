import React from 'react'
import { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const Authpage = () => {
    const [state, setState] = useState(true)
  return (
    <div>
        {state ? <Login setState={setState}/> : <Register setState={setState} />}
    </div>
  )
}

export default Authpage
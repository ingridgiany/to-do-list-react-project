import { useState } from "react"
import './home.css'

import { Link } from "react-router-dom"

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(e){
    e.preventDefault()

    if(email !== '' && password !== ''){
      alert('TEST')
    }else {
      alert('Fill in all fields')
    }


  }

  return (
    <div className="home-container">
      <h1>To-do list</h1>
      <span>Manage your schedule easily...</span>

      <form className="form" onSubmit={handleLogin}>
        <input type="text"
          placeholder="Type your email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }} />

        <input
          autoComplete={false}
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }} />

        <button type="submit">Login</button>
      </form>

      <Link className="button-link" to='/register'>
        Don't have an account? Register
      </Link>
    </div>
  )
}
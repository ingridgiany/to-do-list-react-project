import { useState } from "react"
import './home.css'

import { Link } from "react-router-dom"

import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { useNavigate } from "react-router-dom"

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()

    if (email !== '' && password !== '') {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/admin', { replace: true })
        })
        .catch((error) => {
          console.log('ERROR LOGIN ' + error)
        })
    } else {
      alert('Fill in all fields')
    }


  }

  return (
    <div className="home-container">
      <h1>To-do list</h1>
      <span>Manage your schedule easily...</span>

      <form className="form" onSubmit={handleLogin}>
        <input
          autoComplete="username"
          type="text"
          placeholder="Type your email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }} />

        <input
          autoComplete="current-password"
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }} />

        <button type="submit">Sign in</button>
      </form>

      <Link className="button-link" to='/register'>
        Don't have an account? Register
      </Link>
    </div>
  )
}
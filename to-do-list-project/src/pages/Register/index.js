import { useState } from "react"

import { Link } from "react-router-dom"
import { auth } from '../../firebaseConnection'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()

    if (email !== '' && password !== '') {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/admin', { replace: true })
        })
        .catch((error) => {
          console.log('ERROR REGISTER ' + error)
        })
    } else {
      alert('Fill in all fields')
    }


  }

  return (
    <div className="home-container">
      <h1>Register</h1>
      <span>Let's create an account...</span>

      <form className="form" onSubmit={handleRegister}>
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

        <button type="submit">Sign up</button>
      </form>

      <Link className="button-link" to='/'>
        Already have an account? Login
      </Link>
    </div>
  )
}
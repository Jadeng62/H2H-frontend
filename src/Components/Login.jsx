import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'

import SignInWithGoogle from './SignInWithGoogle'
import { auth } from '../helpers/firebase'

function Login() {
  const navigate = useNavigate()

  const [loginUser, setLoginNewUser] = useState({ password: '', email: '' })

  const handleChange = (e) => {
    setLoginNewUser({ ...loginUser, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { email, password } = loginUser
    try {
      //sign in to firebase
      await signInWithEmailAndPassword(auth, email, password)
      console.log('User logged in Successfully')

      setLoginNewUser({ password: '', email: '' })

      toast.success('User logged in Successfully', {
        position: 'top-center',
      })
      navigate('/profile')
    } catch (error) {
      console.log(error.message)

      toast.error(error.message, {
        position: 'bottom-center',
      })
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email Address:{' '}
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={loginUser.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="password">
          Password:{' '}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={loginUser.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
      <div>
        New user <Link to="/register">Register Here</Link>
        <p>--Or continue with--</p>
      </div>
      <SignInWithGoogle />
    </div>
  )
}

export default Login

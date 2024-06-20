import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { auth } from '../helpers/firebase'

function Register() {
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const { email, password } = newUser

      // createUser in firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      // you need the JWT token to authenticate protected routes on the backend
      const token = await userCredential.user.getIdToken()
      localStorage.setItem('token', token)

      const { uid, photoURL } = auth.currentUser

      if (uid) {
        const { email, first_name, last_name } = newUser

        const URL = import.meta.env.VITE_BASE_URL

        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          // every field that is in the backend query should be here as well
          body: JSON.stringify({
            uid,
            username: '',
            first_name,
            last_name,
            email,
            photo: photoURL || '',
          }),
        }
        const response = await fetch(`${URL}/api/auth/register`, options)

        const retrievedUser = await response.json()
        console.log('retrievedUser', retrievedUser)

        if (retrievedUser) {
          await signInWithEmailAndPassword(auth, email, password)

          //Display success alert
          toast.success('User Registered Successfully!!', {
            position: 'top-center',
          })

          setNewUser({
            email: '',
            first_name: '',
            last_name: '',
            photo: '',
          })

          navigate('/profile')
        } else {
          toast.error('User Not Found', {
            position: 'top-center',
          })
        }
      }
    } catch (error) {
      console.log(error.message)

      toast.error(error.message, {
        position: 'bottom-center',
      })
    }
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <form onSubmit={handleRegister}>
        <h3>Sign Up</h3>
        <div>
          <label htmlFor="first_name">
            First Name:{' '}
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First name"
              value={newUser.first_name}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="last_name">
            Last Name:{' '}
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last name"
              value={newUser.last_name}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="email">
            Email Address:{' '}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={newUser.email}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="password">
            Password:{' '}
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" style={{ width: 140 }}>
            Sign Up
          </button>
        </div>
        <p>
          Already registered <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register

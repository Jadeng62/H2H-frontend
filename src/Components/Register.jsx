import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth, db } from '../helpers/firebase'

function Register() {
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const { email, password } = newUser

      await createUserWithEmailAndPassword(auth, email, password)
      const { currentUser } = auth

      if (currentUser.uid) {
        const { email, firstName, lastName, password } = newUser
        await setDoc(doc(db, 'Users', currentUser.uid), {
          email,
          firstName,
          lastName,
          photo: '',
        })
        console.log(auth, email, password)
        await signInWithEmailAndPassword(auth, email, password)
      }
      console.log('User Registered Successfully!!')
      setNewUser({
        email,
        firstName,
        lastName,
        photo: '',
      })

      toast.success('User Registered Successfully!!', {
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
      <form onSubmit={handleRegister}>
        <h3>Sign Up</h3>
        <div>
          <label htmlFor="firstName">
            First Name:{' '}
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First name"
              value={newUser.firstName}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="lastName">
            Last Name:{' '}
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last name"
              value={newUser.lastName}
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

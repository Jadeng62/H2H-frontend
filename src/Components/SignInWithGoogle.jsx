import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { auth } from '../helpers/firebase'
import { register } from '../helpers/register'

import googleBadge from '../assets/google.png'

const URL = import.meta.env.VITE_BASE_URL

function SignInWithGoogle() {
  const navigate = useNavigate()

  function googleLogin() {
    try {
      const provider = new GoogleAuthProvider()

      signInWithPopup(auth, provider).then(async ({ user }) => {
        const token = await user.getIdToken()
        localStorage.setItem('token', token)

        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }

        // check if user exists
        const response = await fetch(
          `${URL}/api/auth/user/${user.uid}`,
          options
        )

        const foundUser = await response.json()

        if (foundUser.uid) {
          navigate('/profile')
          return
        }

        if (
          token &&
          (foundUser?.message === 'Invalid Token' ||
            foundUser.error === 'Error fetching user')
        ) {
          const { photoURL, uid } = user

          const retrievedUser = await register(user, photoURL, uid)

          console.log('google', retrievedUser)
          //   const options = {
          //     method: 'POST',
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //     // every field that is in the backend query should be here as well
          //     body: JSON.stringify({
          //       uid,
          //       username: '',
          //       first_name: displayName,
          //       last_name: '',
          //       email,
          //       photo: photoURL || '',
          //     }),
          //   }
          //   const response = await fetch(`${URL}/api/auth/register`, options)

          if (retrievedUser.uid) {
            navigate('/profile')
          }
        } else {
          navigate('/register')
        }
      })
    } catch (error) {
      localStorage.removeItem('token')
      toast.error(error.message, {
        position: 'bottom-center',
      })
    }
  }
  return (
    <div style={{ cursor: 'pointer' }} onClick={googleLogin}>
      <img src={googleBadge} width={'20%'} />
    </div>
  )
}
export default SignInWithGoogle

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { auth } from '../helpers/firebase'
import { register } from '../helpers/register'
import { getUser } from '../helpers/getUser'

import googleBadge from '../assets/google.png'

// const URL = import.meta.env.VITE_BASE_URL

function SignInWithGoogle() {
  const navigate = useNavigate()

  function googleLogin() {
    try {
      const provider = new GoogleAuthProvider()

      signInWithPopup(auth, provider).then(async ({ user }) => {
        const token = await user.getIdToken()
        localStorage.setItem('token', token)
        // localStorage.setItem('token', token)

        // const options = {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${token}`,
        //   },
        // }

        // // check if user exists
        // const response = await fetch(
        //   `${URL}/api/auth/user/${user.uid}`,
        //   options
        // )

        const foundUser = await getUser(user, token)

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

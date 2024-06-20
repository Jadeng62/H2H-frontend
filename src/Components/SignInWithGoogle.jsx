import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { auth } from '../helpers/firebase'
import { register } from '../helpers/register'
import { getUser } from '../helpers/getUser'

import googleBadge from '../assets/google.png'

async function handleGoogleSignIn() {
  const provider = new GoogleAuthProvider()
  try {
    const { user } = await signInWithPopup(auth, provider)
    const token = await user.getIdToken()
    localStorage.setItem('token', token)

    const foundUser = await getUser(user, token)
    if (foundUser.uid) {
      return { navigateTo: '/profile' }
    } else {
      const { photoURL, uid } = user
      const registeredUser = await register(user, photoURL, uid)
      return registeredUser.uid
        ? { navigateTo: '/profile' }
        : { navigateTo: '/register' }
    }
  } catch (error) {
    localStorage.removeItem('token')
    throw error
  }
}

function SignInWithGoogle() {
  const navigate = useNavigate()

  const googleLogin = async () => {
    try {
      const result = await handleGoogleSignIn()
      navigate(result.navigateTo)
    } catch (error) {
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

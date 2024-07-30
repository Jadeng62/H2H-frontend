import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { auth } from '../helpers/firebase'
import { register } from '../helpers/register'
import { fetchUser } from '../helpers/fetchUser'

import googleBadge from '../assets/web_neutral_sq_ctn@1x.png'

async function handleGoogleSignIn() {
  const provider = new GoogleAuthProvider()
  try {
    //sign into Firebase
    const { user } = await signInWithPopup(auth, provider)
    //retrieve JWT token from firebase
    const token = await user.getIdToken()
    localStorage.setItem('token', token)

    // Check if user exists in your backend
    const foundUser = await fetchUser(user, token)
    if (!foundUser.uid) {
      // User does not exist in backend, create the user
      const { photoURL, uid } = user
      await register(user, photoURL, uid)
    }

    // return key/value to use for the navigate in the googleLogin function below
    return { navigateTo: '/profile' }
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
    <button type='button' onClick={googleLogin} className='bg-slate-100 text-background rounded hover:shadow-xl font-bold mt-3 flex justify-center text-justify'>
      <img src={googleBadge} 
      />
    </button>
  )
}

export default SignInWithGoogle

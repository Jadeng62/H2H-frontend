import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'

import { auth, db } from '../helpers/firebase'
import googleBadge from '../assets/google.png'

function SignInWithGoogle() {
  const navigate = useNavigate()

  function googleLogin() {
    try {
      const provider = new GoogleAuthProvider()

      signInWithPopup(auth, provider).then(async ({ user }) => {
        const { email, displayName, photoURL } = user
        if (user) {
          await setDoc(doc(db, 'Users', user.uid), {
            email,
            firstName: displayName,
            photo: photoURL,
            lastName: '',
          })

          toast.success('User logged in Successfully', {
            position: 'top-center',
          })

          navigate('/profile')
        }
      })
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

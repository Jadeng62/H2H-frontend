import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getUserData } from '../helpers/getUserData'
import { logout } from '../helpers/logout'

import placeholderImage from '../assets/placeholder.png'

import "../Styles/profile.css"

function Profile() {
  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState(null)

  async function handleLogout() {
    try {
      //call function to log out of firebase, no need to call backend
      await logout()
      toast.success('User logged out successfully!', {
        position: 'top-center',
      })
      navigate('/')
      console.log('User logged out successfully!')
    } catch (error) {
      toast.error(error.message, {
        position: 'bottom-center',
      })

      console.error('Error logging out:', error.message)
    }
  }

  useEffect(() => {
    async function getUser() {
      // this is a helper function that will check the state of the current user in firebase and fetch the user using the JWT token from localstorage and the uid
      const user = await getUserData()
        // console.log(`Get user:`,user)
      if (user) setUserDetails(user)
    }

    getUser()
  }, [])

  if (!userDetails) return alert(`Error with backend fetch data lost`)

  return (
   <div className='profile'>
    <div className='profile-container'>
      {console.log(userDetails)}
      {userDetails ? (
        <>
          <img
            src={userDetails.photo || placeholderImage}
            alt={userDetails.first_name}
            className='profile-img'
            style={{
              marginTop: 100,
              marginBottom: 20,
              borderRadius: '50%',
              width: 150,
              height: 150,
            }}
          />
         <div className='profile-info-container'>
          <h1 className='profile-h1'>{userDetails.first_name}'s Profile Page</h1>

          <p className='profile-p'>Email: {userDetails.email}</p>
          <p className='profile-p'>First Name: {userDetails.first_name}</p>
          <p className='profile-p'>
            Last Name:{' '}
            {userDetails.last_name ? userDetails.last_name : 'Unknown'}
          </p>

          <button onClick={handleLogout} className='profile-btn'>Logout</button>
         </div>
        </>
      ) : (
        <>
        <div className='profile-ternary'>
          <h2 className='profile-h2'>Loading...</h2>
          <button onClick={handleLogout} className='profile-btn'>Logout</button>
          </div>
        </>
      )}
    </div>
   </div>
  )
}

export default Profile

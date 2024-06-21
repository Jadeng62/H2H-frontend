import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getUserData } from '../helpers/getUserData'
import { logout } from '../helpers/logout'

import placeholderImage from '../assets/placeholder.png'

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
      navigate('/login')
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

      if (user) setUserDetails(user)
    }

    getUser()
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      {console.log(userDetails)}
      {userDetails ? (
        <>
          <img
            src={userDetails.photo || placeholderImage}
            alt={userDetails.first_name}
            style={{
              marginTop: 100,
              marginBottom: 20,
              borderRadius: '50%',
              width: 150,
              height: 150,
            }}
          />

          <h1>{userDetails.first_name}'s Profile Page</h1>

          <p>Email: {userDetails.email}</p>
          <p>First Name: {userDetails.first_name}</p>
          <p>
            Last Name:{' '}
            {userDetails.last_name ? userDetails.last_name : 'Unknown'}
          </p>

          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <h2>Loading...</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  )
}

export default Profile

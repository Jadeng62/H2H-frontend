import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { fetchUserData } from '../helpers/fetchUserData'
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
      const user = await fetchUserData()
      console.log('profile', user)
      if (user) setUserDetails(user)
      else {
        toast.error('User Not Found', {
          position: 'bottom-center',
        })
      }
    }

    getUser()
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      {userDetails ? (
        <>
          <img
            src={userDetails.photo || placeholderImage}
            alt={userDetails.firstName}
            style={{
              marginTop: 100,
              marginBottom: 20,
              borderRadius: '50%',
              width: 150,
              height: 150,
            }}
          />

          <h1>{userDetails.firstName}'s Profile Page</h1>

          <p>Email: {userDetails.email}</p>
          <p>First Name: {userDetails.firstName}</p>
          <p>
            Last Name: {userDetails.lastName ? userDetails.lastName : 'Unknown'}
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

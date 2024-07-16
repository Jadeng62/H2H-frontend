const URL = import.meta.env.VITE_BASE_URL

export const register = async (user, photoURL, uid) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // every field that is in the backend query should be here as well
    body: JSON.stringify({
      uid,
      username: '',
      first_name: user.displayName || user.first_name,
      last_name: user.last_name || '',
      email: user.email,
      photo: photoURL || '',
      dob: user.dob,
      position: user.position
    }),
  }
  const response = await fetch(`${URL}/api/auth/register`, options)

  return response.json()
}

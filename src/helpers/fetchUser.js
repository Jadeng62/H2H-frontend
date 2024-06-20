const URL = import.meta.env.VITE_BASE_URL

export const fetchUser = async (user, token) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await fetch(`${URL}/api/auth/user/${user.uid}`, options)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    console.error('Failed to fetch user data:', error)
    // Optionally re-throw the error if you want calling code to handle it
    throw error
  }
}

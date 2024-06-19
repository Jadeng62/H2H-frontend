import { auth } from './firebase'

// you can import and call this functionin any component. there is no need to fetch to the backend if you have a backend
export const logout = async () => {
  try {
    //firebase logout
    await auth.signOut()
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

import { auth } from './firebase'

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

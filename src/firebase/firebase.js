import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { initializeApp } from '@firebase/app'
import firebaseConfig from './config'

const app = initializeApp(firebaseConfig);

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function login(email, password) {
    return signInWithEmailAndPassword(getAuth(), email, password)
  }

  function signOut() {
    return getAuth().signOut();
  }

  async function signUp(name, email, password) {
    await createUserWithEmailAndPassword(getAuth(), email, password);
    return await updateProfile(getAuth().currentUser,{
      displayName: name
    })
  }

  function getUser() {
    return getAuth().currentUser
  }

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    getUser,
    login,
    signOut,
    signUp
  }

  return (
    <AuthContext.Provider value={value}>
      { !loading && children }
    </AuthContext.Provider>
  )

}
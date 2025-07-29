import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { AuthContext } from '../Context/AuthContext';
import { auth } from '../firebase/firebase.confige';

const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState('hello')
    const [explocation, setExpLocation] = useState('');
    const [loading, setLoading] = useState(true);


    const signUpWithEmailPassword = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle =()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const updateUserProfile = (updateData) => {
        return updateProfile(auth.currentUser, updateData)
    }

    const signInWithEmail = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth , email, password)
    }

    const passwordResetEmail = (email)=>{
        setLoading(true)
        return sendPasswordResetEmail(auth,email)
    }

    const signout = ()=>{
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const authData = {
        user,
        setUser,
        signUpWithEmailPassword,
        signInWithGoogle,
        updateUserProfile,
        signInWithEmail,
        passwordResetEmail,
        signout,
        loading,
        setExpLocation,
        explocation
    }

    return <AuthContext value={authData}>{children}</AuthContext>
};

export default AuthProvider;
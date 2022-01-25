import React, { useEffect, useState, useContext, createContext } from 'react';
import { Auth } from 'aws-amplify';

/**
 * 認証画面に必要な要素のインターフェイス
 */
interface UseAuth {
    isLoading: boolean
    isAuthenticated: boolean
    email: string
    signUp: (
        email: string,
        password: string,
        callback: (r: Result) => void
    ) => void
    confirmSignUp: (
        verificationCode: string,
        callback: (r: Result) => void
    ) => void
    signIn: (
        email: string,
        password: string,
        callback: (r: Result) => void
    ) => void
    signOut: (callback: (r: Result) => void) => void
}

interface Result {
    isSuccessed: boolean
    message: string
}

const authContext = createContext({} as UseAuth)

export const ProvideAuth: React.FC = ({ children }) => {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}

/**
 * 通常の認証ロジック
 */
const useProvideAuth = (): UseAuth => {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        // 最初の認証確認
        Auth.currentAuthenticatedUser()
            .then(() => {
                // ログイン済みのとき
                setIsAuthenticated(true)
                setIsLoading(false)
            })
            .catch(() => {
                // 未ログインのとき
                setIsAuthenticated(false)
                setIsLoading(false)
            })
    }, [])

    const signUp = (
        email: string,
        password: string,
        callback: (r: Result) => void
    ) => {
        Auth.signUp({
            username: email,
            password: password,
        })
            .then(() => {
                setEmail(email)
                setPassword(password)
                callback({ isSuccessed: true, message: '' })
            })
            .catch(() => {
                callback({
                    isSuccessed: false,
                    message: 'failed to authenticate.',
                })
            })
    }

    const confirmSignUp = (
        verificationCode: string,
        callback: (r: Result) => void
    ) => {
        Auth.confirmSignUp(email, verificationCode)
            .then(() => {
                signIn(email, password, callback)
                setPassword('')
            })
            .catch(() => {
                setPassword('')
                callback({
                    isSuccessed: false,
                    message: 'failed to authenticate.',
                })
            })
    }

    const signIn = (
        email: string,
        password: string,
        callback: (r: Result) => void
    ) => {
        Auth.signIn(email, password)
            .then(() => {
                setEmail(email)
                setIsAuthenticated(true)
                callback({ isSuccessed: true, message: '' })
            })
            .catch(() => {
                callback({
                    isSuccessed: false,
                    message: 'failed to authenticate.',
                })
            })
    }

    const signOut = (callback: (r: Result) => void) => {
        Auth.signOut()
            .then(() => {
                setEmail('')
                setIsAuthenticated(false)
                callback({ isSuccessed: true, message: '' })
            })
            .catch(() => {
                callback({
                    isSuccessed: false,
                    message: 'failed to logout.',
                })
            })
    }

    return {
        isLoading,
        isAuthenticated,
        email,
        signUp,
        confirmSignUp,
        signIn,
        signOut,
    }
}
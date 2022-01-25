import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './use-auth'

type Props = {
    path: string;
    children: ReactNode;
}

export const PrivateRoute: React.FC<Props> = (props) => {
    const auth = useAuth()
    const location = useLocation()
    return (
        //ログインしているときは子コンポーネント、していないときはサインイン画面を表示
        auth.isAuthenticated ? (
            <div>{props.children}</div>
        ) : (
            //サインイン画面にリダイレクトして、ログイン後元の画面に戻す
            <Navigate to='/signin' state={{ from: location }} replace />
        )
    )
}
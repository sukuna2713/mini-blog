import React, { ReactNode } from 'react'
import { Route, Navigate, useLocation } from 'react-router-dom'
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
            <Route path={props.path} element={props.children} />
        ) : (
            //サインイン画面にリダイレクトして、ログイン後元の画面に戻す
            <Route path={props.path} element={
                <Navigate to='/signin' state={{ from: location }} replace />
            } />
        )
    )
}
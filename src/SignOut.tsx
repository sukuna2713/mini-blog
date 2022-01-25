import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./use-auth"

export const SignOut = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const handleClick = () => {
        auth.signOut((result) => {
            if (result.isSuccessed) {
                //トップページに遷移
                navigate('/')
            }
        })
    }
    return <Button variant='contained' color='inherit' onClick={handleClick}>サインアウト</Button>
}
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
    return <button onClick={handleClick}>サインアウト</button>
}
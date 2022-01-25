import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { useAuth } from './use-auth';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';
import { SignOut } from './SignOut';

const TopPage = () => {
  return (
    <div>
      <p>トップページ</p>
      <p>
        <Link to="/signup">新規登録</Link>
      </p>
      <p>
        <Link to="/signin">ログイン</Link>
      </p>
      <p>
        <Link to="/mypage">マイページ</Link>
      </p>
    </div>
  )
}

const MyPage = () => {
  return (
    <div>
      <p>マイページ</p>
      <SignOut />
    </div>
  )
}

const NotFoundPage = () => {
  return (
    <div>
      <p>Page Not Found</p>
    </div>
  )
}

const App = () => {
  const auth = useAuth()
  if (auth.isLoading) {
    //認証の確認中
    return <div></div>
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TopPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/mypage' element={<PrivateRoute path='/mypage'><MyPage /></PrivateRoute>} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

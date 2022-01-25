import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./use-auth";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { TextField } from "@mui/material";
import { Link } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { styled } from "@mui/material";
import { Container } from "@mui/material";
import { Copyright } from "./Copyright";

/**
 * スタイル適用済のコンポーネント達
 */
const StyledPaper = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
}))

const StyledForm = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(3)
}))

const StyledSubmit = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}))

/**
 * Emailとパスワードの入力フォーム
 */
const SignUpForm = () => {
    const auth = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //サインアップ処理
    const executeSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        auth.signUp(email, password, () => { })
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <StyledPaper>
                <StyledAvatar>
                    <LockOutlined />
                </StyledAvatar>
                <Typography component='h1' variant='h5'>
                    新規登録
                </Typography>
                <StyledForm noValidate onSubmit={executeSignUp}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required={true}
                                fullWidth
                                id="email"
                                label="メールアドレス"
                                name="email"
                                autoComplete="email"
                                placeholder="test@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required={true}
                                fullWidth
                                name="password"
                                id="password"
                                label="パスワード（8文字以上かつ英数字混合）"
                                type="password"
                                autoComplete="current-password"
                                placeholder="パスワード"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <StyledSubmit
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        新規登録
                    </StyledSubmit>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                ログインはこちら
                            </Link>
                        </Grid>
                    </Grid>
                </StyledForm>
            </StyledPaper>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
}

/**
 * 認証コード入力フォーム
 */
const ConfirmForm = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [verificationCode, setVerificationCode] = useState('')
    //認証コード確認
    const executeConfirm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        auth.confirmSignUp(verificationCode, (result) => {
            if (result.isSuccessed) {
                //ログイン成功ならばマイページに移動
                navigate('/mypage')
            }
        })
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <StyledPaper>
                <StyledAvatar>
                    <LockOutlined />
                </StyledAvatar>
                <Typography component="h1" variant="h5">
                    認証コードを入力
                </Typography>
                <StyledForm noValidate onSubmit={executeConfirm}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required={true}
                                fullWidth
                                id="code"
                                label="認証コード"
                                name="code"
                                placeholder="xxxxxx"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <StyledSubmit
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        認証
                    </StyledSubmit>
                </StyledForm>
            </StyledPaper>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
}

export const SignUp = () => {
    const auth = useAuth()
    return <>{auth.email === '' ? <SignUpForm /> : <ConfirmForm />}</>
}
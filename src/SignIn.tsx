import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./use-auth";
import { Avatar, Checkbox, FormControlLabel } from "@mui/material";
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

export const SignIn = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //サインイン処理
    const executeSignIn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        auth.signIn(email, password, (result) => {
            if (result.isSuccessed) {
                //ログイン成功ならマイページに移動
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
                    ログイン
                </Typography>
                <StyledForm noValidate onSubmit={executeSignIn}>
                    <TextField
                        variant="outlined"
                        required={true}
                        margin="normal"
                        fullWidth
                        id="email"
                        label="メールアドレス"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        placeholder="test@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="パスワード"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        placeholder="パスワード"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="次回から自動でログインする"
                    />
                    <StyledSubmit
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        ログイン
                    </StyledSubmit>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                パスワードを忘れた場合はこちら
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                新規登録はこちら
                            </Link>
                        </Grid>
                    </Grid>
                </StyledForm>
            </StyledPaper>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}
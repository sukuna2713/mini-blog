import { Link } from "@mui/material";
import { Typography } from "@mui/material";

export const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright ©'}
            <Link color="inherit" href="https://material-ui.com/">
                my Website
            </Link>
            {" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    )
}
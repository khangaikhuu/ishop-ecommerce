import {
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const LOGIN_URL = "http://localhost:8181/login";
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const FETCHED_DATA = await fetch(LOGIN_URL, options);
    const FETCHED_JSON = await FETCHED_DATA.json();

    if (FETCHED_JSON.status === "success") {
      toast("You approved to login");
      navigate("/userlist");
    } else {
      toast(FETCHED_JSON.status);
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3" sx={{ marginBottom: 3, marginTop: 10 }}>
          Login Page
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="email"
              name="email"
              type="email"
              variant="filled"
              size="small"
              label="E-mail"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              name="password"
              type="password"
              variant="filled"
              size="small"
              label="Password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" type="submit">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

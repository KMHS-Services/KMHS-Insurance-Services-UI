import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://cdn.dnaindia.com/sites/default/files/styles/full/public/2020/04/02/900335-858157-insurance-thinkstock-031318.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }, logo: {
    color: 'white', paddingLeft: '7px',
    backgroundImage: 'linear-gradient(to right,#ff0000,#0000ff)', fontFamily: 'monospace', position: 'absolute',
    textShadow: '3px 4px 7px rgba(81,67,21,0.8)', left: '20px', top: '0'
  }
}));

export default function SignInSide({ setToken, users, setSignUpToggle }) {
  const classes = useStyles();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isIncorrect, setIsIncorrect] = useState(false);
  function signIn() {
    setIsIncorrect(false);
    for (let user of users) {
      if (user.username === username && user.password === password) {
        localStorage.setItem('token', user.username);
        setToken(user.username);
        return;
      }
    }
    setIsIncorrect(true);
  }

  return (
    <Grid style={{ position: 'relative' }} container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={false} md={8} className={classes.image} />
      <Grid item xs={12} sm={12} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <h1 className={classes.logo} ><b>KMHS</b> Insurance Services</h1>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={username}
              onChange={e => { setIsIncorrect(false); setUsername(e.target.value); }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              value={password}
              onChange={e => { setIsIncorrect(false); setPassword(e.target.value); }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {isIncorrect ? <div style={{ color: "red" }}>Incorrect username or password!</div> : null}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={signIn}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <span hidden>
                  forgot password?
              </span>
              </Grid>
              <Grid item style={{ cursor: 'pointer' }}><span onClick={() => setSignUpToggle(true)}>{"Don't have an account? Sign Up"}</span></Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

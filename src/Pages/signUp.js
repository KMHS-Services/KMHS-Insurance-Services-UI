import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormControl, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({ setSignUpToggle, setUsers, users }) {
  const classes = useStyles();
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  function signUp(e) {
    e.preventDefault();
    console.log(username, password, confirmPassword);

    if (username.length > 20) {
      alert('length of username must be between 1 and 20');
      return;
    }
    for(let user of users){
      if(user.username===username){
        alert('username already taken')
        return
      }
    }
    if (name.length > 20) {
      alert('length of name must be between 1 and 20');
      return;
    }
    if (password.length < 8) {
      alert('length of password must be atleast 8');
      return;
    } if (password !== confirmPassword) {
      alert('password must match the confirm password field');
      return;
    } if (`${phoneNo}`.length!==10) {
      alert('phone number must be of length 10');
      return;
    }
    console.log([...users, { username, password, name, email, phoneNo }]);
    setUsers([...users, { username, password, name, email, phoneNo }]);
    localStorage.setItem('users',JSON.stringify([...users, { username, password, name, email, phoneNo }]))
    alert('user added successfully!');
    setSignUpToggle(false);
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={signUp}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={username}
                onChange={e => setUsername(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={e => setEmail(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={e => setPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="confirm-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <TextField
                  value={phoneNo}
                  onChange={e => setPhoneNo(e.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  name="phonenumber"
                  label="Phone Number"
                  type="number"
                  id="phonenumber"
                  autoComplete="phonenumber"
                />
              </Grid>

            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item style={{ cursor: 'pointer' }}>
              <span onClick={() => setSignUpToggle(false)} >
                {"Already have an account? Sign in"}
              </span>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

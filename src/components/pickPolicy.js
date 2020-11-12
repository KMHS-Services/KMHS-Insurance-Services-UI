import React, { useEffect, useState } from "react";
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
import axios from '../assets/AxiosInstance'
import { InputLabel, MenuItem, Select } from "@material-ui/core";

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

export default function PickPolicy({ setToken, users, setSignUpToggle }) {
  const classes = useStyles();
  const [policy, setPolicy] = React.useState('');
  const [data,setData] = React.useState();

  useEffect(()=>{
    axios.get('/api/policy/pickpolicy')
    .then((res)=>{
      localStorage.setItem('token', res.data);
      setData(res.data);
  })
  },[])

  const handleChangePolicy = (event) => {
    setPolicy(event.target.value);
  };
  const [admin, setAdmin] = React.useState('');

  const handleChangeAdmin = (event) => {
    setPolicy(event.target.value);
  };
  const [username, setUsername] = React.useState(localStorage.getItem('username'));
  
  const [isIncorrect, setIsIncorrect] = useState(false);
  function signIn() {
    setIsIncorrect(false);
    axios.get('/api/policy/pickpolicy')
    .then((res)=>{
        localStorage.setItem('token', res.data);
        setToken(res.data.token);
    }).catch(err=>{
      if(err.response&&err.response.status===401){
        setIsIncorrect(true)
      }
    })
    setIsIncorrect(true);
  }

  return (
    
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Pick Policy
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={username}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              disabled
            />
            <br/>
        <br/>
        
        <Select
          displayEmpty
          value={policy}
          onChange={handleChangePolicy}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Pick Policy</em>;
            }
            return selected.join(', ');
          }}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Select a Policy</em>
          </MenuItem>
          {data.policies.map((q)=>{
            return <MenuItem value={q}>{q}</MenuItem>
          })}
        </Select>
        <br/>
        <br/>

        <Select
          displayEmpty
          value={admin}
          onChange={handleChangeAdmin}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select Admin</em>;
            }
            return selected.join(', ');
          }}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Select Admin</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
            
            <Button
              onClick={signIn}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Proceed
            </Button>
          </form>
        </div>
  );
}

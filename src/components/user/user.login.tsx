import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {fbconfig}  from '../../firebasekeys'

import { Link as mlink } from 'react-router-dom';


import "@react-firebase/auth"
import firebase from 'firebase';
// import {} from '@react-firebase/auth'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  gbuttom: {
    margin: theme.spacing(0, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [logininfo, setlogininfo] = useState({username: '', password: ''})

 function inputChanged(event: any) {
    setlogininfo({...logininfo, [event.target.name]: event.target.value})
  }

  function doLogin() {
    var config: any = fbconfig;
    if(!firebase.apps[0]) {
       firebase.initializeApp(config);
    }
    firebase.auth().onAuthStateChanged(() => {});
    firebase.auth().signInWithEmailAndPassword(logininfo.username, logininfo.password)
        .then(r => {
          localStorage.setItem('user', JSON.stringify(r));
          return r;
        })
        .then(r => (r.user?.getIdToken()
        .then(r => localStorage.setItem('token', r))));
  }

  function googleLogin() {
    var config = fbconfig;
    if(!firebase.apps[0]) {
       firebase.initializeApp(config);
    }
    firebase.auth().onAuthStateChanged(() => {});

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      
          var credential = result.credential as firebase.auth.OAuthCredential;
          console.log(credential, '======================== credential =====================');
          
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential?.accessToken;
          console.log(token, '================== accessToken ===============');

          var idtoken = credential?.idToken;
          console.log(idtoken, '================== idtoken ===============');

          // The signed-in user info.
          var user = result.user;
          console.log(user, '================== User ===============');
          
          localStorage.setItem('user', JSON.stringify(user));
          // ...
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          console.log(errorCode);
          
          var errorMessage = error.message;
          console.log(errorMessage);
          
          // The email of the user's account used.
          var email = error.email;
          console.log(email);
          
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(credential);
          
          // ...
    });;

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="username"
            autoFocus
            onChange={inputChanged}
            value={logininfo.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={inputChanged}
            value={logininfo.password}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={doLogin}
          >
            Sign In
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="default"
            className={classes.gbuttom}
            onClick={googleLogin}
          >
            Sign In with Google
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={mlink} to='/register' variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

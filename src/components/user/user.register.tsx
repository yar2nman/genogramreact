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
import firebase from 'firebase';
import {fbconfig} from '../../firebasekeys'

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpController() {
  const classes = useStyles();
  const [registerinfo, setRegisterinfo] = useState({
                    displayName: '',   
                    phoneNumber: '',
                    photoURL: '',
                    email: '',
                    password: ''
            })
    
    const [formValid, setFormValid] = useState(false);

  function inputChanged(event: any) {
    setRegisterinfo({...registerinfo, [event.target.name]: event.target.value});

    if (registerinfo.displayName.length > 0 && registerinfo.email.length > 0
        && registerinfo.password.length > 0 && registerinfo.phoneNumber.length > 0) {
        
            setFormValid(true);
    } else {
        setFormValid(false);
    }

    
  }

  function registerUser() {
      console.log(registerinfo);

      var config = fbconfig;
      if(!firebase.apps[0]) {
         firebase.initializeApp(config);
      }
      firebase.auth().createUserWithEmailAndPassword(registerinfo.email, registerinfo.password)
                .then(r => {
                    var user = r;
                    user.user?.updateProfile({displayName: registerinfo.displayName, photoURL: registerinfo.photoURL});
                })
                .catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode === 'auth/weak-password') {
                        alert('The password is too weak.');
                        } else {
                        alert(errorMessage);
                        }
                        console.log(error);
                });

      setRegisterinfo({
                    displayName: '',   
                    phoneNumber: '',
                    photoURL: '',
                    email: '',
                    password: ''
                });
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
        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                name="displayName"
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="Display Name"
                autoFocus
                onChange={inputChanged}
                value={registerinfo.displayName}
              ></TextField>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="phoneNumber"
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                autoFocus
                onChange={inputChanged}
                value={registerinfo.phoneNumber}
              ></TextField>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="photoURL"
                label="Photo URL"
                name="photoURL"
                onChange={inputChanged}
                value={registerinfo.photoURL}
              ></TextField>
            </Grid>
                       
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                autoComplete="off"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={inputChanged}
                value={registerinfo.email}
              ></TextField>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                autoComplete="new-password"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={inputChanged}
                value={registerinfo.password}
              ></TextField>
            </Grid>
            
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={registerUser}
            disabled={!formValid}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
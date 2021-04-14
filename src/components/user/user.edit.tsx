import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserRecord } from './user';
const UserEditComponent = () => {

    let { uid } = useParams<{uid: string}>();
    const [user, setUser] = useState<UserRecord>();
    const [refresh, setrefresh] = useState(true);

    const [userData, setUserData] = useState<any>({
        disabled: false,
        displayName: '',
        email: '',
        emailVerified: false,
        photoURL: '',
        phoneNumber: ''
    });
    const [FormValid, SetFormValid] = useState(false);

    useEffect(() => {
        if (refresh) {
            fetch(`http://localhost:8000/api/user/id/${uid}` )
                    .then(response => response.json())
                    .then(r => {
                        setrefresh(false)
                        setUser(r);
                        setUserData({...userData, displayName: r.displayName, 
                            emailVerified: r.emailVerified, 
                            photoURL: r.photoURL, disabled: r.disabled,
                            email: r.email, phoneNumber: r.phoneNumber});
                        console.log(r);
                    });
           }
        return () => {
            
        }
    }, [user, refresh, uid, userData])

   
    function inputChanged (event: React.ChangeEvent<HTMLInputElement>) {
        const value: string | boolean =
            event.target.type === "checkbox" ? event.target.checked : event.target.value;

        setUserData({...userData, [event.target.name]: value});

    if (userData.displayName?.length > 0 
        && userData.photoURL?.length > 0) {
        
            SetFormValid(true);
    } else {
        SetFormValid(false);
    }

    }

    function updateUser() {
        console.log(userData, 'before fitch');
        
        fetch(`http://localhost:8000/api/user/${uid}`, 
        {
        method: "PATCH", 
        headers: {"Content-Type": "application/json"},  
        body: JSON.stringify(userData)})
            .then(r => console.log(r))
            .catch(error => console.log(error));
    }

    
    return (
    <div>
        <form noValidate autoComplete="off">
            <Typography variant="h6" gutterBottom>
                    Update User Data
            </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
                            id="displayName"
                            name="displayName"
                            label="Display Name"
                            placeholder="Display Name"
                            fullWidth
                            value={userData?.displayName}
                            onChange={inputChanged}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
                            id="photoURL"
                            name="photoURL"
                            label="Photo URL"
                            placeholder="Photo URL"
                            fullWidth
                            value={userData?.photoURL}
                            onChange={inputChanged}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            placeholder="Email"
                            fullWidth
                            value={userData?.email}
                            onChange={inputChanged}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone No"
                            placeholder="Phone No"
                            fullWidth
                            value={userData?.phoneNumber}
                            onChange={inputChanged}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="disabled" checked={userData?.disabled} onChange={inputChanged} />}
                            label="Is the user Disabled"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="emailVerified" checked={userData?.emailVerified} onChange={inputChanged} />}
                            label="Is the user email verified"
                        />
                    </Grid>

                    <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={updateUser}
                            disabled={!FormValid}
                        >
                            Update User
                    </Button>
                </Grid>
            </form>
        </div>

    )
}


export default UserEditComponent
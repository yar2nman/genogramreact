// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserRecord } from './user';


const UserCustomClaimsComponent = () => {

    let { uid } = useParams<{uid: string}>();
    const [user, setUser] = useState<UserRecord>();
    const [refresh, setrefresh] = useState(true);

    const [userData, setUserData] = useState<any>({});
    const [FormValid, SetFormValid] = useState(false);

    const [claim, setClaim] = useState({key: '', value: ''});
    const [role, setRole] = useState('')
    console.log(FormValid);
    

    useEffect(() => {
        if (refresh) {
            fetch(`http://localhost:8000/api/user/id/${uid}` )
                    .then(response => response.json())
                    .then(r => {
                        setrefresh(false)
                        setUser(r);
                        setUserData({...r.customClaims});
                        console.log(r.customClaims);
                    });
           }
        return () => {
            
        }
    }, [user, refresh, uid, userData])

   
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    function claims() {
        let result = [];
        for (const key in userData) {
            if (Object.prototype.hasOwnProperty.call(userData, key)) {
                result.push(key);

                
            }
        }
        return result.length > 0 ? result.map(r => {
            return (<Grid container spacing={3} key={r}>
                        <Grid item sm={3}>{r}</Grid>
                        <Grid item sm={3}>{userData[r]}</Grid>
                        <Grid item sm={3}>
                            <Button onClick={() => removeClaim(r)}>X</Button>
                        </Grid>
                    </Grid>)
        }) : <div>No custom claims</div>;
    }

    function removeClaim(delkey: string) {
        console.log('claim to delete', delkey);
        let newObj: any = {};
        let newUserClaims = new Map<string, string>();
        for (const key in userData) {
                const element = userData[key];
                if (key !== delkey) {
                    newUserClaims.set(key, element);
                    console.log(newUserClaims);
                }
        }
        newUserClaims.forEach((v, k) => {
            console.log(k, '======>' , v);
            newObj[k] = v;
        } )

        console.log(newObj, '====== new object');
        

        setUserData(newObj);
    }


    function doAddClaim() {
        let nv = {...userData};
        nv[claim.key] = claim.value
        setUserData(nv);

        setClaim({key: '', value: ''});
    }

    function doAddRole() {
       let roles: string = userData['role'];
       if (roles?.length > 0) {
        console.log(roles);
       
        roles = roles.replace(']', `, '${role}']`);
 
 
        setRole('');
 
        let nv = userData;
        nv['role'] = roles;
        setUserData(nv);
       } else {
           let roles= "";
           roles = `"['${role}']"`
           setRole('');

           let nv = userData;
            nv['role'] = roles.toString();
            setUserData(nv);
       }
       
    }

    function doSaveCustomClaims() {
        console.log(userData, 'before fitch');
        
        fetch(`http://localhost:8000/api/user/${uid}/customclaim`, 
        {
        method: "POST", 
        headers: {"Content-Type": "application/json"},  
        body: JSON.stringify(userData)})
            .then(r => console.log(r))
            .then(r => alert('Saved'))
            .catch(error => console.log(error));

    }

    
    return (
    <div>
            <Typography variant="h6" gutterBottom>
                    Update custom claims
            </Typography>
            <div>
                {
                   claims()
                }
            </div>

            <Grid container spacing={3} alignContent="flex-start" alignItems="center">
                <Grid item xs={12} sm={4}>
                    <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="claim"
                    name="claim"
                    label="Claim Key"
                    value={claim.key}
                    onChange={(event) => setClaim({...claim, key: event?.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="claimval"
                    name="claimval"
                    label="Claim Value"
                    value={claim.value}
                    onChange={(event) => setClaim({...claim, value: event?.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={4} >
                    <Button onClick={doAddClaim}>Add Claim</Button>
                </Grid>

            </Grid>

            <Grid container spacing={3} alignContent="flex-end" alignItems="center">
            <Grid item xs={12} sm={4}>
                    <TextField
                    required
                    fullWidth
                    variant="outlined"
                    id="claimval"
                    name="claimval"
                    label="Role"
                    value={role}
                    onChange={(event) => setRole(event?.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={4} >
                    <Button onClick={doAddRole}>Add Role</Button>
                </Grid>
            </Grid>

            <Grid container spacing={3} alignContent="flex-end" alignItems="center">
                <Grid item xs={12} sm={4} >
                    <Button onClick={doSaveCustomClaims}>Save</Button>
                </Grid>
            </Grid>
        </div>

    )
}


export default UserCustomClaimsComponent
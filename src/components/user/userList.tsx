import { Button, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import UserController, {UserRecord} from './user'



export const UserList = () => {
        
    const [state, setstate] = useState<IstatteType>({
        isFetching: false,
        useres: []
    });

    const [refresh, setRefresh] = useState(true);

    let mhistory = useHistory();

    useEffect(() => {
        if (refresh === false) return;
        setRefresh(false)
        setstate({...state, isFetching: true, useres: []});
        fetch('http://localhost:8000/api/user')
            .then(response => response.json())
            .then((result: UserRecord[]) => {
                console.log('data refreshed', result);
                setstate({...state, useres: result, isFetching: false});
                console.log(state);
                
            })
            .catch(e => {
                console.log(e);
                setstate({...state, isFetching: false});
            });
        

        return () => {
            // cleanup
        }
    }, [refresh, state])

    function gotoadd() {
       mhistory.push('/register')
    }
   

   function deleteUser(uid:string) {
       console.log(uid);
       fetch(`http://localhost:8000/api/user/${uid}`, {
        method: 'DELETE',
    })
    .then(r => {
        setRefresh(true);
    })
    .catch((error) => {
        setRefresh(true);
    })   
   };
        
    return (<div>
                <h3>User List</h3>

                <Grid container spacing={3}>
                    <Grid item xs={2}><Button variant="outlined" size="medium" color="primary" onClick={() => setRefresh(true)}>refresh</Button></Grid>
                    <Grid item xs={2}><Button variant="outlined" size="medium" color="primary" onClick={gotoadd}>add user</Button></Grid>
                </Grid>
                
                <Grid container spacing={2}>
                 {
                    state.useres.map(user => <UserController user={user} key={user.uid} deleteUser={() => deleteUser(user.uid)} />)
                }
                </Grid>
               
            </div>);
}


export interface IstatteType {
    isFetching: boolean,
    useres: UserRecord[]
}

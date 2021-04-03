import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import UserController, {UserRecord} from '../user/user'



export const UserList = (props: { users: UserRecord[]; load: boolean; }) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let loadusers = true;

    
    

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, setstate] = useState<IstatteType>({
        isFetching: false,
        useres: [],
        loadusers: false
        // useres: JSON.parse(localStorage.getItem('users') || '')
    });

    const forceUpdate = React.useCallback(() => setstate({...state}), [state]);
    

    useEffect(() => {
        setstate({...state, isFetching: true});
        fetch('http://localhost:8000/api/user')
            .then(response => response.json())
            .then((result: UserRecord[]) => {
                console.log(result);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadusers, state.loadusers])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

   

   function delUser(uid:string) {
       console.log(uid);
       fetch(`http://localhost:8000/api/user/${uid}`, {
        method: 'DELETE',
    })
    .then(r => {
        console.log(r);
        forceUpdate();
    })
    .catch((error) => {
        console.log(error);
        forceUpdate();
    })   
   };
    
    console.log('Before rendering', state.useres);
    
    return (<div>
                <h3>User List</h3>
                <button onClick={forceUpdate}>refresh</button>
                <Grid container spacing={2}>
                 {
                    state.useres.map(user => <UserController user={user} key={user.uid} delUser={() => delUser(user.uid)} />)
                }
                </Grid>
               
            </div>);
}


export interface IstatteType {
    isFetching: boolean,
    useres: UserRecord[],
    loadusers: boolean

}

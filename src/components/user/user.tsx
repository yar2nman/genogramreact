import React from 'react'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
// import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from 'react-router-dom';


const UserController = (props: {user: UserRecord; deleteUser: any}) => {
    const classes = useStyles();
    const {user, deleteUser} = props;
    let mhistory = useHistory();


    const goEdit = (uid: string) => {
      mhistory.push('/edituser/' + uid)
    }
    const goCustomClaims = (uid: string) => {
      mhistory.push('/userclaims/' + uid)
    }
    return <div>{
        
        <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={user.photoURL || 'https://lh3.googleusercontent.com/a-/AOh14GiTtFFjjczNngetqO8FaD9dDSduWum1RvKXfuOvXr4=s96-c'}
            title="User"
          />
          <CardContent>
            <p>
              {user.email}
            </p>
            <Typography variant="body2" color="textSecondary" component="p">
             Name: {user.displayName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
             Phone: {user.phoneNumber}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
            <Button variant="outlined" size="small" color="primary" onClick={() => goEdit(user.uid)}>
              Edit
            </Button>
          <Button variant="outlined" size="small" color="primary" onClick={() => goCustomClaims(user.uid)}>
            Custom Claims
          </Button>
          <Button variant="outlined" size="small" color="secondary" onClick={deleteUser}>
            Delete
          </Button>
        </CardActions>
      </Card>
    }</div>
}

const useStyles = makeStyles({
    root: {
        margin: 5,
      maxWidth: 600,
      minWidth: 400,
    },
    // media: {
    //   height: 140,
    // },
    media: {
        margin: "5px",
        width: 150,
        height: 140,
        objectFit: 'scale-down',
        borderRadius: "4px",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
        position: "relative",
        zIndex: 1000    },
  });

export default UserController


export interface UserRecord {
    /**
     * The user's `uid`.
     */
    uid: string;
    /**
     * The user's primary email, if set.
     */
    email?: string;
    /**
     * Whether or not the user's primary email is verified.
     */
    emailVerified: boolean;
    /**
     * The user's display name.
     */
    displayName?: string;
    /**
     * The user's primary phone number, if set.
     */
    phoneNumber?: string;
    /**
     * The user's photo URL.
     */
    photoURL?: string;
    /**
     * Whether or not the user is disabled: `true` for disabled; `false` for
     * enabled.
     */
    disabled: boolean;
    /**
     * Additional metadata about the user.
     */
    metadata: any;
    /**
     * An array of providers (for example, Google, Facebook) linked to the user.
     */
    providerData: any[];
    /**
     * The user's hashed password (base64-encoded), only if Firebase Auth hashing
     * algorithm (SCRYPT) is used. If a different hashing algorithm had been used
     * when uploading this user, as is typical when migrating from another Auth
     * system, this will be an empty string. If no password is set, this is
     * null. This is only available when the user is obtained from
     * {@link auth.Auth.listUsers `listUsers()`}.
     *
     */
    passwordHash?: string;
    /**
     * The user's password salt (base64-encoded), only if Firebase Auth hashing
     * algorithm (SCRYPT) is used. If a different hashing algorithm had been used to
     * upload this user, typical when migrating from another Auth system, this will
     * be an empty string. If no password is set, this is null. This is only
     * available when the user is obtained from
     * {@link auth.Auth.listUsers `listUsers()`}.
     *
     */
    passwordSalt?: string;
    /**
     * The user's custom claims object if available, typically used to define
     * user roles and propagated to an authenticated user's ID token.
     * This is set via
     * {@link auth.Auth.setCustomUserClaims `setCustomUserClaims()`}
     */
    customClaims?: {
        [key: string]: any | null;
    };
    /**
     * The date the user's tokens are valid after, formatted as a UTC string.
     * This is updated every time the user's refresh token are revoked either
     * from the {@link auth.Auth.revokeRefreshTokens `revokeRefreshTokens()`}
     * API or from the Firebase Auth backend on big account changes (password
     * resets, password or email updates, etc).
     */
    tokensValidAfterTime?: string;
    /**
     * The ID of the tenant the user belongs to, if available.
     */
    tenantId?: string | null;
    /**
     * The multi-factor related properties for the current user, if available.
     */
    multiFactor?: any;
    /**
     * @return A JSON-serializable representation of this object.
     */
    toJSON(): object;
}



import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import firebaseConfig from './firebaseConfig';

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const Login = () => {

    const [newUser,setNewUser] =useState(false)
    const [user,setUser]=useState({success:false, newUser:false})
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const [loggedUser,setLoggedUser]=useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const handleBlur =(e)=>{
        let validFlield =  true;
        if(e.target.name === 'email'){
          const validFlield = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password'){
           const validFlield =  e.target.value.length> 5 && /(?=.*[0-9])(?=.*[a-z])(?=.*[@#$%^&+=])/.test(e.target.value);
        }
        if (validFlield) {
            const newUser = {...user};
            newUser[e.target.name]= e.target.value;
            setUser(newUser);
        }
    }

    const updateUserInfo = (fName, Lname)=>{
        const user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: fName+" "+Lname,
        })
        .then(()=> {
            console.log('user name updated');
        })
        .catch((error)=> {
            console.log(error);
        });
    }

    const signUp = (e) => {
        e.preventDefault();
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUser = {...user};
                newUser.message = '';
                newUser.success = true;
                setUser(newUser);
                updateUserInfo(user.firstName,user.lastName)
            })
            .catch(error => {
                const newUser = {...user};
                newUser.message = error.message;
                newUser.success = false;
                setUser(newUser); 
               });
        }
        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                const newUser = {...user};
                newUser.message = '';
                newUser.success = true;
                setUser(newUser);
                setLoggedUser(newUser);
                history.replace(from);
            })
            .catch((error) => {
                const newUser = {...user};
                newUser.message = error.message;
                newUser.success = false;
                setUser(newUser);  
            });
        }
        
    }

    const facebookSignIn =()=>{
        firebase.auth().signInWithPopup(facebookProvider)
        .then((result) => {
            const user = result.user;
            console.log('fb user', user);
        })
        .catch((error) => {
            const errorMessage = error.message;
            const email = error.email;
            console.log(errorMessage,email);
        });
    }

    return (
        <div style={{textAlign: "center"}}>
            <form onSubmit={signUp}>
                {
                    newUser && <><input type="text" onBlur={handleBlur} name ='firstName' placeholder='Enter first name' required/>
                    <br/>
                    <input type="text" onBlur={handleBlur} name ='lastName' placeholder='Enter last name' required/></>
                }
                <br/>
                <input type="text" onBlur={handleBlur} name ='email' placeholder='Enter email' required/>
                <br/>
                <input type="password" onBlur={handleBlur} name="password" placeholder='Enter password' required/>
                <br/>
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
            </form>
            <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" />
            <label htmlFor="newUser">New user sign up</label>
            {
                user.success?<p style={{color: 'green'}}>Successfully {newUser?'signed up':'logged in'}</p>: <p style={{color:'red'}}>{user.message}</p>
            }
            <br/>
            <button onClick={facebookSignIn}>Sign in with Facebook</button>
        </div>
    );
};

export default Login;
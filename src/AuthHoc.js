import { jwtDecode } from 'jwt-decode';
import React , {useEffect, useState}from 'react'
import Login from './Components/Login/Login';

const AuthHoc = (Component) => {
    return function WithHooks(props){
        const [login, setlogin] = useState(false);
        useEffect(() => {
            if(localStorage.getItem('user')){
                console.log(jwtDecode(localStorage.getItem('user').accessToken).email);
                setlogin(jwtDecode(localStorage.getItem('user').accessToken).email ? true : false)
            }
        }, [])
        return(
            login ? <Component /> : <Login />
        )
        
    }
}

export default AuthHoc
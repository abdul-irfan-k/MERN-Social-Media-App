import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { LoginWithGoogle } from '../../../State/UserAction/UserAction'


const Googleauthentication = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const googleSuccess = async (res) => { dispatch(LoginWithGoogle(res.credential, navigate)) }
    const googleFailure = (error) => console.log(error)
    return (
        <div>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                    onSuccess={googleSuccess}
                    onError={googleFailure}
                />;
            </GoogleOAuthProvider>;
        </div>
    )
}

export default Googleauthentication

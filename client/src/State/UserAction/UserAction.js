import jwt_decode from 'jwt-decode'
import { signUpRequest, LoginRequest, editUserRequest, sendOtpRequest, logoutRequest, deleteUserRequest, resetPasswordWithOtpRequest, resetPasswordRequest } from '../../Api/Api'
import { loginUser, logoutUser, editUser } from '../Reducer/UserReducer'


export const LoginWithGoogle = (token, navigate) => async (dispatch) => {
  const userDetails = jwt_decode(token)
  dispatch(loginUser({ data: { userDetails: { name: userDetails.name, email: userDetails.email, _id: userDetails.sub }, token } }))
  navigate('/')
}

export const signup = (userDetail, navigate) => async (dispatch) => {
  const { data } = await signUpRequest(userDetail)
  const { user, isValid } = data

  console.log(data)
  if (isValid) {
    dispatch(loginUser({ data: { userDetails: { name: user.name, email: user.email, _id: user._id }, expireAt: new Date(Date.now() + (60000 * 60 * 24)).getTime() } }))
    navigate('/')
  }
}

export const login = (userdetail, navigation) => async (dispatch) => {
  const { data } = await LoginRequest(userdetail)
  const { user, isValid } = data

  if (isValid) {
    dispatch(loginUser({ data: { userDetails: { name: user.name, email: user.email, _id: user._id }, expireAt: new Date(Date.now() + (60000 * 60 * 24)).getTime() } }))
    navigation('/')
  }
}

export const Logout = (navigate) => async (dispatch) => {
  await logoutRequest()
  dispatch(logoutUser())
  navigate('/')
}

export const editUserFunc = (details, navigate) => async (dispatch) => {
  const { data } = await editUserRequest(details)
  dispatch(editUser(data))
  navigate('/')
}

export const deleteUserFunc = (navigate) => async (dispatch) => {
  await deleteUserRequest()
  navigate('/')
  dispatch(logoutUser())
}


export const requestOtpFunc = async (email) => {
  const { data } = await sendOtpRequest(email)
  return data
}

export const resetPasswordFunc = async (passwordDetail, navigate) => {
  const { data } = await resetPasswordRequest(passwordDetail)
  console.log(data)
  if (data.isPasswordUpdated) navigate('/')
}


export const resetPasswordWithOtpFunc = async (passwordDetail, navigate) => {
  const { data } = await resetPasswordWithOtpRequest(passwordDetail)
  console.log(data)
  if (data.isPasswordUpdated) navigate('/')
}
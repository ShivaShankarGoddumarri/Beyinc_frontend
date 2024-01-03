/* eslint-disable camelcase */
/* eslint-disable max-len */
import {createSlice} from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export const apiCallSlice = createSlice(
    {
      name: 'apiCall',
      initialState: {
        loginDetails: {},

        ToastDetails: {
            message: '',
            bgColor: '',
            visibile: 'no'
        }
      },
      reducers: {
        setLoginData: (state, action) => {
          state.loginDetails = action.payload;
        },
        setToast: (state, action) => {
            state.ToastDetails = action.payload;
          },
    }
    });


export  const apicallloginDetails = () => async(dispatch) => {
  if(localStorage.getItem('user')){
    console.log()
    dispatch(setLoginData(jwtDecode(JSON.parse(localStorage.getItem('user')).accessToken)))
  }
}

export const {setLoginData, setToast} = apiCallSlice.actions;

// this is for configureStore
export default apiCallSlice.reducer;

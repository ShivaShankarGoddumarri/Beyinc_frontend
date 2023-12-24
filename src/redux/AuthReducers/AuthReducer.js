/* eslint-disable camelcase */
/* eslint-disable max-len */
import {createSlice} from '@reduxjs/toolkit';

export const apiCallSlice = createSlice(
    {
      name: 'apiCall',
      initialState: {
        loginDetails: [],
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

// export const getSummaryMetricsData_API = () => async (dispatch) => {
//   try {
//     const response = await axiosInstance.get('/home/getKPIData').then((resp) => resp);
//     dispatch(callSummaryMetricsDataAPI(response.data));
//   } catch (err) {
//     throw new Error(err);
//   }
// };


export const {setLoginData, setToast} = apiCallSlice.actions;

// this is for configureStore
export default apiCallSlice.reducer;

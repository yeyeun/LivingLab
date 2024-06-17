// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { getPartUsers } from '../api/partApi';

// export const getPartUsersAsync = createAsyncThunk('getPartUsersAsync', () => {
//   return getPartUsers();
// });

// export const postAddPartAsync = createAsyncThunk('postAddPartAsync', (param) => {
//   return postAddPartAsync(param);
// });

// const initState = [];

// const partSlice = createSlice({
//   name: 'partSlice',
//   initialState: initState,

//   extraReducers: (builder) => {
//     builder
//       .addCase(getPartUsersAsync.fulfilled, (state, action) => {
//         console.log('getPartUsersAsync.fulfilled');
//         console.log(action.payload);
//         return action.payload;
//       })
//       .addCase(postAddPartAsync.fulfilled, (state, action) => {
//         console.log('postAddPartAsync.fullfilled');
//         return action.payload;
//       });
//   },
// });

// export default partSlice.reducer;

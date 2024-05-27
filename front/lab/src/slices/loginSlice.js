import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginPost } from '../api/memberApi';

const initState = {
  email: '',
};

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) =>
  loginPost(param)
);

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: initState,
  reducers: {
    login: (state, action) => {
      console.log('login............', action);
      console.log(action.payload);
      return { email: action.payload.email }; //새로운 상태
    },
    logout: () => {
      console.log('logout...........');

      return { ...initState }; // 초기 상태 (빈 문자열)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log('fulfilled');

        const payload = action.payload;

        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log('rejected');
      });
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;

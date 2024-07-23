import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: null,
		firstname: null,
		lastname: null,
	},
	reducers: {
		addConnection: (state, action) => {
			state.token = action.payload.token;
			state.firstname = action.payload.firstName;
			state.lastname = action.payload.lastName;
		},
	},
});

export const { addConnection } = authSlice.actions;

export const store = configureStore({
	reducer: {
		Auth: authSlice.reducer,
	},
});

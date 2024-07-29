import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: null,
		id: null,
		email: null,
		firstname: null,
		lastname: null,
	},
	reducers: {
		addToken: (state, action) => {
			state.token = action.payload.token;
		},
		addIdentity: (state, action) => {
			state.firstname = action.payload.firstname;
			state.lastname = action.payload.lastname;
		},
		addProfileUser: (state, action) => {
			state.id = action.payload.id;
			state.email = action.payload.email;
		},
		delConnection: (state) => {
			state.token = null;
			state.id = null;
			state.email = null;
			state.firstname = null;
			state.lastname = null;
		},
	},
});

export const { addToken, addIdentity, addProfileUser, delConnection } = authSlice.actions;

export const store = configureStore({
	reducer: {
		Auth: authSlice.reducer,
	},
});

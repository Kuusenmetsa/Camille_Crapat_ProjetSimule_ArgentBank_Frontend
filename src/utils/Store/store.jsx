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
		addConnection: (state, action) => {
			state.token = action.payload.token;
			state.firstname = action.payload.firstname;
			state.lastname = action.payload.lastname;
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

export const { addConnection, delConnection } = authSlice.actions;

export const store = configureStore({
	reducer: {
		Auth: authSlice.reducer,
	},
});

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	form: {
		guruId: '',
		pelajaranId: '',
		guruMengajar: [],
		kelasId: [],
		pelajaranKelasId: [],
	},
};

const agendaSlice = createSlice({
	name: 'agenda',
	initialState,
	reducers: {
		setForm: (state, action) => {
			state.form = { ...state.form, [action.payload.type]: action.payload.data };
		},
		resetForm: (state, action) => {
			state.form = initialState.form;
		},
	},
});

export const { setForm, resetForm } = agendaSlice.actions;

export default agendaSlice.reducer;

// export const selectCurrentToken = (state) => state.auth.token;

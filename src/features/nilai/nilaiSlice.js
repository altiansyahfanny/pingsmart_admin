import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	filter: {
		selectedJurusan: {},
		selectedMKelas: {},
		selectedKelas: {},
		selectedPelajaranKelas: {},
		selectedPelajaran: {},
		selectedMKelasByJurusan: [],
		selectedKelasByMKelasAndJurusan: [],
		selectedPelajaranKelasByKelasAndMKelasAndJurusan: [],
		isReset: true,
		isFilter: false,
	},
};

const nilaiSlice = createSlice({
	name: 'agenda',
	initialState,
	reducers: {
		setFilter: (state, action) => {
			state.filter = { ...state.filter, [action.payload.type]: action.payload.data };
		},
		resetFilter: (state, action) => {
			state.filter = initialState.filter;
		},
		resetMkelasAndKelasAndPelajaran: (state, action) => {
			if (action.payload.type === 'JURUSAN') {
				state.filter = {
					...state.filter,
					selectedMKelas: {},
					selectedMKelasByJurusan: {},
					selectedKelas: {},
					selectedKelasByMKelasAndJurusan: {},
					selectedPelajaran: {},
					selectedPelajaranKelasByKelasAndMKelasAndJurusan: {},
				};
			}

			if (action.payload.type === 'MKELAS') {
				state.filter = {
					...state.filter,
					selectedKelas: {},
					selectedKelasByMKelasAndJurusan: {},
					selectedPelajaran: {},
					selectedPelajaranKelasByKelasAndMKelasAndJurusan: {},
				};
			}

			if (action.payload.type === 'KELAS') {
				state.filter = {
					...state.filter,
					selectedPelajaranKelas: {},
					selectedPelajaran: {},
					selectedPelajaranKelasByKelasAndMKelasAndJurusan: {},
				};
			}

			if (action.payload.type === 'ALL') {
				state.filter = initialState.filter;
			}
		},
	},
});

export const { setFilter, resetFilter, resetMkelasAndKelasAndPelajaran } = nilaiSlice.actions;

export const selectFilter = (state) => state.nilai.filter;

export default nilaiSlice.reducer;

// export const selectCurrentToken = (state) => state.auth.token;

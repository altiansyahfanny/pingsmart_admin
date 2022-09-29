import { apiSlice } from '../../app/api/apiSlice';

export const pelajaranApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPelajaran: builder.query({
			query: (page = 1, per_page = 100, keyword = '') =>
				`/pelajaran?page=${page}&perPage=${per_page}&keyword=${keyword}`,
			transformResponse: (responseData) => {
				const loadedPelajaran = responseData.data.map((data) => {
					return data;
				});
				return loadedPelajaran;
			},
			providesTags: ['Pelajaran'],
		}),
	}),
});

export const { useGetPelajaranQuery } = pelajaranApiSlice;

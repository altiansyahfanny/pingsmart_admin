import { apiSlice } from '../../app/api/apiSlice';

export const jurusanApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getJurusan: builder.query({
			query: (params) => ({
				url: `/jurusan?page=${params.page}&perPage=${params.per_page}&keyword=${params.search}`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			transformResponse: (responseData) => {
				const loadedJurusan = responseData.data.map((data) => {
					return data;
				});
				return loadedJurusan;
			},
			providesTags: ['Jurusan'],
		}),
	}),
});

export const { useGetJurusanQuery } = jurusanApiSlice;

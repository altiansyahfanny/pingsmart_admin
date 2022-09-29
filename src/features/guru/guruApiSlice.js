import { apiSlice } from '../../app/api/apiSlice';

export const guruApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getGuru: builder.query({
			query: (params) => ({
				url: `/guru?page=${params.page}&perPage=${params.per_page}&keyword=${params.search}&filter=${params.filter}`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			transformResponse: (responseData) => {
				const loadedGuru = responseData.data.map((data) => {
					return data;
				});
				return loadedGuru;
			},
			providesTags: ['Guru'],
		}),
		fetchAllGuru: builder.query({
			query: () => `/guru/fetch`,
			transformResponse: (responseData) => {
				const loadedGuru = responseData.data.map((data) => {
					return data;
				});
				return loadedGuru;
			},
		}),
	}),
});

export const { useGetGuruQuery, useFetchAllGuruQuery } = guruApiSlice;

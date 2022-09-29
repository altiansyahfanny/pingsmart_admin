import { apiSlice } from '../../app/api/apiSlice';

export const agendaApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAgenda: builder.query({
			query: (params) =>
				`/agenda?page=${params.page}&perPage=${params.per_page}&keyword=${params.search}&pelajaran_id=${params.pelajaran_id}&kelas_id=${params.kelas_id}`,

			transformResponse: (responseData) => {
				const loadedData = responseData.data.map((data) => {
					return data;
				});
				return loadedData;
			},
			providesTags: ['Agenda'],
		}),
		createAgenda: builder.mutation({
			query: (data) => ({
				url: 'agenda',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Agenda'],
		}),
		updateAgenda: builder.mutation({
			query: (data) => ({
				url: 'agenda',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Agenda'],
		}),
		deleteAgenda: builder.mutation({
			query: (id) => ({
				url: `agenda/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Agenda'],
		}),
	}),
});

export const {
	useGetAgendaQuery,
	useCreateAgendaMutation,
	useDeleteAgendaMutation,
	useUpdateAgendaMutation,
} = agendaApiSlice;

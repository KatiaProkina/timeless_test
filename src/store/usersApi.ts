import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {UsersResponse} from "../shared/types.ts";

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://randomuser.me/api/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      query: () => `?results=500`,
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;

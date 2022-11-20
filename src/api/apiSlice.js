import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//на каждое действие createApi генерирует хук и редъюсер
export const apiSlice = createApi({
    reducePath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    //данный ключ нужен для связывания действий ниже
    tagTypes: ["Heroes"],
    endpoints: (builder) => ({
        //запрос на сервер
        getHeroes: builder.query({
            query: () => "/heroes",
            //связываем данный запрос с тэгом Heroes
            providesTags: ["Heroes"],
        }),
        //мутация на сервере - производятся какие-то изменения
        //body:hero - сразу преобразуется в json-формат
        createHero: builder.mutation({
            query: (hero) => ({
                url: "/heroes",
                method: "POST",
                body: hero,
            }),
            //связываем данную мутацию через тэг Heroes с запросом getHeroes на сервер
            invalidatesTags: ["Heroes"],
        }),
        deleteHero: builder.mutation({
            query: (id) => ({
                url: `/heroes/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Heroes"],
        }),
    }),
});

//в endpoints генерится хук по типу действия getHeroes
//в конце надо добавить типа действия на сервере(запрос или мутация) -
//в нашем случае запрос Query
export const { useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation } = apiSlice;

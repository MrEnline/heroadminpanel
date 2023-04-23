import { useCallback } from 'react';

export const useHttp = () => {
    // const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
    //     try {
    //         const response = await fetch(url, { method, body, headers });

    //         if (!response.ok) {
    //             throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    //         }

    //         const data = await response.json();

    //         return data;
    //     } catch (e) {
    //         throw e;
    //     }
    // }, []);

    //из-за того что createAsyncThunk не может обрабатывать useCallback, то его надо удалить
    const request = async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            //здесь возвращается объект promise
            const data = await response.json();

            return data;
        } catch (e) {
            throw e;
        }
    };

    return {
        request,
    };
};

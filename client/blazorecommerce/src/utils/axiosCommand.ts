import axios, { AxiosError } from "axios";
import { ApiResponse, SuccessResponse } from "./types";
import { StatusCodes } from "./constant.ts";

const api_url = import.meta.env.VITE_API_URL;

const getFromApi = async (url: string): Promise<ApiResponse> => {
    let result: ApiResponse;
    try {
        const response = await axios.get(`${api_url}/${url}`);

        result = {
            data: response.data,
            success: response.status === StatusCodes.Ok200,
        };

        return result;
    } catch (error) {
        return errorCatch(error);
    }
};

const postToApi = async (url: string, data: object): Promise<ApiResponse> => {
    try {
        const response = await axios.post(`${api_url}/${url}`, data);

        const result: SuccessResponse = {
            data: response,
            success: true,
        };

        return result;
    } catch (error) {
        const msg = errorCatch(error);
        return msg;
    }
};

const deleteToApi = async (url: string, id: string): Promise<ApiResponse> => {
    let result: ApiResponse;
    try {
        const response = await axios.delete(`${api_url}/${url}/${id}`);

        if (response.status === StatusCodes.Ok200) {
            result = {
                success: true,
                data: response.data,
            };
        } else {
            result = {
                statusCode: response.status,
                msg: response.data,
            };
        }

        return result;
    } catch (error) {
        return errorCatch(error);
    }
};

const putToApi = async (
    url: string,
    id: string,
    data: object
): Promise<ApiResponse> => {
    try {
        const response = await axios.put(`${api_url}/${url}/${id}`, data);
        let result: ApiResponse = {
            msg: response.data,
            statusCode: response.status,
        };

        if (response.status === StatusCodes.Ok200) {
            result = {
                success: true,
                data: response.data,
            };
        }

        return result;
    } catch (error) {
        return errorCatch(error);
    }
};

const errorCatch = (error: unknown) => {
    let result: ApiResponse = {
        statusCode: StatusCodes.BadRequest400,
        msg: "Something happened",
    };

    if (error instanceof AxiosError) {
        result = {
            statusCode: error.response!.status,
            msg: error.response?.data.msg,
        };
    }

    return result;
};

export { getFromApi, postToApi, deleteToApi, putToApi };

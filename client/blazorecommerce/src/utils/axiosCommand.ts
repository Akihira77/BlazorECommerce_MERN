import axios from "axios";
import { ApiResponse } from "./types";
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
  let result: ApiResponse;
  try {
    const response = await axios.post(`${api_url}/${url}`, data);

    if (response.status < StatusCodes.BadRequest400) {
      result = {
        data: response,
        success: true,
      };
    } else {
      result = {
        msg: response.data,
        statusCode: response.status,
      };
    }

    return result;
  } catch (error) {
    return errorCatch(error);
  }
};

const deleteToApi = async (url: string, id: string): Promise<ApiResponse> => {
  let result: ApiResponse;
  try {
    const response = await axios.delete(`${api_url}/${url}/${id}`);

    if (response.status === StatusCodes.Ok200) {
      result = {
        success: true,
        data: response,
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
  const result = {
    statusCode: StatusCodes.BadRequest400,
    msg: (error as Error).message,
  };

  return result;
};

export { getFromApi, postToApi, deleteToApi, putToApi };

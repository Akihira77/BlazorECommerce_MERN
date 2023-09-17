import React from "react";
import { getFromApi } from "../utils/axiosCommand.ts";

export default function useGetFromApi<T>(url: string): T {
  const [result, setResult] = React.useState<T>();

  React.useEffect(() => {
    async function callApi() {
      const response = await getFromApi(url);

      if ("data" in response) {
        setResult(response.data);
      } else {
        console.log(response.msg);
      }
    }

    callApi();
  }, []);

  return result!;
}

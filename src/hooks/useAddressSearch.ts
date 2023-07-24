import { useState } from "react";
import { AxiosResponse } from "axios";
import { getAxiosInstance } from "../services/axios";

type AddressData = {
  sla: string;
  score: number;
  pid: string;
};

type UseAddressSearchResult = {
  addressOptions: AddressData[];
  fetchAddressOptions: (address: string) => Promise<void>;
};

export const useAddressSearch = (): UseAddressSearchResult => {
  const [addressOptions, setAddressOptions] = useState<AddressData[]>([]);

  const fetchAddressOptions = async (address: string): Promise<void> => {
    const axiosInstance = getAxiosInstance(import.meta.env.VITE_ADDRESS_API);

    try {
      const response: AxiosResponse<AddressData[]> = await axiosInstance.get("/addresses", {
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
        },
        params: { q: address },
      });

      setAddressOptions(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { addressOptions, fetchAddressOptions };
};

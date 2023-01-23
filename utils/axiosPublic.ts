import axios, {AxiosInstance} from "axios";

const BASE_API = "https://bayut.p.rapidapi.com/";

const axiosPublic: AxiosInstance = axios.create({
  baseURL: BASE_API,
  headers: {
    "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
    "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
  },
});

export default axiosPublic;

import axios, {AxiosInstance} from "axios";

const BASE_API = "https://bayut.p.rapidapi.com/";

const axiosPublic: AxiosInstance = axios.create({
  baseURL: BASE_API,
  headers: {
    "x-rapidapi-host": "bayut.p.rapidapi.com",
    "x-rapidapi-key": "39b2933669msh8d9663c5c91aa9ep17f5b4jsnea9fb40c6247",
  },
});

export default axiosPublic;

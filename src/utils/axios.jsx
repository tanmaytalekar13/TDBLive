import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",

  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjIxY2E2MmM4ZWVjZmFiYjg3MmEwNjE5MTcwN2RkMSIsIm5iZiI6MTcxOTU2OTEyMy44NzE5NzMsInN1YiI6IjY2N2U4MGJjYjI4MzMwN2RjYmEyNDJhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CQCCNvzl0TotRUDTraOHOAWeYMJa7yxNi0s9EsNeR9w",
  },
});
export default instance;
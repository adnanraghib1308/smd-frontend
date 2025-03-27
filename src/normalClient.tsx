import axios from "axios";

const normalClient = axios.create({
  baseURL: "http://localhost:4000/api/v1",
})

export default normalClient;
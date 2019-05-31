import axios from "axios";

export const baseURL = process.env.REACT_APP_BASE_URL;
export const slackURL = process.env.REACT_APP_SLACK_URL;

export function axiosWithAuth() {
  const token = localStorage.getItem("token");
  console.log("axioswithauth");

  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    }
  });
}

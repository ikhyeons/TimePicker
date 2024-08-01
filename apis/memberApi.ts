import axios from "axios";
import { BASE_URL } from "../secrets/apiURL";

export function login(username: string, password: string) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  return fetch(`${BASE_URL}/member/login`, {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => res);
}

export function joinMember(id: string, password: string, name: string) {
  return axios.post(
    `${BASE_URL}/member/join`,
    {
      mid: id,
      password,
      name,
    },
    { withCredentials: true }
  );
}

export default {};

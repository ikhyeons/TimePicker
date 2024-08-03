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
  return fetch(`${BASE_URL}/member/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mid: id,
      password,
      name,
    }),
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => res);
}

export function checkDuplicate(memberId: string) {
  return fetch(`${BASE_URL}/member/checkDuplicate?mid=${memberId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
}

export default {};

import { BASE_URL } from "../secrets/apiURL";

export function postRequest(
  type: "DAY" | "DATE",
  title: string,
  description: string,
  deadline: string,
  receiverIdList: number[],
  dayList: { day: string }[] | { date: string }[],
  token: string
) {
  return fetch(`${BASE_URL}/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      type,
      title,
      description,
      deadline,
      receiverIdList,
      dayList,
    }),
  })
    .then((res) => res.json())
    .then((res) => res);
}

export function deleteRequest(requestId: number, token: string) {
  return fetch(`${BASE_URL}/request?requestId=${requestId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => res);
}

export function getSendRequest(token: string) {
  return fetch(`${BASE_URL}/sendRequest`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => res);
}

export function getReceiveRequest(token: string) {
  return fetch(`${BASE_URL}/receiveRequest`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => res);
}

export default {};

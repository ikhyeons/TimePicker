import axios from "axios";
import { BASE_URL } from "../secrets/apiURL";

export function joinMember(id: string, password: string, name: string) {
  axios
    .post(
      `${BASE_URL}/member/join`,
      {
        mid: id,
        password,
        name,
      },
      {
        withCredentials: true,
      }
    )
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));
}

export default {};

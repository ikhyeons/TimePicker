import axios from "axios";
import { base_url } from "../secrets/apiURL";

export function joinMember(id: string, password: string, name: string) {
  axios
    .post(
      `${base_url}/member/join`,
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

interface IRequest {
  id: number;
  image: typeof require;
  title: string;
  description: string;
  type: string;
  expireDate: string;
  order: string;
  member: { name: string; isResponse: boolean }[];
  status: TMyRequestStatus | TGetRequestStatus;
  day?: ("월" | "화" | "수" | "목" | "금" | "토" | "일")[];
  date?: string[];
  result?: { time: string; priority: number }[];
}

type reqType = "date" | "day" | null;

interface ISendRequest {
  title: string;
  description: string;
  deadline: Date;
  receiver: string[];
  type: string;
}

type TMyRequestStatus =
  | "opened"
  | "allResponsed"
  | "canceled"
  | "expired"
  | "neared";

type TGetRequestStatus =
  | "opened"
  | "responsed"
  | "expired"
  | "canceled"
  | "neared";

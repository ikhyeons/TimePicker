interface IRequest {
  requestId: number;
  member: IUser;
  type: "DATE" | "DAY";
  title: string;
  description: string;
  deadline: string;
  receiverList: requestReceiver[];
  dayList: IRDay[];
  dateList: IRDate[];
  result?: {
    date?: string;
    day?: string;
    startTime: string;
    endTime: string;
    priority: number;
  }[];
  cancel: boolean;
  image?: typeof require;
  reqType: reqType;
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

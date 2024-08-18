declare global {
  interface IResponse {
    responseId: number;
    member: IUser;
    type: "Day" | "Date";
    responseDate?: {
      request: IRequest;
      date: string;
      rdateId: number;
    };
    responseDay?: {
      request: IRequest;
      day: string;
      rdayId: number;
    };
    responseData: string | null;
    rdayId?: number;
    rdateId?: number;
  }

  interface IUser {
    memberId: number;
    mid: string;
    name: string;
    role: string;
    socialId: string | null;
    socialType: string | null;
  }

  interface IRequestReceiver {
    requestReceiverId: number;
    request: IRequest;
    member: IUser;
  }

  interface IRDay {
    request: IRequest;
    day: string;
    responseList: IResponse[];
    rdayId: number;
  }

  interface IRDate {
    request: IRequest;
    date: string;
    responseList: IResponse[];
    rdateId: number;
  }

  interface IRequest {
    requestId: number;
    member: IUser;
    type: "DATE" | "DAY";
    title: string;
    description: string;
    deadline: string;
    receiverList: IRequestReceiver[];
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
}

export default {};

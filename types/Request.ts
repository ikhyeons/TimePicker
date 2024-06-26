interface IRequest {
  id: number;
  image: typeof require;
  title: string;
  type: string;
  expireDate: string;
  order: string;
  member: { name: string; isResponse: boolean }[];
  status: TMyRequestStatus | TGetRequestStatus;
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

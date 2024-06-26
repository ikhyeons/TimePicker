export const getRequest: IRequest[] = [
  {
    id: 1,
    image: require("./../../public/pngwing.png"),
    title: "미팅 일정 시간 조율",
    type: "meeting",
    expireDate: "2024-07-03 20:30:00",
    order: "류창완",
    member: [
      { name: "성익현", isResponse: true },
      { name: "류창완", isResponse: false },
      { name: "장민욱", isResponse: true },
    ],
    status: "opened",
  },
  {
    id: 1,
    image: require("./../../public/pngwing.png"),
    title: "회의 일정 시간 조율",
    type: "meeting",
    expireDate: "2024-08-05 20:30:00",
    order: "장민욱",
    member: [
      { name: "성익현", isResponse: true },
      { name: "류창완", isResponse: true },
      { name: "장민욱", isResponse: false },
    ],
    status: "responsed",
  },
  {
    id: 1,
    image: require("./../../public/pngwing.png"),
    title: "회의 일정 시간 조율",
    type: "meeting",
    expireDate: "2024-08-05 20:30:00",
    order: "류창완",
    member: [
      { name: "성익현", isResponse: false },
      { name: "류창완", isResponse: true },
      { name: "장민욱", isResponse: true },
    ],
    status: "canceled",
  },
  {
    id: 1,
    image: require("./../../public/pngwing.png"),
    title: "회의 일정 시간 조율",
    type: "meeting",
    expireDate: "2024-08-05 20:30:00",
    order: "장민욱",
    member: [
      { name: "성익현", isResponse: true },
      { name: "류창완", isResponse: false },
      { name: "장민욱", isResponse: true },
    ],
    status: "expired",
  },
  {
    id: 1,
    image: require("./../../public/pngwing.png"),
    title: "회의 일정 시간 조율",
    type: "meeting",
    expireDate: "2024-08-05 20:30:00",
    order: "류창완",
    member: [
      { name: "성익현", isResponse: true },
      { name: "류창완", isResponse: false },
      { name: "장민욱", isResponse: true },
    ],
    status: "neared",
  },
];

export default getRequest;

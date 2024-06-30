export const decidedRequest: IRequest[] = [
  {
    id: 1,
    image: require("./../../public/pngwing.png"),
    title: "회의 일정 시간 조율",
    type: "meeting",
    expireDate: "2024-08-05 20:30:00",
    order: "성익현",
    member: [
      { name: "성익현", isResponse: false },
      { name: "류창완", isResponse: true },
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
    order: "성익현",
    member: [
      { name: "성익현", isResponse: true },
      { name: "류창완", isResponse: true },
      { name: "장민욱", isResponse: true },
    ],
    status: "allResponsed",
  },
  {
    id: 1,
    image: require("./../../public/pngwing.png"),
    title: "회의 일정 시간 조율",
    type: "meeting",
    expireDate: "2024-08-05 20:30:00",
    order: "성익현",
    member: [
      { name: "성익현", isResponse: true },
      { name: "류창완", isResponse: false },
      { name: "장민욱", isResponse: false },
    ],
    status: "canceled",
  },
  {
    id: 1,
    image: require("./../../public/pngwing.png"),
    title: "회의 일정 시간 조율",
    type: "meeting",
    expireDate: "2024-08-05 20:30:00",
    order: "성익현",
    member: [
      { name: "성익현", isResponse: false },
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
    order: "성익현",
    member: [
      { name: "성익현", isResponse: true },
      { name: "류창완", isResponse: false },
      { name: "장민욱", isResponse: true },
    ],
    status: "neared",
  },
];

export default decidedRequest;

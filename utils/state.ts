export function extractState(req: IRequest, myMid: string) {
  if (req.cancel) return "canceled";

  const deadline = new Date(req.deadline);
  const current = new Date();

  let isResponse = false;
  if (req.member.mid != myMid) {
    if (req.type == "DATE") {
      req.dateList.map((data) =>
        data.responseList.map((data2) => {
          if (
            (data2.member.mid == myMid && data2.responseData != null) ||
            data2.responseData != ""
          ) {
            isResponse = true;
          }
        })
      );
    } else {
      req.dayList.map((data) =>
        data.responseList.map((data2) => {
          if (
            (data2.member.mid == myMid && data2.responseData != null) ||
            data2.responseData != ""
          ) {
            isResponse = true;
          }
        })
      );
    }

    if (isResponse) return "responsed";
  }

  //만료, 모두 응답, 내가 응답
  if (deadline.getTime() - current.getTime() < 0) {
    const responsor = new Set();
    if (req.type == "DATE") {
      req.dateList.map((date) => {
        date.responseList.map((response) => {
          responsor.add(response.member.mid);
        });
      });
    } else {
      req.dayList.map((date) => {
        date.responseList.map((response) => {
          responsor.add(response.member.mid);
        });
      });
    }
    if (responsor.size == req.receiverList.length) return "allResponsed";
    else return "expired";
  }
  if (deadline.getTime() - current.getTime() <= 1000 * 60 * 60 * 4)
    return "neared";

  return "opened";
}

export default {};

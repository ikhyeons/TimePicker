export function diffDay(time: string) {
  const toTime = new Date(time);
  const todayTime = new Date();
  const diff = toTime.getTime() - todayTime.getTime();

  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const diffMin = Math.floor((diff / (1000 * 60)) % 60);
  const diffSec = Math.floor((diff / 1000) % 60);
  let resultString = `${diffDay}일 ${diffHour}시간 ${diffMin}분 ${diffSec}초`;
  return resultString;
}

export function currentTime() {
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth() + 1;
  const day = currentTime.getDate();
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  return `${year}년 ${month}월 ${day}일 ${hour}:${minute}`;
}

export default { diffDay, currentTime };

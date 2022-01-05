
/* open_date 날짜 객체로 변경 함수 */
const openDateFormatterYes = (date) => {

  // 입력값 (문자열)에서 공백을 모두 제거한다
  let sliceDate = date.replace(/\s/g, '');
  // year
  const year = Number(sliceDate.substring(0, 4));
  sliceDate = sliceDate.slice(5);
  // month
  const month = Number(sliceDate.substring(0, 2))
  sliceDate = sliceDate.slice(3);
  // day
  const day = Number(sliceDate.substring(0, 2))
  sliceDate = sliceDate.slice(3);
  // 요일 제거
  sliceDate = sliceDate.slice(2);
  // 오전, 오후 구분
  const twelveClock = sliceDate.substring(0, 2);
  sliceDate = sliceDate.slice(2);
  // hour
  const hour = Number(sliceDate.split(':')[0]);
  // minute
  const minute = Number(sliceDate.split(':')[1]);

  return new Date(year, month-1, day, hour+21, minute, 0)
}

module.exports = {
  openDateFormatterYes
}

/* open_date 날짜 객체로 변경 함수 */
const openDateFormatter = (date) => {

  let sliceDate = date.trim();
  /* year */
  const year = Number(sliceDate.substring(0,4));
  sliceDate = sliceDate.slice(5).trim();
  /* month */
  const monthStr = sliceDate.substring(0,3).trim();
  const month = Number(monthStr.substring(0,monthStr.length-1).trim());
  sliceDate = sliceDate.slice(3).trim();
  /* day */
  const dayStr = sliceDate.substring(0,3).trim();
  const day = dayStr.includes('(') ?  Number(dayStr.substring(0,dayStr.length-2).trim()) : Number(dayStr.substring(0,dayStr.length-1).trim());
  sliceDate = sliceDate.slice(6).trim();
  /* hour */
  const twelveClock = sliceDate.substring(0,2).trim();
  sliceDate = sliceDate.slice(2).trim(); 
  const hour = twelveClock==='오전' ? Number(sliceDate.substring(0,sliceDate.length-1).trim()) : Number(sliceDate.substring(0,sliceDate.length-1).trim() ) + 12;
  /* minute */
  const minute = 0;
  /* Date 객체 반환 */
  return new Date(year, month-1, day, hour+9, minute);
}

module.exports = {
  openDateFormatter
}
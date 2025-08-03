function formatDate(dateString) {
  if (!dateString) {
    throw new Error("Invalid date string");
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}
function parseCustomDate(dateString) {
  const regex = /(\d{4})年(\d{1,2})月(\d{1,2})日/;
  const match = dateString.match(regex);
  if (!match) {
    throw new Error("Invalid date format");
  }
  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}
function GetWeekdate(dateString) {
  const dateObject = parseCustomDate(dateString);
  if (isNaN(dateObject.getTime())) {
    throw new Error("Invalid date string");
  }
  return dateObject.getDay();
}

export { GetWeekdate as G, formatDate as f };
//# sourceMappingURL=date-DoCWYhJL.mjs.map

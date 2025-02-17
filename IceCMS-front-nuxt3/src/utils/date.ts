export function formatDate(dateString: string): string {
  if (!dateString) {
    throw new Error("Invalid date string");
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月份从 0 开始，需要加 1
  const day = date.getDate();

  return `${year}年${month}月${day}日`;
}

function padLeftZero(str: string | any[]) {
  return ("00" + str).substr(str.length);
}


// Function to convert custom formatted date string to a valid JavaScript Date object
function parseCustomDate(dateString: string): Date {
  const regex = /(\d{4})年(\d{1,2})月(\d{1,2})日/;
  const match = dateString.match(regex);

  if (!match) {
    throw new Error("Invalid date format");
  }

  const [, year, month, day] = match;
  // Months are 0-indexed in JavaScript, so subtract 1 from the month
  return new Date(Number(year), Number(month) - 1, Number(day));
}

// Function to get the weekday (0–6) from a custom date format
export function GetWeekdate(dateString: string): number {
  const dateObject = parseCustomDate(dateString);
  
  if (isNaN(dateObject.getTime())) {
    throw new Error("Invalid date string");
  }
  
  return dateObject.getDay(); // 0 = Sunday, 6 = Saturday
}

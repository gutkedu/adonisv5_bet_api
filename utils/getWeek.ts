const getWeekAndDays = function (date_obj) {
  const currentDate = date_obj;
  const oneJan: any = new Date(currentDate.getFullYear(), 0, 1);
  const numberOfDays: number = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));
  const numberOfWeeks: number = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7);
  return { numberOfWeeks: numberOfWeeks, numberOfDays: numberOfDays }
}

export default getWeekAndDays

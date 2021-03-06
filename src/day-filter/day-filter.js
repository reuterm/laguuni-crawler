const addDays = require("date-fns/addDays");
const format = require("date-fns/format");
const isDate = require("date-fns/isDate");

WEEKDAYS = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

function getWeekdayNumber(day) {
  const number = WEEKDAYS[day.toUpperCase()];
  return Number.isInteger(number) ? number : -1;
}

function getNextDateOfWeekday(date, weekday) {
  const diff = (7 + weekday - date.getDay()) % 7;
  const daysToAdd = diff > 0 ? diff : 7; // pick next week's version of today's weekday
  return addDays(date, daysToAdd);
}

function convertToDate(filter) {
  const today = new Date();
  if (filter.toUpperCase() === "TODAY") {
    return today;
  }

  if (filter.toUpperCase() === "TOMORROW") {
    return addDays(today, 1);
  }

  const weekday = getWeekdayNumber(filter);
  return weekday > -1 ? getNextDateOfWeekday(today, weekday) : null;
}

function getDates(str) {
  const filters = str
    .split("and")
    .map((item) => item.trim());
  const converted = filters.map(convertToDate);
  return converted.filter((date) => Boolean(date));
}

function formatDate(date) {
  return isDate(date) ? format(date, "yyyy-MM-dd") : null;
}

module.exports = {
  WEEKDAYS,
  formatDate,
  convertToDate,
  getWeekdayNumber,
  getNextDateOfWeekday,
  getDates,
};

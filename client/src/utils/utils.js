import moment from "moment";

export const dateToString = (date, format) =>
  moment.utc(date).add(7, "hour").startOf("date").format(format);

export function objToStringified(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = JSON.stringify(obj[key]);
    return acc;
  }, {});
}

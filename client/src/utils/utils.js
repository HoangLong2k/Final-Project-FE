import moment from "moment";

export const dateToString = (date, format) =>
  moment.utc(date).add(7, "hour").startOf("date").format(format);

// Bismillah...
// waBulk By MMMAlwi
// Created : 2023-07-29 03:37
// Updated : 2023-07-29 03:46

const mName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Ags",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

function now() {
  let date = new Date();
  date.setHours(date.getHours() + 7);
  return date.toISOString().slice(0, 19).replace("T", " ");
}

function parseToSTR(dt) {
  let date = new Date(dt); // .getTime()
  date.setHours(date.getHours() + 7);
  return date.toISOString().slice(0, 19).replace("T", " ");
}

function dateTime(dt = now()) {
  if (dt == "") {
    return "-";
  }
  dt = new Date(dt);
  dt.setHours(dt.getHours() + 7);
  dt.setDate(dt.getDate() - 1);
  return `${dt.getDate()} ${mName[dt.getMonth()]} ${dt.getFullYear()} ${dt
    .toISOString()
    .slice(11, 16)}`;
}

function dateYMD(dt = "now") {
  if (dt == "") {
    return "-";
  }
  if (dt == "now") {
    dt = new Date(now());
    dt.setHours(dt.getHours() + 7);
  } else {
    dt = new Date(dt);
    dt.setHours(dt.getHours() + 7);
    dt.setDate(dt.getDate() - 1);
  }

  return dt.toISOString().slice(0, 10);
}

export default {
  now,
  parseToSTR,
  dateTime,
  dateYMD,
};

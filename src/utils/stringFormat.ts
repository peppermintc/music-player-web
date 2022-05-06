const moods = (moods: string[]): string => {
  let result = "";
  moods.forEach((mood) => (result += `#${mood} `));
  return result;
};

const genre = (genre: string): string => `#${genre}`;

const date = (date: string): string => {
  let newDate = date.split("T")[0];
  newDate = newDate.replaceAll("-", ".");
  return newDate;
};

const time = (seconds: number | undefined): string => {
  if (typeof seconds !== "number") return "00 : 00";
  let newMinutes: number | string = Math.floor(seconds / 60);
  let newSeconds: number | string = Math.floor(seconds % 60);
  if (newMinutes < 10) newMinutes = `0${newMinutes}`;
  if (newSeconds < 10) newSeconds = `0${newSeconds}`;

  return newMinutes + " : " + newSeconds;
};

const formatString = { moods, genre, date, time };

export default formatString;

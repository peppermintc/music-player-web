import axios from "axios";

export const axiosGetMusicList = () => {
  return axios
    .get("http://localhost:8000/musics")
    .then((response) => response.data)
    .catch(console.error);
};

export const axiosGetMusic = (musicId: string) => {
  return axios
    .get(`http://localhost:8000/musics/${musicId}`)
    .then((response) => response.data)
    .catch(console.error);
};

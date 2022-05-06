import { Music } from "../interfaces";

const getFilteredPlaylist = (playList: Music[]) => {
  const filteredPlayList = playList.sort((a, b) => {
    const aDate = new Date(a.public_date);
    const bDate = new Date(b.public_date);

    if (aDate < bDate) return 1;
    else if (aDate > bDate) return -1;
    else return 0;
  });

  return filteredPlayList;
};

export default getFilteredPlaylist;

export interface Music {
  id: string;
  title: string;
  moods: string[];
  genre: string;
  public_date: string;
}

export interface CurrentMusic {
  id: string;
  url: string;
  isPlaying: boolean;
}

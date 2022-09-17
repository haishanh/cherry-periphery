export type ServerItemConfig = {
  // a ~unique key to identifier an item in list
  key: string;
  apiBase: string;
  pat?: string;
  user?: {
    username: string;
  };
};

export type Options = {
  servers: ServerItemConfig[];
  activeServerIdx: number;
};

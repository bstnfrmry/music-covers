import fetch from "isomorphic-unfetch";

import { config } from "~/config";

export const fetcher = async <Data>(path: string, query = "Love"): Promise<Data> => {
  const res = await fetch(config.app.url + path + `?q=${query || "Love"}`);

  return res.json();
};

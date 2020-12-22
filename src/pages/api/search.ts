import { orderBy } from "lodash";
import { NextApiHandler } from "next";
import SpotifyApi from "spotify-web-api-node";

import { config } from "~/config";

export type SearchResponse = {
  results: {
    name: string;
    url: string;
    width: number;
    height: number;
  }[];
};

const spotify = new SpotifyApi({
  clientId: config.spotify.clientId,
  clientSecret: config.spotify.clientSecret,
});

const Search: NextApiHandler<SearchResponse> = async (req, res) => {
  if (!spotify.getAccessToken()) {
    const grant = await spotify.clientCredentialsGrant();
    spotify.setAccessToken(grant.body.access_token);
  }

  const spotifyResponse = await spotify.search(req.query.q as string, ["album", "artist"], { limit: 50 });

  const artists = (spotifyResponse.body.artists?.items ?? [])
    .map((item) => {
      const [largestImage] = orderBy(item.images, (image) => image.width, "desc");

      return {
        name: item.name,
        url: largestImage?.url,
        width: largestImage?.width as number,
        height: largestImage?.height as number,
      };
    })
    .filter((result) => {
      return !!result.url;
    });

  const albums = (spotifyResponse.body.albums?.items ?? [])
    .map((item) => {
      const [largestImage] = orderBy(item.images, (image) => image.width, "desc");

      return {
        name: item.name,
        url: largestImage?.url,
        width: largestImage?.width as number,
        height: largestImage?.height as number,
      };
    })
    .filter((result) => {
      return !!result.url;
    });

  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  res.json({
    results: [...artists, ...albums],
  });
};

export default Search;

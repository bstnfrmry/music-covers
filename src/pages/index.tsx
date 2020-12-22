import { NextPage } from "next";
import Image from "next/image";
import React, { SVGAttributes, useState } from "react";
import useSWR from "swr";

import { useDebounce } from "~/lib/useDebounce";
import { SearchResponse } from "~/pages/api/search";

const Homepage: NextPage = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query || "love", 300);
  const { data } = useSWR<SearchResponse>(["/api/search", debouncedQuery], {});

  return (
    <div className="bg-gray-900">
      <div className="flex flex-col container mx-auto h-screen overflow-hidden p-1">
        <div className="bg-gray-800 mt-4 rounded shadow p-3 max-w-lg border border-green-900 ml-3">
          <h1 className="ml-1 text-lg tracking-wide leading-none font-semibold text-white">Search for music covers</h1>

          <div className="relative w-full flex mt-4 max-w-lg">
            <input
              autoFocus
              className="flex-1 shadow rounded p-3 focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Love"
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <SearchIcon className="absolute h-8 w-8 right-0 mt-2 mr-2" />
          </div>
        </div>

        {data && (
          <div className="flex flex-wrap mt-4 flex-1 overflow-y-auto p-2">
            {data.results.map((result) => {
              return (
                <div key={result.url} className="relative shadow-lg  w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 group">
                  <div className="relative border-2 border-white transform transition hover:scale-105 hover:border-green-500 m-1">
                    <div style={{ paddingBottom: "100%" }} />

                    <a
                      className="absolute inset-0 flex flex-col justify-center"
                      href={result.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Image height={result.height} src={result.url} width={result.width} />
                    </a>

                    <div className="absolute bottom-0 left-0 bg-gray-900 bg-opacity-75 m-1 text-xs px-1 rounded flex flex-col">
                      <span className="text-white group-hover:block hidden">
                        {result.width} <span className="text-gray-500">×</span> {result.height}{" "}
                        <span className="text-gray-500">px</span>
                      </span>
                      <span className="text-white">{result.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const SearchIcon: React.FC<SVGAttributes<SVGElement>> = (props) => {
  return (
    <svg focusable="false" height="1em" viewBox="0 0 24 24" width="1em" {...props}>
      <path
        d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Homepage;

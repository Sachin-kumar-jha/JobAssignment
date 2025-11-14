/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
export default function SearchBar({ onSearch }: { onSearch: (filters: any) => void }) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onSearch({
      q: query || undefined,
      location: location || undefined,
    });

    //Clear input fields after search
    setQuery("");
    setLocation("");
  };

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 lg:mt-15 lg:py-8">

      {/* Heading */}
      <h1
        className="text-2xl lg:text-[32px] font-bold leading-[100%]"
        style={{ fontFamily: 'Playfair Display', fontWeight: 700 }}
      >
        Jobs for you
      </h1>

      {/* Search Inputs */}
      <div className="w-full lg:flex-1 flex gap-4 lg:max-w-[936px] h-auto lg:h-[50px]">
        <div className="flex-1 flex flex-col lg:flex-row gap-2 lg:gap-0">

          {/* QUERY INPUT */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by company, jobs, skills"
            className="flex-1 px-4 py-3 border-2 border-gray-500 rounded-lg 
                       lg:rounded-l-lg lg:rounded-r-none 
                       focus:outline-none focus:border-blue-600"
          />

          {/* LOCATION INPUT */}
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="
              w-full lg:w-64 
              px-4 py-3 
              border-2
              lg:border-t-2 lg:border-b-2 border-gray-500 
              lg:border-l-0 lg:border-r-0 
              rounded-lg lg:rounded-none
              focus:outline-none focus:border-blue-600
            "
          />

          {/* SEARCH BUTTON */}
          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-[#00CC83] text-white font-semibold rounded-lg 
                       lg:rounded-r-lg lg:rounded-l-none 
                       hover:bg-[#00b574] transition-colors"
          >
            Search Jobs
          </button>

        </div>
      </div>
    </div>
  );
};

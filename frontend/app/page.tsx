/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import Navbar from './components/Layouts/Navbar';
import SearchBar from './components/search/SearchBar';
import FilterTabs from './components/filters/FilterTabs';
import JobCard from './components/jobs/JobCard';
import JobDetails from './components/jobs/JobDetails';
import useJobs from './hook/useJobs';

export default function Page() {
  const [activeTab, setActiveTab] = useState('Recommended');

  // FILTER STATE
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});

  // PAGINATION
  const [page, setPage] = useState(1);

  // FETCH JOBS
  const { jobs, loading } = useJobs(selectedFilters, page);

  // SELECTED JOB
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // FILTER TOGGLE HANDLER (from FilterTabs)
  const onToggle = (filterName: string, value: string | boolean) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };

      // Boolean filter
      if (typeof value === "boolean") {
        updated[filterName] = value;
        return updated;
      }

      // Multi-select filtering
      const arr = Array.isArray(prev[filterName]) ? [...prev[filterName]] : [];
      const idx = arr.indexOf(value);

      if (idx >= 0) arr.splice(idx, 1);
      else arr.push(value);

      updated[filterName] = arr.length ? arr : undefined;
      return updated;
    });

    setPage(1);
  };

  // ADD THIS — SEARCH HANDLER
  const handleSearch = (searchFilters: any) => {
    setSelectedFilters((prev) => ({
      ...prev,         // keep old filters
      ...searchFilters // merge search filters (q, location)
    }));
    setPage(1);
  };

  return (
    <main className="min-h-screen">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
      `}</style>
      <Navbar />
      <div className="pt-16 lg:pt-[50px]">
        <div className="w-full mx-auto px-4 lg:px-20">

          {/* Search Bar WITH SEARCH SUPPORT */}
          <SearchBar onSearch={handleSearch} />

          {/* Filter Tabs */}
          <FilterTabs
            selected={selectedFilters}
            onToggle={onToggle}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Job Listing Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 lg:px-3">

            {/* LEFT: LIST OF JOB CARDS */}
            <div className="lg:col-span-5 space-y-4">

              {loading || jobs === null ? (
                <div className="text-center text-gray-500">Loading jobs...</div>
              ) : (
                jobs.map((job: any) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    isSelected={selectedJob?._id === job._id}
                    onClick={() => setSelectedJob(job)}
                  />
                ))
              )}

              {/* PAGINATION */}
              <div className="flex justify-center gap-4 mt-4">
                <button
                  className="px-4 py-2 border rounded-lg"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Prev
                </button>

                <button
                  className="px-4 py-2 border rounded-lg"
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            </div>

            {/* RIGHT: JOB DETAILS */}
            <div className="lg:col-span-7">
              {selectedJob ? (
                <JobDetails job={selectedJob} />
              ) : (
                <div className="text-center text-gray-500 mt-10">
                  Select a job to view details
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

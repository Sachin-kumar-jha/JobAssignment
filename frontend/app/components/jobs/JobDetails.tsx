/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { formatDistanceToNow } from "date-fns";

import { Briefcase, MapPin, IndianRupee, Bookmark, Share2, Copy } from 'lucide-react';
import Job from '../data/jobData';

export default function JobDetails({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-lg border-2 border-blue-500 py-8">
      <div className="flex flex-col items-start gap-4 mb-6">
        <div className="flex flex-row w-full border-b-2 justify-start px-10 gap-10">
          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
            <div className="w-12 h-12 bg-[#00CC83] rounded-full"></div>
          </div>
          <div>
            <h2 className="text-2xl text-center font-bold tracking-tighter">{job.company.toUpperCase()}</h2>
          </div>
        </div>

        <div className="flex-2 px-4 lg:px-8">

          {/* ─────────── TITLE + POSTED INFO (Stable Header — FIXED) ─────────── */}
          <div className="mb-2">
            <div className="flex flex-col lg:flex-row justify-between w-full py-3 lg:items-center lg:justify-between gap-4">

              <h3 className="text-2xl font-bold tracking-tighter">
                {job?.role}
              </h3>

              <p className="text-sm text-gray-600 whitespace-nowrap">
                Posted {job.postedAt ? formatDistanceToNow(new Date(job.postedAt)) : "recently"} ago
                • Over {job.applicants} applicants
              </p>

            </div>
          </div>

          {/* ─────────── SKILLS SECTION (Inline + Wrap Cleanly) ─────────── */}
          <div className="mb-4">
            <div className="flex flex-col gap-2">

              <p className="text-sm text-gray-700 font-medium tracking-tighter">
                Skills Required:
              </p>

              <div className="flex flex-row flex-wrap gap-2 items-center">
                {job.skills.map((skill: any, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm whitespace-nowrap"
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          </div>


          {/* Experience / Location / Salary */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-6 text-sm text-gray-700 mb-6">
            <div className="flex items-center gap-2">
              <Briefcase size={18} />
              <span className="font-semibold">{job.experience}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span className="font-semibold">{job.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <IndianRupee size={18} />
              <span className="font-semibold">{job.salary}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button className="px-10 py-3 bg-[#00CC83] text-white font-semibold rounded-lg hover:bg-[#00b574] transition-colors">
              Apply
            </button>

            <div className="flex gap-3">
              <button className="w-12 h-12 border-2 border-[#00CC83] rounded-lg flex items-center justify-center text-[#00CC83] hover:bg-[#00CC83] hover:text-white transition-colors">
                <Bookmark size={20} />
              </button>

              <button className="w-12 h-12 border-2 border-[#00CC83] rounded-lg flex items-center justify-center text-[#00CC83] hover:bg-[#00CC83] hover:text-white transition-colors">
                <Share2 size={20} />
              </button>

              <button className="w-12 h-12 border-2 border-[#00CC83] rounded-lg flex items-center justify-center text-[#00CC83] hover:bg-[#00CC83] hover:text-white transition-colors">
                <Copy size={20} />
              </button>
            </div>
          </div>

        </div>


      </div>

      <div className="space-y-6 p-8 border-t-2 w-full">
        <div>
          <h4 className="text-xl font-bold mb-4">Job Description</h4>
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="mb-4">
              <h5 className="font-semibold mb-2">Sub-heading {num}</h5>
              <p className="text-gray-700 text-sm leading-relaxed">
                {job.description}
              </p>
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-xl font-bold mb-3">About Company</h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t-2 w-full px-0">
        <button className="text-blue-500 w-full font-bold hover:underline">
          View Similar Jobs
        </button>
      </div>
    </div>
  );
};
'use client';
import { MoreVertical, Briefcase, MapPin, IndianRupee } from 'lucide-react';
import Job from '../data/jobData';

export default function JobCard({ job, isSelected, onClick }: { job: Job; isSelected: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg  p-4 lg:p-5 cursor-pointer transition-all ${isSelected ? 'border-2 border-blue-500' : 'border-1 border-gray-800 hover:border-gray-300'
        }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-200 rounded flex-shrink-0"></div>
          <div>
            <h3 className="font-semibold text-base lg:text-lg">{job.role}</h3>
            <p className="text-gray-600 text-sm">{job.company}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-sm text-gray-600 mb-3">
        <div className="flex items-center gap-1">
          <Briefcase size={16} />
          <span>{job.experience}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <IndianRupee size={16} />
          <span>{job.salary}</span>
        </div>
      </div>

      <button className="text-blue-500 w-full text-sm text-center font-semibold hover:underline">
        View Similar Jobs
      </button>
    </div>
  );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";

type Props = {
  selected: Record<string, any>;
  onToggle: (filterName: string, value: string | boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function FilterTabs({
  selected = {},
  onToggle = () => { },
  activeTab,
  setActiveTab
}: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Backend-style filter options
  const options = {
    Location: ["Delhi", "Bengaluru", "Mumbai", "Pune"],
    Experience: ["0-2 yrs", "2-4 yrs", "4-6 yrs"],
    Salary: ["3-5 LPA", "6-10 LPA", "12-18 LPA"],
    Function: ["Engineering", "Design", "Product", "Sales"],
    Industry: ["SaaS", "Fintech", "Healthcare", "E-commerce"],
    FullStack: [true],
    "Job Type": ["Full-time", "Internship"]
  };

  const optionKeys = Object.keys(options) as (keyof typeof options)[];

  // ------------------------
  // must define before isActive
  // ------------------------
  const matchKey = (label: string) => {
    return (
      {
        Location: "location",
        Experience: "experience",
        Salary: "salary",
        Function: "function",
        Industry: "industry",
        FullStack: "fullStack",
        "Job Type": "jobType"
      }[label] || label
    );
  };

  // Safe isActive
  const isActive = (name: string, value: any) => {
    const key = matchKey(name);
    const selectedValue = selected[key];

    if (!selectedValue) return false;
    if (typeof value === "boolean") return selectedValue === value;

    return Array.isArray(selectedValue) && selectedValue.includes(value);
  };

  // Filter button + dropdown
  const renderFilterButton = (filterName: keyof typeof options) => {
    const list = options[filterName];

    const isOpen = openDropdown === filterName;

    return (
      <div key={String(filterName)} className="relative group z-30">
        {/* BUTTON */}
        <button
          type="button"
          onClick={() =>
            setOpenDropdown(isOpen ? null : String(filterName))
          }
          className="px-4 py-2 border-2 border-gray-300 rounded-lg bg-white flex items-center gap-2 hover:border-[#00CC83]"
        >
          <span className="text-sm">{filterName}</span>

          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"
              }`}
          />
        </button>

        {/* DROPDOWN */}
        <div
          className={`
            absolute left-0 top-full mt-2 
            ${isOpen ? "flex" : "hidden"}
            flex-col bg-white shadow-lg rounded-lg p-3 z-40 w-44
            pointer-events-auto
          `}
        >
          {list.map((value: any) => {
            const key = matchKey(String(filterName));
            const active = isActive(String(filterName), value);

            return (
              <button
                key={String(value)}
                type="button"
                onClick={() => onToggle(key, value)}
                className={`text-left w-full px-3 py-2 rounded-lg text-sm mb-1 ${active
                    ? "bg-accent text-gray-900"
                    : "border border-gray-300 text-gray-700 bg-white"
                  }`}
              >
                {String(value)}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-lg px-4 py-4 mb-6 flex flex-col lg:flex-row justify-between">

      {/* Tabs */}
      <div className="flex gap-6 border-gray-200 mb-4 lg:mb-0">
        {["Recommended", "Applied", "Saved"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 font-semibold ${activeTab === tab
                ? "text-[#00CC83] border-b-2 border-[#00CC83]"
                : "text-gray-600 hover:text-gray-900"
              }`}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Mobile Toggle */}
      <button
        type="button"
        className="lg:hidden w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-white flex items-center justify-between hover:border-[#00CC83]"
        onClick={() => setShowFilters(!showFilters)}
      >
        <span className="text-sm font-medium">Filters</span>
        <Filter size={16} />
      </button>

      {/* Filters */}
      <div
        className={`${showFilters ? "flex" : "hidden"
          } lg:flex flex-wrap items-center gap-3 mt-4 lg:mt-0`}
      >
        {optionKeys.map((filterName) => renderFilterButton(filterName))}
      </div>
    </div>
  );
}

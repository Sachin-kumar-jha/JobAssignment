/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

export default function useJobs(selectedFilters: Record<string, any>, page: number) {
    // -----------------------------------------------------------
    // FALLBACK JOBS (used when backend is DOWN or empty)
    // -----------------------------------------------------------
    const fallbackJobs = [
        {
            _id: "1",
            role: "Frontend Developer",
            company: "Fallback Tech",
            experience: "0-2 yrs",
            location: "Delhi",
            salary: "3-5 LPA",
            skills: ["React", "JavaScript"],
            postedAt: new Date(),
            applicants: 45,
        },
        {
            _id: "2",
            role: "Backend Developer",
            company: "Fallback Soft",
            experience: "2-4 yrs",
            location: "Bengaluru",
            salary: "6-10 LPA",
            industry: "Healthcare",
            skills: ["Node.js", "MongoDB"],
            postedAt: new Date(),
            applicants: 88,
        },
        {
            _id: "3",
            role: "Product Designer",
            company: "Fallback Studio",
            experience: "0-2 yrs",
            location: "Mumbai",
            salary: "3-5 LPA",
            industry: "Healthcare",
            skills: ["Figma", "UI/UX"],
            postedAt: new Date(),
            applicants: 22,
        },
        {
            _id: "4",
            role: "Full Stack Developer",
            company: "Fallback Systems",
            experience: "2-4 yrs",
            location: "Pune",
            salary: "6-10 LPA",
            industry: "SaaS",
            skills: ["React", "Node.js"],
            postedAt: new Date(),
            applicants: 66,
        }
    ];

    // This state ALWAYS has job list (either fallback or backend)
    const [jobs, setJobs] = useState<any[]>(fallbackJobs);
    const [loading, setLoading] = useState(true);

    // -----------------------------------------------------------
    // LOCAL FILTERING (applied when backend is OFF)
    // -----------------------------------------------------------
    const applyLocalFilters = () => {
        let filtered = [...fallbackJobs];
        const f = selectedFilters;

        // Location filter
        if (f.location) {
            filtered = filtered.filter((job) => f.location.includes(job.location));
        }

        // Experience filter
        if (f.experience) {
            filtered = filtered.filter((job) => f.experience.includes(job.experience));
        }

        // Salary filter
        if (f.salary) {
            filtered = filtered.filter((job) => f.salary.includes(job.salary));
        }

        // Industry
        if (f.industry) {
            filtered = filtered.filter((job) =>
                f.industry.some((ind: string) =>
                    job.company.toLowerCase().includes(ind.toLowerCase())
                )
            );
        }

        // Function
        if (f.function) {
            filtered = filtered.filter((job) =>
                f.function.some((fn: string) =>
                    job.role.toLowerCase().includes(fn.toLowerCase())
                )
            );
        }

        // FullStack filter
        if (f.fullStack === true) {
            filtered = filtered.filter((job) =>
                job.role.toLowerCase().includes("developer")
            );
        }

        // Job Type (fallback uses Full-time for all)
        if (f.jobType) {
            filtered = filtered.filter((job) =>
                f.jobType.includes("Full-time")
            );
        }

        return filtered;
    };


    // -----------------------------------------------------------
    // MAIN EFFECT: fetch backend + apply filters
    // -----------------------------------------------------------
    useEffect(() => {
        // 1) Always apply fallback filters instantly
        setJobs(applyLocalFilters());
        setLoading(true);

        // 2) Backend fetch
        const fetchJobs = async () => {
            try {
                const params = new URLSearchParams();
                params.append("page", String(page));
                params.append("limit", "10");

                // Apply filters to request
                Object.entries(selectedFilters).forEach(([key, value]) => {
                    if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
                    else if (value !== undefined) params.append(key, String(value));
                });

                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs?${params.toString()}`);

                if (!res.ok) throw new Error("Backend offline");

                const data = await res.json();

                // Backend returns jobs
                if (data?.data?.length > 0) {
                    const normalized = data.data.map((job: any) => ({
                        ...job,
                        postedAt: job.postedAt ? new Date(job.postedAt) : new Date(),
                        applicants: job.applicants ?? 0,
                        skills: job.skills ?? [],
                    }));

                    setJobs(normalized);
                } else {
                    // Backend empty → fallback
                    setJobs(applyLocalFilters());
                }

            } catch (err) {
                console.log("Backend offline → using fallback data " + err);
                setJobs(applyLocalFilters());
            }

            setLoading(false);
        };

        fetchJobs();

    }, [JSON.stringify(selectedFilters), page]); // stable dependency

    return { jobs, loading };
}

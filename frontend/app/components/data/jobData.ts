export default interface Job {
  _id: string; // MongoDB ID

  role: string;
  company: string;
  location: string;
  experience: string;
  salary: string;

  function: string;       // backend filter supported
  industry: string;       // backend filter supported
  fullStack: boolean;
  jobType: string;

  skills: string[];
  description: string;

  saved: boolean;

  applicants: number;
  postedAt: Date;
  createdAt: Date;
}

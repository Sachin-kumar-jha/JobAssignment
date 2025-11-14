// run: node seed.js (after setting MONGO_URI)
import mongoose from 'mongoose';
import {Job} from "./model/Job.js"
import dotenv from "dotenv";
dotenv.config();

const roles = [
  "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "React Developer", "Node.js Developer", "UI/UX Designer",
  "Product Designer", "DevOps Engineer", "Data Analyst",
  "Mobile App Developer", "SDE I", "SDE II"
];

const companies = [
  "TechVision", "DataWorks", "CreativeHub", "CloudStack",
  "InnovateX", "ByteForge", "FutureLabs", "StackForge",
  "PixelSoft", "FastNet"
];

const locations = ["Delhi", "Bengaluru", "Mumbai", "Pune", "Hyderabad", "Chennai"];

const experiences = ["0-2 yrs", "2-4 yrs", "4-6 yrs"];

const salaries = ["3-5 LPA", "6-10 LPA", "12-18 LPA"];

const functions = ["Engineering", "Product", "Design", "Sales", "Data"];

const industries = ["SaaS", "Fintech", "Healthcare", "E-commerce", "AI/ML"];

const jobTypes = ["Full-time", "Internship"];

const skillsPool = [
  "React", "Node.js", "MongoDB", "Express", "JavaScript", "TypeScript",
  "Figma", "UI/UX", "Docker", "TailwindCSS", "Next.js", "SQL"
];

// ---------------- Random Helpers ----------------
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomSkills = () => {
  const count = Math.floor(Math.random() * 4) + 2; // 2–5 skills
  const chosen = new Set();
  while (chosen.size < count) chosen.add(random(skillsPool));
  return [...chosen];
};

const randomDescription = () =>
  `This is a generated job description. Work on modern tech stack, collaborate with teams, and build high-quality applications.`;

// Random date in last 30 days
const randomPostedAt = () => {
  const daysAgo = Math.floor(Math.random() * 30) + 1; // between 1–30
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

// Random applicants
const randomApplicants = () => Math.floor(Math.random() * 490) + 10; // 10–500

// ---------------- Generate 50 Jobs ----------------
const generateJobs = (count = 50) => {
  const list = [];
  for (let i = 0; i < count; i++) {
    const role = random(roles);
    const company = random(companies);

    list.push({
      role,
      company,
      location: random(locations),
      experience: random(experiences),
      salary: random(salaries),
      function: random(functions),
      industry: random(industries),
      fullStack: role.toLowerCase().includes("full stack"),
      jobType: random(jobTypes),
      skills: randomSkills(),
      description: randomDescription(),
      postedAt: randomPostedAt(),
      applicants: randomApplicants(),
      saved: false
    });
  }
  return list;
};

// ---------------- Seeder ----------------
async function seedDB() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Clearing existing jobs...");
    await Job.deleteMany({});

    console.log("Generating jobs...");
    const jobs = generateJobs(50);

    console.log("Inserting into DB...");
    await Job.insertMany(jobs);

    console.log("✔ Seeding completed with 50 realistic jobs!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed Error:", err);
    process.exit(1);
  }
}

seedDB();
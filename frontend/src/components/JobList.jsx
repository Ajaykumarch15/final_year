import { useEffect, useState } from "react";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }
        return res.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading jobs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      {jobs.length === 0 && <p>No jobs available</p>}

      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-white p-4 rounded shadow"
        >
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-600">{job.company}</p>
          <p className="mt-2">{job.description}</p>
          <p className="mt-2 text-sm text-blue-600">
            Skills: {job.skills.join(", ")}
          </p>
          <p className="mt-1 text-sm text-green-600">
            Eligibility: {job.eligibility}
          </p>
        </div>
      ))}
    </div>
  );
}

export default JobList;

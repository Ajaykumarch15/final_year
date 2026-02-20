const isEligible = (student, job) => {
    // CGPA Check
    if (student.cgpa < job.minCGPA) return false;

    // Branch Check
    if (
        job.eligibleBranches.length > 0 &&
        !job.eligibleBranches.includes(student.branch)
    ) {
        return false;
    }

    return true;
};

module.exports = isEligible;

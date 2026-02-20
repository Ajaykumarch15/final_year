const calculateSkillScore = (studentSkills, jobSkills) => {
    if (!jobSkills.length) return 0;

    const matched = jobSkills.filter((skill) =>
        studentSkills.includes(skill)
    );

    return (matched.length / jobSkills.length) * 100;
};

const calculateCGPAScore = (cgpa) => {
    return (cgpa / 10) * 100;
};

const calculateBranchScore = (studentBranch, jobBranches) => {
    if (jobBranches.includes(studentBranch)) return 100;
    return 0;
};

const calculateFinalScore = (
    skillScore,
    cgpaScore,
    branchScore
) => {
    return (
        0.6 * skillScore +
        0.25 * cgpaScore +
        0.15 * branchScore
    );
};

module.exports = {
    calculateSkillScore,
    calculateCGPAScore,
    calculateBranchScore,
    calculateFinalScore,
};

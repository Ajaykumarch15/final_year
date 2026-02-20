const calculateSkillScore = (studentSkills = [], jobSkills = []) => {
    if (jobSkills.length === 0) {
        return 0;
    }

    // Normalize skills to lowercase for safe comparison
    const normalizedStudentSkills = studentSkills.map(skill =>
        skill.toLowerCase().trim()
    );

    const normalizedJobSkills = jobSkills.map(skill =>
        skill.toLowerCase().trim()
    );

    // Count matched skills
    const matchedSkills = normalizedJobSkills.filter(skill =>
        normalizedStudentSkills.includes(skill)
    );

    const score = (matchedSkills.length / normalizedJobSkills.length) * 100;

    return Number(score.toFixed(2));
};

module.exports = calculateSkillScore;

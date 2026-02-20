const rankMatches = (matches) => {
    return matches
        .sort((a, b) => b.finalScore - a.finalScore)
        .map((match, index) => ({
            ...match,
            rank: index + 1,
        }));
};

module.exports = rankMatches;

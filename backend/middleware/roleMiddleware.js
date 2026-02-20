const User = require("../models/User");

const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    const userId = req.headers.userid;

    if (!userId) {
      return res.status(401).json({ message: "User ID missing" });
    }

    const user = await User.findById(userId);

    if (!user || user.role !== requiredRole) {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = user;
    next();
  };
};

module.exports = checkRole;

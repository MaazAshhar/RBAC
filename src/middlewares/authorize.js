// this will authorize the user whether the user is authorized or not based on their role
export const authorize = (roles) => {
  return (req, res, next) => {
    if (typeof(roles) == 'string') {
        roles = [roles];
    }
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

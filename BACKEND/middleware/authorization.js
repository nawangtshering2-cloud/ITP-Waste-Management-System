const normalizeRole = (role) => String(role || "").trim().toLowerCase();

const authorizeRoles = (allowedRoles = []) => (req, res, next) => {
  const currentRole = normalizeRole(req.user && req.user.role);
  const normalizedAllowedRoles = allowedRoles.map(normalizeRole);

  if (!normalizedAllowedRoles.includes(currentRole)) {
    return res.status(403).json({
      success: false,
      message: "You do not have permission to access this resource.",
    });
  }

  return next();
};

module.exports = { normalizeRole, authorizeRoles };
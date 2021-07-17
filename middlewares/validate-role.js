const isRoleAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "You want to validate the role, without validating the token first",
    });
  }

  const { role, name } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name}, you are not an administrator - you cannot do this`,
    });
  }

  next();
};

const hasRole = (...roles) => {
  //A return function is created because it is what a middleware expects
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "You want to validate the role, without validating the token first",
      });
    }

    const { role } = req.user;

    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: `The service requires one of these roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isRoleAdmin,
  hasRole,
};

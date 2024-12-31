import jwt from "jsonwebtoken";

const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  jwt.verify(authHeader, "Key", (error, user) => {
    if (error) {
      return res.status(404).json({
        message: "Forbidden",
        success: false,
        error: error.message,
      });
    }

    req.user = user;

    next();
  });
};

export default authentication;

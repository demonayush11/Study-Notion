const jwt = require("jsonwebtoken");
require("dotenv").config();

// ================== AUTH ==================
exports.auth = (req, res, next) => {
  try {
    let token = null;

    // 1. From cookie
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // 2. From header
    else if (req.headers && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        token = parts[1];
      }
    }
    // 3. From body
    else if (req.body && req.body.token) {
      token = req.body.token;
    }

    // If no token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    return next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Token is invalid",
    });
  }
};

// ================== ROLE GUARDS ==================
exports.isStudent = (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(403).json({
        success: false,
        message: "This is a protected route for Students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

exports.isInstructor = (req, res, next) => {
  try {
    if (req.user.accountType !== "instructor") {
      return res.status(403).json({
        success: false,
        message: "This is a protected route for Instructors only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "This is a protected route for Admins only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

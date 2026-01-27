// server/utils/errorHandler.js
export default function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;

  // שגיאות Mongoose נפוצות
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  if (err.code === 11000) {
    // duplicate key
    return res.status(409).json({ message: "Duplicate key error" });
  }

  res.status(status).json({
    message: err.message || "Server error",
  });
}

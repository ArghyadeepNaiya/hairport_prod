const error_handler = (err, req, res, next) => {
    console.error("🔥 SERVER ERROR:", err);
    
    const statusCode = err.statusCode || err.statuscode || 500;
    const message = err.message || "An internal server error occurred";

    // Never expose stack traces to the client in production
    return res.status(statusCode).render('error.ejs', {
        statusCode,
        message
    });
}
module.exports = error_handler;
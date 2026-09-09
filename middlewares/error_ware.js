const error_handler = (err, req, res, next) => {
    console.error("🔥 SERVER ERROR:", err); // <-- This prints the error to your terminal
    
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "some inter server error occured";
    return res.status(err.statuscode).json({
       success: false,
       message: err.message,
       stack: err.stack 
    });
}
module.exports = error_handler;
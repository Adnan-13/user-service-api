const handleError = (err) => {
    const error = {
        status: 400,
    };

    let specificErrorNotFound = true;

    if (err.message.includes('validation')) {
        specificErrorNotFound = false;
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message;
        });
    }

    if (err.message.includes('Cast to ObjectId failed')) {
        specificErrorNotFound = false;
        error.message = 'Invalid ID';
    }

    if (err.message.includes('not found')) {
        specificErrorNotFound = false;
        error.status = 404;
        error.message = err.message;
    }

    if (err.message.includes('Invalid email or password')) {
        specificErrorNotFound = false;
        error.status = 401;
        error.message = err.message;
    }

    if (err.code === 11000) {
        specificErrorNotFound = false;
        error.email = 'Email already exists';
    }

    if (specificErrorNotFound) {
        error.status = 500;
        error.message = err.message || 'Internal Server Error';
    }

    return error;
};

module.exports = handleError;

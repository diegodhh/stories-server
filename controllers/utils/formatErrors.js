exports.trhowValidationError = (errorsArray) =>{
    const error = new Error('validation error');
        error.status = 422;
        error.data=errorsArray;
        throw error;
}
exports.trhowBadRequest = (errorsArray) =>{
    const error = new Error('bad request');
        error.status = 400;
        error.data=errorsArray;
        throw error;
}
exports.trhowForbidden = (errorsArray) =>{
    const error = new Error('forbidden');
        error.status = 401;
        error.data=errorsArray;
        throw error;
}
exports.handleErrorRespond = (err, res) =>{
    res.status(err.status).json({ errors: err.data });
}

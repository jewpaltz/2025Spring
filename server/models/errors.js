/*  B"H
*/

class CustomError extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

const statusCodes = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,

    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    NOT_MODIFIED: 304,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,        

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,

    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,

}

module.exports = {
    CustomError,
    statusCodes,
}
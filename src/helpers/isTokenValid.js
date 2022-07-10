import jwt_decode from 'jwt-decode';

// Helper function to check if token is still valid.

function isTokenValid(jwtToken) {
    // Decode token and get expiration time stamp.
    const decodedToken = jwt_decode(jwtToken)
    const expirationUnix = decodedToken.exp;

    // Get current time and transform to unix.
    const now = new Date().getTime();
    const nowInUnix = Math.round(now / 1000);

    // If there is time left return true.
    return (expirationUnix - nowInUnix > 0);
}

export default isTokenValid;
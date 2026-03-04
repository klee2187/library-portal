// Wait for Swagger UI to finish loading
window.onload = function () {
    const swaggerJwt = this.document.cookie
    .split('; ')
    .find(row => row.startsWith('swagger_jwt='))
    ?.split('=')[1];

    // Fallback to swagger_token if non-HttpOnly
    const swaggerToken = getCookie('swagger_token');

    const token = swaggerJwt || swaggerToken;

    if(token && window.ui) {
        ui.preauthorizeApiKey('BearerAuth', token)
    }
};

// Read cookie value
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';'). shift();
}


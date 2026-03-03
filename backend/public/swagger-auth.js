// Wait for Swagger UI to finish loading
window.onload = function () {
    const token = getCookie('swagger-token');
    if(token) {
        ui.preauthorizeApiKey('BearerAuth', token)
    }
};

// Read cookie value
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';'). shift();
}


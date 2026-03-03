// Read cookie value
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';'). shift();
}

// Wait for Swagger UI to finish loading
windiw.onload = function () {
    const token = getCookie('jwt');

    // If token exists, preauthorize
    if (token && window.ui) {
        window.ui.preauthorizeApiKey('BearerAuth', token);
    }
};
class AuthService {
    constructor() {}
    isAuthenticated() {
        return !!localStorage.getItem('ae_token');
    }

    getToken() {
        return localStorage.getItem('ae_token');
    }

    login(token) {
        localStorage.setItem('ae_token', token);
    }

    logout() {
        localStorage.clear();
        window.location.href = '/login';
    }
}
const authService = new AuthService();
export { authService };

class AuthService {
    constructor() {}
    isAuthenticated() {
        return !!sessionStorage.getItem('ae_token');
    }

    logout() {
        sessionStorage.clear();
        window.location.href = '/login';
    }
}
const authService = new AuthService();
export { authService };

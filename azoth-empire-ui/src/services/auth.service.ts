class AuthService {
    constructor() {}
    isAuthenticated() {
        return !!localStorage.getItem('ae_token');
    }

    getToken() {
        return localStorage.getItem('ae_token');
    }

    getId() {
        return localStorage.getItem('ae_id');
    }

    getRoles() {
        return JSON.parse(localStorage.getItem('ae_roles') || '[]');
    }

    login(login) {
        const { token, id, roles } = login;
        localStorage.setItem('ae_token', token);
        localStorage.setItem('ae_id', id);
        localStorage.setItem('ae_roles', JSON.stringify(roles));
    }

    logout() {
        localStorage.clear();
        window.location.href = '/login';
    }
}
const authService = new AuthService();
export { authService };

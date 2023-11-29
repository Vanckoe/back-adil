import httpClient from "./https.service"
import router from "@/router"

const authService = {
    async login(formData) {
        try {
            const response = await httpClient.post('/auth/login', formData);
            if (response && response.data) {
                localStorage.setItem('authToken', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user)); 
                localStorage.setItem('roles', response.data.user.roles[0]); 

                return { success: true, data: response.data };
            } else {
                return { success: false, data: null, errors: { message: 'No response data' }};
            }
        } catch (error) {
            return { success: false, data: null, errors: error.response ? error.response.data.errors : error };
        }
    },
    logout() {
        localStorage.clear();
        router.push({name: 'login'});
    },
    getToken() {
        return localStorage.getItem('authToken');
    },
    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    },
    isLoggedIn() {
        return !!this.getToken();
    }
}

export default authService;

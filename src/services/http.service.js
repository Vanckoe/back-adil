import axios from 'axios';

const API_ENDPOINT = 'https://dummyjson.com/';
let config = {
    baseURL: `${API_ENDPOINT}`
};

const httpClient = axios.create(config);

httpClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

function getProduct(productId) {
    return httpClient.get(`products/${productId}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Ошибка при получении продукта:', error);
            throw error;
        });
}

export default httpClient;
export { getProduct };
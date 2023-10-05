import httpClient from "../../../services/http.service";

const productsdata = {
    namespaced: true,
    state: {
        products: [],
    },
    actions: {
        async GET_PRODUCTS({ commit }) {
            try {
                const { status, data } = await httpClient.get('products');
                if (status === 200 && data.products) {  
                    commit('SET_PRODUCTS', data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        },
        async CREATE_PRODUCT({ commit }, productData) {
            try {
                const response = await fetch('https://dummyjson.com/products/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData)
                });
                const data = await response.json();
                if (response.ok) {
                    commit('ADD_PRODUCT', data);
                } else {
                    console.error("Error creating product:", data);
                    throw new Error(data.message || "Error creating product");
                }
            } catch (error) {
                console.error("Error creating product:", error);
            }
        },
        async UPDATE_PRODUCT_BY_ID({ commit }, { id, updatedProductData }) {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedProductData)
                });
                const data = await response.json();
                if (response.ok) {
                    commit('UPDATE_PRODUCT_BY_ID', { id, updatedProductData: data });
                } else {
                    console.error("Error updating product:", data);
                    throw new Error(data.message || "Error updating product");
                }
            } catch (error) {
                console.error("Error updating product:", error);
            }
        },
        async DELETE_PRODUCT({ commit }, productId) {
            try {
              const response = await httpClient.delete(`products/${productId}`);
              if (response.status === 200) {
                commit('REMOVE_PRODUCT', productId); 
              }
            } catch (error) {
              console.error("Error deleting product:", error);
            }
          },
    },
    mutations: {
        SET_PRODUCTS(state, backendData) {
            state.products = backendData.products || [];  
        },
        ADD_PRODUCT(state, newProduct) {
            state.products.push(newProduct);
        },
        UPDATE_PRODUCT_BY_ID(state, { id, updatedProductData }) {
            const productIndex = state.products.findIndex(p => p.id === id);
            if (productIndex !== -1) {
                state.products[productIndex] = updatedProductData;
            }
        },
        REMOVE_PRODUCT(state, id) {
            const productIndex = state.products.findIndex(p => p.id === id);
            if (productIndex !== -1) {
                state.products.splice(productIndex, 1);
            }
        },
    },
};

export default productsdata;

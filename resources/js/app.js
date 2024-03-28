import { createApp, ref } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import VueCookie from 'vue-cookie';

import App from './components/App.vue';
import ProductList from './components/ProductList.vue';
import ProductForm from './components/ProductForm.vue';
import Product from './components/Product.vue';

const app = createApp(App);
let isAuthenticated = ref(false);
app.use(VueCookie);
app.provide('cookies', app.config.globalProperties.$cookies);
app.provide('isAuthenticated', isAuthenticated);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: ProductList
        },
        {
            path: '/products/list',
            component: ProductList
        },
        {
            path: '/products/create',
            component: ProductForm
        },
        {
            path: '/products/:id/edit',
            component: ProductForm
        },
        {
            path: '/products/:id',
            component: Product
        },
    ]
});
app.use(router);

app.mount("#app");

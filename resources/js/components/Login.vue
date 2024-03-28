<template>
    <div>
        <div v-if="showLoginForm">
            <form @submit.prevent="login">
                <div v-if="!isAuthenticated">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" v-model="form.email"/>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" v-model="form.password"/>
                    </div>
                    <button type="submit" class="btn btn-success" style="margin-bottom: 10px; margin-top: 10px">Login</button>
                </div>
            </form>
            <button @click="toggleForm" class="btn btn-info">Register</button>
        </div>
        <div v-else>
            <form @submit.prevent="register">
                <div v-if="!isAuthenticated">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" name="name" v-model="registerForm.name"/>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" name="email" v-model="registerForm.email"/>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" name="password" v-model="registerForm.password"/>
                    </div>
                    <button type="submit" class="btn btn-success"  style="margin-bottom: 10px; margin-top: 10px">Submit</button>
                </div>
            </form>
            <button @click="toggleForm" class="btn btn-info">Back to Login</button>
        </div>
    </div>
</template>

<script>
import { reactive, inject, ref } from 'vue';
import axios from 'axios';

export default {
    name: 'Login',
    setup() {
        let cookies = inject('cookies');
        let isAuthenticated = inject('isAuthenticated');
        const form = reactive({
            email: '',
            password: ''
        });
        const registerForm = reactive({
            name: '',
            email: '',
            password: ''
        });
        const showLoginForm = ref(true);

        const login = async () => {
            try {
                let res = await axios.post('api/login', form)
                if (res.data.access_token) {
                    cookies.set('access_token', res.data.access_token)
                    isAuthenticated.value = true
                }
            } catch (error) {
                alert("Thông tin tài khoản không chính xác")
            }
        }

        const register = async () => {
            try {
                await axios.post('/api/register', registerForm)
                registerForm.name = ''
                registerForm.email = ''
                registerForm.password = ''
                alert("Đăng ký tài khoản thành công")
            } catch (error){
                alert("Đăng ký tài khoản không thành công")
            }

        }
        const toggleForm = () => {
            showLoginForm.value = !showLoginForm.value;
        }
        return {
            form,
            registerForm,
            login,
            register,
            toggleForm,
            isAuthenticated,
            showLoginForm
        }
    }
}
</script>



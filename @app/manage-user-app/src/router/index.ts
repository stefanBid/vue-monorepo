import {createRouter, createWebHistory} from 'vue-router';

import UsersDashboard from '../views/UsersDashboardView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: UsersDashboard
        }
]
});

export default router;
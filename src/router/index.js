import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),

    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: () => import('@/views/home/home-01.vue')
        },
        {
            path: '/favor',
            component: () => import('@/views/favor/favor.vue')
        },
        {
            path: '/order',
            component: () => import('@/views/order/order.vue')
        },
        {
            path: '/message',
            component: () => import('@/views/message/message.vue')
        },
        {
            name: 'city',
            path: '/city',
            component: () => import('@/views/city/city.vue'),
            meta: {
                hiddenNavbar: true
            }
        },
        {
            path: '/search',
            component: () => import('@/views/search/search.vue'),
            meta: {
                hiddenNavbar: true
            }
        },
        {
            path: '/detail/:id',
            component: () => import('@/views/detail/detail.vue'),
            meta: {
                hiddenNavbar: true
            }
        }
    ]
})

export default router
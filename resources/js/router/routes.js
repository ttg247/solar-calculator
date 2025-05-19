// src/router/routes.js
export const routes = [
  {
    path: '/',
    redirect: '/buy-electricity',
  },
  {
    path: '/',
    component: () => import('@/Layouts/DefaultLayout.vue'),
    children: [
      {
        path: 'buy-electricity',
        component: () => import('@/Pages/BuyElectricity.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'transactions',
        component: () => import('@/Pages/Transactions.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'deposit',
        component: () => import('@/pages/Deposit.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'profile',
        //component: () => import('@/Pages/Profile.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/',
    //component: () => import('@/Layouts/blank.vue'),
    children: [
      {
        path: 'login',
       // component: () => import('@/Pages/Login.vue'),
      },
      {
        path: 'register',
       // component: () => import('@/Pages/Register.vue'),
      },
      {
        path: 'logout',
       // component: () => import('@/Pages/Logout.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        // component: () => import('@/Pages/NotFound.vue'),
      },
    ],
  },
];

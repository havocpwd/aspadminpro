import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
      path: '/',
      redirect: 'dashboard',
      component: () => import('@/layouts/Layout'),
      children: [
          // Components
          {
              name: 'Alerts',
              path: 'pages/alerts',
              component: () => import('@/views/pages/Alerts'),
          },

          {
              name: 'Profile',
              path: 'pages/profile',
              component: () => import('@/views/pages/Profile'),
          },

          {
              name: 'Icons',
              path: 'pages/icons',
              component: () => import('@/views/pages/Icons'),
          },

          {
              name: 'TableSimple',
              path: 'pages/tables-simple',
              component: () => import('@/views/pages/TableSimple'),
          },
          {
            path: '/home',
            redirect: 'dashboard',
          },
          {
              name: 'Dashboard',
              path: 'dashboard',
              component: () => import('@/views/dashboard/index'),
          },
          {
            path: '/payments',
            name: 'Payment',
            component: () => import('@/views/masterdata/PaymentView.vue')
          },
          {
            path: '/currencies',
            name: 'Mata Uang',
            component: () => import('@/views/masterdata/CurrencyView.vue')
          },
          {
            path: '/uom',
            name: 'Unit Of Measure',
            component: () => import('@/views/masterdata/UomView.vue')
          },
          {
            path: '/category',
            name: 'Category',
            component: () => import('@/views/masterdata/CategoryView.vue')
          },
          {
            path: '/products',
            name: 'Products',
            component: () => import('@/views/masterdata/ProductView.vue')
          },
          {
            path: '/customers',
            component: () => import('@/views/customers/indexComponent'),
            children: [
              {
                path: '',
                name:'Pelanggan',
                component: () => import('@/views/customers/listComponent.vue')
              },
              {
                path: 'history',
                name:'Riwayat Pelanggan',
                component: () => import('@/views/customers/historyComponent.vue')
              },
            ]
          },
          {
            path: '/suppliers',
            component: () => import('@/views/suppliers/indexComponent.vue'),
            children: [
              {
                path: '',
                name:'Supplier',
                component: () => import('@/views/suppliers/listComponent.vue')
              },
              {
                path: 'history',
                name:'Riwayat Supplier',
                component: () => import('@/views/suppliers/historyComponent.vue')
              }
            ]
          },
          {
            path: '/so',
            component: () => import('@/views/saleorders/indexComponent.vue'),
            children: [
              {
                path: '',
                name:'Sales Orders',
                component: () => import('@/views/saleorders/listComponent.vue')
              },
              {
                path: 'new',
                name:'New Order',
                component: () => import('@/views/saleorders/newComponent.vue')
              },
              {
                path: 'reports',
                name:'Laporan',
                component: () => import('@/views/saleorders/reportComponent.vue')
              },
              {
                path: ':id',
                name:'EditOrder',
                props: true,
                component: () => import('@/views/saleorders/newComponent.vue')
              }
            ]
          },
          {
            path: '/po',
            component: () => import('@/views/purchaseorders/indexComponent.vue'),
            children: [
              {
                path: '',
                name:'Purchase Orders',
                component: () => import('@/views/purchaseorders/listComponent.vue')
              },
              {
                path: 'new',
                name:'New Purchase Order',
                component: () => import('@/views/purchaseorders/newComponent.vue')
              },
              {
                path: 'reports',
                name:'LaporanPembelian',
                component: () => import('@/views/purchaseorders/reportComponent.vue')
              },
              {
                path: ':id',
                name:'EditPurchaseOrder',
                props: true,
                component: () => import('@/views/purchaseorders/newComponent.vue')
              }
            ]
          },
      ]
  },
  {
    path: '/:catchAll(.*)*',
    name: "pageNotFound",
    component: () => import('@/views/pages/404'),
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

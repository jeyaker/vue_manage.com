const Home = () => import( /*webpackChunkName:"group-foo"*/ 'views/home');
const User = () => import( /*webpackChunkName:"group-foo"*/ 'views/user');
const Merchant = () => import( /*webpackChunkName:"group-foo"*/ 'views/merchant');
const Food = () => import( /*webpackChunkName:"group-foo"*/ 'views/food');
const Order = () => import( /*webpackChunkName:"group-foo"*/ 'views/order');
const Admin = () => import( /*webpackChunkName:"group-foo"*/ 'views/admin');
const ShopAdd = () => import( /*webpackChunkName:"group-foo"*/ 'views/shop_add');
const GoodsAdd = () => import( /*webpackChunkName:"group-foo"*/ 'views/goods_add');
const Chart = () => import( /*webpackChunkName:"group-foo"*/ 'views/chart');
const Edit = () => import( /*webpackChunkName:"group-foo"*/ 'views/edit');
const Setting = () => import( /*webpackChunkName:"group-foo"*/ 'views/setting');
const Explain = () => import( /*webpackChunkName:"group-foo"*/ 'views/explain');
const Login = () => import( /*webpackChunkName:"group-foo"*/ 'views/login');
const Register = () => import( /*webpackChunkName:"group-foo"*/ 'views/register');
const ShopUpdate = () => import( /*webpackChunkName:"group-foo"*/ 'views/shop_update');
const Error = () => import( /*webpackChunkName:"group-foo"*/ 'views/error');


const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        name: 'home',
        meta: {
            name: 'Home',
            // title: ['首页']
        },
        beforeEnter(to, from, next) {
            const token = localStorage.getItem('token');
            // console.log(token);

            // console.log(to);
            // console.log(from);

            if (token) {
                next();
            } else {
                next('/login');
            }

        }
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta: {
            name: 'Login',
        },
        beforeEnter(to, from, next) {
            const token = localStorage.getItem('token');

            if (token) {
                next('/home');
            } else {
                next();
            }

        }
    }, {
        path: '/register',
        component: Register,
        name: 'register',
        meta: {
            name: 'Register',
        },
        beforeEnter(to, from, next) {
            const token = localStorage.getItem('token');

            if (token) {
                next('/home');
            } else {
                next();
            }

        }
    },
    {
        path: '/user',
        component: User,
        name: 'user',
        meta: {
            name: 'User'
        }
    },
    {
        path: '/merchant',
        component: Merchant,
        name: 'merchant',
        meta: {
            name: 'Merchant'
        }
    },
    {
        path: '/shop_update',
        component: ShopUpdate,
        name: 'shop_update',
        meta: {
            naem: 'ShopUpdate'
        }
    },
    {
        path: '/food',
        component: Food,
        name: 'food',
        meta: {
            name: 'Food'
        }
    },
    {
        path: '/order',
        component: Order,
        name: 'order',
        meta: {
            name: 'Order'
        }
    },
    {
        path: '/admin',
        component: Admin,
        name: 'admin',
        meta: {
            name: 'Admin'
        }
    },
    {
        path: '/shop_add',
        component: ShopAdd,
        name: 'shop_add',
        meta: {
            name: 'ShopAdd'
        }
    },
    {
        path: '/goods_add',
        component: GoodsAdd,
        name: 'goods_add',
        meta: {
            name: 'GoodsAdd'
        }
    },
    {
        path: '/chart',
        component: Chart,
        name: 'chart',
        meta: {
            name: 'Chart'
        }
    },
    {
        path: '/edit',
        component: Edit,
        name: 'edit',
        meta: {
            name: 'Edit'
        }
    },
    {
        path: '/setting',
        component: Setting,
        name: 'setting',
        meta: {
            name: 'Setting'
        }
    },
    {
        path: '/explain',
        component: Explain,
        name: 'explain',
        meta: {
            name: 'Explain'
        }
    },
    {
        path: '*',
        component: Error,
        name: 'error',
        meta: {
            name: 'Error'
        }
    }
]

export default routes;
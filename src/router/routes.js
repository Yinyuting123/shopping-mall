import store from '@/store'

const Home = ()=>import('@/views/home')
const Search = ()=>import('@/views/search')
const Register = ()=>import('@/views/register')
const Login = ()=>import('@/views/login')
const ShopCart = ()=>import('@/views/shopcart')
const Detail = ()=>import('@/views/detail')
const AddCartSuccess = ()=>import('@/views/addCartSuccess')
const Trade = ()=>import('@/views/trade')
const Pay = ()=>import('@/views/pay')
const PaySuccess = ()=>import('@/views/paySuccess')
const Center = ()=>import('@/views/center')
const MyOrder = ()=>import('@/views/center/myOrder')
const GroupOrder = ()=>import('@/views/center/groupOrder')

export default [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      meta: {
        show: true
      }
    },
    {
      path: '/search/:keyword?',
      name: 'search',
      component: Search,
      meta: {
        show: true
      },
      // props: true,
      // props: {
      //   a: 1,
      //   b: 2
      // }
      props: ($route)=>{
        return {
          keyword: $route.params.keyword,
          k: $route.query.k
        }
      }
    },
    {
      path: '/detail/:skuId',
      name: 'detail',
      component: Detail
    },
    {
      path: '/login',
      component: Login,
      meta: {
        show: false
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        show: false
      }
    },
    {
      path: '/addcartsuccess',
      component: AddCartSuccess,
      meta: {
        show: true
      }
    },
    {
      path: '/shopcart',
      component: ShopCart,
      meta: {
        show: true
      }
    }, 
    {
      path: '/trade',
      component: Trade,
      meta: {
        show: true
      },
      // 路由独享守卫
      beforeEnter: (to, from, next) => {
        // 去交易页面必须从购物车来
        console.log(from);
        if(from.path === '/shopcart') {
          next()
        } else {
          next(from.path)
        }
      }
    },
    {
      path: '/pay',
      component: Pay,
      beforeEnter: (to, from, next) => {
        if(from.path === '/trade') {
          next()
        } else {
          next(from.path)
        }
      }
    },
    {
      path: '/paysuccess',
      component: PaySuccess
    },
    {
      path: '/center',
      component: Center,
      meta: {
        show: true
      },
      children: [
        {
          path: '',
          redirect: 'myorder'
        },
        {
        path: 'myorder',
        component: MyOrder
        },
        {
          path: 'grouporder',
          component: GroupOrder
        }
      ]
    }
  ]
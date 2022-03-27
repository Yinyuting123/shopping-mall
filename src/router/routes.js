const Home = ()=>import('@/views/home')
const Search = ()=>import('@/views/search')
const Register = ()=>import('@/views/register')
const Login = ()=>import('@/views/login')
const ShopCart = ()=>import('@/views/shopcart')
const Center = ()=>import('@/views/center')
const MyOrder = ()=>import('@/views/center/myOrder')
const Detail = ()=>import('@/views/detail')
const AddCartSuccess = ()=>import('@/views/addCartSuccess')

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
      path: '/center',
      component: Center,
      meta: {
        show: false
      },
      children: [
        {
          path: '',
          redirect: '/myorder'
        },
        {
        path: '/myorder',
        component: MyOrder
      }]
    }
  ]
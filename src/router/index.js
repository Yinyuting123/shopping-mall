import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

// 引入store
import store from '@/store'
import user from '@/store/modules/user'

//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function(location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function(location, resolve, reject) {
  if(resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // base: '/shopingmall',
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
})

// 全局守卫
router.beforeEach(async (to, from, next) => {
  // to:可以获取到要跳转到的那个路由信息
  // from:可以获取到从哪个路由而来的
  // next:放行函数 next()放行，next('/login') 放行到指定路由
  // next(false) 中断当前导航

  // 用户登录了，才会有token;未登录一定不会有token
  let token = store.state.user.userToken
  // 用户信息
  let userName = store.state.user.userInfo.name
  if(token) {
    // 登陆之后就不让手动写路径访问登录页面
    if(to.path == '/login' || to.path == '/register') {
      next('/home')
    } else {
      // 登陆了，跳转的路由是【home|search|detail|shopcart】
      // 如果用户名存在
      if(userName) {
        next()
      } else {
        // 没有用户信息，派发action让仓库存储用户信息
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch(error) {
          // 获取不到用户信息【token过期失效】
          // 清除token
          await store.dispatch('logout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录，不能访问哪些路径【购物车、交易页面、支付相关等】
    let toPath = to.path
    if(toPath == '/trade' || toPath.indexOf('/center') != -1 || toPath.indexOf('/pay') != -1) {
      // 把未登录的时候想去而没有去成的信息，存储于地址栏中【路由】
      next('/login?redirect=' +toPath)
    } else {
      next()
    }
  }
})

export default router

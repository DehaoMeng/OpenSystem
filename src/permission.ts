import router from "@/router";
import type {RouteLocationNormalized, NavigationGuardNext} from "vue-router";

import nprogress from "nprogress";
import 'nprogress/nprogress.css';
import {toRefs} from "vue";
import {useTokenStore} from "@/stores/Token";
/* 路由守卫  判断用户是否登陆*/
// 跳转进度条 使用 nprogress  npm i nprogress
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const {token, setToken, root} = toRefs(useTokenStore())
    nprogress.start()
    if (token.value) {
        if (to.name == 'root') {
            if (from.fullPath == '/' && root.value != null){
                next({name: root.value})
            }else {
                next(from.fullPath)
            }
        } else {
            next()
        }
    } else {
        if (to.name == 'root') {
            next()
        } else {
            next({name: "root", query: {redirect: to.path}})
        }
    }
})


router.afterEach((ro: RouteLocationNormalized, from: RouteLocationNormalized) => {
    nprogress.done() // 进度条
})

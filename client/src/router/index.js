import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Main/Home'

import Register from '@/components/Main/Register'
import SignIn from '@/components/Main/SignIn'

import Dashboard from '@/components/Dashboard/Index'

import Settings from '@/components/Settings/Index'

import Users from '@/components/Users/Index'
import CreateUser from '@/components/Users/Manage/CreateUser'
import EditUser from '@/components/Users/Manage/EditUser'
// import ViewUser from '@/components/Users/ViewUser/Index'

Vue.use(Router)

export default new Router({
    hashbang: false,
    hash: false,
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/signin',
            name: 'signin',
            component: SignIn
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings
        },
        {
            path: '/users',
            name: 'users',
            component: Users
        },
        // {
        //   path: '/users/:userId',
        //   name: 'user',
        //   component: ViewUser
        // },
        {
            path: '/users/create',
            name: 'user-create',
            component: CreateUser
        },
        {
            path: '/users/:userId/edit',
            name: 'edit-user',
            component: EditUser
        }
    ]
})
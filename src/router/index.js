import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import activities from '@/components/activities'
import donation from '@/components/donation'
import reception from '@/components/reception'
import homecode from '@/components/homecode'
import givecode from '@/components/givecode'
import mycard from '@/components/mycard'
import coverage from '@/components/coverage'

import admin from '@/pages/index'
import details from '@/pages/details'

import wx from '@/components/wx'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/activities',
      name: 'activities',
      component: activities
    },
    {
      path: '/donation',
      name: 'donation',
      component: donation
    },
    {
      path: '/reception',
      name: 'reception',
      component: reception
    },
    {
      path: '/homecode',
      name: 'homecode',
      component: homecode
    },
    {
      path: '/givecode',
      name: 'givecode',
      component: givecode
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/details',
      name: 'details',
      component: details
    },
    {
      path: '/mycard',
      name: 'mycard',
      component: mycard
    }, {
      path: '/wx',
      name: 'wx',
      component: wx
    }, {
      path: '/coverage',
      name: 'coverage',
      component: coverage
    }
  ]
})

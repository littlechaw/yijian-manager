const Vue = require('vue')
const Router = require('vue-router')
const Login = resolve => require(['@/views/login'], resolve)
const regForm = resolve => require(['@/views/regForm'], resolve)
const forgetPsw = resolve => require(['@/views/forgetPsw'], resolve)
const Nav = resolve => require(['@/views/nav'], resolve)
const accountInfo = resolve => require(['@/views/account/accountInfo'], resolve)
const accountRecharge = resolve => require(['@/views/account/accountRecharge'], resolve)
const rechargeAudit = resolve => require(['@/views/account/rechargeAudit'], resolve)
const changePsw = resolve => require(['@/views/account/changePsw'], resolve)
const addUser = resolve => require(['@/views/users/addUser'], resolve)
const userInfo = resolve => require(['@/views/users/userInfo'], resolve)
const bulkShipment = resolve => require(['@/views/order/bulkShipment'], resolve)
const numberQuery = resolve => require(['@/views/order/numberQuery'], resolve)
const shippingQuery = resolve => require(['@/views/order/shippingQuery'], resolve)
const sheetManage = resolve => require(['@/views/order/sheetManage'], resolve)
const orderCourse = resolve => require(['@/views/course/orderCourse'], resolve)
const sysConfig = resolve => require(['@/views/management/sysConfig'], resolve)
const noticeManage = resolve => require(['@/views/management/noticeManage'], resolve)
const sendStatistics = resolve => require(['@/views/statistics/sendStatistics'], resolve)
const rechargeStatistics = resolve => require(['@/views/statistics/rechargeStatistics'], resolve)
const deductionStatistics = resolve => require(['@/views/statistics/deductionStatistics'], resolve)
const profitStatistics = resolve => require(['@/views/statistics/profitStatistics'], resolve)
const blackList = resolve => require(['@/views/black/blackList'], resolve)
const addressmaintain = resolve => require(['@/views/order/addressMaintain'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }, {
      path: '/reg',
      name: 'regForm',
      component: regForm
    }, {
      path: '/forgetPsw',
      name: 'forgetPsw',
      component: forgetPsw
    }, {
      path: '/nav',
      component: Nav,
      name: 'nav',
      children: [{
        path: 'accountInfo',
        component: accountInfo,
        name: 'accountInfo'
      }, {
        path: 'accountRecharge',
        component: accountRecharge,
        name: 'accountRecharge'
      }, {
        path: 'rechargeAudit',
        component: rechargeAudit,
        name: 'rechargeAudit'
      }, {
        path: 'changePsw',
        component: changePsw,
        name: 'changePsw'
      }, {
        path: 'addUser',
        component: addUser,
        name: 'addUser'
      }, {
        path: 'userInfo',
        component: userInfo,
        name: 'userInfo'
      }, {
        path: 'bulkShipment',
        component: bulkShipment,
        name: 'bulkShipment'
      }, {
        path: 'numberQuery',
        component: numberQuery,
        name: 'numberQuery'
      }, {
        path: 'shippingQuery',
        component: shippingQuery,
        name: 'shippingQuery'
      }, {
        path: 'sheetManage',
        component: sheetManage,
        name: 'sheetManage'
      }, {
        path: 'orderCourse',
        component: orderCourse,
        name: 'orderCourse'
      }, {
        path: 'sysConfig',
        component: sysConfig,
        name: 'sysConfig'
      }, {
        path: 'noticeManage',
        component: noticeManage,
        name: 'noticeManage'
      }, {
        path: 'sendStatistics',
        component: sendStatistics,
        name: 'sendStatistics'
      }, {
        path: 'rechargeStatistics',
        component: rechargeStatistics,
        name: 'rechargeStatistics'
      }, {
        path: 'deductionStatistics',
        component: deductionStatistics,
        name: 'deductionStatistics'
      }, {
        path: 'profitStatistics',
        component: profitStatistics,
        name: 'profitStatistics'
      }, {
        path: 'blackList',
        component: blackList,
        name: 'blackList'
      }, {
        path: 'addressmaintain',
        component: addressmaintain,
        name: 'addressmaintain'
      }]
    }
  ]
})

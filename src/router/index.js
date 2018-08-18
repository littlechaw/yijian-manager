import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Nav from '@/views/nav'
import RegisterManage from '@/views/RegisterManage'
import MerchantList from '@/views/MerchantList'
import MerchantWater from '@/views/MerchantWater'
import PriceManage from '@/views/PriceManage'
import OrderManage from '@/views/OrderManage'
import FinancialFlow from '@/views/FinancialFlow'
import EditArticle from '@/views/EditArticle'
import ArticleList from '@/views/ArticleList'
import ActivityManage from '@/views/ActivityManage'
import TargetSetting from '@/views/TargetSetting'
import ClassificationOfArticles from '@/views/ClassificationOfArticles'
import CouponRegister from '@/views/CouponRegister'
import CouponRecord from '@/views/CouponRecord'
import Proportionate from '@/views/Proportionate'
import RechargeAmount from '@/views/RechargeAmount'
import AppointmentTime from '@/views/AppointmentTime'
import GradeDiscount from '@/views/GradeDiscount'
import PriceRange from '@/views/PriceRange'
import DataStatistics from '@/views/DataStatistics'
import ChangePassword from '@/views/ChangePassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }, {
      path: '/nav',
      component: Nav,
      name: 'nav',
      children: [{
        path: 'registermanage',
        component: RegisterManage,
        name: 'registermanage'
      }, {
        path: 'merchantlist',
        component: MerchantList,
        name: 'merchantlist'
      }, {
        path: 'merchantwater',
        component: MerchantWater,
        name: 'merchantwater'
      }, {
        path: 'pricemanage',
        component: PriceManage,
        name: 'pricemanage'
      }, {
        path: 'ordermanage',
        component: OrderManage,
        name: 'ordermanage'
      }, {
        path: 'financialflow',
        component: FinancialFlow,
        name: 'financialflow'
      }, {
        path: 'editarticle',
        component: EditArticle,
        name: 'editarticle'
      }, {
        path: 'articlelist',
        component: ArticleList,
        name: 'articlelist'
      }, {
        path: 'activitymanage',
        component: ActivityManage,
        name: 'activitymanage'
      }, {
        path: 'targetsetting',
        component: TargetSetting,
        name: 'targetsetting'
      }, {
        path: 'classificationofarticles',
        component: ClassificationOfArticles,
        name: 'classificationofarticles'
      }, {
        path: 'couponregister',
        component: CouponRegister,
        name: 'couponregister'
      }, {
        path: 'couponrecord',
        component: CouponRecord,
        name: 'couponrecord'
      }, {
        path: 'proportionate',
        component: Proportionate,
        name: 'proportionate'
      }, {
        path: 'rechargeamount',
        component: RechargeAmount,
        name: 'rechargeamount'
      }, {
        path: 'appointmenttime',
        component: AppointmentTime,
        name: 'appointmenttime'
      }, {
        path: 'gradediscount',
        component: GradeDiscount,
        name: 'gradediscount'
      }, {
        path: 'pricerange',
        component: PriceRange,
        name: 'pricerange'
      }, {
        path: 'datastatistics',
        component: DataStatistics,
        name: 'datastatistics'
      },{
        path:'changepassword',
        component:ChangePassword,
        name:'changepassword'
      }]
    }
  ]
})

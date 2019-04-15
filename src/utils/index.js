const Vue = require('vue')
const axios = require('axios')
import {BASEURL} from "../URL"

function setParamsInUrl(url, params) {
  if (params) {
    let paramsArray = []
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return url;
}

export default {
  install(Vue, options) {
    Vue.prototype.$axios.doget = (url, params) => {
      url = setParamsInUrl(url, params)
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: BASEURL + url
        }).then(res => {
          if (res.status === 200) {
            if (res.data && res.data.code == 0) {
              resolve(res.data.data)
            } else {
              reject(res.data)
            }
          } else {
            reject(res.data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
    Vue.prototype.$axios.getRemoteFile = (url, params) => {
      url = setParamsInUrl(url, params)
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: BASEURL + url,
          responseType: 'blob'
        }).then(res => {
          let des = res.headers['content-disposition']
          let fileName = des ? des.split('=')[1] : new Date()
          let objectUrl = URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement('a')
          link.download = fileName
          link.href = objectUrl
          link.click()
        }).catch(err => {
          console.log(err)
        })
      })
    }
    Vue.prototype.$axios.dopost = (url, data) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: BASEURL + url,
          data: data
        }).then(res => {
          if (res.status === 200) {
            if (res.data && res.data.code == 0) {
              resolve(res.data.data)
            } else {
              reject(res.data)
            }
          } else {
            reject(res.data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }

    Vue.prototype.$showErrorMessage = (obj, e) => {
      if (e.code == -1 && e.message == '未登录') {
        obj.$alert('请登录', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            obj.$router.push({
              name: 'login'
            })
          }
        })
      } else if (e.code == 99) {
        obj.$message({
          showClose: true,
          message: e.message,
          type: 'error'
        })
      } else if (e.code == 500) {
        obj.$message({
          showClose: true,
          message: e.message,
          type: 'error'
        })
      } else {
        obj.$message({
          showClose: true,
          message: e.message,
          type: 'error'
        })
      }
    }

    Vue.prototype.$getBeforeDays = (n) => {
      var d = new Date()
      var year = d.getFullYear()
      var mon = d.getMonth() + 1
      var day = d.getDate()
      var res
      if (day <= n) {
        if (mon > 1) {
          mon = mon - 1
        } else {
          year = year - 1
          mon = 12
        }
      }
      d.setDate(d.getDate() - n)
      year = d.getFullYear()
      mon = d.getMonth() + 1
      day = d.getDate()
      res = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day)
      return new Date(res)
    }

    Vue.prototype.$transferDate = (date) => {
      if (!date) {
        return ""
      }
      let d = new Date(date)
      let res = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + '-' + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate())
      return res
    }

    Vue.prototype.$transferDateAddsuffix = (date) => {
      if (!date) {
        return ""
      }
      let d = new Date(date)
      let res = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + '-' + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + ' 23:59:59'
      return res
    }

    Vue.filter('transferTime', function (date) {
      if (date) {
        let d = new Date(date)
        date = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + '-' + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate())
      }
      return date ? date : '-'
    })

    Vue.filter('timeFilter', function ([a, b, c]) {
      if (a && b) {
        if (!c) {
          return a.substring(11, a.length) + " ~ " + b.substring(11, b.length)
        } else {
          let stime = Date.parse(new Date(a))
          let etime = Date.parse(new Date(b))
          let usedTime = etime - stime
          let days = Math.floor(usedTime / (24 * 3600 * 1000))
          let leave1 = usedTime % (24 * 3600 * 1000)
          let hours = Math.floor(leave1 / (3600 * 1000))
          let leave2 = leave1 % (3600 * 1000)
          let minutes = Math.floor(leave2 / (60 * 1000))
          let time = days + "天" + hours + "时" + minutes + "分"
          return time
        }
      } else {
        return '暂无'
      }
    })
  }
}


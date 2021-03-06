// 尚未测试的代码 适合查看原图的场景
export default {
  install(Vue) {
    Vue.directive('blur-load', {
      bind(el, binding) {
        let src = binding.value
        addStyle(el)
        el.src = src + '?imageMogr2/thumbnail/!1p' + '/quality/30'
        loadImge(src).then(() => {
          removeStyle(el)
          el.style.opacity = 0.5
          fadeIn(el)
          el.src = src
        })
        .catch(err => {
          console.log(err)
        })
      }
    })
  }
}

function addStyle (el) {
  el.style.filter = 'blur(20px)'
  el.style.WikitFilter = 'blur(20px)'
}

function removeStyle (el) {
  el.style.filter = ''
  el.style.WikitFilter = ''
}

function loadImge (src) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.src = src
    img.addEventListener('load', loadEvt)
    img.addEventListener('error', errorEvt)
    function loadEvt (src) {
      return resolve(src)
      removeEvt()
    }
    function errorEvt(err) {
      return reject(err)
      removeEvt()
    }
    function removeEvt () {
      img.removeEventListener('load', loadEvt)
      img.removeEventListener('error', errorEvt)
    }
  })
}

function fadeIn(el) {
  setTimeout(() => {
    let opacity = window.getComputedStyle(el).opacity * 1
    if (opacity < 0.95) {
      el.style.opacity = (1 - opacity) / 6 + opacity
      fadeIn(el)
    } else {
      el.style.opacity = 1
    }
  }, 60)
}
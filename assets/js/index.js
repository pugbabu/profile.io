navFixed()
navClick() // nav导航点击事件
var clickFlag = false
var mySwiper = new Swiper('.swiper-container', {
	autoplay: true,//可选选项，自动滑动
})
function navClick() {
  var oUl = document.getElementById('nav-ul')
  oUl.onclick = function(event) {
    clickFlag = true
    addClass(event)
    scrollMove(event)
  }
}
// 添加class
function addClass(event) {
  var e = event || window.event
  var target = e.target
  var children = target.parentNode.children
  for (var i = 0; i < children.length; i++) {
    children[i].classList.remove('active')
  }
  target.classList.add('active')
}
function scrollMove(event) {
  var e = event || window.event
  var name = e.target.getAttribute('name')
  var oEl = name && document.getElementById(name)
  if (name === 'home') {
    console.log('//')
    var s1 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0    
    var t = setInterval(function() {
      console.log(1)
      s1 -= 50
      document.body.scrollTop = s1
      document.documentElement.scrollTop = s1
      if (s1 <= 0) {
        clearInterval(t)
      }
    }, 16)
    // document.body.scrollTop = 0
    // document.documentElement.scrollTop = 0
    // return
  }
  var s = oEl && oEl.offsetTop
  var scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0    
  var timer = setInterval(function() {
    if (scroll < s && s) {     
      if (s - scroll <= 20) {
        scroll++
      } else {
        scroll += 20
      }
      if (scroll >= s) {
        clickFlag = false
        clearInterval(timer)
      }
      document.body.scrollTop = scroll - 60
      document.documentElement.scrollTop = scroll - 60
    } else if (scroll > s && s){
      if (scroll - s > 25) {
        scroll -= 25
      } else {
        scroll--
      }
      if (scroll <= s) {
        clickFlag = false
        clearInterval(timer)
      }
      document.body.scrollTop = scroll - 60
      document.documentElement.scrollTop = scroll - 60
    } else {
      clickFlag = false
      clearInterval(timer)

    }
  })
}
function navFixed() {
  var arr = calcHeight()
  var oLi = document.getElementById('nav-ul').getElementsByClassName('li')
  var oEl = document.getElementsByClassName('nav')[0]
  var firstLi = document.getElementsByClassName('first-li')[0]
  var oContent = document.getElementsByClassName('content')[0]
  var oBlock = document.getElementsByClassName('blank-block')[0]
  var oTop = document.getElementsByClassName('toTop')[0]
  var offsetTop = oEl && oEl.offsetTop
  window.addEventListener('scroll', function() {
    var s = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0    
    if (s > 1000) {
      oTop.style.opacity = 1
      oTop.onclick = function() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    } else {
      oTop.style.opacity = 0
    }
    if (s >= offsetTop) {
      oEl.classList.add('nav-fixed')
      oBlock.style.display = 'block'
      if (clickFlag) {
        return
      } else {
        var i = 0
        var n = null
        for (var i = 0; i < arr.length; i++) {
          var h1 = arr[i]
          var h2 = arr[i + 1]
          firstLi.classList.remove('active')
          oLi[i].classList.remove('active')
          if ((s >= h1 && s < h2) || (s >= h1 && !h2)) {
            n = i
          }
        }
        if (n !== null) {
          oLi[n].classList.add('active')
        }
      } 
     
    } else {
      firstLi.classList.add('active')
      for(var j = 0; j < oLi.length; j++) {
        oLi[j].classList.remove('active')
      }
      oEl.classList.remove('nav-fixed')
      oBlock.style.display = 'none'
    }
  }, false)
}
function calcHeight() {
  var arr = []
  var oList = document.getElementsByClassName('content')[0].getElementsByTagName('section')
  for (var i = 0; i < oList.length; i++) {
    var el = oList[i]
    var h = el.offsetTop - 60
    arr.push(h)
  }
  return arr
}
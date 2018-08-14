
function change () {
  var cWidth
  if (document.documentElement.clientWidth < 320) {
    cWidth = 320
  } else if (document.documentElement.clientWidth > 750) {
    cWidth = 750
  } else {
    cWidth = document.documentElement.clientWidth
  };
  document.documentElement.style.fontSize = cWidth / 18.75 + 'px'
  document.documentElement.style.display = 'block'
}

window.addEventListener('resize', change, false)
window.addEventListener('DOMContentLoaded', change, false)

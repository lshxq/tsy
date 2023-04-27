export default {
  name: 'drag',

  inserted(el) {
    el.style.position = 'absolute';
    let odiv = null, disX, disY;
    el.addEventListener('mousedown', dragMove)
    function dragMove(e) {
      odiv = e.currentTarget;
      disX = e.clientX - odiv.offsetLeft;
      disY = e.clientY - odiv.offsetTop;
      document.addEventListener('mousemove', dragDomMove)
      document.addEventListener('moveup', dragDomUp)
    }
    function dragDomMove(e) {
      let left = e.clientX - disX;
      let top = e.clientY - disY;

      if (left < 0) {
        left = 0;
      }

      if (top< 0 ) {
        top = 0;
      }

      if (left >= document.documentElement.clientWidth - odiv.offsetWidth) {
        left = document.documentElement.clientWidth - odiv.offsetWidth
      }

      if (top >= document.documentElement.clientHeight - odiv.offsetHeight) {
        top = document.documentElement.clientHeight - odiv.offsetHeight
      }

      odiv.style.left = left + 'px';
      odiv.style.top = top + 'px';
    }

    function dragDomUp() {
      document.removeEventListener('mousemove', dragDomMove)
      document.removeEventListener('moveup', dragDomUp)
    }
    
  },
}
const getRange = str => {
  if (str && str.length > 0 && str.indexOf(',') > 0) {
    const splited = str.split(',')
    return {
      min: splited[0].trim(),
      max: splited[1].trim()
    }
  }
}

export default {
  name: 'drag',

  inserted(el) {
    el.style.position = 'absolute';
    let odiv = null, disX, disY;
    el.addEventListener('mousedown', dragdown)
    function dragdown(e) {
      odiv = e.currentTarget;
      disX = e.clientX - odiv.offsetLeft;
      disY = e.clientY - odiv.offsetTop;
      document.addEventListener('mousemove', dragDomMove)
      document.addEventListener('mouseup', dragDomUp)
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

      const hRange = getRange(odiv.dataset.dragRangeH)
      if (hRange) {
        const {
          min,
          max
        } = hRange
        if (left < min) {
          left = min
        }
        if (left > max) {
          left = max
        }
      }
      odiv.style.left = left + 'px';

      const vRange = getRange(odiv.dataset.dragRangeV)
      if (vRange) {
        const  {
          min,
          max
        } = vRange
        if (top < min) {
          top = min
        }

        if (top > max) {
          top = max
        }
      }
      odiv.style.top = top + 'px';
    }

    function dragDomUp() {
      document.removeEventListener('mousemove', dragDomMove)
      document.removeEventListener('mouseup', dragDomUp)
      const evt = document.createEvent('Event');
      evt.initEvent('dragged', true, true);
      odiv.dispatchEvent(evt)
    } 
    
  },
}
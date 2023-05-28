const map = new WeakMap();


const ob = new ResizeObserver((entries) => {
  for(const entry of entries) {
    const handler = map.get(entry.target);
    if (handler) {
      const box = entry.borderBoxSize[0];
      if (box) {
        handler({
          width: box.inlineSize,
          height: box.blockSize
        })
      } else {
        handler(entry);
      }
      
    }
  }
})



export default {
  name: 'resize',
  bind(el, binding) {
    ob.observe(el, binding);
    map.set(el, binding.value)
  },

  unbind(el) {
    ob.unobserve(el);
  }
}
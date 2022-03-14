const random = (start=10, end=100) => {
  return Math.floor(Math.random() * (end - start)) + start
}
const bool = () => {
  return random() > 50
}



export default {
  random,
  randomStr(maxLen=200) {
    let str = ''
    const len = random(10, maxLen)
    for (let idx=0; idx<len; idx++) {
      str += String.fromCharCode(bool() ? random(48, 57) : random(65, 122))
    }
    return str
  },
  strInArray(str, arr=[]) {
    for (const ele of arr) {
      if (`${str}` === `${ele}`) {
        return true
      }
    }
    return false
  }
}
<template>
  <div :class="mainPanelClassComp" ref="mainRef">
    <audio preload="auto" :src='audio.audioSua' ref="audioSuaRef"/>
    <audio preload="auto" :src="audio.audioFailed" ref="audioFailedRef"/>
    <audio preload="auto" :src='audio.audioDu' ref="audioDuRef"/>
    <audio preload="auto" :src='audio.audioBgm' ref="audioBgmRef" loop/>
    <speaker class="speaker-control" v-model="sound"/>
    <template v-if="cards">
      <template  v-for='(layer, layerIdx) of cardsComp'>
        <template v-for="(row, rowIdx) of layer" >
          <template v-for="(card, colIdx) of row">
            <div v-if="card && !card.destory"
               @click="cardClicked(card)"
               class="card-wrapper"
               :style="cardWrapperStyle(layerIdx, rowIdx, colIdx, card)"
               :key="`card-${layerIdx}-${rowIdx}-${colIdx}`">
              <card :card="card" :images="images" :bar="bar"/>
            </div>
          </template>
          
        </template>
      </template>
    </template>

    <div class="bar"></div>

    <div class="time-remaid">{{timeRemainComp}}</div>
    <div class="score">{{score}}</div>

    <div class="welcome" ref="welcomeRef">
      <div class="text miao">喵</div>
      <div class="text le">了</div>
      <div class="text ge">个</div>
      <div class="text mi">咪</div>
      
      
      <div class="start-button" @click="startGame">开始游戏</div>
    </div>

    <div class="water-mark link">
      http://tsy.zone/site/home
    </div>

    <div class="game-over-mask">
      <div class="text">game over</div>
      <div class="start-button" @click="restartGame">重新开始</div>
    </div>
  </div>
</template>

<script>
import Utils from '../../../../utils.js'

import audioSua from '../assets/audio/sua.mp3'
import audioFailed from '../assets/audio/failed.mp3'
import audioDu from '../assets/audio/du.mp3'
import audioBgm from '../assets/audio/bgm.mp3'
import Speaker from './speaker.vue'

import Card from './card.vue' 
import img0 from '../assets/0.png'
import img1 from '../assets/1.png'
import img2 from '../assets/2.png'
import img3 from '../assets/3.png'
import img4 from '../assets/4.png'
import img5 from '../assets/5.png'
import img6 from '../assets/6.png'
import img7 from '../assets/7.png'
import img8 from '../assets/8.png'
import img9 from '../assets/9.png'
import img10 from '../assets/10.png'


const MARGIN_TOP = 10

const createCardsData = (layerCnt, rowCnt, columnCnt, typeCnt) => {
  let id = 1;

  const data = [];
  for (let layerIdx=0; layerIdx<layerCnt; layerIdx++) {
    const layer = []

    for (let rowIdx=0; rowIdx<rowCnt - layerIdx%2; rowIdx++) {
      const row = []
      for (let colIdx=0; colIdx<columnCnt - layerIdx%2; colIdx++) {
        row.push({
          id,
          type: Math.floor(Math.random() * typeCnt),
          layerIdx,
          rowIdx,
          colIdx,
          dark: layerIdx !== layerCnt - 1,
        })
        id++;
      }
      layer.push(row)
    }
    data.push(layer)
  }
  return data;
}

const getLocal = (path) =>{
  return Utils.getLocal('miao', path)
}

const setLocal = (obj) => {
  Utils.setLocal('miao', obj)
}

export default {
  props:{
    width: Number,
    height: Number,
    images: {
      type: Array,
      default() {
        return [
          img0,
          img1,
          img2,
          img3,
          img4,
          img5,
          img6,
          img7,
          img8,
          img9,
          img10,
        ]
      }
    }
  },
  watch: {
    sound(value) {
      setLocal({
          audio: {
            on: value
          }
        })
      if (value) {
        this.$refs.audioBgmRef.play()
      } else {
        this.$refs.audioBgmRef.pause()
      }
    },
    width(width) {
      this.$refs.mainRef.style.setProperty('--main-width', `${width}px`)
    },
    height(height) {
      this.$refs.mainRef.style.setProperty('--main-height', `${height}px`)
    },
    timeRemainComp(remain) {
      if (this.running) {
        if (remain < 6) {
          this.$refs.audioBgmRef.pause()
        }
        if (remain === 5 || remain === 4 || remain === 3 || remain === 2 || remain === 1) {
          this.sound && this.$refs.audioDuRef.play();
        } if (remain === 0) {
          this.gameover()
        }
      }
    }
  },
  components: {
    Card,
    Speaker,
  },
  created() {
    this.audio = {
      audioSua,
      audioFailed,
      audioDu,
      audioBgm
    }
  },
  data() {
    const sound = getLocal('audio.on')
    return {
      cards: false,
      bar: [],
      sound,
      gameStartTime: 0,
      score: 0,
      gameTime: 10000, // 可用的游戏时间
      running: false,
      currentTime: Date.now(),
      showWelcome: true,
      gameOverFlag: false,

    }
  },
  computed: {
    mainPanelClassComp() {
      const {
        showWelcome,
        gameOverFlag
      } = this
      return {
        'miao-ui-main': true,
        'show-welcome': showWelcome,
        'show-game-over': gameOverFlag
      }
    },
    timeRemainComp() {
      const {
        gameStartTime,
        currentTime,
        gameTime,
      } = this

      
      const rv = gameTime - Math.floor((currentTime - gameStartTime) / 1000)
      return rv
    },
    cardMarginLeftComp() {
      const {
        width, cardWidthComp, columnCountComp
      } = this

      return (width - cardWidthComp * columnCountComp) / 2
    },
    barMarginLeftComp() {
      return Math.floor((this.width - this.cardWidthComp * 9 ) / 2)
    }, 
    cardsComp() {
      return this.cards
    },
    cardHeightComp() {
      return Math.floor(this.height * 0.11) // 这里的计算规则 需要和 css中保持同步
    },
    cardWidthComp() {
      return Math.floor(this.cardHeightComp * 0.618) // 这里的计算规则 需要和 css中保持同步
    },
    columnCountComp() {
      const {
        width,
        cardWidthComp
      } = this
      return Math.floor((width - width * .2 )/ cardWidthComp - 1)
    },
    barTopComp() {
      return this.height * 0.88
    }
  }, 
  mounted() {
    const that = this
    that.$refs.audioBgmRef.volume = .5
    that.sound && that.$refs.audioBgmRef.play();
    that.$refs.mainRef.style.setProperty('--main-width', `${this.width}px`)
    that.$refs.mainRef.style.setProperty('--main-height', `${this.height}px`)

    that.timerId = setInterval(() => {
      if(that.running) {
        that.currentTime = Date.now()
      }
    }, 10)
  },
  destroyed() {
    clearInterval(this.timerId)
  },
  methods: {
    
    cardInMatrix(layerIdx, rowIdx, colIdx, newValue) {
      const cards = JSON.parse(JSON.stringify(this.cards));
      const layer = cards[layerIdx];
      if (layer) {
        const row = layer[rowIdx];
        if (row) {
          const card = row[colIdx]
          if (newValue !== undefined) {
            row[colIdx] = newValue
            this.cards = cards
            console.log(`set matrix L[${layerIdx}] R[${rowIdx}] C[${colIdx}] to new value`, newValue)
          }
          if (card) {
            return card
          }
        }
      }
      return false;
    },
    getCardPositionInBar(cardId) {
      const {
        bar,
        barTopComp,
        cardWidthComp
      } = this

      let left = 0;
      for (let idx=0; idx<bar.length; idx++) {
        if (bar[idx].id === cardId) {
          left = idx * cardWidthComp + this.barMarginLeftComp
          break;
        }
      }

      return {
        top: barTopComp,
        left
      }
    },
    getCardPositionInMatrix(layerIdx, rowIdx, colIdx) {
      const {
        cardWidthComp, 
        cardHeightComp,
        cardMarginLeftComp
      } = this

      let offsetX = 0; // 奇偶不同图层的偏移值
      let offsetY = 0; // 奇偶不同图层的偏移值

      if (layerIdx % 2 === 1) {
        offsetX = cardWidthComp / 2
        offsetY = cardHeightComp / 2
      }

      const top = rowIdx * cardHeightComp + MARGIN_TOP + offsetY
      const left = colIdx * cardWidthComp + cardMarginLeftComp + offsetX
      return {
        top,
        left
      }
    },
    cardWrapperStyle(layerIdx, rowIdx, colIdx,  card) {

      const cardInBar = this.bar.find(cardInBar => {
        return cardInBar && cardInBar.id === card.id
      })
      if (cardInBar) {  // 已经加入bar，用bar中的位置
        const pos = this.getCardPositionInBar(card.id)
        const style = {
          top: `${pos.top}px`,
          left: `${pos.left}px`,
          'z-index': 9999 + layerIdx,
        }


        return style;
      } 

      const {
        top,
        left
      } = this.getCardPositionInMatrix(layerIdx, rowIdx, colIdx);

      const style = {
        top: `${top}px`,
        left: `${left}px`,
        'z-index': 999 + layerIdx,
      }

      return style;
    },
    deleteCardInBar(cardId) {
      const newBar = []

      for (let idx=0; idx<this.bar.length; idx++) {
        const cardInBar = this.bar[idx];
        if (cardInBar && cardInBar.id !== cardId) {
          newBar.push(cardInBar)
        }
      }

      this.bar = newBar
    },
    uncover(card) { // 翻开底部, 奇偶错位，分别处理
      const that = this

      const removed = (layerIdx, rowIdx, colIdx) => { // 被destory  或者 在 bar中 都是从 matrix中移除 了
        const card = this.cardInMatrix(layerIdx, rowIdx, colIdx)
        if (card === false) {
          return true
        }

        if (card.destory) {
          return card
        }

        const cardInBar = that.bar.find(cardInBar => {
          return cardInBar.id === card.id
        })

        return cardInBar
      } 

      if (card.layerIdx % 2 === 0) { // 偶数层数据多
        const needCheckCards = [{ // 上一层相邻的4张牌
          layerIdx: card.layerIdx - 1,
          rowIdx: card.rowIdx - 1,
          colIdx: card.colIdx - 1
        }, {
          layerIdx: card.layerIdx - 1,
          rowIdx: card.rowIdx - 1,
          colIdx: card.colIdx
        }, {
          layerIdx: card.layerIdx - 1,
          rowIdx: card.rowIdx,
          colIdx: card.colIdx - 1
        }, {
          layerIdx: card.layerIdx - 1,
          rowIdx: card.rowIdx,
          colIdx: card.colIdx
        }].map(pos => {
          const currCard = that.cardInMatrix(pos.layerIdx, pos.rowIdx, pos.colIdx)
          return currCard
        })

        const check = currCard => {
          const c1Removed = removed(currCard.layerIdx + 1, currCard.rowIdx,     currCard.colIdx);
          const c2Removed = removed(currCard.layerIdx + 1, currCard.rowIdx,     currCard.colIdx + 1);
          const c3Removed = removed(currCard.layerIdx + 1, currCard.rowIdx + 1, currCard.colIdx)
          const c4Removed = removed(currCard.layerIdx + 1, currCard.rowIdx + 1, currCard.colIdx + 1)
          if (c1Removed && c2Removed && c3Removed && c4Removed) {
            currCard.dark = false
            that.cardInMatrix(currCard.layerIdx, currCard.rowIdx, currCard.colIdx, currCard)
          }
        }

        needCheckCards.forEach(cardNeedCheck => {
          cardNeedCheck && check(cardNeedCheck)
        }) 


      } else { // 奇数层
        const needCheckCards = [{ // 上一层相邻的4张牌
          layerIdx: card.layerIdx - 1,
          rowIdx: card.rowIdx,
          colIdx: card.colIdx
        }, {
          layerIdx: card.layerIdx - 1,
          rowIdx: card.rowIdx + 1,
          colIdx: card.colIdx
        }, {
          layerIdx: card.layerIdx - 1,
          rowIdx: card.rowIdx,
          colIdx: card.colIdx + 1
        }, {
          layerIdx: card.layerIdx - 1,
          rowIdx: card.rowIdx + 1,
          colIdx: card.colIdx + 1
        }].map(pos => {
          const currCard = that.cardInMatrix(pos.layerIdx, pos.rowIdx, pos.colIdx)
          return currCard
        })

        const check = currCard => {
          const c1Removed = removed(currCard.layerIdx + 1, currCard.rowIdx - 1, currCard.colIdx -1);
          const c2Removed = removed(currCard.layerIdx + 1, currCard.rowIdx - 1, currCard.colIdx);
          const c3Removed = removed(currCard.layerIdx + 1, currCard.rowIdx,     currCard.colIdx -1)
          const c4Removed = removed(currCard.layerIdx + 1, currCard.rowIdx,     currCard.colIdx)
          if (c1Removed && c2Removed && c3Removed && c4Removed) {
            currCard.dark = false
            that.cardInMatrix(currCard.layerIdx, currCard.rowIdx, currCard.colIdx, currCard)
          }
        }

        needCheckCards.forEach(cardNeedCheck => {
          cardNeedCheck && check(cardNeedCheck)
        }) 
      }
    },
    cardClicked(card) {
      if (card.dark) { // 黑牌不能点击
        return false
      }

      

      const that = this

      const cardInBarBeforePush = that.bar.find(cib => {
        return cib.id === card.id
      })

      if (cardInBarBeforePush) { // 已经在bar中的不能点击
        return false
      }

      if (that.bar.length === 9) {
        return false
      }

      that.sound && that.$refs.audioSuaRef.play();

      that.bar.push(card)
      that.bar.sort((a, b) => {
        return a.type - b.type
      })

      this.uncover(card)

      const destoryQueue = []
      const grouped = []
      for (const cardInBar of that.bar) {
        if (!grouped[cardInBar.type]) {
          grouped[cardInBar.type] = []
        }
        grouped[cardInBar.type].push(cardInBar)
      }
      for (const key in grouped) {
        const cardGroup = grouped[key]
        if (cardGroup.length >= 3) {
          cardGroup.forEach(cardInGroup => {
            destoryQueue.push(cardInGroup)
          })
          setTimeout(() => {
            that.score += 1
            that.gameTime += 5
            that.sound && that.$refs.audioBgmRef.play()
            destoryQueue.forEach(cardInGroup => {
              cardInGroup.destory = true
              that.cardInMatrix(cardInGroup.layerIdx, cardInGroup.rowIdx, cardInGroup.colIdx, cardInGroup)
              that.deleteCardInBar(cardInGroup.id)
              
            })
          }, 1000) 
        }
      }

      let barItemCnt = 0
      that.bar.forEach(cardInBar => {
        const needDestory = destoryQueue.find(cardInDestory => {
          return cardInBar.id === cardInDestory.id
        })
        if (!needDestory) {
          barItemCnt++
        }
      })
      if (barItemCnt > 8) {
        that.gameover() 
      }
    },
    gameover() {
      const that = this
      that.running = false
      that.$refs.audioBgmRef.pause()
      that.sound && that.$refs.audioFailedRef.play()
      that.gameOverFlag = true
      
    },
    startGame() {
      this.showWelcome = false
      this.newGame()
      // this.$refs.audioDuRef.play();
    },
    restartGame() {
      this.newGame()
    },
    newGame() {
      const that = this
      that.cards = createCardsData(11, 6, this.columnCountComp, this.images.length);
      that.gameStartTime = Date.now()
      that.gameTime = 50;
      that.running = true
      that.gameOverFlag = false
      that.bar = []
      that.score = 0
      that.sound && that.$refs.audioBgmRef.play()
    }
  }
}
</script>

<style scoped>
.miao-ui-main {
  --main-width: 100%;
  --main-height: 100%;
  
  --card-height: calc(var(--main-height) * 0.11);
  --card-width: calc(var(--card-height) * 0.618);
  --game-over-z: 900000;
  --welcome-z: 899998;
  --speaker-z: 899999;
  --water-mark-z: 899999;

  overflow: hidden;
  user-select: none;
  height: var(--main-height);
  width: var(--main-width);
  position: relative;
  background: linear-gradient(190deg, hsl(250, 100%, 65%), hsl(200, 100%, 65%), hsl(100, 100%, 64%))

}

.card-wrapper {
  width: var(--card-width);
  height: var(--card-height);
  display: flex;
  flex-flow: column;
  flex: 0 0 var(--card-width);
  justify-content: center;
  align-items: center;
  position: absolute;
  transition: all 1s;
}



.start-button {
  margin-top: 10%;
  color: rgb(114, 140, 255);
  background: linear-gradient(gray, black, gray);
  padding: 1% 2%; 
  border-radius: calc(var(--card-width) / 10);
  cursor: pointer;
  position: relative;
  font-size: calc(var(--card-width) / 3);
}
.start-button::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(200, 200, 200, .6);
  filter: blur(20px)
}
.start-button:hover {
  transform: scale(1.05);
}

.bar {
  --bar-left: calc((100% - 9 * var(--card-width)) / 2);
  --bar-top: calc(var(--main-height) * .88);

  height: var(--card-height);
  width: calc(var(--card-width) * 9);
  background: lightgray;
  position: absolute;
  top: var(--bar-top);
  left: var(--bar-left);
  border-radius: 10px;
}
.bar:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  filter: blur(20px);
}

.game-over-mask {
  --light-transparent: rgba(200, 200, 200, .6);
  --dark-transparent: rgba(100, 100, 100, .8);
  top: 0;
  position: relative;
  height: 100%;
  width: 100%;
  
  z-index: var(--game-over-z);
  background: linear-gradient(var(--light-transparent) 5%, var(--dark-transparent) 50%, var(--light-transparent) 100%);
  
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  transition: all 1s;
}

.show-game-over .game-over-mask {
  top: -100%;
}

.game-over-mask>.text {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--card-width);
  color: white;
}

.welcome {
  top: -100%;
  position: relative;
  height: 100%;
  width: 100%;
  
  z-index: var(--welcome-z);
  background: url(../../../../assets/images/miao-bg.webp) no-repeat;
  background-size: 100% 100%;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  transition: all 1s;
}

.welcome .text {
  color: white;
  --font-size: calc(var(--main-height) / 5.5);
  font-size: var(--font-size);
  text-shadow: calc(var(--card-height) * .07) calc(var(--card-height) * .07) gray;
  transform-origin: 50% 50% 0;
  font-weight: bolder;
}

.welcome .text.miao {
  position: absolute;
  left: calc(var(--main-width) * .2 - var(--font-size) / 2);
  top: calc(var(--main-height) * .2);
  transform: rotate(-30deg);
}


.welcome .text.le {
  position: absolute;
  left: calc(var(--main-width) * .4 - var(--font-size) / 2);
  transform: rotate(-10deg);
  top: calc(var(--main-height) * .15);
}

.welcome .text.ge {
  position: absolute;
  left: calc(var(--main-width) * .6 - var(--font-size) / 2);
  transform: rotate(10deg);
  top: calc(var(--main-height) * .15);
}

.welcome .text.mi {
  position: absolute;
  left: calc(var(--main-width) * .8 - var(--font-size) / 2);
  transform: rotate(30deg);
  top: calc(var(--main-height) * .2);
}

.show-welcome .welcome {
  top: 0;
}


.time-remaid {
  position: absolute;
  top: 3%;
  left: 1%;
  color: white;
  font-size: var(--card-width);
}
.time-remaid:before {
  content: 'Time remain:';
  font-size: calc(var(--card-width) / 5);
  display: block;
}

.score {
  position: absolute;
  top: 3%;
  right: 6%;
  color: white;
  font-size: var(--card-width);
}
.score:before {
  content: 'Score:';
  font-size: calc(var(--card-width) / 5);
  display: block;
}

.speaker-control {
  position: absolute;
  right: 3%;
  top: 13%;
  width: calc(var(--card-width) / 3);
  height: calc(var(--card-width) / 3);
  z-index: var(--speaker-z);
}

.water-mark {
  user-select:all;
  position: absolute;
  right: calc(var(--main-width) * .01);
  bottom: calc(var(--main-height) * .01);
  z-index: var(--water-mark-z);
  color: gray;
}
</style>
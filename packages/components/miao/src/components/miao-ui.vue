<template>
  <div :class="mainPanelClassComp" ref="mainRef">
    <audio :src='audio.sua' ref="audioSuaRef"/>
    <audio :src="audio.failed" ref="audioFailedRef"/>
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
      <div class="text">
        <div class="miao">喵</div>
        <div class="le">了</div>
        <div class="ge">个</div>
        <div class="mi">咪</div>
      </div>
      
      
      <div class="start-button" @click="startGame">开始游戏</div>
    </div>

    <div class="game-over-mask">
      <div class="text">game over</div>
      <div class="start-button" @click="restartGame">重新开始</div>
    </div>
  </div>
</template>

<script>
import sua from '../assets/audio/sua.mp3'
import failed from '../assets/audio/failed.mp3'

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
  components: {
    Card,
  },
  data() {
    this.audio = {
      sua,
      failed
    }
    return {
      cards: false,
      bar: [],
      
      gameStartTime: 0,
      score: 0,
      gameTime: 10000,
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
        running
      } = this

      
      const rv = gameTime - Math.floor((currentTime - gameStartTime) / 1000)

      if (running) {
        if (rv <= 0) {
          this.gameover()
        }
      }

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
      return Math.floor(this.height * 0.12)
    },
    cardWidthComp() {
      return Math.floor(this.cardHeightComp * 0.618)
    },
    columnCountComp() {
      const {
        width,
        cardWidthComp
      } = this
      return Math.floor((width - width * .2 )/ cardWidthComp - 1)
    },
    barTopComp() {
      return this.height * 0.8
    }
  }, 
  mounted() {
    const that = this
    

    that.$refs.mainRef.style.setProperty('--card-height', `${this.cardHeightComp}px`)
    that.$refs.mainRef.style.setProperty('--card-width', `${this.cardWidthComp}px`)

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

      

      that.$refs.audioSuaRef.play();

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
            destoryQueue.forEach(cardInGroup => {
              that.score += 1
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
      that.$refs.audioFailedRef.play()
      that.gameOverFlag = true
    },
    startGame() {
      this.showWelcome = false
      this.newGame()
    },
    restartGame() {
      this.newGame()
    },
    newGame() {
      this.cards = createCardsData(11, 6, this.columnCountComp, this.images.length);
      this.gameStartTime = Date.now()
      this.gameTime = 100;
      this.running = true
      this.gameOverFlag = false
      this.bar = []
      this.score = 0
    }
  }
}
</script>

<style scoped>
.miao-ui-main {
  --bottom-panel-height: 15%;
  --card-height: 10px;
  --card-width: 10px;
  overflow: hidden;
  user-select: none;
  height: 100%;
  width: 100%;
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

  height: var(--card-height);
  width: calc(var(--card-width) * 9);
  background: lightgray;
  position: absolute;
  top: 80%;
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
  
  z-index: 999999;
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
  
  z-index: 999999;
  background: url(../../../../assets/images/miao-bg.webp) no-repeat;
  background-size: 100% 100%;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  transition: all 1s;
}

.welcome .text {
  position: relative;
  width: 100%;
  height: 100%s;
  color: white;
  font-size: calc(var(--card-height) * 1.5);
  text-shadow: calc(var(--card-height) * .07) calc(var(--card-height) * .07) gray;
}

.welcome .text .miao {
  position: absolute;
  left: 10%;
  top: calc(0px - var(--card-height) * 1.5);
  transform: rotate(-30deg);
}


.welcome .text .le {
  position: absolute;
  left: 30%;
  transform: rotate(-10deg);
  top: calc(0px - var(--card-height) * 2);
}

.welcome .text .ge {
  position: absolute;
  left: 53%;
  transform: rotate(10deg);
  top: calc(0px - var(--card-height) * 2);
}

.welcome .text .mi {
  position: absolute;
  left: 75%;
  transform: rotate(30deg);
  top: calc(0px - var(--card-height) * 1.5);
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
</style>
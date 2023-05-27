<template>
  <div class="miao-ui-main" ref="mainRef">
    <template v-if="cards">
      <template  v-for='(layer, layerIdx) of cardsComp'>
        <template v-for="(row, rowIdx) of layer" >
          <template v-for="(card, colIdx) of row">
            <div v-if="card && !card.destory"
               @click="cardClicked(card)"
               class="card-wrapper"
               :style="cardWrapperStyle(layerIdx, rowIdx, colIdx, card)"
               :key="`card-${layerIdx}-${rowIdx}-${colIdx}`">
              <card :card="card" :images="images"/>
            </div>
          </template>
          
        </template>
      </template>
    </template>

    <div class="game-over-mask" v-if="gameover">
      <div class="text">game over</div>
      
    </div>
  </div>
</template>

<script>
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
    return {
      cards: false,
      bar: [],
      gameover: false
    }
  },
  computed: {
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
  }, mounted() {
    this.cards = createCardsData(10, 6, this.columnCountComp, this.images.length);

    this.$refs.mainRef.style.setProperty('--card-height', `${this.cardHeightComp}px`)
    this.$refs.mainRef.style.setProperty('--card-width', `${this.cardWidthComp}px`)
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
          return card;
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
          left = idx * cardWidthComp
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
        cardHeightComp
      } = this

      let offsetX = 0; // 奇偶不同图层的偏移值
      let offsetY = 0; // 奇偶不同图层的偏移值

      if (layerIdx % 2 === 1) {
        offsetX = cardWidthComp / 2
        offsetY = cardHeightComp / 2
      }

      const marginLeft = this.width / 10; // 左面留出10%的margin,尝试内容剧中

      const top = rowIdx * cardHeightComp + MARGIN_TOP + offsetY
      const left = colIdx * cardWidthComp + marginLeft + offsetX
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
    cardClicked(card) {
      const that = this
      that.bar.push(card)
      that.bar.sort((a, b) => {
        return a.type - b.type
      })

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
        this.gameover = true
      }
    }
  }
}
</script>

<style scoped>
.miao-ui-main {
  --bottom-panel-height: 15%;
  --card-height: 10px;
  --card-width: 10px;

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

.game-over-mask {
  --light-transparent: rgba(100, 100, 100, .6);
  --dark-transparent: rgba(10, 10, 10, .9);
  position: absolute;
  top: 0; 
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(var(--light-transparent) 5%, var(--dark-transparent) 50%, var(--light-transparent) 100%);
  z-index: 99999999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game-over-mask>.text {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8vw;
  color: white;
}
</style>
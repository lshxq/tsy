<template>
  <div class="miao-ui-main" ref="mainRef">
    <template v-if="cards">
      <template  v-for='(layer, layerIdx) of cardsComp'>
        <template v-for="(row, rowIdx) of layer" >
          <template v-for="(card, colIdx) of row">
            <div v-if="card"
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
const MARGIN_LEFT = 100

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
          opacity: 1
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
    }
  }, mounted() {
    this.cards = createCardsData(10, 6, this.columnCountComp, this.images.length);

    this.$refs.mainRef.style.setProperty('--card-height', `${this.cardHeightComp}px`)
    this.$refs.mainRef.style.setProperty('--card-width', `${this.cardWidthComp}px`)
  },
  methods: {
    cardInMatrix(layerIdx, rowIdx, colIdx, newValue) {
      const {
        cards
      } = this;
      const layer = cards[layerIdx];
      if (layer) {
        const row = layer[rowIdx];
        if (row) {
          const card = row[colIdx]
          if (newValue !== undefined) {
            row[colIdx] = newValue
            this.cards = cards
          }
          return card;
        }
      }
      return false;
    },
    getCardPositionInMatrix(layerIdx, rowIdx, colIdx) {
      const {
        cardWidthComp, 
        cardHeightComp
      } = this

      let offsetX = 0;
      let offsetY = 0;

      if (layerIdx % 2 === 1) {
        offsetX = cardWidthComp / 2
        offsetY = cardHeightComp / 2
      }

      const top = rowIdx * cardHeightComp + MARGIN_TOP + offsetY
      const left = colIdx * cardWidthComp + MARGIN_LEFT + offsetX
      return {
        top,
        left
      }
    },
    cardWrapperStyle(layerIdx, rowIdx, colIdx,  card) {
      let cc = false;
      const {
        bar
      } = this
      let idx=0
      for (; idx<bar.length; idx++) {
        if (bar[idx].id === card.id) {
          cc = bar[idx];
          break;
        }
      }


      if (cc) {  // 已经加入bar，用bar中的位置

        const style = {
          top: `${7 * this.cardHeightComp}px`,
          left: `${idx * this.cardWidthComp}px`,
          'z-index': 9999 + layerIdx,
          opacity: card.opacity
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

      if (card.taken) {
        style.a = ''
      }

      return style;
    },
    cardClicked(card) {
      const that = this
      that.bar.push(card)
      that.bar.sort((a, b) => {
        return a.type - b.type
      })

      const destory = []
      const grouped = []
      for (let idx=0; idx<that.bar.length; idx++) {
        const card = that.bar[idx]
        if (!grouped[card.type]) {
          grouped[card.type] = []
        }
        grouped[card.type].push(card)
      }
      for (const key in grouped) {
        const gg = grouped[key]
        if (gg.length >= 3) {
          for (const c1 of gg) {
            destory.push(c1) 
          }
        }
      }

      setTimeout(() => {
        for (let idx=0; idx<destory.length; idx++) {
          const card = destory[idx]
          card.opacity = 0
          that.cardInMatrix(card.layerIdx, card.rowIdx, card.colIdx, card)
        }
      }, 1500) 
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
  background: lightblue;
  height: 100%;
  width: 100%;
  position: relative;
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

</style>
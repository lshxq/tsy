<template>
  <div class="block-panel-main" :style="panelStyleComp">
    
    <div class="screen">
      <div class="panel">
        <div v-for="(row,  rowIdx) of dataDrawComp" class="row" :key="`block-row-${rowIdx}`">
          <div v-for="(col, colIdx) of row" :class="blockClass(col)" :key="`block-${rowIdx}-${colIdx}`"></div>
        </div>
      </div>
      <div class="state">
        <next :type="next"/>
      </div>
    </div>

    <div  class="controller-panel">
      <controller @keypressed="controllerPressed"/>
    </div>

    <div class="pause-layer" v-if="!running">
      <dragon-logon/>
      <div class="start-game-button" @click="start">开始游戏</div>
    </div>
  </div>
</template>

<script>

import Controller from './controller.vue'
import dragonLogon from './dragon-logon.vue'



const createMatrix = () => {
  const matrix = [];
  for (let rowIdx=0; rowIdx<20; rowIdx++) {
    const row = []
    for(let colIdx=0; colIdx<10; colIdx++) {
      row[colIdx] = false
    }
    matrix.push(row)
  }
  return matrix
}

const randomBlock = () => {
  const type = Math.floor(Math.random() * blockShapes.length)
  return {
    pos: {
      x: 5,
      y: 0
    },
    type,
    dire: Math.floor(Math.random() * blockShapes[type].length)
  }
}

const shape1 = [
  [
    [true, false],
    [true, true],
    [true, false],
  ],
  [
    [true,  true, true],
    [false, true, false]
  ],
  [
    [false,  true],
    [true,   true],
    [false,  true]
  ],
  [
    [false, true, false],
    [true,  true, true]
  ]
]

const blockShapes = [
  shape1,
]



export default {
  props: {
    running: Boolean,
    panelScale: {
      type: Number,
      default() {
        return 1;
      }
    }
  },
  components: {
    Controller,
    dragonLogon,
  },
  data() {
    
    return {
      matrix: createMatrix(),
      current: false,
      next: false,
      timestamp: Date.now(),
      level: 1
    }
  },
  computed: {
    dataDrawComp() {
      const {
        matrix,
        current
      } = this

      const mm = JSON.parse(JSON.stringify(matrix))

      if (current) {
        const shape = blockShapes[current.type][current.dire];

        let colStart = current.pos.x;
        const offset = colStart + shape[0].length - matrix[0].length;
        if (offset > 0) {
          colStart -= offset
        }        

        for (let rowIdx=0; rowIdx<shape.length; rowIdx++) {
          const y = rowIdx + current.pos.y
          if (y < mm.length) {
            for (let colIdx=0; colIdx<shape[0].length; colIdx++) {
              const x = colIdx + current.pos.x
              mm[y][x] = shape[rowIdx][colIdx]
            }
          }
        }
      }
      
      
      return mm
    },
    speedComp() {
      const {
        level
      } = this
      return 1000 / level
    },
    panelStyleComp() {
      const {
        panelScale
      } = this

      return {
        transform: `scale(${panelScale})`
      }
    }
  },
  mounted() {
    this.runningIntervalId = setInterval(this.engine, 10)
  },
  destroyed() {
    clearInterval(this.runningIntervalId)
  },
  methods: {

    blockClass(occupied) {
      return {
        'block': true,
        'dark': occupied
      }
    },
    controllerPressed(key) {
      const that = this
      if ('q' === key) {
        this.$emit('request-hide')
      } else {
        const {
          running
        } = that
        if (running) {
          if ('a' === key) {
            this.current.pos.x -= 1
          } else if ('d' === key) {
            this.current.pos.x += 1
          } else if ('w' === key) {
            this.current.dire += 1
            this.current.dire = this.current.dire % blockShapes[this.current.type].length
          }
        }
      }
    },

    start() {
      this.$emit('update:running', true)
      this.timestamp = Date.now();
    },

    newGame() {
      this.current = randomBlock()
      this.next = randomBlock()
    },

    engine() {
      const that = this
      if (that.running) {
        const {
          timestamp,
          speedComp,
          matrix
        } = that

        if (!this.current && !this.next) {
          this.newGame()
        }

        if (Date.now() - timestamp > speedComp) {
          const canDrop = () => {
            const shape = blockShapes[this.current.type][this.current.dire];
            if (shape.length + this.current.pos.y >= matrix.length) {
              return false
            }

            let hit = false; // 是否有阻挡
              
            OUTTER: for (let shapeRowIdx=shape.length; shapeRowIdx>0; shapeRowIdx--) {
              const shapeRow = shape[shapeRowIdx - 1]
              for (let shapeColIdx=0; shapeColIdx<shapeRow.length; shapeColIdx++) {

                const cell = matrix[this.current.pos.y + shapeColIdx][this.current.pos.x + shapeColIdx]

                if (shapeRow[shapeColIdx] && cell) {
                  hit = true
                  break OUTTER
                }
              }
            }


            return !hit;
          }
          if (canDrop()) { // 能走
            this.current.pos.y += 1
          } else { // 走不动了
            console.log('dao tou le')
          }
          

          this.timestamp = Date.now();
        }
      }
    },
  }
}
</script>

<style scoped>


.block-panel-main {
  --screen-width: 380px;
  --screen-border-width: 5px;
  --block-size: 20px;
  --controller-height: 200px;
  --block-border-width: 1px;
  --block-margin: 1px;

  background: linear-gradient(#aaa, #eee, #aaa);
  height: calc(var(--block-size) * 20 + var(--screen-border-width) * 2 + var(--controller-height) + 40 * var(--block-border-width) + 40 * var(--block-margin));
  width: calc(var(--screen-width) + var(--screen-border-width) * 2);
  position: relative;
  transform-origin: left top;
}

.pause-layer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .7);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}

.screen {
  background: white;
}
.screen>.panel {
  border: 1px solid black;
  width: calc(var(--block-margin) * 20 + var(--block-size) * 10 + var(--block-border-width) * 20);
}
.screen>.panel>.row {
  display: flex;
}
.screen>.panel>.row>.block {
  --bg-color: #bcbcbc;
  margin: var(--block-margin);
  border: var(--block-border-width) solid var(--bg-color);
  width: var(--block-size);
  height: var(--block-size);
  display: flex;
  justify-content: center;
  align-items: center;
}
.screen>.panel>.row>.block.dark {
  --bg-color: #333;
}

.screen>.panel>.row>.block:before {
  content: '';
  width: 60%;
  height: 60%;
  background: var(--bg-color);
}

.start-game-button {
  padding: 10px 15px;
  border: 1px solid gray;
  background: linear-gradient(#bbb, #fff, #bbb);
  color: #333;
  font-weight: bold;
  transition: all .5s;
}
.start-game-button:hover {
  background: linear-gradient(#999, #ddd, #999);
}


.controller-panel {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: var(--controller-height);
  background: white;
  display: flex;
  justify-content: center;
}
</style>
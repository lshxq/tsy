<template>
  <div class="block-panel-main" :style="panelStyleComp">
    
    <div class="screen">
      <div class="panel">
        <div v-for="rowIdx of rowCountComp" class="row" :key="`block-row-${rowIdx}`">
          <div v-for="colIdx of columnCountComp" :class="blockClassMatrix(rowIdx - 1, colIdx -1)" :key="`block-${rowIdx}-${colIdx}`"></div>
        </div>
      </div>
      <div class="state">
        <div class="state-block">
          <div class="label">Level: {{levelComp}}</div>
        </div>
        <div class="state-block">
          <div class="label">Score: {{score}}</div>
        </div>
        <div class="state-block">
          <div class="label">Next: </div>
          <div class="next-shape">
            <div v-for="(row,  rowIdx) of nextShapeComp" class="row" :key="`block-row-${rowIdx}`">
              <div v-for="(col, colIdx) of row" :class="blockClass(col)" :key="`block-${rowIdx}-${colIdx}`"></div>
            </div>
          </div>
        </div>
        
      </div>
    </div>

    <div  class="controller-panel">
      <controller @keypressed="controllerPressed" @keydown="controllerKeydown" @keyup="controllerKeyup"/>
    </div>

    <div class="pause-layer" v-if="!running">
      <dragon-logon/>
      <div class="start-game-button" @click="start" v-if="!running">开始游戏</div>
    </div>

    <div class="game-over-panel" v-if="gameover">
      <div class="block">
        game over
      </div>
      <div class="block">
        游戏结束
      </div>
      <div class="start-game-button" @click="restart">重新开始</div>
    </div>
  </div>
</template>

<script>

import Controller from './controller.vue'
import dragonLogon from './dragon-logon.vue'

const columnCount = 10;
const rowCount = 20;


const createMatrix = () => {
  const matrix = [];
  for (let rowIdx=0; rowIdx<rowCount; rowIdx++) {
    const row = []
    for(let colIdx=0; colIdx<columnCount; colIdx++) {
      row[colIdx] = false
    }
    matrix.push(row)
  }
  return matrix
}

const randomBlock = () => {
  const type = Math.floor(Math.random() * blockShapes.length)
  const dire = Math.floor(Math.random() * blockShapes[type].length)
  const shape = blockShapes[type][dire]
  return {
    pos: {
      offsetX: 0,
      x: 5,
      y: 0 - shape.length
    },
    type,
    dire
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

const shape2 = [
  [
    [true, true],
    [true, true]
  ]
]

const shape3 = [
  [
    [false, false, true],
    [true,  true,  true]
  ],
  [
    [true, false],
    [true, false],
    [true, true]
  ],
  [
    [true, true, true],
    [true, false, false]
  ],
  [
    [true,  true],
    [false, true],
    [false, true]
  ]
]
const shape4 =[
  [
    [true, false, false],
    [true,  true,  true]
  ],
  [
    [true, true],
    [true, false],
    [true, false]
  ],
  [
    [true, true, true],
    [false, false, true]
  ],
  [
    [false,  true],
    [false,  true],
    [true,   true]
  ]
]

const shape5 = [
  [
    [true, false],
    [true, true],
    [false, true]
  ],
  [
    [false, true, true],
    [true, true, false]
  ]
]

const shape6 = [
  [
    [false, true],
    [true,  true],
    [true,  false]
  ],
  [
    [true,   true, false],
    [false,  true, true],
  ]
]

const shape7 = [
  [
    [true, true, true, true]
  ],
  [
    [true],
    [true],
    [true],
    [true]
  ]
]

const blockShapes = [
  shape1,
  shape2,
  shape3,
  shape4,
  shape5,
  shape6,
  shape7
]

const levels = [3, 10, 20, 30, 40, 50, 60, 70, 80, 90]

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
      score: 0,
      speedyFall: false,
      pause: false,
      gameover: false,
    }
  },
  computed: {
    levelComp() {
      const {
        score
      } = this
      for (let idx=0; idx<levels.length; idx++) {
        if (score > levels[idx]) {
          return idx+2;
        }
      }
      return 1
    },
    columnCountComp() {
      return columnCount;
    },
    rowCountComp() {
      return rowCount;
    },
    currentShapeComp() {
      const {
        current,
      } = this
      if (current) {
        return  blockShapes[current.type][current.dire]
      }
      return []
    },
    nextShapeComp() {
      const {
        next,
      } = this
      if (next) {
        return  blockShapes[next.type][next.dire]
      }
      return []
    },
    dataDrawComp() {
      const {
        matrix,
        current,
        currentShapeComp        
      } = this

      const mm = JSON.parse(JSON.stringify(matrix))

      if (current) {
        let colStart = current.pos.x;
        const offset = colStart + currentShapeComp[0].length - matrix[0].length;
        if (offset > 0) {
          colStart -= offset
        }        

        for (let rowIdx=0; rowIdx<currentShapeComp.length; rowIdx++) {
          const y = rowIdx + current.pos.y
          if (y < mm.length && y >= 0) {
            for (let colIdx=0; colIdx<currentShapeComp[0].length; colIdx++) {
              const x = colIdx + current.pos.x
              if (currentShapeComp[rowIdx][colIdx]) {
                mm[y][x - current.pos.offsetX] = true
              }
            }
          }
        }
      }
      
      
      return mm
    },
    speedComp() {
      const {
        levelComp
      } = this
      return 1000 / levelComp
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
    
    blockClassMatrix(rowIdx, colIdx) {
      const {
        dataDrawComp
      } = this
      if (dataDrawComp.length > rowIdx) {
        const row = dataDrawComp[rowIdx]
        if (row.length > colIdx) {
          return this.blockClass(row[colIdx])
        }
      }
      return this.blockClass(false)
    },
    blockClass(occupied) {
      return {
        'block': true,
        'dark': occupied
      }
    },
    controllerKeydown(key) {
      if (key === 's') {
        this.speedyFall = true
      }
    },
    controllerKeyup(key) {
      if (key === 's') {
        this.speedyFall = false
      }
    },
    controllerPressed(key) {
      const that = this
      const {currentShapeComp, current} = that
      if ('q' === key) {
        that.$emit('request-hide')
      } else {
        const {
          running
        } = that
        if (running) { // 方块操作按键只能在游戏运行时 控制
          if ('a' === key) { 
            this.current.pos.x -= 1
            if (current.pos.x < 0) {
              current.pos.x = 0
            }

          } else if ('d' === key) {

            if (currentShapeComp[0].length + current.pos.x < columnCount) {
              current.pos.x += 1
            }
            

          } else if ('w' === key) {
            current.dire += 1
            current.dire = current.dire % blockShapes[current.type].length
            current.pos.offsetX = current.pos.x + this.currentShapeComp[0].length - columnCount
            if (current.pos.offsetX < 0) {
              current.pos.offsetX = 0
            }
          } 
        }

        if ('r' === key) {
          this.$emit('update:running', !running)
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
      const mm = []
      for (let rowIdx=0; rowIdx<rowCount; rowIdx++) {
        const row = [];
        for (let colIdx=0; colIdx<columnCount; colIdx++) {
          row.push(false);
        }
        mm.push(row)
      }
      this.matrix = mm;
      this.score = 0;
    },
    restart() {
      this.gameover = false;
      this.newGame();
    },

    engine() {
      const that = this
      if (that.running && !this.pause && !this.gameover) {
        const {
          timestamp,
          speedComp,
          matrix,
          currentShapeComp,
          current,
          next
        } = that

        if (!current && !next) {
          this.newGame()
        }

        const duration = Date.now() - timestamp
        if (duration > speedComp || this.speedyFall) {
          const canDrop = () => {
            if (currentShapeComp.length + current.pos.y >= this.matrix.length) {
              return false
            }

            let hit = false; // 是否有阻挡
              
            OUTTER: for (let shapeRowIdx=currentShapeComp.length; shapeRowIdx>0; shapeRowIdx--) {
              const shapeRow = currentShapeComp[shapeRowIdx - 1]
              for (let shapeColIdx=0; shapeColIdx<shapeRow.length; shapeColIdx++) {
                const lineN = current.pos.y + shapeRowIdx;
                const cell = lineN >= 0 ? matrix[lineN][current.pos.x + shapeColIdx - current.pos.offsetX] : false

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
            if(this.current.pos.y < 0) { // 砖块掉不下来了，游戏结束
              this.gameover = true
            }

            this.speedyFall = false
            

            for (let rowIdx=0; rowIdx<currentShapeComp.length; rowIdx++) { // 把当前砖块 merge进 matrix
              const row = currentShapeComp[rowIdx]
              for(let colIdx=0; colIdx<row.length; colIdx++) {
                if (row[colIdx]) {
                  const lineN = current.pos.y + rowIdx;
                  if (lineN > 0) {
                    matrix[lineN][current.pos.x + colIdx - current.pos.offsetX] = true
                  }
                }
              }
            }
            this.current = false // 取消当前砖块的显示
            
            const removeLines = []
            for (let rowIdx=0; rowIdx<rowCount; rowIdx++) {
              let removeIt = true
              const row = matrix[rowIdx] || [];
              for (let colIdx=0; colIdx<columnCount; colIdx++) {
                if (!row[colIdx]) {
                  removeIt = false
                }
              }
              if (removeIt) {
                removeLines.push(rowIdx)
              }
            }
            if (removeLines.length > 0) {
              this.pause = true  //  暂停后， 用来销毁砖块
              const flash = cnt => {
                if (cnt > 0) {
                  const mm = JSON.parse(JSON.stringify(this.matrix))
                  for (const lineN of removeLines) {
                    for(let idx=0; idx<columnCount; idx++) {
                      mm[lineN][idx] = !this.matrix[lineN][idx]
                    }
                  }
                  this.matrix = mm
                  setTimeout(() => {
                    flash(cnt - 1)
                  }, 200)
                } else { // 继续游戏
                  const mm = JSON.parse(JSON.stringify(this.matrix))
                  for (const lineN  of removeLines) {
                    mm.splice(lineN, 1)
                    mm.splice(0, 0, [])
                  }

                  this.matrix = mm;
                  this.score += removeLines.length;
                  this.current = this.next
                  this.next = randomBlock()
                  that.pause = false
                }
              }
              flash(10)
              
              
            } else {
              this.current = next
              this.next = randomBlock()
            }
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
  --block-size: 40px;
  --controller-height: 200px;
  --block-border-width: 1px;
  --block-margin: 1px;

  background: linear-gradient(#aaa, #eee, #aaa);
  position: relative;
  transform-origin: left top;
  display: inline-block;
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
  display: flex;
}

.screen>.state {
  padding-left: 10px;
  width: 180px;
}

.screen>.state>.state-block {
  margin-top: 30px;
}

.screen>.panel {
  border: 1px solid black;
  width: calc(var(--block-margin) * 20 + var(--block-size) * 10 + var(--block-border-width) * 20);
}
.screen>.panel>.row, .next-shape>.row {
  display: flex;
}
.screen>.panel>.row>.block, .next-shape>.row>.block {
  --bg-color: #bcbcbc;
  margin: var(--block-margin);
  border: var(--block-border-width) solid var(--bg-color);
  width: var(--block-size);
  height: var(--block-size);
  display: flex;
  justify-content: center;
  align-items: center;
}
.screen>.panel>.row>.block.dark,  .next-shape>.row>.block.dark {
  --bg-color: #333;
}

.screen>.panel>.row>.block:before, .next-shape>.row>.block:before {
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
  width: 100%;
  background: white;
  display: flex;
  justify-content: center;
}

.game-over-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  
}
.game-over-panel>.block {
  font-size: 70px;
  color: white;
  width: 100%;
  border-top: 2px solid rgb(100, 86, 255);
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
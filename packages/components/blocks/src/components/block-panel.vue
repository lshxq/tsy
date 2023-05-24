<template>
  <div class="block-panel-main" v-resize="__blocksPanelResized" ref="blockPanelMainRef">
    <div class="state-panel">
      <div class="state-block">
        <div class="label">等级: {{levelComp}}</div>
      </div>
      <div class="state-block">
        <div class="label">得分: {{score}}</div>
      </div>

      <div class="state-block">
        <div class="label">Next: </div>
        <div class="next-shape mt10">
          <div v-for="(row,  rowIdx) of nextShapeComp" class="row" :key="`block-row-${rowIdx}`">
            <div v-for="(col, colIdx) of row" :class="blockClass(col)" :key="`block-${rowIdx}-${colIdx}`"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="screen">
      <div class="panel">
        <div v-for="rowIdx of rowCount" class="row" :key="`block-row-${rowIdx}`">
          <div v-for="colIdx of columnCount" :class="blockClassMatrix(rowIdx - 1, colIdx -1)" :key="`block-${rowIdx}-${colIdx}`"></div>
        </div>
      </div>
    </div>


    <div class="controller-panel"  :style="hideUselessStyle">
      <div class="flex-center">
        <controller @keypressed="controllerPressed" @keydown="controllerKeydown" @keyup="controllerKeyup"/>
      </div>
    </div>

    <div class="pause-layer" v-if="!running">
      <dragon-logon class="dragon"/>
      <div class="start-game-button" @click="start" v-if="!running">开始游戏</div>
    </div>

    <div class="game-over-panel" v-if="gameover">
      <div class="block">
        game over
      </div>
      <div class="score">
        {{score}}
      </div>
      <div class="start-game-button" @click="restart">重新开始</div>
    </div>
  </div>
</template>

<script>

import Controller from './controller.vue'
import dragonLogon from './dragon-logon.vue'



const createMatrix = (rowCount, columnCount) => {
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

const levels = [3, 7, 12, 18, 25, 33, 42, 52, 62, 72]

export default {
  props: {
    rowCount: {
      type: Number,
      default() {
        return 20;
      }
    },
    columnCount: {
      type: Number,
      default() {
        return 10;
      }
    },
    short: {
      type: Boolean,
      default() {
        return false
      }
    },
    running: Boolean,
  },
  components: {
    Controller,
    dragonLogon,
  },
  data() {
    
    return {
      matrix: createMatrix(this.rowCount, this.columnCount),
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
    hideUselessStyle() {
      const {
        short
      } = this
      return {
        display: short ? 'none' : ''
      }
    },
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
  },
  mounted() {
    this.runningIntervalId = setInterval(this.engine, 10)
  },
  destroyed() {
    clearInterval(this.runningIntervalId)
  },
  methods: {
    __blocksPanelResized(size) {
      const {
        columnCount
      } = this;
      const {
        blockPanelMainRef: blockPanelMainObj
      } = this.$refs
      const blockSize = ((size.width / columnCount) - 2).toFixed(2);
      blockPanelMainObj.style.setProperty('--block-size', `${blockSize}px`)
      
    },
    cellValue(rowIdx, colIdx) {
      const {
        matrix
      } = this
      if (rowIdx < matrix.length && rowIdx >= 0) {
        const row = matrix[rowIdx]
        if (row && row.length > colIdx && colIdx >= 0) {
          return row[colIdx]
        }
      }
      return false;
    },
    blockClassMatrix(rowIdx, colIdx) {
      const {
        dataDrawComp,
        currentShapeComp,
        current,
      } = this

      let cellValue = false;
      if (dataDrawComp.length > rowIdx) {
        const row = dataDrawComp[rowIdx]
        if (row.length > colIdx) {
          cellValue = row[colIdx]
        }
      }
      const rv = this.blockClass(cellValue)
      if (current && currentShapeComp) {
        const x = colIdx - current.pos.x + current.pos.offsetX;
        const y = rowIdx - current.pos.y;
        if (y >= 0 && y < currentShapeComp.length) {
          if (x >= 0 && x < currentShapeComp[y].length) {
            rv.curr = currentShapeComp[y][x]
          }
        }
      }
      
      return rv;
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
      const {currentShapeComp, current, columnCount} = that
      if ('q' === key) {
        that.$emit('request-hide')
      } else {
        const {
          running
        } = that
        if (running) { // 方块操作按键只能在游戏运行时 控制
          if ('a' === key) {
            
            let hit = false
            
            OUTTER: for (let shapeRowIdx=0; shapeRowIdx<currentShapeComp.length; shapeRowIdx++) {
              const row = currentShapeComp[shapeRowIdx];
              for (let shapeColIdx=0; shapeColIdx<row.length; shapeColIdx++) {
                const y = current.pos.y + shapeRowIdx;
                const x = current.pos.x - 1 - current.pos.offsetX + shapeColIdx
                const cellValue = this.cellValue(y, x);
                if (row[shapeColIdx] && cellValue) {
                  hit = true;
                  break OUTTER;
                }
              }
            }

            if (!hit) {
              current.pos.x -= 1
              if (current.pos.x < 0) {
                current.pos.x = 0
              }
            }
            

          } else if ('d' === key) {
            let hit = false;

            OUTTER: for (let shapeRowIdx=0; shapeRowIdx<currentShapeComp.length; shapeRowIdx++) {
              const row = currentShapeComp[shapeRowIdx];
              for (let shapeColIdx=0; shapeColIdx<row.length; shapeColIdx++) {
                const y = current.pos.y + shapeRowIdx;
                const x = current.pos.x + 1 - current.pos.offsetX + shapeColIdx
                const cellValue = this.cellValue(y, x);
                if (row[shapeColIdx] && cellValue) {
                  hit = true;
                  break OUTTER;
                }
              }
            }

            if (!hit) {
              if (currentShapeComp[0].length + current.pos.x < columnCount) {
                current.pos.x += 1
              }
            }
            
            

          } else if ('w' === key) {
            const direOri = current.dire
            const offXOri = current.pos.offsetX

            current.dire += 1
            current.dire = current.dire % blockShapes[current.type].length
            current.pos.offsetX = current.pos.x + this.currentShapeComp[0].length - columnCount
            if (current.pos.offsetX < 0) {
              current.pos.offsetX = 0
            }

            const shape = this.currentShapeComp // 必须从this引用更新后的图形ddwd

            let hit = false
            OUTTER: for (let shapeRowIdx=0; shapeRowIdx<shape.length; shapeRowIdx++) {
              const row = shape[shapeRowIdx];
              for (let shapeColIdx=0; shapeColIdx<row.length; shapeColIdx++) {
                const y = current.pos.y + shapeRowIdx;
                const x = current.pos.x - current.pos.offsetX + shapeColIdx
                const cellValue = this.cellValue(y, x);
                if (row[shapeColIdx] && cellValue) {
                  hit = true;
                  break OUTTER;
                }
              }
            }
            console.log(shape)
            if (hit) {
              current.dire = direOri
              current.pos.offsetX = offXOri
            }
          } 
        }

        if ('r' === key) {
          if (this.gameover) {
            this.gameover = false
            this.newGame()
          } else {
            this.$emit('update:running', !running)
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
      this.matrix = createMatrix(this.rowCount, this.columnCount);
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
          next,
          rowCount,
          columnCount
        } = that

        if (!current && !next) {
          this.newGame()
        }

        const duration = Date.now() - timestamp
        if (duration > speedComp || this.speedyFall) {
          const canDrop = () => {
            if (currentShapeComp.length + current.pos.y >= matrix.length) { // 当前图形 触底
              return false
            }

            let hit = false; // 是否有阻挡 
            OUTTER: for (let shapeRowIdx=currentShapeComp.length; shapeRowIdx>0; shapeRowIdx--) {
              const shapeRow = currentShapeComp[shapeRowIdx - 1]
              for (let shapeColIdx=0; shapeColIdx<shapeRow.length; shapeColIdx++) {
                const rowIdx = current.pos.y + shapeRowIdx;
                const colIdx = current.pos.x + shapeColIdx - current.pos.offsetX;
                if (shapeRow[shapeColIdx] && this.cellValue(rowIdx, colIdx)) {
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
            if(current.pos.y <= 0) { // 砖块掉不下来了，游戏结束, 如果正好剩下两格，方块也是两个的高度，就下去不去，这时候y=0
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
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.block-panel-main {
  --block-size: 10px;
  --block-border-width: 1px;
  --block-margin: 1px;
  --pause-layer-bg: linear-gradient(rgba(50, 50, 50, 0.8), rgba(0, 0, 0, 0.95), rgba(50, 50, 50, 0.8));

  background: linear-gradient(#aaa, #eee, #aaa);
  position: relative;
  display: block;
}

.pause-layer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--pause-layer-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}

.pause-layer>.dragon {
  margin-bottom: 20px;
}

.screen {
  background: white;
}

.state-panel {
  color: #332211;
  padding: 10px;
  display: flex;
  height: 130px;
  background: linear-gradient(#aaa, #fff, #aaa);
}

.state-panel>.state-block {
  margin-right: 30px;
  flex: 1 1 auto;
  
}

.screen>.panel {
  border: 1px solid black;
  display: flex;
  flex-flow: column;
  align-items: center;
}
.screen>.panel>.row, .next-shape>.row {
  display: flex;
}
.screen>.panel>.row>.block {
  --bg-color: #e6e6e6;
  box-sizing: border-box;
  margin: var(--block-margin);
  border: var(--block-border-width) solid var(--bg-color);
  width: var(--block-size);
  height: var(--block-size);
  display: flex;
  justify-content: center;
  align-items: center;
}
.screen>.panel>.row>.block.dark.curr {
  --bg-color: rgb(148, 49, 49);
} 
.screen>.panel>.row>.block.dark, .next-shape>.row>.block.dark {
  --bg-color: #333;
}

.screen>.panel>.row>.block:before, .next-shape>.row>.block.dark:before {
  content: '';
  width: 60%;
  height: 60%;
  background: var(--bg-color);
}
.next-shape>.row>.block.dark {
  border: var(--block-border-width) solid var(--bg-color);
}
.next-shape>.row>.block {
  box-sizing: border-box;
  --bg-color: #e6e6e6; 
  margin: var(--block-margin);
  width: var(--block-size);
  height: var(--block-size);
  display: flex;
  justify-content: center;
  align-items: center;
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
  display: block;
  justify-content: center;
}

.game-over-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--pause-layer-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  
}
.game-over-panel>.block {
  font-size: 70px;
  color: white;
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.game-over-panel>.score {
  font-size: 90px;
  color: rgb(60, 253, 60);
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<template>
  <div class="example-clip-main">
    <div class="clip-path-block">
      <h1>Circle</h1>
      <clip-circle :image-width="imageWidth" :image-height="imageHeight"/>
    </div>

    <div class="clip-path-block">
      <h1>Ellipse</h1>
      <clip-ellipse :image-width="imageWidth" :image-height="imageHeight"/>
    </div>

    <div class="clip-path-block">
      <h1>Polygon</h1>
      <clip-polygon :image-width="imageWidth" :image-height="imageHeight" :points="polygon.ps3"/>
      <clip-polygon :image-width="imageWidth" :image-height="imageHeight" :points="polygon.ps4"/>
      <clip-polygon :image-width="imageWidth" :image-height="imageHeight" :points="polygon.ps5"/>
      <clip-polygon :image-width="imageWidth" :image-height="imageHeight" :points="polygon.ps6"/>
      <clip-polygon :image-width="imageWidth" :image-height="imageHeight" :points="polygon.ps7"/>
      <clip-polygon :image-width="imageWidth" :image-height="imageHeight" :points="polygon.ps8"/>
      <clip-polygon :image-width="imageWidth" :image-height="imageHeight" :points="polygon.ps12"/>
      <clip-polygon :image-width="imageWidth" :image-height="imageHeight" :points="polygon.psStar"/>

    </div>
  </div>
</template>


<script>
import ClipPolygon from './components/clip-path/polygon.vue'
import ClipCircle from './components/clip-path/circle.vue'
import ClipEllipse from './components/clip-path/ellipse.vue'

export default {
  components: {
    ClipPolygon,
    ClipCircle,
    ClipEllipse
  },
  data() {
    const imageWidth = 400;
    const imageHeight = 400;
    
    const radiusOutter = 200
    const radiusInner = 75
    const  psStar = []
    for (let i=0; i<5; i++) {
      psStar.push({
        x: Math.cos((18 + i * 72) / 180 * Math.PI) * radiusOutter + radiusOutter,
        y: -Math.sin((18 + i * 72) / 180 * Math.PI) * radiusOutter + radiusOutter,
      })
      psStar.push({
        x: Math.cos((54 + i * 72) / 180 * Math.PI) * radiusInner + radiusOutter,
        y: -Math.sin((54 + i * 72) / 180 * Math.PI) * radiusInner + radiusOutter,
      })
    }

    return {
      imageWidth,
      imageHeight,

      polygon: {
        ps3: [{
          x: imageWidth / 2,
          y: 0
        }, {
          x:0,
          y: imageHeight
        },{
          x: imageWidth,
          y: imageHeight
        }],

        ps4: [{
          x: imageWidth / 3 * 2,
          y: 0
        },{
          x: imageWidth / 3,
          y:  imageHeight
        },{
          x: imageWidth,
          y: imageHeight
        },{
          x: imageWidth / 10,
          y: imageHeight / 3
        }],

        ps5: [{
          x: imageWidth / 2,
          y: 0
        },{
          x: 0,
          y: imageHeight / 5 * 2
        },{
          x: imageWidth / 5 * 1,
          y: imageHeight
          
        },{
          x: imageWidth / 5 * 4,
          y: imageHeight
        },{
          x: imageWidth,
          y: imageHeight / 5 * 2
        }],

        ps6: [{
          x: imageWidth / 3,
          y: 0
        },{
          x: 0,
          y: imageHeight / 3
        }, {
          x: 0,
          y: imageHeight / 3 * 2
          
        }, {
          x: imageWidth / 3,
          y: imageHeight
        }, {
          x: imageWidth / 3 * 2,
          y: imageHeight
        }, {
          x: imageWidth,
          y: imageHeight / 2
        }],

        ps7: [{
          x: imageWidth / 3,
          y: 0
        }, {
          x: 0,
          y: imageHeight / 3
        }, {
          x: 0,
          y: imageHeight / 3 * 2
          
        }, {
          x: imageWidth / 3,
          y: imageHeight
        }, {
          x: imageWidth / 3 * 2,
          y: imageHeight
        }, {
          x: imageWidth,
          y: imageHeight / 3 * 2
        }, {
          x: imageWidth,
          y: imageHeight / 3
        }],

        ps8: [{
          x: imageWidth / 3,
          y: 0
        }, {
          x: 0,
          y: imageHeight / 3
        }, {
          x: 0,
          y: imageHeight / 3 * 2
        }, {
          x: imageWidth / 3,
          y: imageHeight
        }, {
          x: imageWidth / 3 * 2,
          y: imageHeight
        }, {
          x: imageWidth,
          y: imageHeight / 3 * 2
        }, {
          x: imageWidth,
          y: imageHeight / 3
        }, {
          x: imageWidth / 3 * 2,
          y: 0
        }],

        ps12: [{
          x: imageWidth / 3,
          y: 0
        }, {
          x: imageWidth / 3,
          y: imageHeight / 3
        }, {
          x: 0,
          y: imageHeight / 3
        }, {
          x: 0,
          y: imageHeight / 3 * 2
        }, {
          x: imageWidth / 3,
          y: imageHeight / 3 * 2
        }, {
          x: imageWidth / 3,
          y: imageHeight
        }, {
          x: imageWidth / 3 * 2,
          y: imageHeight
        }, {
          x: imageWidth / 3 * 2,
          y: imageHeight / 3 * 2
        }, {
          x: imageWidth,
          y: imageHeight / 3 * 2
        }, {
          x: imageWidth,
          y: imageHeight / 3
        }, {
          x: imageWidth / 3 * 2,
          y: imageHeight / 3
        }, {
          x: imageWidth / 3 * 2,
          y: 0
        }],

        psStar,
      }
    }
  }
}

</script>

<style scoped>
.clip-path-block {
  margin-bottom: 80px;
}
</style>
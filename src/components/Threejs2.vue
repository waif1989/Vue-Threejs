<template>
  <div class="hello">
    <h1>threejs2</h1>
  </div>
</template>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>

<script>
  import * as THREE from 'three'
  export default {
    data () {
      return {
        scene: {},
        camera: {},
        renderer: {},
        WIDTH: 0,
        HEIGHT: 0
      }
    },
    methods: {
      init () {
        this.scene = new THREE.Scene()
        this.WIDTH = window.innerWidth
        this.HEIGHT = window.innerHeight
        this.renderer = new THREE.WebGLRenderer({ antialias:true })
        this.renderer.setSize(this.WIDTH, this.HEIGHT)
        document.body.appendChild(this.renderer.domElement)
        this.camera = new THREE.PerspectiveCamera(45, this.WIDTH / this.HEIGHT, 0.1, 20000)
        this.camera.position.set(0, 6, 0)
        this.scene.add(this.camera)
      },
      animate () {

      }
    }
  }
</script>

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
  import LogoModel from '../assets/models/treehouse_logo'
  export default {
    data () {
      return {
        scene: {},
        camera: {},
        renderer: {},
        light: {},
        loader: {},
        mesh: {},
        controls: {},
        WIDTH: 0,
        HEIGHT: 0
      }
    },
    methods: {
      init () {
        this.scene = new THREE.Scene()
        // ////////////////////////////////////////////////////
        this.WIDTH = window.innerWidth
        this.HEIGHT = window.innerHeight
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(this.WIDTH, this.HEIGHT)
        document.body.appendChild(this.renderer.domElement)
        // ////////////////////////////////////////////////////
        this.camera = new THREE.PerspectiveCamera(45, this.WIDTH / this.HEIGHT, 0.1, 20000)
        this.camera.position.set(0, 6, 0)
        this.scene.add(this.camera)
        // ////////////////////////////////////////////////////
        window.addEventListener('resize', () => {
          this.WIDTH = window.innerWidth
          this.HEIGHT = window.innerHeight
          this.renderer.setSize(this.WIDTH, this.HEIGHT)
          this.camera.aspect = this.WIDTH / this.HEIGHT
          this.camera.updateProjectionMatrix()
        })
        // ////////////////////////////////////////////////////
        this.renderer.setClearColor(0x333F47, 1)
        this.light = new THREE.PointLight(0xffffff)
        this.light.position.set(-100, 200, 100)
        this.scene.add(this.light)
        // ////////////////////////////////////////////////////
        this.loader = new THREE.JSONLoader()
        this.loader.load(LogoModel, (geometry) => {
          const material = new THREE.MeshLambertMaterial({ color: 0x55B663 })
          this.mesh = new THREE.Mesh(geometry, material)
          this.scene.add(this.mesh)
        })
        // this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
      },
      animate () {
        requestAnimationFrame(this.animate)
        this.renderer.render(this.scene, this.camera)
        // this.controls.update()
      }
    },
    mounted () {
      this.init()
      this.animate()
    }
  }
</script>

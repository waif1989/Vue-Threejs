<template>
  <div class="hello">
    <h1>threejs2</h1>
    <div><router-link to="/">go back</router-link></div>
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
  import Envjpg from '../assets/models/spherical_texture.jpg'
  export default {
    data () {
      return {
        requestAnimationFrameId: null, // Recording requestAnimationFrame id,when the component destroyes,we use cancelAnimationFrame to stop requestAnimationFrame.
        mesh: {},
        texture: {},
        container: {},
        isUserInteracting: false,
        fov: 70,
        lon: 0,
        lat: 0,
        phi: 0,
        theta: 0,
        onPointerDownPointerX: 0,
        onPointerDownPointerY: 0,
        onPointerDownLon: 0,
        onPointerDownLat: 0,
        plane: null,
        cube: null,
        windowHalfX: 0,
        windowHalfY: 0,
        ratio: window.innerWidth / window.innerHeight,
        camera: null,
        scene: null,
        renderer: null,
        targetRotation: 0,
        targetRotationOnMouseDown: 0,
        mouseX: 0,
        mouseXOnMouseDown: 0,
        msg: ''
      }
    },
    methods: {
      init () {
        // ///////////////////////////
        this.container = document.createElement('div')
        this.container.setAttribute('id', 'threecontainer')
        document.body.appendChild(this.container)
        // //////////////////////////
        this.camera = new THREE.PerspectiveCamera(this.fov, this.ratio, 1, 1000)
        this.scene = new THREE.Scene()
        this.mesh = new THREE.Mesh(new THREE.SphereGeometry(500, 60, 40), new THREE.MeshBasicMaterial({ map: this.texture }))
        this.mesh.scale.x = -1
        this.scene.add(this.mesh)
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.container.appendChild(this.renderer.domElement)
        this.container.addEventListener('mousedown', this.onDocumentMouseDown, false)
        this.container.addEventListener('touchstart', this.onDocumentTouchStart, false)
        window.addEventListener('resize', this.onWindowResize, false)
        // this.onWindowResize(null)
      },
      onWindowResize (event) {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.camera.projectionMatrix.makePerspective(this.fov, this.ratio, 1, 1100)
      },
      onDocumentMouseDown (event) {
        event.preventDefault()
        this.isUserInteracting = true
        this.onPointerDownPointerX = event.clientX
        this.onPointerDownPointerY = event.clientY
        this.onPointerDownLon = this.lon
        this.onPointerDownLat = this.lat
        this.container.addEventListener('mousemove', this.onDocumentMouseMove, false)
        this.container.addEventListener('mouseup', this.onDocumentMouseUp, false)
      },
      onDocumentMouseMove (event) {
        this.lon = (event.clientX - this.onPointerDownPointerX) * -0.175 + this.onPointerDownLon
        this.lat = (event.clientY - this.onPointerDownPointerY) * -0.175 + this.onPointerDownLat
      },
      onDocumentMouseUp () {
        this.isUserInteracting = false
        this.container.removeEventListener('mousemove', this.onDocumentMouseMove, false)
        this.container.removeEventListener('mouseup', this.onDocumentMouseUp, false)
      },
      onDocumentTouchStart (event) {
        event.preventDefault()
        this.isUserInteracting = true
        this.onPointerDownPointerX = event.touches[ 0 ].pageX
        this.onPointerDownPointerY = event.touches[ 0 ].pageY
        this.onPointerDownLon = this.lon
        this.onPointerDownLat = this.lat
        this.container.addEventListener('touchmove', this.onDocumentTouchMove, false)
        this.container.addEventListener('touchmoveend', this.onDocumentTouchEnd, false)
      },
      onDocumentTouchMove (event) {
        this.lon = (event.touches[ 0 ].pageX - this.onPointerDownPointerX) * -0.175 + this.onPointerDownLon
        this.lat = (event.touches[ 0 ].pageY - this.onPointerDownPointerY) * -0.175 + this.onPointerDownLat
      },
      onDocumentTouchEnd () {
        this.isUserInteracting = false
        this.container.removeEventListener('touchmove', this.onDocumentTouchMove, false)
        this.container.removeEventListener('touchmoveend', this.onDocumentTouchEnd, false)
      },
      animate () {
        this.requestAnimationFrameId = requestAnimationFrame(this.animate)
        this.render()
      },
      render () {
        if (this.isUserInteracting === false) {
          this.lon = this.lon + 0.15
        }
        this.lat = Math.max(-85, Math.min(85, this.lat))
        this.phi = THREE.Math.degToRad(90 - this.lat)
        this.theta = THREE.Math.degToRad(this.lon)
        this.camera.position.x = 100 * Math.sin(this.phi) * Math.cos(this.theta)
        this.camera.position.y = 100 * Math.cos(this.phi)
        this.camera.position.z = 100 * Math.sin(this.phi) * Math.sin(this.theta)
        this.camera.lookAt(this.scene.position)
        this.renderer.render(this.scene, this.camera)
      }
    },
    mounted () {
      this.texture = THREE.ImageUtils.loadTexture(Envjpg, undefined, () => {
        this.init()
        this.animate()
      })
    },
    beforeDestroy () {
      window.cancelAnimationFrame(this.requestAnimationFrameId)
      this.mesh = {}
      this.texture = {}
      this.container = {}
      this.isUserInteracting = false
      this.fov = 70
      this.lon = 0
      this.lat = 0
      this.phi = 0
      this.theta = 0
      this.onPointerDownPointerX = 0
      this.onPointerDownPointerY = 0
      this.onPointerDownLon = 0
      this.onPointerDownLat = 0
      this.plane = null
      this.cube = null
      this.windowHalfX = 0
      this.windowHalfY = 0
      this.ratio = 0
      this.camera = null
      this.scene = null
      this.renderer = null
      this.targetRotation = 0
      this.targetRotationOnMouseDown = 0
      this.mouseX = 0
      this.mouseXOnMouseDown = 0
      this.msg = ''
    },
    destroyed () {
      const container = document.getElementById('threecontainer')
      container.parentNode.removeChild(container)
    }
  }
</script>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div><router-link to="../">go back</router-link></div>
  </div>
</template>

<script>
  import * as THREE from 'three'
  export default {
    name: 'hello',
    data () {
      return {
        requestAnimationFrameId: null, // Recording requestAnimationFrame id,when the component destroyes,we use cancelAnimationFrame to stop requestAnimationFrame.
        plane: null,
        cube: null,
        windowHalfX: 0,
        windowHalfY: 0,
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
        const container = document.createElement('div')
        container.setAttribute('id', 'threecontainer')
        document.body.appendChild(container)
        const info = document.createElement('div')
        info.style.position = 'absolute'
        info.style.top = '10px'
        info.style.width = '100%'
        info.style.textAlign = 'center'
        info.innerHTML = 'Drag to spin the cube'
        container.appendChild(info)
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
        this.camera.position.y = 150
        this.camera.position.z = 500
        this.scene = new THREE.Scene()
        const geometry = new THREE.BoxGeometry(200, 200, 200)
        for (let i = 0; i < geometry.faces.length; i = i + 2) {
          const hex = Math.random() * 0xffffff
          geometry.faces[ i ].color.setHex(hex)
          geometry.faces[ i + 1 ].color.setHex(hex)
        }
        const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 })
        this.cube = new THREE.Mesh(geometry, material)
        this.cube.position.y = 150
        this.scene.add(this.cube)
        const geometry2 = new THREE.PlaneBufferGeometry(200, 200)
        geometry2.rotateX(-Math.PI / 2)
        const material2 = new THREE.MeshBasicMaterial({ color: 0xe0e0e0, overdraw: 0.5 })
        this.plane = new THREE.Mesh(geometry2, material2)
        this.scene.add(this.plane)
        // this.renderer = new THREE.CanvasRenderer()
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setClearColor(0xf0f0f0)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        container.appendChild(this.renderer.domElement)
        // const stats = new Stats()
        // container.appendChild( stats.dom )
        document.addEventListener('mousedown', this.onDocumentMouseDown, false)
        document.addEventListener('touchstart', this.onDocumentTouchStart, false)
        document.addEventListener('touchmove', this.onDocumentTouchMove, false)
        //
        window.addEventListener('resize', this.onWindowResize, false)
      },
      onWindowResize () {
        this.windowHalfX = window.innerWidth / 2
        this.windowHalfY = window.innerHeight / 2
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
      },
      onDocumentMouseDown (event) {
        event.preventDefault()
        document.addEventListener('mousemove', this.onDocumentMouseMove, false)
        document.addEventListener('mouseup', this.onDocumentMouseUp, false)
        document.addEventListener('mouseout', this.onDocumentMouseOut, false)
        this.mouseXOnMouseDown = event.clientX - this.windowHalfX
        this.targetRotationOnMouseDown = this.targetRotation
      },
      onDocumentMouseMove (event) {
        this.mouseX = event.clientX - this.windowHalfX
        this.targetRotation = this.targetRotationOnMouseDown + (this.mouseX - this.mouseXOnMouseDown) * 0.02
      },
      onDocumentMouseUp (event) {
        document.removeEventListener('mousemove', this.onDocumentMouseMove, false)
        document.removeEventListener('mouseup', this.onDocumentMouseUp, false)
        document.removeEventListener('mouseout', this.onDocumentMouseOut, false)
      },
      onDocumentMouseOut (event) {
        document.removeEventListener('mousemove', this.onDocumentMouseMove, false)
        document.removeEventListener('mouseup', this.onDocumentMouseUp, false)
        document.removeEventListener('mouseout', this.onDocumentMouseOut, false)
      },
      onDocumentTouchStart (event) {
        if (event.touches.length === 1) {
          event.preventDefault()
          this.mouseXOnMouseDown = event.touches[ 0 ].pageX - this.windowHalfX
          this.targetRotationOnMouseDown = this.targetRotation
        }
      },
      onDocumentTouchMove (event) {
        if (event.touches.length === 1) {
          event.preventDefault()
          this.mouseX = event.touches[ 0 ].pageX - this.windowHalfX
          this.targetRotation = this.targetRotationOnMouseDown + (this.mouseX - this.mouseXOnMouseDown) * 0.05
        }
      },
      animate () {
        this.requestAnimationFrameId = requestAnimationFrame(this.animate)
        this.render()
      },
      render () {
        this.plane.rotation.y = this.cube.rotation.y += (this.targetRotation - this.cube.rotation.y) * 0.05
        this.renderer.render(this.scene, this.camera)
      }
    },
    created () {
    },
    mounted () {
      this.init()
      this.animate()
    },
    beforeDestroy () {
      window.cancelAnimationFrame(this.requestAnimationFrameId)
      this.plane = null
      this.cube = null
      this.windowHalfX = 0
      this.windowHalfY = 0
      this.camera = null
      this.scene = null
      this.renderer = null
      this.targetRotation = 0
      this.targetRotationOnMouseDown = 0
      this.mouseX = 0
      this.mouseXOnMouseDown = 0
    },
    destroyed () {
      const container = document.getElementById('threecontainer')
      container.parentNode.removeChild(container)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

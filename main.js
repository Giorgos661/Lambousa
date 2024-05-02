//Import the THREE.js library
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js'
// To allow for the camera to move around the scene
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js'
// To allow for importing the .gltf file
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js'

window.onload = function () {
  const screenOneEl = document.querySelector('.screen-one')
  const screenTwoEl = document.querySelector('.screen-two')

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.setSize(screenOneEl.clientWidth, screenOneEl.clientHeight)
  renderer.setClearColor(0xc0c0c0) //background color
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap // softer shadows
  screenOneEl.appendChild(renderer.domElement)

  const renderer2 = new THREE.WebGLRenderer({ antialias: true })
  renderer2.outputColorSpace = THREE.SRGBColorSpace
  renderer2.setSize(screenTwoEl.clientWidth, screenTwoEl.clientHeight)
  renderer2.setClearColor(0xc0c0c0) //background color
  renderer2.setPixelRatio(window.devicePixelRatio)
  renderer2.shadowMap.enabled = true
  renderer2.shadowMap.type = THREE.PCFSoftShadowMap // softer shadows
  screenTwoEl.appendChild(renderer2.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    45,
    screenOneEl.clientWidth / screenOneEl.clientHeight,
    1,
    1000
  )
  camera.position.set(15, 25, 35)
  camera.lookAt(0, -3, 0)

  const scene2 = new THREE.Scene()
  const camera2 = new THREE.PerspectiveCamera(
    45,
    screenTwoEl.clientWidth / screenTwoEl.clientHeight,
    1,
    1000
  )
  camera2.position.set(15, 25, 35)
  camera2.lookAt(0, -3, 0)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enablePan = false
  controls.minDistance = 5
  controls.maxDistance = 100
  controls.minPolarAngle = 0
  controls.maxPolarAngle = Math.PI
  controls.autoRotate = false
  controls.target = new THREE.Vector3(0, 1, 0)
  controls.update()

  const controls2 = new OrbitControls(camera2, renderer2.domElement)
  controls2.enableDamping = true
  controls2.enablePan = false
  controls2.minDistance = 5
  controls2.maxDistance = 100
  controls2.minPolarAngle = 0
  controls2.maxPolarAngle = Math.PI
  controls2.autoRotate = false
  controls2.target = new THREE.Vector3(0, 1, 0)
  controls2.update()

  const loadingManager = new THREE.LoadingManager()
  loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(
      'Started loading file: ' +
        url +
        '.\nLoaded ' +
        itemsLoaded +
        ' of ' +
        itemsTotal +
        ' files.'
    )
  }

  loadingManager.onLoad = function () {
    console.log('All files loaded.')
  }

  loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log(
      'Loading file: ' +
        url +
        '.\nLoaded ' +
        itemsLoaded +
        ' of ' +
        itemsTotal +
        ' files.'
    )
  }

  loadingManager.onError = function (url) {
    console.log('There was an error loading ' + url)
  }

  const loader = new GLTFLoader(loadingManager).setPath('')
  loader.load('lambousa.glb', (gltf) => {
    const mesh = gltf.scene
    mesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    mesh.position.y = -3
    scene.add(mesh)
  })
  loader.load('lambousa (2).glb', (gltf) => {
    const mesh = gltf.scene
    mesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    mesh.position.y = -3
    scene2.add(mesh)
  })

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  const ambientLight2 = new THREE.AmbientLight(0xffffff, 0.5)
  scene2.add(ambientLight2)

  const spotLight = new THREE.SpotLight(0xffffff, 1)
  spotLight.position.set(0, 25, 0)
  spotLight.castShadow = true
  spotLight.shadow.bias = -0.0001
  spotLight.shadow.mapSize.width = 2048
  spotLight.shadow.mapSize.height = 2048
  scene.add(spotLight)

  const spotLight2 = new THREE.SpotLight(0xffffff, 1)
  spotLight2.position.set(0, 25, 0)
  spotLight2.castShadow = true
  spotLight2.shadow.bias = -0.0001
  spotLight2.shadow.mapSize.width = 2048
  spotLight2.shadow.mapSize.height = 2048
  scene2.add(spotLight2)

  window.addEventListener('resize', () => {
    camera.aspect = screenOneEl.clientWidth / screenOneEl.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(screenOneEl.clientWidth, screenOneEl.clientHeight)

    camera2.aspect = screenTwoEl.clientWidth / screenTwoEl.clientHeight
    camera2.updateProjectionMatrix()
    renderer2.setSize(screenTwoEl.clientWidth, screenTwoEl.clientHeight)
  })

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    controls2.update()
    renderer.render(scene, camera)
    renderer2.render(scene2, camera2)
  }

  animate()
}

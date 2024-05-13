//Import the THREE.js library
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js'
// To allow for the camera to move around the scene
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js'
// To allow for importing the .gltf file
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js'

window.onload = function () {
  const screenEl = document.querySelector('.screen')

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.setSize(screenEl.clientWidth, screenEl.clientHeight)
  renderer.setClearColor(0xc0c0c0) //background color
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap // softer shadows
  screenEl.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    45,
    screenEl.clientWidth / screenEl.clientHeight,
    1,
    1000
  )
  camera.position.set(15, 25, 35)
  camera.lookAt(0, -3, 0)

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

  const loadingManager = new THREE.LoadingManager()
  loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log('onStart')
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
    screenEl.classList.remove('loading')
    console.log('All files loaded.')
  }

  loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    screenEl.classList.add('loading')
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
  loader.load('lambousa (2).glb', (gltf) => {
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

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const spotLight = new THREE.SpotLight(0xffffff, 1)
  spotLight.position.set(0, 25, 0)
  spotLight.castShadow = true
  spotLight.shadow.bias = -0.0001
  spotLight.shadow.mapSize.width = 2048
  spotLight.shadow.mapSize.height = 2048
  scene.add(spotLight)

  window.addEventListener('resize', () => {
    camera.aspect = screenEl.clientWidth / screenEl.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(screenEl.clientWidth, screenEl.clientHeight)
  })

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }

  animate()
}

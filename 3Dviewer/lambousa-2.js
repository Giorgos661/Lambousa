//Import the THREE.js library
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js'
// To allow for the camera to move around the scene
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js'
// To allow for importing the .gltf file
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js'

window.onload = function () {
  const screenTwoEl = document.querySelector('.screen-two')

  const renderer2 = new THREE.WebGLRenderer({ antialias: true })
  renderer2.outputColorSpace = THREE.SRGBColorSpace
  renderer2.setSize(screenTwoEl.clientWidth, screenTwoEl.clientHeight)
  renderer2.setClearColor(0xc0c0c0) //background color
  renderer2.setPixelRatio(window.devicePixelRatio)
  renderer2.shadowMap.enabled = true
  renderer2.shadowMap.type = THREE.PCFSoftShadowMap // softer shadows
  screenTwoEl.appendChild(renderer2.domElement)

  const scene2 = new THREE.Scene()
  const camera2 = new THREE.PerspectiveCamera(
    45,
    screenTwoEl.clientWidth / screenTwoEl.clientHeight,
    1,
    1000
  )
  camera2.position.set(15, 25, 35)
  camera2.lookAt(0, -3, 0)

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

  const loadingManager2 = new THREE.LoadingManager()
  loadingManager2.onStart = function (url, itemsLoaded, itemsTotal) {
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

  loadingManager2.onLoad = function () {
    console.log('All files loaded.')
  }

  loadingManager2.onProgress = function (url, itemsLoaded, itemsTotal) {
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

  loadingManager2.onError = function (url) {
    console.log('There was an error loading ' + url)
  }

  const loeader2 = new GLTFLoader(loadingManager2).setPath('')
  loeader2.load('lambousa.glb', (gltf) => {
    // const mesh2 = gltf.scene
    // mesh2.traverse((child) => {
    //   if (child.isMesh) {
    //     child.castShadow = true
    //     child.receiveShadow = true
    //   }
    // })
    // mesh2.position.y = -3
    // scene2.add(mesh2)
  })
  loeader2.load('lambousa (2).glb', (gltf) => {
    const mesh2 = gltf.scene
    mesh2.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    mesh2.position.y = -3
    scene2.add(mesh2)
  })

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene2.add(ambientLight)

  const spotLight = new THREE.SpotLight(0xffffff, 1)
  spotLight.position.set(0, 25, 0)
  spotLight.castShadow = true
  spotLight.shadow.bias = -0.0001
  spotLight.shadow.mapSize.width = 2048
  spotLight.shadow.mapSize.height = 2048
  scene2.add(spotLight)

  window.addEventListener('resize', () => {
    camera2.aspect = screenTwoEl.clientWidth / screenTwoEl.clientHeight
    camera2.updateProjectionMatrix()
    renderer2.setSize(screenTwoEl.clientWidth, screenTwoEl.clientHeight)
  })

  function animate2() {
    requestAnimationFrame(animate2)
    controls2.update()
    renderer2.render(scene2, camera2)
  }

  animate2()
}

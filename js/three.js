$(document).ready(function() {
  // Scene
  const scene = new THREE.Scene();
  const gltfLoader = new THREE.GLTFLoader();
  let model = null;
  gltfLoader.load("./logo.glb", (gltf) => {
    model = gltf.scene;
    // model.scale.set(0.2, 0.2, 0.2);
    // model.position.y = 0.7;
    scene.add(model);
    // let newMaterial = new THREE.MeshStandardMaterial({
    //   color: 0x720bab,
    //   metalness: 0.2,
    //   roughness: 0.3,
    // });
    // model.traverse((o) => {
    //   if (o.isMesh) o.material = newMaterial;
    // });
  });

  const canvas = document.querySelector(".webgl");

  // Select Option
  const options = document.querySelectorAll(".option");

  for (const option of options) {
    option.addEventListener("click", selectOption);
  }

  function selectOption(e) {
    let option = e.target;
    for (const otherOption of options) {
      otherOption.classList.remove("--is-active");
    }
    option.classList.add("--is-active");
  }

  // Add lights
  var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
  hemiLight.position.set(0, 50, 0);
  // Add hemisphere light to scene
  scene.add(hemiLight);

  var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
  dirLight.position.set(-8, 12, 8);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  // Add directional Light to scene
  scene.add(dirLight);

  /**
   * Sizes
   */
  const canvContainer = document.querySelector(".canvas-contain");
  const sizes = {
    width: canvContainer.offsetWidth,
    height: canvContainer.offsetHeight,
  };

  window.addEventListener("resize", () => {
    // update sizes
    sizes.width = canvContainer.offsetWidth;
    sizes.height = canvContainer.offsetHeight;

    //update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    //   update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.set(0, 0, 5);
  scene.add(camera);
  // light

  /**
   * Renderer
   */

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * Animate
   */

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    //   //   update objects
    // Update controls
    if (model != null) {
      model.rotation.y = elapsedTime * Math.PI * 0.1;
    }

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
});

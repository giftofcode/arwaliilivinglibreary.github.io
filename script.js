// ===============================
// ARAWLII - The Infinite Book
// Basic Three.js Scene
// ===============================

// Canvas
const canvas = document.getElementById("webgl");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(0, 1.5, 6);

// Renderer
const renderer = new THREE.WebGLRenderer({

    canvas,

    antialias: true,

    alpha: true

});

renderer.setSize(

    window.innerWidth,

    window.innerHeight

);

renderer.setPixelRatio(

    Math.min(window.devicePixelRatio, 2)

);

// ===============================
// Lights
// ===============================

const ambientLight = new THREE.AmbientLight(

    0xffffff,

    1.3

);

scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(

    0xffd27a,

    2

);

keyLight.position.set(

    4,

    6,

    5

);

scene.add(keyLight);

// ===============================
// Floating Object
// (Temporary Book)
// ===============================

const geometry = new THREE.BoxGeometry(
    2.4,
    0.28,
    3.3,
    6,
    2,
    6
);

const material = new THREE.MeshPhysicalMaterial({

    color:0x5b3417,

    roughness:0.85,

    metalness:0.05,

    clearcoat:0.2,

    clearcoatRoughness:0.9

});
// Golden page edges

const pages = new THREE.Mesh(

    new THREE.BoxGeometry(

        2.22,

        0.22,

        3.05

    ),

    new THREE.MeshStandardMaterial({

        color:0xd7bf71,

        roughness:0.9

    })

);

pages.position.y = -0.01;

scene.add(pages);

const book = new THREE.Mesh(

    geometry,

    material

);

scene.add(book);

// ===============================
// Mouse Movement
// ===============================

let mouseX = 0;

let mouseY = 0;

window.addEventListener(

    "mousemove",

    (event)=>{

        mouseX =

        (event.clientX/window.innerWidth-.5)*2;

        mouseY =

        (event.clientY/window.innerHeight-.5)*2;

    }

);

// ===============================
// Resize
// ===============================

window.addEventListener(

    "resize",

    ()=>{

        camera.aspect=

        window.innerWidth/

        window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }

);

// ===============================
// Animation
// ===============================

const clock = new THREE.Clock();

function animate(){

    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    // Floating

    const floatY = Math.sin(t) * 0.12;

book.position.y = floatY;

pages.position.y = floatY - 0.01;

    // Rotation

    book.rotation.y += 0.003;

    // Mouse Follow

    book.rotation.x =

        mouseY*0.2;

    book.rotation.z =

        -mouseX*0.25;
    pages.rotation.copy(book.rotation);

    renderer.render(

        scene,

        camera

    );

}

animate();

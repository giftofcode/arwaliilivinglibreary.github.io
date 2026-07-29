// =====================================
// ARAWLII — THE INFINITE BOOK
// Complete Procedural 3D Book
// =====================================

const canvas = document.querySelector("#webgl");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(0, 2.5, 7);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

// =====================================
// LIGHTS
// =====================================

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.2
);

scene.add(ambientLight);

const warmLight = new THREE.DirectionalLight(
    0xffd59a,
    3
);

warmLight.position.set(4, 6, 5);
scene.add(warmLight);

const sideLight = new THREE.PointLight(
    0x8c5b32,
    18,
    15
);

sideLight.position.set(-4, 1, 3);
scene.add(sideLight);

// =====================================
// BOOK GROUP
// =====================================

const book = new THREE.Group();
scene.add(book);

// Book measurements
const bookWidth = 2.6;
const bookHeight = 0.22;
const bookDepth = 3.5;

// =====================================
// MATERIALS
// =====================================

const leatherMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x3c180d,
    roughness: 0.82,
    metalness: 0.05,
    clearcoat: 0.18,
    clearcoatRoughness: 0.75
});

const edgeMaterial = new THREE.MeshStandardMaterial({
    color: 0x9c713d,
    roughness: 0.6,
    metalness: 0.25
});

const pageMaterial = new THREE.MeshStandardMaterial({
    color: 0xe4d4ad,
    roughness: 0.95,
    metalness: 0
});

const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xb98a45,
    roughness: 0.35,
    metalness: 0.7
});

// =====================================
// BOTTOM COVER
// =====================================

const bottomCover = new THREE.Mesh(
    new THREE.BoxGeometry(
        bookWidth,
        0.12,
        bookDepth
    ),
    leatherMaterial
);

bottomCover.position.y = -0.22;
book.add(bottomCover);

// Decorative bottom border
const bottomBorder = new THREE.Mesh(
    new THREE.BoxGeometry(
        bookWidth + 0.05,
        0.035,
        bookDepth + 0.05
    ),
    edgeMaterial
);

bottomBorder.position.y = -0.145;
book.add(bottomBorder);

// =====================================
// PAGE BLOCK
// =====================================

const pages = new THREE.Mesh(
    new THREE.BoxGeometry(
        bookWidth - 0.18,
        bookHeight,
        bookDepth - 0.22
    ),
    pageMaterial
);

pages.position.x = 0.07;
pages.position.y = -0.02;
book.add(pages);

// Page lines
for (let i = 0; i < 9; i++) {

    const pageLine = new THREE.Mesh(
        new THREE.BoxGeometry(
            bookWidth - 0.16,
            0.008,
            bookDepth - 0.18
        ),
        edgeMaterial
    );

    pageLine.position.set(
        0.07,
        -0.11 + i * 0.027,
        0
    );

    pageLine.material = pageLine.material.clone();
    pageLine.material.opacity = 0.18;
    pageLine.material.transparent = true;

    book.add(pageLine);
}

// =====================================
// BOOK SPINE
// =====================================

const spine = new THREE.Mesh(
    new THREE.BoxGeometry(
        0.18,
        0.38,
        bookDepth
    ),
    leatherMaterial
);

spine.position.set(
    -bookWidth / 2,
    -0.03,
    0
);

book.add(spine);

// Golden spine bands
[-1.15, 0, 1.15].forEach((zPosition) => {

    const band = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.205,
            0.4,
            0.07
        ),
        goldMaterial
    );

    band.position.set(
        -bookWidth / 2 - 0.01,
        -0.03,
        zPosition
    );

    book.add(band);
});

// =====================================
// TOP COVER WITH HINGE
// =====================================

const topCoverPivot = new THREE.Group();

topCoverPivot.position.set(
    -bookWidth / 2,
    0.17,
    0
);

book.add(topCoverPivot);

const topCover = new THREE.Mesh(
    new THREE.BoxGeometry(
        bookWidth,
        0.12,
        bookDepth
    ),
    leatherMaterial
);

topCover.position.x = bookWidth / 2;
topCoverPivot.add(topCover);

// Golden frame
const coverFrame = new THREE.Mesh(
    new THREE.BoxGeometry(
        bookWidth - 0.22,
        0.018,
        bookDepth - 0.25
    ),
    goldMaterial
);

coverFrame.position.set(
    bookWidth / 2,
    0.07,
    0
);

topCoverPivot.add(coverFrame);

// Inner leather area
const innerCover = new THREE.Mesh(
    new THREE.BoxGeometry(
        bookWidth - 0.32,
        0.025,
        bookDepth - 0.36
    ),
    new THREE.MeshStandardMaterial({
        color: 0x32150c,
        roughness: 0.9
    })
);

innerCover.position.set(
    bookWidth / 2,
    0.085,
    0
);

topCoverPivot.add(innerCover);

// =====================================
// ARAWLII COVER TEXT
// =====================================

function createTextTexture() {

    const textCanvas = document.createElement("canvas");

    textCanvas.width = 1024;
    textCanvas.height = 1024;

    const context = textCanvas.getContext("2d");

    context.clearRect(
        0,
        0,
        textCanvas.width,
        textCanvas.height
    );

    context.textAlign = "center";
    context.fillStyle = "#c89b55";

    context.font = "bold 105px Georgia";
    context.fillText(
        "ARAWLII",
        512,
        440
    );

    context.font = "32px Georgia";
    context.fillText(
        "ACADEMY OF WRITERS",
        512,
        515
    );

    context.font = "28px Georgia";
    context.fillText(
        "AND WORLD LITERATI",
        512,
        565
    );

    const texture = new THREE.CanvasTexture(textCanvas);

    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
}

const titleMaterial = new THREE.MeshBasicMaterial({
    map: createTextTexture(),
    transparent: true,
    side: THREE.DoubleSide
});

const titlePlane = new THREE.Mesh(
    new THREE.PlaneGeometry(
        2.05,
        2.65
    ),
    titleMaterial
);

titlePlane.rotation.x = -Math.PI / 2;

titlePlane.position.set(
    bookWidth / 2,
    0.105,
    0
);

topCoverPivot.add(titlePlane);

// =====================================
// SUBTLE PARTICLES
// =====================================

const particleCount = 90;
const particlePositions = new Float32Array(
    particleCount * 3
);

for (let i = 0; i < particleCount; i++) {

    particlePositions[i * 3] =
        (Math.random() - 0.5) * 11;

    particlePositions[i * 3 + 1] =
        (Math.random() - 0.5) * 7;

    particlePositions[i * 3 + 2] =
        (Math.random() - 0.5) * 7;
}

const particleGeometry = new THREE.BufferGeometry();

particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        particlePositions,
        3
    )
);

const particleMaterial = new THREE.PointsMaterial({
    color: 0xb98a45,
    size: 0.022,
    transparent: true,
    opacity: 0.45
});

const particles = new THREE.Points(
    particleGeometry,
    particleMaterial
);

scene.add(particles);

// =====================================
// INITIAL BOOK POSITION
// =====================================

book.rotation.x = -0.25;
book.rotation.y = -0.45;
book.rotation.z = -0.05;

function updateBookLayout() {

    if (window.innerWidth <= 768) {

        book.scale.setScalar(0.72);

        book.position.set(
            0,
            -1.25,
            0
        );

        camera.position.set(
            0,
            2.1,
            7.5
        );

    } else {

        book.scale.setScalar(1);

        book.position.set(
            2.1,
            -0.2,
            0
        );

        camera.position.set(
            0,
            2.5,
            7
        );
    }
}

updateBookLayout();

// =====================================
// MOUSE MOVEMENT
// =====================================

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (event) => {

    mouseX =
        (event.clientX / window.innerWidth - 0.5) * 2;

    mouseY =
        (event.clientY / window.innerHeight - 0.5) * 2;
});

// Mobile touch movement
window.addEventListener(
    "touchmove",
    (event) => {

        const touch = event.touches[0];

        mouseX =
            (touch.clientX / window.innerWidth - 0.5) * 2;

        mouseY =
            (touch.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
);

// =====================================
// SCROLL OPENING
// =====================================

let scrollProgress = 0;

window.addEventListener(
    "scroll",
    () => {

        const openingDistance =
            window.innerHeight * 1.3;

        scrollProgress =
            Math.min(
                window.scrollY / openingDistance,
                1
            );
    },
    { passive: true }
);

// =====================================
// MOBILE MENU
// =====================================

const menuButton =
    document.querySelector(".menu-button");

const navigation =
    document.querySelector(".site-nav");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle("nav-open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );
    });
}

// =====================================
// RESIZE
// =====================================

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );

    updateBookLayout();
});

// =====================================
// ANIMATION
// =====================================

const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Floating movement
    book.position.y +=
        (
            Math.sin(time * 1.1) * 0.035 -
            (
                book.position.y -
                (
                    window.innerWidth <= 768
                        ? -1.25
                        : -0.2
                )
            )
        ) * 0.04;

    // Smooth mouse reaction
    const targetRotationY =
        -0.45 + mouseX * 0.12;

    const targetRotationX =
        -0.25 + mouseY * 0.06;

    book.rotation.y +=
        (targetRotationY - book.rotation.y) * 0.035;

    book.rotation.x +=
        (targetRotationX - book.rotation.x) * 0.035;

    // Scroll opens the cover
    const targetCoverRotation =
        scrollProgress * 2.65;

    topCoverPivot.rotation.z +=
        (
            targetCoverRotation -
            topCoverPivot.rotation.z
        ) * 0.055;

    // Book moves slightly while opening
    book.rotation.y +=
        (
            (-0.45 + scrollProgress * 0.18) -
            book.rotation.y
        ) * 0.015;

    particles.rotation.y =
        time * 0.018;

    particles.position.y =
        Math.sin(time * 0.3) * 0.08;

    renderer.render(
        scene,
        camera
    );
}

animate();

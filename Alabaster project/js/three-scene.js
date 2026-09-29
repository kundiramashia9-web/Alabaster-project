// ============================================================
// Alabaster Health & Aesthetics — 3D WebGL Interactive Background
// Features: Floating Serum Bottles, Lemon Bottle Ampoules,
// Luxury Cream Jars, Slimming Capsules, & Golden Collagen Spheres
// ============================================================

(function () {
    'use strict';

    function init3DScene() {
        const canvas = document.getElementById('hero3dCanvas');
        if (!canvas) return;

        if (typeof THREE === 'undefined') {
            setTimeout(init3DScene, 100);
            return;
        }

        const heroSection = canvas.parentElement || document.querySelector('.hero');
        let width = heroSection ? heroSection.clientWidth : window.innerWidth;
        let height = heroSection ? heroSection.clientHeight : window.innerHeight;

        // Scene
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x07152b, 0.04);

        // Camera
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);

        function updateCameraLayout() {
            if (width < 600) {
                camera.position.set(0, -0.2, 13.5);
            } else if (width < 992) {
                camera.position.set(1.0, 0, 12);
            } else {
                camera.position.set(2.2, 0.2, 10.5); // Offset to frame hero text gracefully
            }
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
        updateCameraLayout();

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        if (renderer.toneMapping !== undefined) {
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.15;
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x0a1c36, 1.4);
        scene.add(ambientLight);

        // Warm Gold Key Light
        const goldKeyLight = new THREE.DirectionalLight(0xffdf88, 2.4);
        goldKeyLight.position.set(5, 8, 7);
        scene.add(goldKeyLight);

        // Lavender / Ice Blue Fill Light
        const fillLight = new THREE.DirectionalLight(0x8ab4f8, 1.0);
        fillLight.position.set(-6, -3, 4);
        scene.add(fillLight);

        // Glowing Gold Point Light
        const goldPointLight = new THREE.PointLight(0xd4af37, 2.5, 20);
        goldPointLight.position.set(2, 2, 4);
        scene.add(goldPointLight);

        // Materials
        const goldMetalMaterial = new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            metalness: 0.9,
            roughness: 0.22
        });

        const goldHighlightMaterial = new THREE.MeshStandardMaterial({
            color: 0xf5d77f,
            metalness: 0.95,
            roughness: 0.15
        });

        const frostedGlassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.85,
            roughness: 0.2,
            transmission: 0.7,
            thickness: 0.8,
            reflectivity: 0.9
        });

        const amberSerumGlassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xd8882a,
            transparent: true,
            opacity: 0.88,
            roughness: 0.15,
            transmission: 0.65,
            thickness: 0.9
        });

        const lemonYellowLiquidMaterial = new THREE.MeshStandardMaterial({
            color: 0xffdb1a,
            roughness: 0.3,
            metalness: 0.2,
            transparent: true,
            opacity: 0.92
        });

        const porcelainWhiteMaterial = new THREE.MeshStandardMaterial({
            color: 0xfbfbfd,
            roughness: 0.25,
            metalness: 0.1
        });

        const rubberDropperMaterial = new THREE.MeshStandardMaterial({
            color: 0x1f242e,
            roughness: 0.6,
            metalness: 0.05
        });

        const silverSealMaterial = new THREE.MeshStandardMaterial({
            color: 0xdfe3e8,
            metalness: 0.85,
            roughness: 0.25
        });

        // 3D Model Builders
        // 1. Dropper Bottle
        function createDropperBottle() {
            const group = new THREE.Group();
            const body = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.5, 32), amberSerumGlassMaterial);
            group.add(body);

            const shoulder = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.55, 0.25, 32), amberSerumGlassMaterial);
            shoulder.position.y = 0.875;
            group.add(shoulder);

            const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.3, 32), goldMetalMaterial);
            collar.position.y = 1.15;
            group.add(collar);

            const bulbGeo = new THREE.SphereGeometry(0.28, 24, 24);
            bulbGeo.scale(1, 1.4, 1);
            const bulb = new THREE.Mesh(bulbGeo, rubberDropperMaterial);
            bulb.position.y = 1.55;
            group.add(bulb);

            const label = new THREE.Mesh(new THREE.CylinderGeometry(0.555, 0.555, 0.8, 32, 1, true), goldHighlightMaterial);
            label.position.y = -0.1;
            group.add(label);

            group.scale.set(0.9, 0.9, 0.9);
            return group;
        }

        // 2. Lemon Bottle Ampoule
        function createLemonBottleVial() {
            const group = new THREE.Group();
            const body = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.25, 32), frostedGlassMaterial);
            group.add(body);

            const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 1.1, 32), lemonYellowLiquidMaterial);
            liquid.position.y = -0.05;
            group.add(liquid);

            const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.42, 0.2, 32), frostedGlassMaterial);
            neck.position.y = 0.725;
            group.add(neck);

            const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.25, 32), silverSealMaterial);
            cap.position.y = 0.95;
            group.add(cap);

            const stopper = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.08, 24), rubberDropperMaterial);
            stopper.position.y = 1.1;
            group.add(stopper);

            const band = new THREE.Mesh(new THREE.CylinderGeometry(0.425, 0.425, 0.45, 32, 1, true), lemonYellowLiquidMaterial);
            band.position.y = 0.05;
            group.add(band);

            group.scale.set(1.05, 1.05, 1.05);
            return group;
        }

        // 3. Luxury Cream Jar
        function createCreamJar() {
            const group = new THREE.Group();
            const body = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.7, 0.65, 32), frostedGlassMaterial);
            group.add(body);

            const inner = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.65, 0.58, 32), porcelainWhiteMaterial);
            inner.position.y = -0.02;
            group.add(inner);

            const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.25, 32), goldMetalMaterial);
            lid.position.y = 0.45;
            group.add(lid);

            const ringGeo = new THREE.TorusGeometry(0.42, 0.035, 16, 40);
            const ring = new THREE.Mesh(ringGeo, goldHighlightMaterial);
            ring.rotation.x = Math.PI / 2;
            ring.position.y = 0.58;
            group.add(ring);

            group.scale.set(0.95, 0.95, 0.95);
            return group;
        }

        // 4. Slimming Capsule
        function createSlimmingCapsule() {
            const group = new THREE.Group();
            const topGeo = new THREE.SphereGeometry(0.3, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
            const topMesh = new THREE.Mesh(topGeo, goldMetalMaterial);
            topMesh.position.y = 0.35;
            group.add(topMesh);

            const topCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.35, 24), goldMetalMaterial);
            topCyl.position.y = 0.175;
            group.add(topCyl);

            const botCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.35, 24), porcelainWhiteMaterial);
            botCyl.position.y = -0.175;
            group.add(botCyl);

            const botGeo = new THREE.SphereGeometry(0.3, 24, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
            const botMesh = new THREE.Mesh(botGeo, porcelainWhiteMaterial);
            botMesh.position.y = -0.35;
            group.add(botMesh);

            group.scale.set(0.85, 0.85, 0.85);
            return group;
        }

        // 5. Golden Collagen Pearl
        function createCollagenPearl(radius) {
            const geo = new THREE.SphereGeometry(radius || 0.28, 24, 24);
            const mat = new THREE.MeshPhysicalMaterial({
                color: 0xf5d77f,
                emissive: 0xd4af37,
                emissiveIntensity: 0.3,
                metalness: 0.8,
                roughness: 0.15,
                clearcoat: 1.0,
                clearcoatRoughness: 0.1
            });
            return new THREE.Mesh(geo, mat);
        }

        // Items array
        const items = [];
        function addItem(mesh, x, y, z, cfg) {
            mesh.position.set(x, y, z);
            scene.add(mesh);
            items.push({
                mesh: mesh,
                baseX: x,
                baseY: y,
                baseZ: z,
                speedY: cfg.speedY || 1.2,
                speedX: cfg.speedX || 0.8,
                ampY: cfg.ampY || 0.3,
                ampX: cfg.ampX || 0.15,
                rotX: cfg.rotX || 0.004,
                rotY: cfg.rotY || 0.008,
                rotZ: cfg.rotZ || 0.003,
                phase: Math.random() * Math.PI * 2
            });
        }

        // Add 3D Items
        const dropper = createDropperBottle();
        dropper.rotation.set(0.25, -0.3, -0.15);
        addItem(dropper, 2.6, 0.5, 0.6, { speedY: 1.1, ampY: 0.35, rotY: 0.008, rotX: 0.003 });

        const lemon1 = createLemonBottleVial();
        lemon1.rotation.set(0.35, 0.45, 0.2);
        addItem(lemon1, 1.1, -1.3, 1.7, { speedY: 1.3, ampY: 0.28, rotY: 0.011, rotZ: 0.005 });

        const jar = createCreamJar();
        jar.rotation.set(0.45, 0.3, -0.25);
        addItem(jar, 3.5, 2.1, -0.4, { speedY: 0.95, ampY: 0.25, rotY: 0.007, rotX: 0.004 });

        const lemon2 = createLemonBottleVial();
        lemon2.rotation.set(-0.25, 0.7, -0.3);
        lemon2.scale.set(0.7, 0.7, 0.7);
        addItem(lemon2, -1.8, 2.2, -2.2, { speedY: 0.85, ampY: 0.2, rotY: 0.006 });

        const cap1 = createSlimmingCapsule();
        cap1.rotation.set(0.7, 0.3, 0.5);
        addItem(cap1, 0.5, 1.8, 1.1, { speedY: 1.35, ampY: 0.3, rotX: 0.012, rotY: 0.008 });

        const cap2 = createSlimmingCapsule();
        cap2.rotation.set(-0.5, -0.4, 0.3);
        cap2.scale.set(0.7, 0.7, 0.7);
        addItem(cap2, 3.8, -1.6, -0.8, { speedY: 1.15, ampY: 0.22, rotX: 0.01, rotZ: 0.01 });

        // Collagen Pearls
        const pearls = [
            { x: 2.1, y: 1.9, z: 1.8, r: 0.22 },
            { x: 0.7, y: -0.3, z: 0.9, r: 0.16 },
            { x: 3.7, y: -0.6, z: 1.2, r: 0.26 },
            { x: -0.9, y: -1.7, z: -0.6, r: 0.22 },
            { x: 1.6, y: -2.3, z: 0.3, r: 0.17 },
            { x: -2.0, y: 0.9, z: -1.6, r: 0.28 }
        ];

        pearls.forEach((p, i) => {
            const pearl = createCollagenPearl(p.r);
            addItem(pearl, p.x, p.y, p.z, {
                speedY: 1.0 + i * 0.12,
                ampY: 0.18 + (i % 3) * 0.06,
                rotY: 0.007,
                rotX: 0.005
            });
        });

        // Ambient Gold Dust Particles
        const particleCount = 80;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i += 3) {
            pPos[i] = (Math.random() - 0.5) * 16;
            pPos[i + 1] = (Math.random() - 0.5) * 12;
            pPos[i + 2] = (Math.random() - 0.5) * 10;
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({
            color: 0xd4af37,
            size: 0.065,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });
        const particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);

        // Pointer Parallax
        let targetX = 0;
        let targetY = 0;

        function onPointer(e) {
            const cx = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const cy = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const mx = (cx / window.innerWidth) * 2 - 1;
            const my = -(cy / window.innerHeight) * 2 + 1;
            targetX = mx * 0.5;
            targetY = my * 0.35;
        }

        window.addEventListener('mousemove', onPointer, { passive: true });
        window.addEventListener('touchmove', onPointer, { passive: true });

        // Resize
        function onResize() {
            if (!heroSection) return;
            width = heroSection.clientWidth;
            height = heroSection.clientHeight;
            updateCameraLayout();
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        }
        window.addEventListener('resize', onResize);

        // Visibility optimization
        let isTabActive = true;
        document.addEventListener('visibilitychange', () => {
            isTabActive = !document.hidden;
        });

        // Loop
        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            if (!isTabActive) return;

            const t = clock.getElapsedTime();

            // Parallax interpolation
            scene.rotation.y += (targetX - scene.rotation.y) * 0.04;
            scene.rotation.x += (-targetY - scene.rotation.x) * 0.04;

            // Animate items
            items.forEach((it) => {
                it.mesh.position.y = it.baseY + Math.sin(t * it.speedY + it.phase) * it.ampY;
                it.mesh.position.x = it.baseX + Math.cos(t * it.speedX + it.phase) * it.ampX;
                it.mesh.rotation.y += it.rotY;
                it.mesh.rotation.x += it.rotX;
                it.mesh.rotation.z += it.rotZ;
            });

            // Orbit point light gently
            goldPointLight.position.x = 2 + Math.cos(t * 0.6) * 1.5;
            goldPointLight.position.y = 1.5 + Math.sin(t * 0.8) * 1.2;

            // Orbit dust
            particles.rotation.y = t * 0.025;

            renderer.render(scene, camera);
        }
        animate();

        canvas.style.opacity = '1';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init3DScene);
    } else {
        init3DScene();
    }
})();

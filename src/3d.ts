import * as THREE from 'three';

export class Rebels3D {
    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;
    private stars!: THREE.Points;

    constructor() {
        this.init();
    }

    private init(): void {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.z = 1;
        this.camera.rotation.x = Math.PI / 2;

        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.domElement.style.position = 'fixed';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.zIndex = '0';
        document.body.appendChild(this.renderer.domElement);

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        this.createStars();

        this.animate();
    }

    private animate(): void {
        requestAnimationFrame(this.animate.bind(this));

        // Change position of stars
        this.stars.rotation.y += 0.0005;


        this.renderer.render(this.scene, this.camera);
    }

    private createStars(): void {
        const points = [];

        for (let i = 0; i < 6000; i++) {
            const star = new THREE.Vector3(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300
            );

            points.push(star);
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const sprite = new THREE.TextureLoader().load('star.png');
        const material = new THREE.PointsMaterial({ size: 0.7, map: sprite, color: 0xaaaaaa });

        this.stars = new THREE.Points(geometry, material);

        this.scene.add(this.stars);
    }
}
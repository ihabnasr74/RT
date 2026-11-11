import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

function createLuminousGlobeTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Luminous aqua-teal gradient base
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#0d5c68');
  grad.addColorStop(0.5, '#158291');
  grad.addColorStop(1, '#0d5c68');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Crisp bright meridian & parallel lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 1.5;
  for (let x = 0; x <= 1024; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }
  for (let y = 0; y <= 512; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // Luminous continent dot-matrix
  ctx.fillStyle = 'rgba(165, 243, 252, 0.78)';
  for (let i = 0; i < 720; i++) {
    const u = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const v = (Math.cos(i * 78.233) * 23421.631) % 1;
    const px = Math.abs(u) * 1024;
    const py = 56 + Math.abs(v) * 400;
    ctx.beginPath();
    ctx.arc(px, py, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Multilingual words from original portfolio globe
  const glyphs = [
    'اللغة العربية',
    'Español',
    'Français',
    'English',
    'Deutsch',
    'Italiano',
    '中国人',
    'Português',
    'Nederlands',
    'Русский',
    'ع ⇄ A',
    '文 ⇄ A',
  ];
  ctx.font = 'bold 24px Cairo, sans-serif';
  ctx.textAlign = 'center';
  glyphs.forEach((word, idx) => {
    const col = idx % 4;
    const row = Math.floor(idx / 4);
    const x = 135 + col * 248 + (row % 2) * 35;
    const y = 128 + row * 124;
    ctx.fillStyle = idx % 2 === 0 ? '#ffffff' : '#fef08a';
    ctx.fillText(word, x, y);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = maxAnisotropy;
  return texture;
}

function createTranslationEmblemTexture(
  symbol: string,
  bgHex: string,
  borderHex: string,
  maxAnisotropy: number
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = bgHex;
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = borderHex;
  ctx.lineWidth = 12;
  ctx.strokeRect(14, 14, 228, 228);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 82px Cairo, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(symbol, 128, 130);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function buildCompositeTranslationMonument(
  glyphTex: THREE.CanvasTexture,
  frameMat: THREE.Material,
  coreMat: THREE.Material,
  ringMat: THREE.Material
): THREE.Group {
  const group = new THREE.Group();

  // 1. Hexagonal metallic outer frame
  const outerGeo = new THREE.CylinderGeometry(0.92, 0.92, 0.18, 6);
  outerGeo.rotateX(Math.PI / 2);
  group.add(new THREE.Mesh(outerGeo, frameMat));

  // 2. Inner bevelled core
  const innerGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.24, 6);
  innerGeo.rotateX(Math.PI / 2);
  group.add(new THREE.Mesh(innerGeo, coreMat));

  // 3 & 4. Front and back translation emblem plates
  const plateGeo = new THREE.PlaneGeometry(0.92, 0.92);
  const plateMat = new THREE.MeshStandardMaterial({
    map: glyphTex,
    roughness: 0.22,
    metalness: 0.15,
  });
  const front = new THREE.Mesh(plateGeo, plateMat);
  front.position.z = 0.13;
  group.add(front);

  const back = new THREE.Mesh(plateGeo, plateMat);
  back.rotation.y = Math.PI;
  back.position.z = -0.13;
  group.add(back);

  // 5. Gyroscopic orbital ring
  const halo = new THREE.Mesh(new THREE.TorusGeometry(1.16, 0.04, 12, 36), ringMat);
  group.add(halo);

  return group;
}

export function ThreeWorldCanvas({
  scrollProgressRef,
  reducedMotion,
}: {
  scrollProgressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // Studio Environment Reflection for luminous metallic & glass highlights
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(
      46,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 0, 14);

    // Bright Luminous Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x26b5be, 1.8);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(10, 14, 12);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x26b5be, 2.0);
    rimLight.position.set(-10, -8, 8);
    scene.add(rimLight);

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const globeTex = createLuminousGlobeTexture(maxAniso);

    // =========================================================================
    // 1. PRIMARY 3D WIDE-WORLD GLOBE (7-Part Composite THREE.Group)
    // =========================================================================
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    const globeMat = new THREE.MeshPhysicalMaterial({
      map: globeTex,
      color: 0xffffff,
      roughness: 0.22,
      metalness: 0.25,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
    });
    const globeMesh = new THREE.Mesh(new THREE.SphereGeometry(3.25, 48, 36), globeMat);
    worldGroup.add(globeMesh);

    const cageMat = new THREE.MeshStandardMaterial({
      color: 0x0d5c68,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      roughness: 0.2,
      metalness: 0.7,
    });
    const cageMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(3.52, 2), cageMat);
    worldGroup.add(cageMesh);

    const ringMatTeal = new THREE.MeshStandardMaterial({
      color: 0x0d5c68,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ringMatCyan = new THREE.MeshStandardMaterial({
      color: 0x18a4ad,
      roughness: 0.2,
      metalness: 0.85,
    });
    const ringMatGold = new THREE.MeshStandardMaterial({
      color: 0xd99b1e,
      roughness: 0.25,
      metalness: 0.85,
    });

    const orbitRing1 = new THREE.Mesh(new THREE.TorusGeometry(4.35, 0.05, 16, 96), ringMatCyan);
    orbitRing1.rotation.set(Math.PI * 0.32, Math.PI * 0.12, 0);
    worldGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(new THREE.TorusGeometry(4.95, 0.04, 16, 96), ringMatGold);
    orbitRing2.rotation.set(-Math.PI * 0.28, -Math.PI * 0.22, Math.PI * 0.15);
    worldGroup.add(orbitRing2);

    const orbitRing3 = new THREE.Mesh(new THREE.TorusGeometry(5.55, 0.035, 12, 96), ringMatTeal);
    orbitRing3.rotation.set(Math.PI * 0.48, 0, Math.PI * 0.25);
    worldGroup.add(orbitRing3);

    // InstancedMesh of 65 Orbiting World Data Satellites
    const nodeCount = 65;
    const nodeGeo = new THREE.SphereGeometry(0.085, 10, 10);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.15,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.5,
    });
    const nodesInstanced = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    const dummyMat4 = new THREE.Matrix4();
    const dummyPos = new THREE.Vector3();
    const dummyQuat = new THREE.Quaternion();
    const dummyScale = new THREE.Vector3();
    const dummyColor = new THREE.Color();

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 3.7 + (i % 4) * 0.45;
      dummyPos.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
      const s = 0.85 + (i % 3) * 0.22;
      dummyScale.set(s, s, s);
      dummyMat4.compose(dummyPos, dummyQuat, dummyScale);
      nodesInstanced.setMatrixAt(i, dummyMat4);
      dummyColor.setHex(i % 3 === 0 ? 0xfbbf24 : i % 2 === 0 ? 0x22d3ee : 0x34d399);
      nodesInstanced.setColorAt(i, dummyColor);
    }
    nodesInstanced.instanceMatrix.needsUpdate = true;
    if (nodesInstanced.instanceColor) nodesInstanced.instanceColor.needsUpdate = true;
    nodesInstanced.computeBoundingSphere();
    worldGroup.add(nodesInstanced);

    // =========================================================================
    // 2. SECONDARY WIDE-WORLD WIREFRAME GLOBE FOR OPPOSING PARALLAX
    // =========================================================================
    const secondaryGlobeGroup = new THREE.Group();
    const secSphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.1, 24, 18),
      new THREE.MeshStandardMaterial({
        color: 0x18a4ad,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      })
    );
    const secRing = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.035, 12, 64), ringMatGold);
    secRing.rotation.x = Math.PI * 0.35;
    secondaryGlobeGroup.add(secSphere, secRing);
    scene.add(secondaryGlobeGroup);

    // =========================================================================
    // 3. FLOATING 3D TRANSLATION MONUMENTS ACROSS ALL SCROLL DEPTHS
    // =========================================================================
    const iconGroup = new THREE.Group();
    scene.add(iconGroup);

    const glyphSpecs = [
      { symbol: 'ع ⇄ A', bg: '#0d5c68', border: '#26b5be', x: -5.8, y: 2.3, z: -0.6, speed: 1.25 },
      { symbol: '文', bg: '#b47b12', border: '#facc15', x: 5.8, y: 1.8, z: -0.5, speed: 1.5 },
      { symbol: 'PDF', bg: '#a81c1c', border: '#f87171', x: -5.5, y: -1.8, z: 0.3, speed: 1.65 },
      { symbol: '⇄', bg: '#15803d', border: '#4ade80', x: 5.6, y: -2.1, z: -0.3, speed: 1.4 },
      { symbol: 'A/ع', bg: '#15509c', border: '#60a5fa', x: -4.9, y: 0.3, z: -1.3, speed: 1.55 },
      { symbol: '§', bg: '#0d5c68', border: '#fbbf24', x: 5.0, y: -0.2, z: -1.1, speed: 1.35 },
      { symbol: 'Es/Fr', bg: '#0e7484', border: '#38bdf8', x: -6.1, y: -3.2, z: -0.9, speed: 1.75 },
      { symbol: 'De/En', bg: '#0d5c68', border: '#26b5be', x: 6.1, y: 3.1, z: -0.8, speed: 1.45 },
    ];

    const floatingNodes: Array<{
      mesh: THREE.Group;
      baseX: number;
      baseY: number;
      baseZ: number;
      speed: number;
      phase: number;
    }> = [];

    glyphSpecs.forEach((spec, idx) => {
      const tex = createTranslationEmblemTexture(spec.symbol, spec.bg, spec.border, maxAniso);
      const node = buildCompositeTranslationMonument(tex, ringMatCyan, ringMatTeal, ringMatGold);
      node.position.set(spec.x, spec.y, spec.z);
      node.scale.setScalar(0.88);
      iconGroup.add(node);
      floatingNodes.push({
        mesh: node,
        baseX: spec.x,
        baseY: spec.y,
        baseZ: spec.z,
        speed: spec.speed,
        phase: idx * 0.95,
      });
    });

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const clock = new THREE.Clock();
    let frameId = 0;
    let smoothedScroll = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      const maxDocScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const liveScrollRatio = Math.min(Math.max(window.scrollY / maxDocScroll, 0), 1);
      scrollProgressRef.current = liveScrollRatio;

      if (isSoftwareGl) {
        smoothedScroll = liveScrollRatio;
      } else {
        smoothedScroll = THREE.MathUtils.damp(smoothedScroll, liveScrollRatio, 7.5, dt);
      }

      if (!reducedMotion) {
        // Continuous 3D Wide-World Globe rotation + scroll-driven acceleration all the way to 100%
        worldGroup.rotation.y = elapsed * 0.24 + smoothedScroll * Math.PI * 5.5;
        worldGroup.rotation.x = Math.sin(smoothedScroll * Math.PI * 4) * 0.32;

        // Smoothly glide the main 3D Globe across the page from top to bottom
        const targetWorldX = Math.sin(smoothedScroll * Math.PI * 4) * 3.1;
        const targetWorldY = -0.95 + Math.sin(smoothedScroll * Math.PI * 3) * 0.95;
        const targetWorldZ = -0.8 - Math.sin(smoothedScroll * Math.PI) * 1.1;
        worldGroup.position.set(targetWorldX, targetWorldY, targetWorldZ);

        // Counter-moving Secondary Wide-World Wireframe Globe for deep 3D parallax
        secondaryGlobeGroup.position.set(
          -targetWorldX * 1.15,
          -targetWorldY * 1.2,
          -2.8
        );
        secondaryGlobeGroup.rotation.y = -elapsed * 0.3 - smoothedScroll * Math.PI * 4.0;
        secondaryGlobeGroup.rotation.z = smoothedScroll * Math.PI * 2.5;

        orbitRing1.rotation.z = elapsed * 0.35 + smoothedScroll * 5.5;
        orbitRing2.rotation.x = -elapsed * 0.28 - smoothedScroll * 5.0;
        orbitRing3.rotation.y = elapsed * 0.25 + smoothedScroll * 6.5;
        cageMesh.rotation.y = -elapsed * 0.15 - smoothedScroll * 2.5;

        // Continuous Parallax of all 8 3D Translation Icon Monuments from top to footer
        floatingNodes.forEach((item, idx) => {
          const waveY = Math.sin(smoothedScroll * Math.PI * 3.5 * item.speed + item.phase) * 3.1;
          const waveX = Math.cos(smoothedScroll * Math.PI * 2.5 + item.phase) * 1.25;
          item.mesh.position.y = item.baseY * 0.65 + waveY + Math.sin(elapsed * 1.2 + idx) * 0.28;
          item.mesh.position.x = item.baseX + waveX;
          item.mesh.rotation.y = elapsed * 0.55 + smoothedScroll * Math.PI * 4.0 + item.phase;
          item.mesh.rotation.x = Math.sin(elapsed * 0.75 + item.phase) * 0.38;
        });

        camera.position.y = Math.sin(smoothedScroll * Math.PI * 2) * 0.45;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion, scrollProgressRef]);

  return (
    <div
      ref={mountRef}
      data-testid="three-world-canvas"
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
}

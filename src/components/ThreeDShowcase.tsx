import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface ThreeDShowcaseProps {
  theme: 'dark' | 'light';
  className?: string;
}

/**
 * Scroll-driven & cursor-reactive 3D geometric orbital sculpture built with Three.js.
 * Follows software-WebGL safety (on-demand requestRender + afterDraw) so it stays
 * smooth on hardware GPUs and never blocks headless Chromium or low-power devices.
 */
export function ThreeDShowcase({ theme, className = '' }: ThreeDShowcaseProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const requestRenderRef = useRef<(() => void) | null>(null);
  const materialsRef = useRef<{
    coreMat?: THREE.MeshStandardMaterial;
    wireMat?: THREE.LineBasicMaterial;
    ringMat?: THREE.MeshStandardMaterial;
    outerRingMat?: THREE.MeshStandardMaterial;
  }>({});

  useEffect(() => {
    const mats = materialsRef.current;
    if (mats.coreMat) {
      mats.coreMat.color.set(theme === 'dark' ? 0x161618 : 0x1f2024);
    }
    if (mats.wireMat) {
      mats.wireMat.color.set(theme === 'dark' ? 0xffffff : 0x0a0a0a);
      mats.wireMat.opacity = theme === 'dark' ? 0.34 : 0.28;
    }
    if (mats.outerRingMat) {
      mats.outerRingMat.color.set(theme === 'dark' ? 0x3a3a40 : 0x26262a);
    }
    requestRenderRef.current?.();
  }, [theme]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isSoftwareGl = (() => {
      try {
        const probe = document.createElement('canvas');
        const gl = probe.getContext('webgl2') || probe.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 320);
    renderer.setSize(width, height);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 7.35);
    camera.lookAt(0, 0, 0);

    // Warm key + cool hemisphere fill + brand orange rim light
    const hemiLight = new THREE.HemisphereLight(0xdce8ff, 0x161618, 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e6, 2.2);
    keyLight.position.set(4.5, 5.2, 5.5);
    scene.add(keyLight);

    const orangeRim = new THREE.PointLight(0xee7104, 6.5, 18);
    orangeRim.position.set(-3.2, -1.6, 3.0);
    scene.add(orangeRim);

    const cyanFill = new THREE.PointLight(0x30b7f5, 2.2, 16);
    cyanFill.position.set(3.4, 2.2, -2.5);
    scene.add(cyanFill);

    // Composite multi-part sculptural emblem (THREE.Group with varied PBR materials)
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Primary silhouette: faceted brushed obsidian icosahedron core
    const coreGeo = new THREE.IcosahedronGeometry(1.18, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: themeRef.current === 'dark' ? 0x161618 : 0x1f2024,
      roughness: 0.42,
      metalness: 0.78,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 2. Crisp architectural edge wireframe cage slightly offset
    const cageGeo = new THREE.IcosahedronGeometry(1.42, 1);
    const wireGeo = new THREE.EdgesGeometry(cageGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: themeRef.current === 'dark' ? 0xffffff : 0x0a0a0a,
      transparent: true,
      opacity: themeRef.current === 'dark' ? 0.34 : 0.28,
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    rootGroup.add(wireMesh);

    // 3. Machined brand-orange anodized primary orbital ring (#EE7104)
    const ringGeo = new THREE.TorusGeometry(1.92, 0.055, 20, 96);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xee7104,
      emissive: 0xee7104,
      emissiveIntensity: 0.22,
      roughness: 0.2,
      metalness: 0.85,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.set(Math.PI * 0.34, Math.PI * 0.14, 0);
    rootGroup.add(ringMesh);

    // 4. Counter-tilted brushed graphite structural ring
    const outerRingGeo = new THREE.TorusGeometry(2.26, 0.025, 16, 96);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: themeRef.current === 'dark' ? 0x3a3a40 : 0x26262a,
      roughness: 0.65,
      metalness: 0.45,
    });
    const outerRingMesh = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRingMesh.rotation.set(-Math.PI * 0.28, Math.PI * 0.42, 0.3);
    rootGroup.add(outerRingMesh);

    // 5. Three precision orbital accent nodes matching logo palette (#EE7104, #EB448B, #30B7F5)
    const nodeGeo = new THREE.OctahedronGeometry(0.11, 0);
    const nodeSpecs = [
      { color: 0xee7104, pos: [1.92, 0, 0] as const },
      { color: 0xeb448b, pos: [-1.45, 1.25, 0.4] as const },
      { color: 0x30b7f5, pos: [0.25, -1.78, 0.85] as const },
    ];
    const nodeMats: THREE.MeshStandardMaterial[] = [];
    const nodeMeshes: THREE.Mesh[] = [];
    for (const spec of nodeSpecs) {
      const m = new THREE.MeshStandardMaterial({
        color: spec.color,
        emissive: spec.color,
        emissiveIntensity: 0.3,
        roughness: 0.18,
        metalness: 0.75,
      });
      nodeMats.push(m);
      const mesh = new THREE.Mesh(nodeGeo, m);
      mesh.position.set(spec.pos[0], spec.pos[1], spec.pos[2]);
      rootGroup.add(mesh);
      nodeMeshes.push(mesh);
    }

    materialsRef.current = { coreMat, wireMat, ringMat, outerRingMat };

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Target kinematics driven by scroll progress + pointer position
    let targetRotY = 0.55;
    let targetRotX = 0.28;
    let currentRotY = 0.55;
    let currentRotX = 0.28;
    let scrollAngle = 0;
    let pointerX = 0;
    let pointerY = 0;

    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let disposed = false;

    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (disposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 8);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 8);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    };

    const renderFrame = () => {
      if (disposed) return;
      renderDirty = false;

      if (prefersReducedMotion || isSoftwareGl) {
        currentRotY = targetRotY;
        currentRotX = targetRotX;
      } else {
        currentRotY += (targetRotY - currentRotY) * 0.14;
        currentRotX += (targetRotX - currentRotX) * 0.14;
      }

      rootGroup.rotation.y = currentRotY;
      rootGroup.rotation.x = currentRotX;
      ringMesh.rotation.z = currentRotY * 0.65;
      outerRingMesh.rotation.z = -currentRotY * 0.45;
      wireMesh.rotation.y = -currentRotY * 0.3;

      renderer.render(scene, camera);

      const settling =
        !prefersReducedMotion &&
        !isSoftwareGl &&
        (Math.abs(targetRotY - currentRotY) > 0.002 ||
          Math.abs(targetRotX - currentRotX) > 0.002);

      const done = () => {
        renderBusy = false;
        if (renderDirty || settling) {
          requestRender();
        }
      };

      if (isSoftwareGl) {
        afterDraw(done);
      } else {
        done();
      }
    };

    const requestRender = () => {
      if (disposed) return;
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = window.requestAnimationFrame(renderFrame);
    };

    requestRenderRef.current = requestRender;

    const updateTargets = () => {
      targetRotY = 0.55 + scrollAngle * Math.PI * 1.85 + pointerX * 0.45;
      targetRotX = 0.28 + scrollAngle * 0.65 + pointerY * 0.3;
      requestRender();
    };

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
      scrollAngle = progress;
      updateTargets();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      updateTargets();
    };

    const handleResize = () => {
      if (!container || disposed) return;
      const w = Math.max(container.clientWidth, 280);
      const h = Math.max(container.clientHeight, 280);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      requestRender();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Initial render
    handleScroll();

    return () => {
      disposed = true;
      requestRenderRef.current = null;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      coreGeo.dispose();
      coreMat.dispose();
      cageGeo.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
      nodeGeo.dispose();
      nodeMats.forEach((m) => m.dispose());
      envTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      data-testid="three-orbital-sculpture"
      className={`relative w-full h-full min-h-[340px] select-none ${className}`}
      aria-label="Interactive 3D orbital geometric sculpture responding to scroll and cursor"
    >
      <div ref={mountRef} className="w-full h-full" />
      {/* Subtle architectural corner registration marks */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-3 left-3 font-mono-tech text-xs text-[#EE7104]"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-3 right-3 font-mono-tech text-xs text-[#EE7104]"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-3 font-mono-tech text-xs text-[#EE7104]"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 right-3 font-mono-tech text-xs text-[#EE7104]"
      >
        +
      </span>
    </div>
  );
}

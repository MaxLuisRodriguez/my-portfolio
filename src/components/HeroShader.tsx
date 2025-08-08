import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;

  // Simple neon noise glow
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
  float noise(in vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
               mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
  }

  void main(){
    vec2 st = gl_FragCoord.xy/uResolution.xy;
    st.x *= uResolution.x/uResolution.y;
    float t = uTime * 0.1;
    float n = noise(st*6.0 + t) * 0.6 + noise(st*12.0 - t*1.5)*0.4;

    vec3 base = vec3(0.0, 0.0, 0.0);
    vec3 glow = mix(vec3(0.0,1.0,0.6), vec3(0.0,0.6,1.0), st.x) * (0.25 + 0.75*n);
    vec3 color = base + glow;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const VertexShader = `
  void main(){
    gl_Position = vec4(position, 1.0);
  }
`;

const ShaderPlane: React.FC = () => {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  }), []);

  useFrame((_state, delta) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value += delta * 60.0;
      mat.current.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={VertexShader} fragmentShader={FragmentShader} />
    </mesh>
  );
};

const HeroShader: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }}>
        <ShaderPlane />
      </Canvas>
    </div>
  );
};

export default HeroShader;



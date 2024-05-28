import * as THREE from 'three'

export const vertexShader = `
    
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const fragmentShader = `

uniform float progress, opacity;
uniform vec3 titleColor;

varying vec2 vUv;

void main() {
  
  
  float r = ceil(abs(progress + sin(vUv.x)) * 3.0) / 3.0 * (titleColor.r / 255.0);
  float g = ceil(abs(progress + sin(vUv.x)) * 7.0) / 7.0 * (titleColor.g / 255.0);
  float b = ceil(abs(progress + sin(vUv.x)) * 11.0) / 11.0 * (titleColor.b / 255.0);
  
  gl_FragColor = vec4(r, g, b, opacity);
}
`


export const reveal = ({ titleColor = [1, 1, 1] }) => {
  const mat = {
    uniforms: {
      titleColor: { value: new THREE.Vector3(...titleColor) },
      progress: { value: 0 },
      opacity: { value: 0}
    },
    vertexShader,
    fragmentShader
  }
  // console.log(`mat: `, mat)
  return mat
}

const pixelFragShader = `

uniform float progress1, progress2, opacity1, opacity2, colorBlend;
uniform sampler2D map1, map2;

varying vec2 vUv;

void main() {
  float percent1 = ceil(progress1 * 150.0) / 150.0;
  float percent2 = ceil(progress2 * 150.0) / 150.0;

  float resX1 = percent1 * 1280.0;
  float resY1 = percent1 * 720.0;
  float resX2 = percent2 * 1280.0;
  float resY2 = percent2 * 720.0;
  float x1 = ceil(vUv.x * resX1) / resX1;
  float y1 = ceil(vUv.y * resY1) / resY1;
  float x2 = ceil(vUv.x * resX2) / resX2;
  float y2 = ceil(vUv.y * resY2) / resY2;

  vec3 rgb1 = texture2D(map1, vec2(x1, y1)).rgb * ceil((1.0 - colorBlend) * 150.0) / 150.0;
  vec3 rgb2 = texture2D(map2, vec2(x2, y2)).rgb * ceil(colorBlend * 150.0) / 150.0;
 
  gl_FragColor = vec4(rgb1 + rgb2, 1.0);
}
`
export const pixellate = ({ map1, map2 }) => {
  const mat = {
    uniforms: {
      progress1: { value: 1 },
      progress2: { value: 1 },
      opacity1: { value: 0 },
      opacity2: { value: 0 },
      colorBlend: {value: 0},
      map1: { value: map1 || null },
      map2: { value: map2 || null },
    },
    vertexShader,
    fragmentShader: pixelFragShader,
  }

  return mat
}

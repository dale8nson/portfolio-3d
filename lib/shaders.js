const stdVertexShader = `
    
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const fragmentShader = `

uniform float progress, opacity;

varying vec2 vUv;

void main() {
  
  
  gl_FragColor = vec4(r, g, b, opacity);
}
`
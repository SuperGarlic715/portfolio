(() => {
  const root = document.getElementById('mesh-gradient');
  if (!root) return;
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'display:block;width:100%;height:100%;';
  const gl = canvas.getContext('webgl', {alpha:false, antialias:false, depth:false, stencil:false, powerPreference:'low-power'});
  if (!gl) return;
  const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
  const fragment = `precision mediump float;
    uniform vec2 resolution;
    uniform float time;
    vec3 palette(float v){
      vec3 blue=vec3(.447,.576,.902), lavender=vec3(.714,.655,1.);
      vec3 accent=vec3(1.,.890,.541);
      vec3 c=mix(blue,lavender,smoothstep(.16,.66,v));
      float highlight=smoothstep(.72,.94,v);
      return mix(c,accent,highlight*.86);
    }
    void main(){
      vec2 uv=gl_FragCoord.xy/resolution;
      float aspect=resolution.x/resolution.y;
      vec2 p=vec2(uv.x*aspect,uv.y);
      float t=time*.90;
      float a=sin(p.x*2.7 + sin(p.y*2.8+t*.8)*1.2 + t*.65);
      float b=cos(p.y*3.2 - p.x*.95 + sin(p.x*2.0-t*.7)*1.1-t*.5);
      float c=sin((p.x+p.y)*2.0+t*.4);
      float v=.50+.23*a+.19*b+.09*c;
      vec3 col=palette(v);
      float softness=smoothstep(.0,.9,uv.y)*smoothstep(1.12,.08,uv.y);
      col=mix(vec3(.96,.96,1.),col,.92+.06*softness);
      gl_FragColor=vec4(col,1.);
    }`;
  const compile = (type, source) => {const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);return gl.getShaderParameter(s,gl.COMPILE_STATUS)?s:null;};
  const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment);
  if(!vs||!fs)return;
  const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;
  gl.useProgram(program);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const pos=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
  const res=gl.getUniformLocation(program,'resolution'),clock=gl.getUniformLocation(program,'time');
  let visible=true, running=true, last=0, elapsed=0, frame=0;
  function resize(){const r=root.getBoundingClientRect();canvas.width=Math.max(1,Math.round(r.width*.65));canvas.height=Math.max(1,Math.round(r.height*.65));gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(res,canvas.width,canvas.height);}
  root.appendChild(canvas);resize();
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});observer.observe(root);
  const ro=new ResizeObserver(resize);ro.observe(root);
  document.addEventListener('visibilitychange',()=>{last=0;});
  function draw(now){frame=requestAnimationFrame(draw);if(!visible||document.hidden||!running){last=0;return;}
    if(!last){last=now;return;}const dt=now-last;if(dt<33)return;last=now;elapsed+=Math.min(dt,100)/1000;
    gl.uniform1f(clock,elapsed);gl.drawArrays(gl.TRIANGLES,0,6);
  }
  frame=requestAnimationFrame(draw);
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();running=false;cancelAnimationFrame(frame);});
})();

import jpeg from 'jpeg-js';

// retorna média RGB em uma janela (radius px ao redor do ponto)
export async function averageColorFromJPEGBase64(
  base64: string, cx: number, cy: number, radius = 9999
): Promise<{ r: number; g: number; b: number }> {
  const pure = base64.replace(/^data:image\/jpeg;base64,/, '');
  const buf = Buffer.from(pure, 'base64');
  const { data, width, height } = jpeg.decode(buf, { useTArray: true });

  // se radius >= maior lado => média do frame inteiro
  if (radius >= Math.max(width, height)) {
    let r=0,g=0,b=0,count=0;
    for (let i=0;i<data.length;i+=4){ r+=data[i]; g+=data[i+1]; b+=data[i+2]; count++; }
    return { r: Math.round(r/count), g: Math.round(g/count), b: Math.round(b/count) };
  }

  const x0 = Math.max(0, cx - radius), y0 = Math.max(0, cy - radius);
  const x1 = Math.min(width - 1, cx + radius), y1 = Math.min(height - 1, cy + radius);
  let r=0,g=0,b=0,count=0;
  for (let y=y0; y<=y1; y++){
    const row = y*width*4;
    for (let x=x0; x<=x1; x++){
      const i = row + x*4;
      r += data[i]; g += data[i+1]; b += data[i+2]; count++;
    }
  }
  return { r: Math.round(r/count), g: Math.round(g/count), b: Math.round(b/count) };
}

export function rgbToHex(r:number,g:number,b:number){
  const h=(n:number)=>n.toString(16).padStart(2,'0');
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase();
}

// ---- NOVO: HSV e nome por matiz ----
export function rgbToHsv(r:number,g:number,b:number){
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  const d=max-min;
  let h=0;
  if(d!==0){
    switch(max){
      case r: h = ((g-b)/d) % 6; break;
      case g: h = (b-r)/d + 2; break;
      case b: h = (r-g)/d + 4; break;
    }
    h *= 60; if (h<0) h+=360;
  }
  const s = max===0 ? 0 : d/max;
  const v = max;
  return { h, s, v };
}

export function nameColorByHue(r: number, g: number, b: number): string {
  const { h, s, v } = rgbToHsv(r, g, b);

  // Neutros
  if (v < 0.12) return 'Preto';
  if (v > 0.95 && s < 0.08) return 'Branco';
  if (s < 0.1) {
    if (v > 0.75) return 'Cinza-muito-claro';
    if (v > 0.55) return 'Cinza-claro';
    if (v > 0.35) return 'Cinza';
    return 'Cinza-escuro';
  }

  // Tons terrosos (marrom/bege)
  if (s < 0.45 && v < 0.75) {
    if (h >= 15 && h < 45) return v > 0.5 ? 'Caramelo' : 'Marrom-escuro';
    if (h >= 45 && h < 65) return 'Bege';
  }

  // ---- Hue ----
  if (h < 10 || h >= 355) return v < 0.4 ? 'Bordô' : 'Vermelho vivo';
  if (h < 20) return 'Carmesim';
  if (h < 30) return v > 0.7 ? 'Salmão' : 'Coral';
  if (h < 40) return 'Laranja';
  if (h < 50) return 'Âmbar';
  if (h < 60) return 'Dourado';
  if (h < 70) return 'Amarelo';
  if (h < 85) return v > 0.7 ? 'Verde-limão' : 'Chartreuse';
  if (h < 100) return 'Verde-claro';
  if (h < 120) return 'Verde';
  if (h < 140) return 'Verde-esmeralda';
  if (h < 160) return 'Verde-jade';
  if (h < 170) return 'Turquesa';
  if (h < 185) return 'Teal';
  if (h < 200) return 'Ciano';
  if (h < 215) return 'Azul-claro';
  if (h < 230) return 'Azul';
  if (h < 245) return v < 0.4 ? 'Azul-marinho' : 'Azul-royal';
  if (h < 265) return 'Índigo';
  if (h < 280) return 'Violeta';
  if (h < 300) return 'Roxo';
  if (h < 320) return 'Magenta';
  if (h < 335) return v > 0.7 ? 'Rosa-claro' : 'Rosa';
  if (h < 350) return 'Fúcsia';
  return 'Vermelho';
}

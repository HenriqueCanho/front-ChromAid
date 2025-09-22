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
    let r = 0, g = 0, b = 0, count = 0;
    for (let i = 0; i < data.length; i += 4) { r += data[i]; g += data[i + 1]; b += data[i + 2]; count++; }
    return { r: Math.round(r / count), g: Math.round(g / count), b: Math.round(b / count) };
  }

  const x0 = Math.max(0, cx - radius), y0 = Math.max(0, cy - radius);
  const x1 = Math.min(width - 1, cx + radius), y1 = Math.min(height - 1, cy + radius);
  let r = 0, g = 0, b = 0, count = 0;
  for (let y = y0; y <= y1; y++) {
    const row = y * width * 4;
    for (let x = x0; x <= x1; x++) {
      const i = row + x * 4;
      r += data[i]; g += data[i + 1]; b += data[i + 2]; count++;
    }
  }
  return { r: Math.round(r / count), g: Math.round(g / count), b: Math.round(b / count) };
}

export function rgbToHex(r: number, g: number, b: number) {
  const h = (n: number) => n.toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase();
}

// ---- NOVO: HSV e nome por matiz ----
export function rgbToHsv(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d) % 6; break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60; if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  const v = max;
  return { h, s, v };
}

export function nameColorByHue(r: number, g: number, b: number): string {
  const { h, s, v } = rgbToHsv(r, g, b);

  // --------- Neutros e cinzas ---------
  if (v < 0.10) return 'Preto';
  if (s < 0.10) {
    if (v > 0.90) return 'Branco';
    if (v > 0.80) return 'Prata';          // cinza bem claro com brilho
    if (v > 0.65) return 'Cinza-claro';
    if (v > 0.45) return 'Cinza';
    if (v > 0.25) return 'Cinza-escuro';
    return 'Cinza-chumbo';
  }

  // --------- Terrosos (marrom/bege/areia) ---------
  // pouca saturação + valor médio geram bege/areia; s alta + v médio/baixo geram marrom/terracota
  if (h >= 15 && h < 70) {
    if (s < 0.35 && v > 0.80) return 'Champanhe';
    if (s < 0.35 && v > 0.70) return 'Areia';
    if (s < 0.40 && v > 0.60) return 'Bege';
    if (s < 0.45 && v < 0.75) return 'Caramelo';
    if (s >= 0.45 && v < 0.55) return 'Terracota';
    if (s >= 0.45 && v < 0.40) return 'Marrom-escuro';
  }

  // --------- Famílias por matiz (H) ---------
  // Usamos V e S para variantes: claro/escuro/pastel
  const isPastel = s < 0.35 && v > 0.75;
  const isLight = v > 0.80;
  const isDark = v < 0.35;

  // Vermelhos (345–15) com variações
  if (h < 10 || h >= 355) {
    if (s > 0.65 && v < 0.45) return 'Vermelho-tijolo';
    if (isDark) return 'Bordô';
    if (h >= 345 && h < 355) return 'Vermelho-rosado';
    return 'Vermelho vivo';
  }
  if (h < 20) return isDark ? 'Bordô' : 'Vermelho-escuro';
  if (h < 30) return isLight ? 'Salmão' : 'Coral';
  if (h < 40) return isPastel ? 'Laranja-pastel' : 'Laranja';
  if (h < 50) return 'Âmbar';
  if (h < 60) return 'Dourado';
  if (h < 70) {
    if (s > 0.65 && v < 0.60) return 'Mostarda';
    return isPastel ? 'Amarelo-pastel' : 'Amarelo';
  }

  // Verde-amarelado (Chartreuse simplificado)
  if (h < 85) return isLight ? 'Verde-limão' : 'Verde-amarelado';

  // Verdes
  if (h < 100) return isPastel ? 'Verde-pastel' : 'Verde-claro';
  if (h < 120) {
    if (s > 0.70 && !isDark) return 'Verde-bandeira';
    return 'Verde';
  }
  if (h < 135) return 'Verde-esmeralda';
  if (h < 150) return 'Verde-jade';
  if (h < 165) return 'Turquesa';
  if (h < 185) return 'Verde-água';
  if (h < 195) return 'Azul-petróleo';       // teal mais escuro
  if (h < 205) return isLight ? 'Azul-bebê' : 'Azul-piscina'; // ciano amigável

  // Azuis
  if (h < 215) return isLight ? 'Azul-celeste' : 'Azul-claro';
  if (h < 230) return 'Azul';
  if (h < 245) return isDark ? 'Azul-marinho' : 'Azul-royal';

  // Índigo / violeta / roxos
  if (h < 265) return 'Azul-escuro';
  if (h < 280) return isPastel ? 'Lavanda' : 'Violeta';
  if (h < 300) return isPastel ? 'Lilás' : 'Roxo';

  // Rosas / magentas
  if (h < 320) return 'Roxo-rosado';
  if (h < 335) return isPastel ? 'Rosa-pastel' : isLight ? 'Rosa-claro' : 'Rosa';
  if (h < 350) return 'Rosa-choque';

  // fallback
  return 'Vermelho';
}

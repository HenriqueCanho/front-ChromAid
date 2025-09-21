import { Buffer } from 'buffer';
// só define se ainda não existir
// @ts-ignore
if (typeof global !== 'undefined' && !(global as any).Buffer) {
  (global as any).Buffer = Buffer;
}

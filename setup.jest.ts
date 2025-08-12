import { TextEncoder, TextDecoder } from 'util';

// Polyfill for TextEncoder
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder as any;
}
if (typeof window.TextEncoder === 'undefined') {
  window.TextEncoder = global.TextEncoder;
}

// Polyfill for TextDecoder
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as any;
}
if (typeof window.TextDecoder === 'undefined') {
  window.TextDecoder = global.TextDecoder;
}

console.log('Polyfill for TextEncoder/TextDecoder loaded.');
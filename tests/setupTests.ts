import '@testing-library/jest-dom'

// Polyfill TextEncoder/TextDecoder for jose in Node test env
import { TextEncoder, TextDecoder } from 'util'
// @ts-ignore
if (!global.TextEncoder) global.TextEncoder = TextEncoder as any
// @ts-ignore
if (!global.TextDecoder) global.TextDecoder = TextDecoder as any

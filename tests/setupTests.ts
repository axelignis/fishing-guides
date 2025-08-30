import '@testing-library/jest-dom'

// Polyfill TextEncoder/TextDecoder for jose in Node test env
import { TextEncoder, TextDecoder } from 'util'
// @ts-ignore
if (!global.TextEncoder) global.TextEncoder = TextEncoder as any
// @ts-ignore
if (!global.TextDecoder) global.TextDecoder = TextDecoder as any

// Suppress ReactDOMTestUtils.act deprecation console noise from older test libs
const originalConsoleError = console.error
console.error = (...args: any[]) => {
	try {
		const first = String(args[0] ?? '')
		if (first.includes('ReactDOMTestUtils.act') && first.includes('deprecated')) return
	} catch (e) {
		// ignore
	}
	return originalConsoleError(...args)
}

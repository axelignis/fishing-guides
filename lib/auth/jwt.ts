// Dynamically import ESM-only 'jose' to avoid Jest ESM transform issues
let _SignJWT: any, _jwtVerify: any
async function loadJose() {
  if (!_SignJWT || !_jwtVerify) {
    const mod = await import('jose')
    _SignJWT = mod.SignJWT
    _jwtVerify = mod.jwtVerify
  }
  return { SignJWT: _SignJWT, jwtVerify: _jwtVerify }
}

const alg = 'HS256'

function getSecret(): Uint8Array {
  let secret = process.env.AUTH_JWT_SECRET
  if (!secret) {
    if (process.env.NODE_ENV !== 'production') {
      secret = 'dev_insecure_secret_change_me'
      if (typeof console !== 'undefined') {
        console.warn('[auth] Using insecure dev JWT secret fallback. Set AUTH_JWT_SECRET in .env')
      }
    } else {
      throw new Error('Missing AUTH_JWT_SECRET')
    }
  }
  return new TextEncoder().encode(secret)
}

export interface SessionPayload {
  sub: string
  role: string
}

export async function signSession(payload: SessionPayload, expiresIn = '7d') {
  const { SignJWT } = await loadJose()
  return new SignJWT(payload as any)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecret())
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { jwtVerify } = await loadJose()
    const { payload } = await jwtVerify(token, getSecret())
    return { sub: payload.sub as string, role: (payload as any).role }
  } catch {
    return null
  }
}

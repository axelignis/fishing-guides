import bcrypt from 'bcryptjs'

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10)
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash)
}

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/
export function validatePassword(pw: string): { valid: boolean; message?: string } {
  if (!PASSWORD_REGEX.test(pw)) {
    return { valid: false, message: 'weak_password' }
  }
  return { valid: true }
}

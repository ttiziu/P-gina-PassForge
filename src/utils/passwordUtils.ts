// Funciones auxiliares para generación de contraseñas
export function generatePassword(
  length: number = 12,
  useUpper: boolean = true,
  useLower: boolean = true,
  useNumbers: boolean = true,
  useSymbols: boolean = true
): string {
  let chars = '';
  if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (useNumbers) chars += '0123456789';
  if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (!chars) return '';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

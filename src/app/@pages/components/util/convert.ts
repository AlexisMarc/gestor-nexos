export function toBoolean(value: boolean | string): boolean {
  return value === '' ||  value !== 'false'
}

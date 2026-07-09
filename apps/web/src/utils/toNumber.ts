export const toNumber = (value: number | string | undefined): number => {
  const num = Number(value)
  return isNaN(num) ? -1 : num
}

export const leftPad = (
  value: number | string,
  minDigits: number,
  replaceCha: string = ' ',
): string => {
  const stringValue = value.toString()
  // Return the value padded with space if needed
  return stringValue.length >= minDigits
    ? stringValue
    : replaceCha.repeat(minDigits - stringValue.length) + stringValue
}

export const leftPadCount = (value: number | string, minDigits: number): number => {
  const stringValue = value.toString()
  // Return count of character need to pad
  return stringValue.length >= minDigits ? 0 : minDigits - stringValue.length
}

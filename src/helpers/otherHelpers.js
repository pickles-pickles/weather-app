export const convertTemp = (a, tempUnit) => {
  if (!a) {
    return ''
  }
  if (tempUnit === 'Celsius') {
    a = (a - 273.15).toFixed(1)
  } else if (tempUnit === 'Fahrenheit') {
    a = (1.8 * (a - 273) + 32).toFixed(1)
  }
  return a
}

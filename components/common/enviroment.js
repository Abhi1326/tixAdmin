
export const WINDOWLOCATION = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'http://192.168.109.211:4000'
  } else {
    return 'http://192.168.109.211:3000'
  }
}

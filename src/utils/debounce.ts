export default function debounce(cb: Function, delay = 1000) {
  let timeout: any

  return (...args: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}

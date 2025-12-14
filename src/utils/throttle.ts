export default function throttle(cb: Function, delay = 1000) {
  let shouldWait = false
  let waitingArgs: any
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
      // waitingArgs = undefined
    } else {
      cb(...waitingArgs) // Execute with the last arguments if needed
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args: any) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }
    cb(...args) // Execute the callback immediately
    shouldWait = true
    setTimeout(timeoutFunc, delay)
  }
}

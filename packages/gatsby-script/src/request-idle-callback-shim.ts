// https://developer.chrome.com/blog/using-requestidlecallback/#checking-for-requestidlecallback

function _requestIdleCallback(
  callback: IdleRequestCallback
): ReturnType<typeof setTimeout> {
  const startTime = Date.now()

  return setTimeout(function () {
    callback({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50.0 - (Date.now() - startTime))
      },
    })
  }, 1)
}

function _cancelIdleCallback(id?: number | undefined): void {
  clearTimeout(id)
}

window.requestIdleCallback = window.requestIdleCallback || _requestIdleCallback
window.cancelIdleCallback = window.cancelIdleCallback || _cancelIdleCallback

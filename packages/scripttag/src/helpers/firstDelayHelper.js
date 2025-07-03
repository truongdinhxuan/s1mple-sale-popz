export function handleFirstDelay(firstDelay) {
  if (firstDelay && !isNaN(firstDelay)) {
    return new Promise(resolve => {
      setTimeout(resolve, firstDelay * 1000);
    });
  }
  return Promise.resolve();
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

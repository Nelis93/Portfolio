export const extraCards = (cards: any[]) => {
  // window.confirm("extraCards() was called.");
  if (cards.length % 3 == 0) {
    return 0
  } else if ((cards.length + 1) % 3 == 0) {
    return 1
  }
  return 2
}

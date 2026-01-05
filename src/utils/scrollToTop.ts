export default function scrollToTop(ref: React.RefObject<HTMLElement>) {
  ref.current?.scrollTo({
    top: 0,
    behavior: 'smooth', // optional
  })
  return
}

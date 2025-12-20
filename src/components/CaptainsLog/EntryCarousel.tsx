export default function EntryCarousel({children}: any) {
  return (
    <div
      className="sticky top-0 pt-[50vh] flex items-center justify-center"
      style={{perspective: 800, transformStyle: 'preserve-3d'}}
    >
      {children}
    </div>
  )
}

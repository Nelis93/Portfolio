import Slider from '@/components/ui/Slider'
import type {LogbookEntry} from '@/types'

type Props = {
  entries: LogbookEntry[]
  selected: number
  setSelected: any
  refs: any
  children: React.ReactNode
}

export default function EntryCarousel({children, entries, refs, selected, setSelected}: Props) {
  return (
    <div
      className="sticky top-0 pt-[50vh] flex items-center justify-center"
      style={{perspective: 800, transformStyle: 'preserve-3d'}}
    >
      <Slider
        items={entries}
        refs={refs}
        currentIndex={selected}
        setCurrentIndex={setSelected}
        style={
          'absolute hidden h-full sm:flex flex-row justify-between items-center h-[5em] bg-transparent w-1/2'
        }
        scrolling={false}
      />
      {children}
    </div>
  )
}

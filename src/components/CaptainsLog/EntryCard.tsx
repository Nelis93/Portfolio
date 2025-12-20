// import {useRef} from 'react'
// import {motion} from 'framer-motion'
import Link from 'next/link'
import {urlFor} from '../../lib/sanity'
import {LogbookEntry} from '../../types'
import formatDate from '@/utils/formateDate'

type Props = {
  entry: LogbookEntry
  selected: number
  index: number
}
const cardStyleFor = (i: number, selected: number): React.CSSProperties => {
  const offset = (selected - i) / 3
  const absOffset = Math.abs(selected - i) / 3
  const direction = Math.sign(selected - i)
  const hidden = Math.abs(selected - i) > 3

  return {
    position: 'absolute',
    maxHeight: '25rem',
    transition: 'transform 280ms ease-out, opacity 280ms ease-out, filter 280ms ease-out',
    transform: `rotateY(${offset * 50}deg)
                scaleY(${1 - absOffset * 0.4})
                translateZ(${-Math.max(0, absOffset) * 30}rem)
                translateX(${direction * -5}rem)`,
    opacity: hidden ? 0 : 1,
    pointerEvents: selected === i ? 'auto' : 'none',
    zIndex: Math.max(0, 100 - Math.abs(selected - i)),
    filter: `blur(${Math.min(4, absOffset * 1.5)}rem)`,
  }
}
export default function EntryCard({selected, entry, index}: Props) {
  return (
    <div
      className="absolute w-[23rem] rounded-lg shadow-lg overflow-hidden bg-gradient-to-b from-stone-600 to-slate-700 text-white"
      style={cardStyleFor(index, selected)}
    >
      <Link href={`/captainsLog/bigLogs/${entry.slug.current}`} className="block h-full">
        <div className="h-[10rem] w-full overflow-hidden">
          <img
            src={urlFor(entry.image)?.url()}
            alt={entry.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="h-[13rem] p-6">
          <h3 className="text-xl font-bold mb-2 truncate">{entry.title}</h3>
          <p className="text-sm line-clamp-4 mb-4">{entry.description}</p>
          <div className="text-xs text-right">{formatDate(entry._updatedAt)}</div>
        </div>
      </Link>
    </div>
  )
}

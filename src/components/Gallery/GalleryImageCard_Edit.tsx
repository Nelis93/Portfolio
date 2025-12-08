import React, {useCallback, useEffect, useRef, useState} from 'react'
import {motion} from 'framer-motion'
import {GalleryImage} from '../../types'
import {urlFor} from '../../lib/sanity'
import {TfiNewWindow} from 'react-icons/tfi'
import {IconContext} from 'react-icons'

type Props = {
  image: GalleryImage
  uniqueId: number // index
  maxHeightValue: number // in vh — the single primitive the parent gives us
  onImageMeasured: (id: string, heightInVH: number) => void
  // any additional props like onClick, isFocused, etc.
  isFocused?: boolean
}

function pxToVh(px: number) {
  if (typeof window === 'undefined' || window.innerHeight === 0) return 0
  return (px / window.innerHeight) * 100
}

const GalleryImageCardInner: React.FC<Props> = ({
  image,
  uniqueId,
  maxHeightValue,
  onImageMeasured,
  isFocused,
}) => {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // When the browser loads the image, measure its rendered offsetHeight
  const handleImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const imgEl = e.currentTarget
      const measuredPx = imgEl.offsetHeight || imgEl.naturalHeight || 0
      const heightInVH = pxToVh(measuredPx)
      onImageMeasured(image._id, heightInVH)
      setLoaded(true)
    },
    [image._id, onImageMeasured],
  )

  // Also measure if layout changes after initial load (optional).
  // This uses ResizeObserver to catch layout updates on the image element.
  useEffect(() => {
    const el = imgRef.current
    if (!el || typeof ResizeObserver === 'undefined') return

    const ro = new ResizeObserver(() => {
      const measuredPx = el.offsetHeight || el.naturalHeight || 0
      const heightInVH = pxToVh(measuredPx)
      onImageMeasured(image._id, heightInVH)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [image._id, onImageMeasured])

  // Use provided maxHeightValue as the container height (in vh). If zero, fallback to 'auto'
  const containerStyle: React.CSSProperties =
    maxHeightValue && maxHeightValue > 0 ? {height: `${maxHeightValue}vh`} : {height: 'auto'}

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg shadow-sm bg-gray-100`}
      style={containerStyle}
      aria-label={image.title || 'Gallery image'}
    >
      {/* background decoration stays visible behind smaller images */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 100%)',
        }}
      />

      <img
        ref={imgRef}
        src={urlFor(image.actualImage)?.url()}
        alt={image.title}
        onLoad={handleImageLoad}
        // Don't set height/width here; allow natural sizing so we get true offsetHeight.
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          zIndex: 1,
          backfaceVisibility: 'hidden',
        }}
      />

      {/* optional caption/overlay */}
      <div
        style={{
          position: 'absolute',
          left: 8,
          right: 8,
          bottom: 8,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: 6,
            fontSize: 12,
            display: image.title ? 'inline-block' : 'none',
          }}
        >
          {image.title}
        </div>
      </div>

      {/* Small load indicator for debug / UX */}
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
          }}
        >
          <div style={{fontSize: 12, color: '#666'}}>loading…</div>
        </div>
      )}
    </div>
  )
}

// Custom comparator: only re-render when the specific props that matter change
export const GalleryImageCard = React.memo(GalleryImageCardInner, (prev, next) => {
  // If the primitive maxHeightValue changed, re-render.
  if (prev.maxHeightValue !== next.maxHeightValue) return false
  if (prev.image._id !== next.image._id) return false
  if (prev.isFocused !== next.isFocused) return false
  // otherwise skip render
  return true
})

export default GalleryImageCard

# Integrating Videos into Gallery

This guide shows how to update your gallery page to display videos alongside images.

## Components Created

### 1. **GalleryVideoCard** (`src/components/Gallery/GalleryVideoCard.tsx`)

Displays video thumbnail with:

- Mux thumbnail image
- Play button overlay
- Duration badge
- Hover metadata (title, location, duration)
- Same callback pattern as `GalleryImageCard`

### 2. **FocusedVideoCard** (`src/components/Gallery/FocusedVideoCard.tsx`)

Full-screen video player with:

- HLS video playback (via Mux)
- Video controls (play, pause, seek, volume)
- Metadata sidebar (title, description, location, date, people)
- Same UX pattern as `FocusedImageCard`

### 3. **Gallery Utils** (`src/utils/galleryUtils.ts`)

Helper functions:

- `isGalleryImage()` - Type guard for images
- `isGalleryVideo()` - Type guard for videos
- `combineGalleryItems()` - Merge and sort by date
- `filterGalleryItems()` - Filter by location/date

---

## Integration Steps

### Step 1: Update Gallery Page Imports

Add to [src/pages/gallery.tsx](src/pages/gallery.tsx):

```typescript
import {fetchGalleryVideos} from '../utils/fetchGalleryVideos'
import GalleryVideoCard from '@/components/Gallery/GalleryVideoCard'
import FocusedVideoCard from '@/components/Gallery/FocusedVideoCard'
import {
  isGalleryImage,
  isGalleryVideo,
  combineGalleryItems,
  filterGalleryItems,
} from '@/utils/galleryUtils'
```

### Step 2: Fetch Both Images and Videos

In your `getStaticProps`:

```typescript
export const getStaticProps: GetStaticProps<Props> = async () => {
  const galleryImages = await fetchGalleryImages()
  const galleryVideos = await fetchGalleryVideos()

  return {
    props: {
      galleryItems: combineGalleryItems(galleryImages, galleryVideos),
      socials: await fetchSocials(),
    },
    revalidate: 60,
  }
}
```

Update the component props type:

```typescript
type Props = {
  galleryItems: (GalleryImage | GalleryVideo)[] // Changed from galleryImages
  socials: Social[]
}
```

### Step 3: Update displayedItems State

Replace your displayed images state with gallery items:

```typescript
// OLD:
const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>(...)

// NEW:
const [displayedItems, setDisplayedItems] = useState<(GalleryImage | GalleryVideo)[]>(
  galleryItems.sort((a, b) => (Number(a._id) > Number(b._id) ? -1 : 1)).slice(0, 9),
)
```

### Step 4: Update Filtered Items Calculation

Replace your `filteredImages` with combined filtering:

```typescript
// OLD:
const filteredImages = useMemo(() => {
  return galleryImages.filter(...)
}, [galleryImages, selectedFilter])

// NEW:
const filteredItems = useMemo(() => {
  return filterGalleryItems(galleryItems, selectedFilter)
}, [galleryItems, selectedFilter])
```

### Step 5: Update Rendering Logic

In your grid rendering, add type checking:

```typescript
{displayedItems.map((item, index) => (
  isGalleryImage(item) ? (
    <GalleryImageCard
      key={item._id}
      image={item}
      uniqueId={index}
      cardCount={displayedItems.length}
      setSelected={setSelected}
      focus={focus}
      setFocus={setFocus}
      setManualFocus={setManualFocus}
      maxHeight={maxHeight}
      onImageData={onImageData}
      selectedFilter={selectedFilter}
    />
  ) : (
    <GalleryVideoCard
      key={item._id}
      video={item}
      uniqueId={index}
      cardCount={displayedItems.length}
      setSelected={setSelected}
      focus={focus}
      setFocus={setFocus}
      setManualFocus={setManualFocus}
      maxHeight={maxHeight}
      onVideoData={onVideoData}
      selectedFilter={selectedFilter}
    />
  )
))}
```

### Step 6: Handle Video Data Callback

Add a video data callback similar to your image handler:

```typescript
const onVideoData = useCallback(
  (
    videoId: string,
    data: {height: number; naturalHeight: number; width: number; title: string},
  ) => {
    const currentData = videoDataRef.current.get(videoId) || {}
    videoDataRef.current.set(videoId, {...currentData, ...data})
  },
  [],
)

// Or reuse your existing imageDataRef if dimensions are the same:
const onVideoData = onImageData // Simple approach if they use the same ref
```

### Step 7: Update Focused View Rendering

Add type checking for focus rendering:

```typescript
{selected > -1 && (
  filteredItems[selected] && (
    isGalleryImage(filteredItems[selected]) ? (
      <FocusedImageCard
        image={filteredItems[selected] as GalleryImage}
        galleryRefs={galleryRefs}
        uniqueId={selected}
        selected={selected}
        setSelected={setSelected}
        manualFocus={manualFocus}
        setManualFocus={setManualFocus}
      />
    ) : (
      <FocusedVideoCard
        video={filteredItems[selected] as GalleryVideo}
        galleryRefs={galleryRefs}
        uniqueId={selected}
        selected={selected}
        setSelected={setSelected}
        manualFocus={manualFocus}
        setManualFocus={setManualFocus}
      />
    )
  )
)}
```

### Step 8: Update Infinite Scroll

If using infinite scroll, update to load both images and videos:

```typescript
// When loading more items, combine images and videos
const allItems = combineGalleryItems(galleryImages, galleryVideos)
const nextItems = allItems.slice(currentPage * 9, (currentPage + 1) * 9)
setDisplayedItems((prev) => [...prev, ...nextItems])
```

---

## Type Updates

Your types are already updated, but ensure you're importing both:

```typescript
import {GalleryImage, GalleryVideo} from '../types'

// Use union type for combined galleries
type GalleryItem = GalleryImage | GalleryVideo
```

---

## Testing Checklist

- [ ] Videos appear in grid alongside images
- [ ] Play button overlay visible on video cards
- [ ] Duration badge displays correctly
- [ ] Click video card to open focused view
- [ ] Video plays with controls in focused view
- [ ] Close button (X) hides focused view
- [ ] Metadata displays in sidebar
- [ ] Filters (location, date) work with videos
- [ ] Mobile responsive design works

---

## Optional Enhancements

### 1. Add Video Indicator Icon

You can add a small video icon to distinguish from images in the grid. Modify the card overlay:

```typescript
{isGalleryVideo(item) && (
  <div className="absolute top-2 left-2 bg-blue-600 rounded-full p-1">
    <MdVideoLibrary className="text-white" />
  </div>
)}
```

### 2. Custom Thumbnail Generation

Instead of auto-generated Mux thumbnails, specify custom timestamps:

```typescript
const thumbnailUrl = getMuxThumbnailUrl(video.muxPlaybackId, {
  time: video.thumbnailTimestamp || 0, // User can set in Sanity
})
```

### 3. Video Analytics

Track video plays:

```typescript
const handleVideoPlay = () => {
  console.log(`Video played: ${video.title}`)
  // Send to analytics service
}

// In FocusedVideoCard:
<video ref={videoRef} onPlay={handleVideoPlay} controls>
```

### 4. Quality Selection

Support multiple quality options:

```typescript
const qualities = ['auto', '360p', '720p', '1080p']
const getPlaybackUrl = (quality) => {
  // Different playback IDs or Mux query params
}
```

---

## Troubleshooting

### Videos don't appear in grid

- Verify `fetchGalleryVideos()` is returning data
- Check that videos are published in Sanity
- Ensure `combineGalleryItems()` is working (console.log to verify)

### Play button doesn't show

- Check that `MdPlayArrow` is imported from `react-icons/md`
- Verify Tailwind classes are applied correctly
- Add inline styles if needed

### Video won't play in focused view

- Verify Mux Playback ID is correct in Sanity
- Check that `getMuxPlaybackUrl()` generates valid HLS URL
- Test URL directly: `https://stream.mux.com/{playbackId}.m3u8`
- Browser console should show video element errors

### Infinite scroll loads duplicates

- Ensure `page` state tracking is correct
- Update slice indices to account for mixed types
- Consider using unique `_id` to deduplicate

---

## Component Props Reference

### GalleryVideoCard Props

```typescript
video: GalleryVideo
uniqueId: number
cardCount: number
setSelected: (id: number) => void
focus: number
setFocus: (id: number) => void
maxHeight: {id: string; value: number}[]
onVideoData: (videoId: string, data: {height: number; ...}) => void
selectedFilter: {countries: string[]; dates: string[]}
setManualFocus: (value: boolean) => void
```

### FocusedVideoCard Props

```typescript
video: GalleryVideo
uniqueId: number
selected: number
setSelected: (id: number) => void
galleryRefs: React.MutableRefObject<(HTMLElement | null)[]>
manualFocus: boolean
setManualFocus: (value: boolean) => void
```

---

**Next:** Review the gallery page structure and implement these changes step by step!

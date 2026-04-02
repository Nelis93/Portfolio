# Mux Integration - Quick Reference

## Configuration Checklist

- [ ] Created Mux account at mux.com
- [ ] Generated API Token ID and Secret
- [ ] Added to `.env.local`:
  ```env
  MUX_TOKEN_ID=your_token_id
  MUX_TOKEN_SECRET=your_token_secret
  ```
- [ ] Installed `mux.js` package ✅
- [ ] Created Sanity schema for videos ✅
- [ ] Restarted Sanity Studio: `npm run sanity-dev`

## File Structure

```
src/
├── lib/
│   └── mux.ts                          # Mux utilities and client config
├── pages/
│   └── api/
│       └── mux/
│           └── index.ts                # API endpoint for Mux operations
├── schemas/
│   └── galleryVideo.ts                 # Sanity schema for videos
├── utils/
│   └── fetchGalleryVideos.ts           # Video fetching utilities
└── types/
    └── index.d.ts                      # Added GalleryVideo interface

MUX_SETUP.md                            # Full setup guide
```

## Common Usage

### Fetch Videos

```typescript
import {fetchGalleryVideos} from '@/utils/fetchGalleryVideos'

const videos = await fetchGalleryVideos()
```

### Get Playback URL

```typescript
import {getMuxPlaybackUrl} from '@/lib/mux'

const url = getMuxPlaybackUrl(playbackId) // Returns HLS URL
```

### Get Thumbnail

```typescript
import {getMuxThumbnailUrl} from '@/lib/mux'

const thumb = getMuxThumbnailUrl(playbackId)
const customThumb = getMuxThumbnailUrl(playbackId, {
  time: 10,
  width: 1280,
  height: 720,
})
```

### Via API

```typescript
// Playback URL
/api/mux?action=playback_url&playbackId=xyz

// Thumbnail
/api/mux?action=thumbnail&playbackId=xyz&time=10&width=1280
```

## Upload Videos to Mux

1. Go to **dashboard.mux.com**
2. Click **Video → Upload**
3. Upload your file
4. After processing, copy:
   - **Video ID**: For reference
   - **Playback ID**: For streaming

## Add to Sanity

1. Sanity Studio: **+ Create → Gallery Video**
2. Fill in:
   - Title, Description
   - Mux Video ID & Playback ID (from Mux)
   - Optional: Thumbnail, Date, Location, People
3. **Publish**

## Combine Videos with Images

```typescript
const images = await fetchGalleryImages()
const videos = await fetchGalleryVideos()

const combined = [...images, ...videos].sort(
  (a, b) => new Date(b.dateTaken) - new Date(a.dateTaken),
)
```

## Type Checking

```typescript
if (item._type === 'galleryImage') {
  // Image-specific logic
} else if (item._type === 'galleryVideo') {
  // Video-specific logic
}
```

## Environment Variables

| Variable                            | Required | Where        | Example         |
| ----------------------------------- | -------- | ------------ | --------------- |
| `MUX_TOKEN_ID`                      | Yes      | `.env.local` | `abc123def456`  |
| `MUX_TOKEN_SECRET`                  | Yes      | `.env.local` | `xyz789...`     |
| `NEXT_PUBLIC_MUX_PLAYBACK_TOKEN_ID` | No       | `.env.local` | For signed URLs |

## Troubleshooting

| Problem              | Solution                              |
| -------------------- | ------------------------------------- |
| Mux client error     | Check `.env.local` has credentials    |
| Videos not in Sanity | Restart: `npm run sanity-dev`         |
| Playback error       | Verify Playback ID (not Video ID)     |
| CORS issues          | Using `/api/mux` endpoint solves this |

## Architecture

```
Mux Dashboard        →  Upload videos  →  Get Video/Playback ID
                                              ↓
Sanity Studio        ←  Store metadata  ←  Add to Gallery Video
                                              ↓
Your App             ←  Fetch videos    ←  fetchGalleryVideos()
                        Generate URLs       getMuxPlaybackUrl()
                        Get thumbnails      getMuxThumbnailUrl()
```

## Next: Update Gallery Component

Your gallery currently shows only images. To include videos:

1. Fetch both images and videos
2. Combine them sorted by date
3. Use type checking to render appropriate component
4. Create a VideoPlayer component for playback

See `MUX_SETUP.md` for detailed integration instructions.

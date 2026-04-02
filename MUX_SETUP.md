# Mux Video Integration Guide

This document provides complete setup instructions for integrating Mux videos into your gallery.

## Overview

Your portfolio now supports video content alongside images in your gallery. Videos are managed through Mux and stored with metadata in Sanity CMS, mirroring your existing image gallery structure.

### Architecture

- **Mux**: Video hosting and streaming (HLS format)
- **Sanity CMS**: Metadata storage and content management
- **Next.js API Routes**: Utilities for retrieving playback URLs and thumbnails
- **Database**: Ready for password-protected video access (same auth as gallery)

## Step 1: Get Your Mux Credentials

1. Go to [dashboard.mux.com](https://dashboard.mux.com)
2. Sign in to your Mux account
3. Navigate to **Settings → API Tokens** (or **API Access Tokens**)
4. Create a new API token or use an existing one
5. Copy the **Token ID** and **Token Secret** (you'll only see the secret once)

## Step 2: Configure Environment Variables

Create or update your `.env.local` file in the project root with:

```env
# Mux API Credentials (required for server-side operations)
MUX_TOKEN_ID=your_token_id_here
MUX_TOKEN_SECRET=your_token_secret_here

# Optional: Public Mux configuration (for advanced features)
NEXT_PUBLIC_MUX_PLAYBACK_TOKEN_ID=your_public_token_id_here
```

**Important**:

- Add `.env.local` to your `.gitignore` (it should already be there)
- Never commit these credentials to version control
- The Token Secret should only be used on the server side (kept private)

## Step 3: Upload Videos to Mux

### Using Mux Dashboard (Simple)

1. Go to [dashboard.mux.com](https://dashboard.mux.com)
2. Click **Video** → **Upload**
3. Upload your video file
4. After processing completes (usually 1-5 minutes), note the:
   - **Video ID** (ID field in the dashboard)
   - **Playback ID** (under Standard Playback ID)

### Using Mux API (Programmatic)

You can also upload videos programmatically. Here's a helper utility you can add later to automate uploads:

```typescript
// Pseudo-code example
import Mux from 'mux.js'

const mux = new Mux(process.env.MUX_TOKEN_ID, process.env.MUX_TOKEN_SECRET)

// Upload a video
const upload = await mux.Video.create({
  input: 'https://example.com/video.mp4',
  encoding_tier: 'baseline',
})
```

## Step 4: Add Videos to Sanity

1. Go to your Sanity Studio (usually at `localhost:3000/studio` or `yoursite.com/studio`)
2. Click **+ Create**
3. Select **Gallery Video**
4. Fill in the fields:
   - **Title**: Name of your video
   - **Description**: Details about the video
   - **Mux Video ID**: Paste the Video ID from Mux
   - **Mux Playback ID**: Paste the Playback ID from Mux
   - **Thumbnail** (optional): Upload a custom thumbnail (Mux auto-generates one if omitted)
   - **Date**: When the video was taken
   - **Location**: Where it was filmed
   - **People**: Tag people in the video (like gallery images)
   - **Duration**: Video length in seconds (Mux provides this)
   - **Related Logbook Entry** (optional): Link to a captain's log entry

5. Click **Publish**

## Step 5: Fetch and Display Videos

### Get Videos in Your Code

```typescript
import {fetchGalleryVideos} from '@/utils/fetchGalleryVideos'

// In your component or page
const videos = await fetchGalleryVideos()
```

### Available Utility Functions

```typescript
// Fetch all videos
import {fetchGalleryVideos} from '@/utils/fetchGalleryVideos'
const videos = await fetchGalleryVideos()

// Fetch by ID
import {fetchGalleryVideoById} from '@/utils/fetchGalleryVideos'
const video = await fetchGalleryVideoById('video-id')

// Fetch by location
import {fetchGalleryVideosByLocation} from '@/utils/fetchGalleryVideos'
const videos = await fetchGalleryVideosByLocation('Paris, France')

// Fetch by year
import {fetchGalleryVideosByYear} from '@/utils/fetchGalleryVideos'
const videos = await fetchGalleryVideosByYear(2024)
```

### Generate Playback URLs

```typescript
import {getMuxPlaybackUrl, getMuxThumbnailUrl} from '@/lib/mux'

const playbackUrl = getMuxPlaybackUrl(playbackId) // HLS format
const thumbnailUrl = getMuxThumbnailUrl(playbackId)
const customThumbnail = getMuxThumbnailUrl(playbackId, {
  time: 5, // 5 seconds into the video
  width: 1280,
  height: 720,
})
```

### Use the API Route

The `/api/mux` endpoint provides convenient access to Mux utilities:

```typescript
// Get playback URL
fetch('/api/mux?action=playback_url&playbackId=YOUR_PLAYBACK_ID')
  .then((res) => res.json())
  .then((data) => console.log(data.data.url))

// Get thumbnail
fetch('/api/mux?action=thumbnail&playbackId=YOUR_PLAYBACK_ID&time=10&width=1280&height=720')
  .then((res) => res.json())
  .then((data) => console.log(data.data.url))
```

## Step 6: Update Your Gallery Component (Optional)

Currently, your gallery displays images and videos separately. To display them together, you'll need to modify your gallery component.

Here's a suggested approach:

```typescript
import { fetchGalleryImages } from '@/utils/fetchGalleryImages'
import { fetchGalleryVideos } from '@/utils/fetchGalleryVideos'

// Fetch both
const images = await fetchGalleryImages()
const videos = await fetchGalleryVideos()

// Combine with a type guard
type GalleryItem = GalleryImage | GalleryVideo

const gallery: GalleryItem[] = [
  ...images,
  ...videos,
].sort((a, b) => {
  // Sort by date taken
  const dateA = new Date(a.dateTaken).getTime()
  const dateB = new Date(b.dateTaken).getTime()
  return dateB - dateA
})

// In rendering, check type
{gallery.map(item => {
  if (item._type === 'galleryImage') {
    return <ImageComponent image={item} />
  } else if (item._type === 'galleryVideo') {
    return <VideoComponent video={item} />
  }
})}
```

## Step 7: Create a Video Player Component (Recommended)

Here's a simple video player component:

```typescript
// src/components/Gallery/VideoPlayer.tsx
import React from 'react'
import { GalleryVideo } from '@/types'
import { getMuxPlaybackUrl } from '@/lib/mux'

interface VideoPlayerProps {
  video: GalleryVideo
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const playbackUrl = getMuxPlaybackUrl(video.muxPlaybackId)

  return (
    <video
      width="100%"
      height="auto"
      controls
      poster={video.thumbnail ? undefined : `/api/mux?action=thumbnail&playbackId=${video.muxPlaybackId}`}
    >
      <source src={playbackUrl} type="application/x-mpegURL" />
      Your browser does not support the video tag.
    </video>
  )
}
```

## Testing Your Setup

1. **Test Mux Connection**:

   ```bash
   # Check that environment variables are loaded
   npm run build
   ```

2. **Test Sanity Schema**:
   - Go to Sanity Studio
   - Create a test "Gallery Video" document
   - Verify all fields save correctly

3. **Test Fetching**:

   ```typescript
   // In a test page or component
   const videos = await fetchGalleryVideos()
   console.log(videos)
   ```

4. **Test Playback**:
   - Use the playback URL in an HTML5 video player
   - Verify videos play correctly

## Security Considerations

### Password Protection

Your videos will inherit the same password protection as your gallery:

- Videos are token-gated via your existing auth system
- Only authenticated users can fetch video playback URLs
- Playback URLs can be signed using Mux signing keys (optional, for advanced security)

### API Keys

- Store `MUX_TOKEN_SECRET` only in `.env.local` (server-side only)
- Never expose API credentials to the client
- The `/api/mux` endpoint is server-side, keeping credentials secure

## Troubleshooting

### Issue: "Mux client not initialized"

**Solution**: Check that `MUX_TOKEN_ID` and `MUX_TOKEN_SECRET` are set in `.env.local` and the server has been restarted.

### Issue: Videos don't appear in Sanity

**Solution**:

- Restart Sanity Studio: `npm run sanity-dev`
- Clear your browser cache
- Verify the schema was added correctly

### Issue: "Playback ID is required" error

**Solution**: Ensure you copied the Playback ID (not Video ID) from Mux dashboard into the `muxPlaybackId` field in Sanity.

### Issue: Videos won't play in browser

**Solution**:

- Verify the Mux video has finished processing (status: "ready")
- Check that you're using the correct Playback ID
- Try the video URL directly: `https://stream.mux.com/{playbackId}.m3u8`

## Advanced Features (Recommended for Later)

1. **Video Upload API**: Add automatic Mux upload when videos are added to Sanity
2. **Signed URLs**: Implement URL signing for additional security
3. **Analytics**: Integrate Mux analytics to track video views
4. **Thumbnails**: Auto-generate custom thumbnails at specific timestamps
5. **Adaptive Bitrate**: Configure multiple quality options

## Helpful Resources

- [Mux Documentation](https://docs.mux.com/)
- [Mux Dashboard](https://dashboard.mux.com)
- [HLS Standard](https://tools.ietf.org/html/rfc8216)
- [Mux Video Elements](https://github.com/muxinc/elements) - Pre-built video player components

## Next Steps

1. ✅ Credentials configured
2. ✅ Environment variables set
3. ✅ Architecture implemented
4. ⬜ Upload your first video to Mux
5. ⬜ Add video metadata to Sanity
6. ⬜ Integrate into gallery component
7. ⬜ Test and deploy

---

**Questions or issues?** Check the troubleshooting section above or refer to the [Mux Docs](https://docs.mux.com/).

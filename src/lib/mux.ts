/**
 * Mux API client configuration
 *
 * Environment variables required:
 * - MUX_TOKEN_ID: Your Mux API token ID
 * - MUX_TOKEN_SECRET: Your Mux API token secret
 * - NEXT_PUBLIC_MUX_PLAYBACK_TOKEN_ID: Public Mux token ID for client-side playback (optional for secured streams)
 */

import Mux from 'mux.js'

// Validate that required environment variables are set
if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
  console.warn(
    'Warning: Mux credentials not fully configured. Set MUX_TOKEN_ID and MUX_TOKEN_SECRET in your .env.local file',
  )
}

// Initialize Mux on the server side
export const muxClient =
  process.env.MUX_TOKEN_ID && process.env.MUX_TOKEN_SECRET
    ? new Mux(process.env.MUX_TOKEN_ID, process.env.MUX_TOKEN_SECRET)
    : null

// Mux playback URL builder
export const getMuxPlaybackUrl = (playbackId: string, format: 'hls' | 'dash' = 'hls') => {
  if (!playbackId) throw new Error('Playback ID is required')

  if (format === 'hls') {
    return `https://stream.mux.com/${playbackId}.m3u8`
  } else if (format === 'dash') {
    return `https://stream.mux.com/${playbackId}.mpd`
  }

  throw new Error('Invalid format. Use "hls" or "dash"')
}

// Mux thumbnail URL builder
export const getMuxThumbnailUrl = (
  playbackId: string,
  options?: {time?: number; width?: number; height?: number},
) => {
  if (!playbackId) throw new Error('Playback ID is required')

  const url = new URL(`https://image.mux.com/${playbackId}/thumbnail.jpg`)

  if (options?.time) {
    url.searchParams.append('time', String(options.time))
  }
  if (options?.width) {
    url.searchParams.append('width', String(options.width))
  }
  if (options?.height) {
    url.searchParams.append('height', String(options.height))
  }

  return url.toString()
}

// Server-side only: Get video details from Mux
export const getMuxVideoDetails = async (videoId: string) => {
  if (!muxClient) {
    throw new Error('Mux client not initialized. Check your environment variables.')
  }

  try {
    const video = await muxClient.Video.get(videoId)
    return video
  } catch (error) {
    console.error(`Failed to fetch Mux video details for ${videoId}:`, error)
    throw error
  }
}

// Server-side only: Create a signed URL for secure playback
export const generateMuxSignedUrl = async (
  playbackId: string,
  options?: {
    expiresIn?: number // seconds until expiration (default: 1 hour)
    keyId?: string // Your Mux signing key ID (optional)
    secret?: string // Your Mux signing key secret (optional)
  },
) => {
  if (!playbackId) throw new Error('Playback ID is required')

  // If you have signing keys configured, implement signed URL generation here
  // For now, return the standard playback URL
  // TODO: Implement signed URL generation when signing keys are configured

  return getMuxPlaybackUrl(playbackId)
}

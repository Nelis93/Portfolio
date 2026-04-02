import type {NextApiRequest, NextApiResponse} from 'next'
import {getMuxPlaybackUrl, getMuxThumbnailUrl} from '@/lib/mux'

type ResponseData = {
  success: boolean
  data?: any
  error?: string
}

/**
 * API endpoint for Mux video utilities
 *
 * Supported query parameters:
 * - action=playback_url&playbackId=xxx - Get HLS playback URL
 * - action=thumbnail&playbackId=xxx - Get thumbnail URL
 * - action=thumbnail&playbackId=xxx&time=10&width=1280&height=720 - Get custom thumbnail
 */
export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const {action, playbackId, time, width, height} = req.query

  try {
    if (req.method !== 'GET') {
      return res.status(405).json({success: false, error: 'Method not allowed'})
    }

    if (!playbackId || typeof playbackId !== 'string') {
      return res.status(400).json({success: false, error: 'playbackId is required'})
    }

    if (action === 'playback_url') {
      // Return HLS playback URL for the video
      const url = getMuxPlaybackUrl(playbackId, 'hls')
      return res.status(200).json({success: true, data: {url}})
    }

    if (action === 'thumbnail') {
      // Return thumbnail URL with optional parameters
      const options = {
        time: time ? Number(time) : undefined,
        width: width ? Number(width) : undefined,
        height: height ? Number(height) : undefined,
      }
      const url = getMuxThumbnailUrl(playbackId, options)
      return res.status(200).json({success: true, data: {url}})
    }

    return res.status(400).json({success: false, error: 'Invalid action'})
  } catch (error) {
    console.error('Error in mux API:', error)
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    })
  }
}

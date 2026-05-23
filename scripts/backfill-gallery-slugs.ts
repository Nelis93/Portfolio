/**
 * One-time script: generate slugs for all gallery images and videos from their titles.
 *
 * Usage:
 *   1. Create a Sanity API token with Editor permissions at sanity.io/manage
 *   2. Add to .env.local:  SANITY_API_WRITE_TOKEN=your_token_here
 *   3. Run: npm run backfill-gallery-slugs
 *
 * Options:
 *   --force   Regenerate slugs even when one already exists
 *   --dry-run Print changes without writing to Sanity
 */

import {readFileSync} from 'fs'
import {join} from 'path'
import {createClient} from '@sanity/client'
import {slugifyTitleOrFallback} from '../src/utils/slugifyTitle'

type GalleryDoc = {
  _id: string
  _type: 'galleryImage' | 'galleryVideo'
  title?: string
  slug?: {current?: string}
}

function loadEnvLocal() {
  try {
    const content = readFileSync(join(process.cwd(), '.env.local'), 'utf8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      let value = trimmed.slice(eq + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      if (!process.env[key]) process.env[key] = value
    }
  } catch {
    // .env.local is optional if vars are already in the environment
  }
}

function makeUniqueSlug(base: string, used: Set<string>): string {
  if (!used.has(base)) return base
  let counter = 2
  while (used.has(`${base}-${counter}`)) counter++
  return `${base}-${counter}`
}

async function main() {
  loadEnvLocal()

  const force = process.argv.includes('--force')
  const dryRun = process.argv.includes('--dry-run')
  const token = process.env.SANITY_API_WRITE_TOKEN

  if (!token && !dryRun) {
    console.error(
      'Missing SANITY_API_WRITE_TOKEN.\n' +
        'Add it to .env.local (Sanity → Project → API → Tokens, Editor role).',
    )
    process.exit(1)
  }

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pdxb9c80',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2022-11-16',
    token,
    useCdn: false,
  })

  const docs: GalleryDoc[] = await client.fetch(
    `*[_type in ["galleryImage", "galleryVideo"]]{ _id, _type, title, slug }`,
  )

  if (docs.length === 0) {
    console.log('No gallery images or videos found.')
    return
  }

  const usedSlugs = new Set<string>()
  for (const doc of docs) {
    if (doc.slug?.current) usedSlugs.add(doc.slug.current)
  }

  const updates: {id: string; type: string; title: string; slug: string; action: string}[] = []

  for (const doc of docs) {
    if (doc.slug?.current && !force) {
      console.log(`Skip  ${doc._type} "${doc.title ?? doc._id}" → already "${doc.slug.current}"`)
      continue
    }

    const reserved = new Set(usedSlugs)
    if (doc.slug?.current && force) {
      reserved.delete(doc.slug.current)
    }

    const base = slugifyTitleOrFallback(doc.title, doc._id)
    const slug = makeUniqueSlug(base, reserved)
    if (doc.slug?.current) usedSlugs.delete(doc.slug.current)
    usedSlugs.add(slug)

    updates.push({
      id: doc._id,
      type: doc._type,
      title: doc.title ?? '(no title)',
      slug,
      action: doc.slug?.current && force ? 'replace' : 'create',
    })
  }

  if (updates.length === 0) {
    console.log('\nAll items already have slugs. Use --force to regenerate.')
    return
  }

  console.log(`\n${dryRun ? '[dry run] ' : ''}Updating ${updates.length} item(s):\n`)
  for (const u of updates) {
    console.log(`  ${u.action.padEnd(7)} ${u.type} "${u.title}" → ${u.slug}`)
  }

  if (dryRun) {
    console.log('\nDry run complete. No changes written.')
    return
  }

  let transaction = client.transaction()
  for (const u of updates) {
    transaction = transaction.patch(u.id, {
      set: {
        slug: {_type: 'slug', current: u.slug},
      },
    })
  }
  await transaction.commit()

  console.log(`\nDone. ${updates.length} slug(s) saved to Sanity.`)
}

main().catch((error) => {
  console.error('Backfill failed:', error)
  process.exit(1)
})

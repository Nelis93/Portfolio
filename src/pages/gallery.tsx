import {useEffect, useState, useRef, useMemo, useCallback} from 'react'
import type {GetStaticProps} from 'next'
import {GalleryImage, GalleryVideo, Social} from '../types'
import {fetchGalleryImages} from '../utils/fetchGalleryImages'
import {fetchGalleryVideos} from '../utils/fetchGalleryVideos'
import dynamic from 'next/dynamic'
import GalleryImageCard from '@/components/Gallery/GalleryImageCard'
import GalleryImageCardSmall from '@/components/Gallery/GalleryImageCardSmall'
import GalleryVideoCard from '@/components/Gallery/GalleryVideoCard'
import GalleryVideoCardSmall from '@/components/Gallery/GalleryVideoCardSmall'
import Header from '@/components/ui/Header'
import {fetchSocials} from '../utils/fetchSocials'
import Slider from '@/components/ui/Slider'
import FocusedImageCard from '@/components/Gallery/FocusedImageCard'
import FocusedVideoCard from '@/components/Gallery/FocusedVideoCard'
import Dots from '@/components/ui/Dots'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import debounce from '@/utils/debounce'
import {extraCards} from '@/utils/extraCards'
import {useFilterSync} from '@/hooks/useFilterSync'
import {useInfiniteScroll} from '@/hooks/useInfiniteScroll'
import scrollToTop from '@/utils/scrollToTop'
import {
  isGalleryImage,
  // isGalleryVideo,
  combineGalleryItems,
  filterGalleryItems,
} from '@/utils/galleryUtils'

type GalleryItem = GalleryImage | GalleryVideo

type Props = {
  galleryItems: GalleryItem[]
  socials: Social[]
}

const Gallery = ({galleryItems, socials}: Props) => {
  // displayed items include both images and videos, initially showing first 9
  const [displayedItems, setDisplayedItems] = useState<GalleryItem[]>(
    galleryItems.sort((a, b) => (Number(a._id) > Number(b._id) ? -1 : 1)).slice(0, 9),
  )
  const itemDataRef = useRef<
    Map<
      string,
      {
        height: number
        naturalHeight: number
        width: number
        title: string
      }
    >
  >(new Map())

  // page is used to keep track of the current page of images
  // we load 9 images per page
  const [page, setPage] = useState(1)
  // loading is used to show a loading spinner when more images are being loaded
  // it is set to true when more images are being loaded and false when the loading is done
  // it is also used to trigger the calculation of the max height of the images
  const [loading, setLoading] = useState(false)
  // galleryRefs is used to keep track of the refs of the gallery images
  // this is used to scroll to the selected image when it is clicked
  const galleryRefs = useRef<(HTMLDivElement | null)[]>([])
  // galleryRefs.current is an array of refs that are used to scroll to the selected image
  const gridRef = useRef<HTMLDivElement | null>(null)
  // selected is used to keep track of the currently selected image
  // it is set to -1 when no image is selected
  // when an image is clicked, it is set to the index of the clicked image
  // when an image is selected, the gallery is displayed in a focused view
  // and the selected image is scrolled into view
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [selected, setSelected] = useState(-1)
  // focus is used to keep track of the currently focused image
  // it is set to -1 when no image is focused
  // when an image is focused, it is set to the index of the focused image
  const [focus, setFocus] = useState(-1)
  // maxHeight is used to keep track of the maximum height of the images in the gallery
  // it is used to set the height of the images in the gallery
  // const [maxHeight, setMaxHeight] = useState<{
  //   current: number[];
  //   index: number;
  // }>({ current: [], index: 0 });
  const [maxHeight, setMaxHeight] = useState<{id: string; value: number}[]>([])
  // selectedFilter is used to keep track of the currently selected filters
  // it is an object with two arrays: countries and dates
  const [selectedFilter, setSelectedFilter] = useState<{
    countries: string[]
    dates: string[]
  }>({
    countries: [],
    dates: [],
  })
  const [manualFocus, setManualFocus] = useState(false)
  const filteredItems = useMemo(() => {
    return filterGalleryItems(galleryItems, selectedFilter)
  }, [galleryItems, selectedFilter])

  useFilterSync(selectedFilter, setSelectedFilter)

  useEffect(() => {
    const allHeightsReady = displayedItems.every((item) =>
      maxHeight.some((h) => h.id === item._id && h.value > 0),
    )
    if (allHeightsReady) {
      console.log('Heights matched!')
    }
  }, [displayedItems, maxHeight])

  useEffect(() => {
    if (selected > -1) return
    if (loading) {
      console.log('loading is ', loading, ', starting debounceMaxHeightCalculation')
      debounceMaxHeightCalculation()
    }
  }, [loading])
  //https: claude.ai/magic-link#46110191bfe111782df9b80581f28a26:MnlydXVjemIxQG1vem1haWwuY29t
  const debounceMaxHeightCalculation = useCallback(
    debounce(() => {
      console.log('debounceMaxHeightCalculation called')
      const newMaxArray: {id: string; value: number}[] = []

      for (let i = 0; i < displayedItems.length; i += 3) {
        const triplet = displayedItems.slice(i, i + 3)
        const heights = triplet.map((item) => {
          const data = itemDataRef.current.get(item._id)
          return data?.height ?? 0
        })

        const maxTripletHeight = Math.max(...heights)
        triplet.forEach((item) => {
          newMaxArray.push({id: item._id, value: maxTripletHeight})
        })
      }

      setMaxHeight(newMaxArray)
      setLoading(false)
    }, 300),
    [displayedItems],
  )

  useEffect(() => {
    console.log('Gallery - selected changed to ', selected)
    if (selected > -1) {
      // Use galleryRefs to scroll to the selected item
      const selectedItem = displayedItems[selected]
      console.log('Gallery - displayedItems length:', displayedItems.length)
      console.log('Gallery - displayedItems[selected]:', selectedItem)
      console.log('Gallery - galleryRefs.current length:', galleryRefs.current.length)
      console.log('Gallery - galleryRefs.current[selected]:', galleryRefs.current[selected])
      galleryRefs.current[selected]?.scrollIntoView({behavior: 'smooth', block: 'center'})
      console.log('Gallery - Scrolling to selected index:', selected)
      return
    }
    setPage(1)
    setDisplayedItems(filteredItems.slice(0, 9))
  }, [selected, filteredItems])

  useEffect(() => {
    setDisplayedItems(filteredItems.slice(0, 9))
    if (selectedFilter.countries.length === 0 && selectedFilter.dates.length === 0) return

    setMaxHeight((prev) => filteredMaxHeightForItems(filteredItems.slice(0, 9), prev))
    setPage(1)
    scrollToTop(sectionRef)
  }, [filteredItems, selectedFilter])

  function filteredMaxHeightForItems(
    filteredItemsList: GalleryItem[],
    prevMax: {id: string; value: number}[],
  ): {id: string; value: number}[] {
    const map = new Map(prevMax.map((m) => [m.id, m.value]))
    return filteredItemsList.map((item) => {
      const val = map.get(item._id)
      return {id: item._id, value: typeof val === 'number' ? val : 0}
    })
  }

  const handleItemData = useCallback(
    (
      itemId: string,
      data: {
        height: number
        naturalHeight: number
        width: number
        title: string
      },
    ) => {
      itemDataRef.current.set(itemId, data)

      // Check if all items in current view have loaded
      const allLoaded = displayedItems.every((item) => itemDataRef.current.has(item._id))
      if (allLoaded) {
        debounceMaxHeightCalculation()
      }
    },
    [displayedItems, debounceMaxHeightCalculation],
  )

  // Function to load more items
  const loadMoreItems = useInfiniteScroll(
    loading,
    page,
    setPage,
    setDisplayedItems,
    setLoading,
    filteredItems,
  )

  return (
    <main
      translate="no"
      className="relative flex flex-col justify-center items-center bg-black text-white w-screen h-screen p-2 sm:p-4 lg:p-8 overflow-y-scroll overflow-auto"
    >
      <Header
        socials={socials}
        setSelectedFilter={setSelectedFilter}
        style={
          'sticky text-[5vh] w-full sm:text-[5dvw] lg:text-[5dvh] top-0 p-5 flex items-start justify-between z-30'
        }
      />
      <section
        ref={sectionRef}
        className="relative flex w-full h-auto overflow-y-scroll lg:overscroll-none scrollbar-none pt-[5dvh] sm:pt-0 lg:mt-15 max-w-[90vw] mx-auto sm:max-w-[80vw] sm:px-[1em] lg:text-[2em] lg:px-[20dvh] lg:h-screen  lg:max-w-[1500px]"
        onScroll={loadMoreItems}
        style={{
          backgroundImage:
            displayedItems.length >= 6 && window.innerWidth > 1000 ? "url('/FlipMe.svg')" : '',
          backgroundAttachment: 'fixed',
          backgroundClip: 'content-box',
          backgroundOrigin: 'content-box',
        }}
      >
        <div
          className="relative z-[1] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-0 w-full"
          ref={gridRef}
        >
          {displayedItems
            .map((item, index) => ({item, index})) // Attach index to each item
            .sort((a, b) => a.index - b.index)
            .map(({item, index}) =>
              isGalleryImage(item) ? (
                window.innerWidth < 1024 ? (
                  <GalleryImageCardSmall
                    key={item._id}
                    uniqueId={index}
                    image={item}
                    setSelected={setSelected}
                  />
                ) : (
                  <GalleryImageCard
                    key={item._id}
                    uniqueId={index}
                    image={item}
                    cardCount={displayedItems.length}
                    setSelected={setSelected}
                    focus={focus}
                    setManualFocus={setManualFocus}
                    setFocus={setFocus}
                    maxHeight={maxHeight}
                    selectedFilter={selectedFilter}
                    onImageData={handleItemData}
                  />
                )
              ) : window.innerWidth < 1024 ? ( // Hide video cards on mobile for now
                <GalleryVideoCardSmall
                  key={item._id}
                  uniqueId={index}
                  video={item}
                  setSelected={setSelected}
                  setManualFocus={setManualFocus}
                />
              ) : (
                // Show video cards on desktop
                <GalleryVideoCard
                  key={item._id}
                  uniqueId={index}
                  video={item}
                  cardCount={displayedItems.length}
                  setSelected={setSelected}
                  focus={focus}
                  setManualFocus={setManualFocus}
                  setFocus={setFocus}
                  maxHeight={maxHeight}
                  selectedFilter={selectedFilter}
                  onVideoData={handleItemData}
                />
              ),
            )}
          {window.innerWidth > 1024 &&
            Array.from({length: extraCards(displayedItems)}).map((_, i) => (
              <div
                key={i}
                style={{
                  height: `${maxHeight.slice(-1)[0]?.value || 0}dvh`,
                  width: 'full',
                  backgroundColor: 'black',
                  zIndex: 1,
                }}
              ></div>
            ))}
        </div>
        <Backdrop
          sx={(theme: any) => ({
            opacity: loading ? 1 : 0,
            color: '#fff',
            transition: 'opacity',
            transitionTimingFunction: 'ease-in-out',
            zIndex: theme.zIndex.drawer + 1,
          })}
          open={loading}
        >
          <CircularProgress />
        </Backdrop>
      </section>
      {selected > -1 && (
        <section className="fixed flex flex-col text-[5dvh] z-30 sm:top-0 justify-center w-full sm:w-[70vw] lg:px-auto h-[85dvh] sm:h-screen overflow-x-scroll scrollbar-none items-start sm:items-center">
          <Slider
            items={displayedItems}
            refs={galleryRefs}
            currentIndex={selected}
            setCurrentIndex={setSelected}
            style={
              'fixed z-20 hidden sm:flex flex-row justify-between items-center h-full bg-opacity-50 bg-black w-screen'
            }
            scrolling
          />
          <Dots
            items={displayedItems}
            refs={galleryRefs}
            currentIndex={selected}
            setCurrentIndex={setSelected}
            style={
              'fixed bottom-[.2em] self-center sm:bottom-[2dvh] sm:top-auto justify-self-center z-40 sm:z-20 flex gap-5 p-2 rounded-lg bg-gray-500 bg-opacity-60'
            }
          />
          <div className="relative z-30 bg-black text-white w-full sm:mx-auto mb-2 sm:mb-0 max-h-full overflow-y-hidden sm:h-[80dvh] flex flex-row space-x-11 overflow-x-scroll snap-x snap-mandatory scrollbar-none items-start justify-start scroll-smooth">
            {displayedItems.map((item, index) =>
              isGalleryImage(item) ? (
                <FocusedImageCard
                  key={item._id}
                  uniqueId={index}
                  image={item}
                  manualFocus={manualFocus}
                  setManualFocus={setManualFocus}
                  galleryRefs={galleryRefs}
                  selected={selected}
                  setSelected={setSelected}
                />
              ) : (
                <FocusedVideoCard
                  key={item._id}
                  uniqueId={index}
                  video={item}
                  manualFocus={manualFocus}
                  setManualFocus={setManualFocus}
                  galleryRefs={galleryRefs}
                  selected={selected}
                  setSelected={setSelected}
                />
              ),
            )}
          </div>
        </section>
      )}
    </main>
  )
}

export default dynamic(() => Promise.resolve(Gallery), {ssr: false})

export const getStaticProps: GetStaticProps<Props> = async () => {
  const galleryImages: GalleryImage[] = await fetchGalleryImages()
  const galleryVideos: GalleryVideo[] = await fetchGalleryVideos()
  const galleryItems = combineGalleryItems(galleryImages, galleryVideos)
  const socials: Social[] = await fetchSocials()
  return {
    props: {
      galleryItems,
      socials,
    },
    revalidate: 10,
  }
}

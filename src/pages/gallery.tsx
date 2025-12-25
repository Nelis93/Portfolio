import {useEffect, useState, useRef, useMemo, useCallback} from 'react'
import type {GetStaticProps} from 'next'
import {GalleryImage, Social} from '../types'
import {fetchGalleryImages} from '../utils/fetchGalleryImages'
import dynamic from 'next/dynamic'
import GalleryImageCard from '@/components/Gallery/GalleryImageCard'
import GalleryImageCardSmall from '@/components/Gallery/GalleryImageCardSmall'
import Header from '@/components/ui/Header'
import {fetchSocials} from '../utils/fetchSocials'
import Slider from '@/components/ui/Slider'
import FocusedImageCard from '@/components/Gallery/FocusedImageCard'
import Dots from '@/components/ui/Dots'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import debounce from '@/utils/debounce'
import {extraCards} from '@/utils/extraCards'
import {useFilterSync} from '@/hooks/useFilterSync'
import {useInfiniteScroll} from '@/hooks/useInfiniteScroll'

type Props = {
  galleryImages: GalleryImage[]
  socials: Social[]
}

const Gallery = ({galleryImages, socials}: Props) => {
  // displayed images are the images that are currently shown in the gallery
  // initially, we show the first 9 images
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>(
    galleryImages.sort((a, b) => (Number(a._id) > Number(b._id) ? -1 : 1)).slice(0, 9),
  )
  // edit by claude
  const imageDataRef = useRef<
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
  //end edit by claude

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
  //edit by claude
  const filteredImages = useMemo(() => {
    return galleryImages
      .sort((a, b) => (Number(a._id) > Number(b._id) ? -1 : 1))
      .filter((image) => {
        const countries = selectedFilter?.countries
        if (countries.length === 0) return true
        let index = image.location.split(' ')
        return countries.includes(index[index.length - 1])
      })
      .filter((image) => {
        const dates = selectedFilter?.dates
        if (dates.length === 0) return true
        return dates.includes(image?.dateTaken.toString().split('-')[0])
      })
  }, [galleryImages, selectedFilter])

  useFilterSync(selectedFilter, setSelectedFilter)

  useEffect(() => {
    const allHeightsReady = displayedImages.every((img) =>
      maxHeight.some((h) => h.id === img._id && h.value > 0),
    )
    if (allHeightsReady) {
      console.log('Heights matched!')
    }
  }, [displayedImages, maxHeight])

  useEffect(() => {
    if (loading) {
      console.log('loading is ', loading, ', starting debounceMaxHeightCalculation')
      debounceMaxHeightCalculation()
    }
  }, [loading])

  const debounceMaxHeightCalculation = useCallback(
    debounce(() => {
      console.log('debounceMaxHeightCalculation called')
      const newMaxArray: {id: string; value: number}[] = []

      for (let i = 0; i < displayedImages.length; i += 3) {
        const triplet = displayedImages.slice(i, i + 3)
        const heights = triplet.map((img) => {
          const data = imageDataRef.current.get(img._id)
          return data?.height ?? 0
        })

        const maxTripletHeight = Math.max(...heights)
        triplet.forEach((img) => {
          newMaxArray.push({id: img._id, value: maxTripletHeight})
        })
      }

      setMaxHeight(newMaxArray)
      setLoading(false)
    }, 300),
    [displayedImages],
  )

  useEffect(() => {
    if (selected > -1) {
      setDisplayedImages(filteredImages)
      galleryRefs.current[selected]?.scrollIntoView()
      return
    }
    setPage(1)
    setDisplayedImages(filteredImages.slice(0, 9))
  }, [selected, filteredImages])

  const scrollToTop = () => {
    sectionRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth', // optional
    })
  }
  useEffect(() => {
    setDisplayedImages(filteredImages.slice(0, 9))
    if (selectedFilter.countries.length === 0 && selectedFilter.dates.length === 0) return

    setMaxHeight((prev) => filteredMaxHeightForImages(filteredImages.slice(0, 9), prev))
    setPage(1)
    scrollToTop()
  }, [filteredImages, selectedFilter])

  function filteredMaxHeightForImages(
    filteredImgs: GalleryImage[],
    prevMax: {id: string; value: number}[],
  ): {id: string; value: number}[] {
    const map = new Map(prevMax.map((m) => [m.id, m.value]))
    return filteredImgs.map((img) => {
      const val = map.get(img._id)
      return {id: img._id, value: typeof val === 'number' ? val : 0}
    })
  }

  const handleImageData = useCallback(
    (
      imageId: string,
      data: {
        height: number
        naturalHeight: number
        width: number
        title: string
      },
    ) => {
      imageDataRef.current.set(imageId, data)

      // Check if all images in current view have loaded
      const allLoaded = displayedImages.every((img) => imageDataRef.current.has(img._id))
      if (allLoaded) {
        debounceMaxHeightCalculation()
      }
    },
    [displayedImages],
  )

  // Function to load more images
  const loadMoreImages = useInfiniteScroll(
    loading,
    page,
    setPage,
    setDisplayedImages,
    setLoading,
    filteredImages,
  )

  return (
    <main
      translate="no"
      className="relative flex flex-col justify-center items-center bg-black text-white w-screen h-screen p-2 sm:p-4 lg:p-8  overflow-y-scroll overflow-auto"
    >
      <Header
        socials={socials}
        setSelectedFilter={setSelectedFilter}
        style={
          'sticky text-[5vh] w-full sm:text-[5vw] lg:text-[5vh] top-0 p-5 flex items-start justify-between z-30'
        }
      />
      <section
        ref={sectionRef}
        className="relative flex w-full h-auto overflow-y-scroll lg:overscroll-none scrollbar-none pt-[5vh] sm:pt-0 lg:mt-15 max-w-[90vw] mx-auto sm:max-w-[80vw] sm:px-[1em] lg:text-[2em] lg:px-[20vh] lg:h-screen  lg:max-w-[1500px]"
        onScroll={loadMoreImages}
        style={{
          backgroundImage:
            displayedImages.length >= 6 && window.innerWidth > 1000 ? "url('/FlipMe.svg')" : '',
          backgroundAttachment: 'fixed',
          backgroundClip: 'content-box',
          backgroundOrigin: 'content-box',
        }}
      >
        <div
          className="relative z-[1] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-0 w-full"
          ref={gridRef}
        >
          {displayedImages
            .map((image, index) => ({image, index})) // Attach index to each image
            .sort((a, b) => a.index - b.index)
            .map(({image, index}) =>
              window.innerWidth < 1024 ? (
                <GalleryImageCardSmall
                  key={image._id}
                  uniqueId={index}
                  image={image}
                  setSelected={setSelected}
                />
              ) : (
                <GalleryImageCard
                  key={image._id}
                  uniqueId={index}
                  image={image}
                  cardCount={displayedImages.length}
                  setSelected={setSelected}
                  focus={focus}
                  setFocus={setFocus}
                  maxHeight={maxHeight}
                  selectedFilter={selectedFilter}
                  onImageData={handleImageData} // NEW: Pass callback instead of all state setters
                />
              ),
            )}
          {window.innerWidth > 1024 &&
            Array.from({length: extraCards(displayedImages)}).map((_, i) => (
              <div
                key={i}
                style={{
                  height: `${maxHeight.slice(-1)[0]?.value || 0}vh`,
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
        <section className="fixed flex flex-col text-[5vh] z-30 sm:top-0 justify-center w-full sm:w-[70vw] lg:px-auto h-[85vh] sm:h-screen overflow-x-scroll scrollbar-none items-start sm:items-center">
          <Slider
            items={displayedImages}
            refs={galleryRefs}
            currentIndex={selected}
            setCurrentIndex={setSelected}
            style={
              'fixed z-20 hidden sm:flex flex-row justify-between items-center h-full bg-opacity-50 bg-black w-screen'
            }
            scrolling
          />
          <Dots
            items={displayedImages}
            refs={galleryRefs}
            currentIndex={selected}
            setCurrentIndex={setSelected}
            style={
              'fixed bottom-[.2em] self-center sm:bottom-[2vh] sm:top-auto justify-self-center z-40 sm:z-20 flex gap-5 p-2 rounded-lg bg-gray-500 bg-opacity-60'
            }
          />
          <div className="relative z-30 bg-black text-white w-full sm:mx-auto mb-2 sm:mb-0 max-h-full overflow-y-hidden sm:h-[80vh] flex flex-row space-x-11 overflow-x-scroll snap-x snap-mandatory scrollbar-none items-start justify-start scroll-smooth">
            {displayedImages.map((image, index) => (
              <FocusedImageCard
                key={image._id}
                uniqueId={index}
                image={image}
                galleryRefs={galleryRefs}
                setSelected={setSelected}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default dynamic(() => Promise.resolve(Gallery), {ssr: false})

export const getStaticProps: GetStaticProps<Props> = async () => {
  const galleryImages: GalleryImage[] = await fetchGalleryImages()
  const socials: Social[] = await fetchSocials()
  return {
    props: {
      galleryImages,
      socials,
    },
    revalidate: 10,
  }
}

import {motion} from 'framer-motion'

type Props = {}

export default function BackgroundCircles({}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        scale: [1, 2, 2, 3, 1],
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
        borderRadius: ['20%', '20%', '50%', '80%', '20%'],
      }}
      transition={{
        duration: 2.5,
      }}
      className="absolute z-0 mx-auto top-[37.5dvh]"
    >
      <div className="relative flex justify-center items-center">
        <div className="absolute border border-white rounded-full h-[25dvh] w-[25dvh] animate-ping" />
        <div className="absolute border border-teal-200 opacity-20 rounded-full h-[35dvh] w-[35dvh]" />
        <div className="absolute border border-teal-200 opacity-20 rounded-full h-[55dvh] w-[55dvh]" />
        <div className="absolute border border-teal-200 opacity-20 rounded-full h-[70dvh] w-[70dvh] animate-pulse" />
        <div className="absolute border border-teal-200 rounded-full h-[85dvh] w-[85dvh]" />
      </div>
    </motion.div>
  )
}

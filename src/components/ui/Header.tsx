import React from 'react'
import {useRouter} from 'next/router'
import {
  FaLinkedinIn,
  FaFacebookF,
  FaCameraRetro,
  FaHome,
  FaEnvelope,
  FaBookDead,
} from 'react-icons/fa'
import {IconContext} from 'react-icons'
import {motion} from 'framer-motion'
import Link from 'next/link'
import {Social} from '../../types'
import DropDownFilter from '../Gallery/DropDownFilter'

type Props = {
  socials: Social[]
  setSelectedFilter: any
  style: string
}

function Header({socials, setSelectedFilter, style}: Props) {
  const router = useRouter()

  // Define the icon map for general use
  const iconMap: {[key: string]: React.ElementType} = {
    FaLinkedinIn: FaLinkedinIn,
    FaFacebookF: FaFacebookF,
    FaCameraRetro: FaCameraRetro,
    FaHome: FaHome,
    FaBookDead: FaBookDead,
  }
  return (
    <header className={style}>
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row space-x-2 items-center"
      >
        {socials
          .sort((a, b) => a.position - b.position)
          .filter((social) => {
            const taggie = () => {
              if (router.pathname === '/') {
                return 'FaHome'
              } else if (router.pathname.includes('gallery')) {
                return 'FaCameraRetro'
              } else if (router.pathname.includes('captainsLog')) {
                return 'FaBookDead'
              } else {
                return
              }
            }
            // router.pathname === "/" ? "FaHome" : "FaCameraRetro";
            return social.tag != taggie()
          })
          .map((social) => {
            let IconComponent = iconMap[social.tag]
            return (
              <Link key={social._id} href={social.slug?.current ?? '/'} className="social-icon">
                <IconContext.Provider
                  value={{
                    className: 'h-[75%]',
                  }}
                >
                  <IconComponent />
                </IconContext.Provider>
              </Link>
            )
          })}
      </motion.div>
      <motion.div
        initial={{
          x: 500,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row items-center text-gray-300 cursor-pointer space-x-4"
      >
        {router.pathname.includes('gallery') && (
          <DropDownFilter setSelectedFilter={setSelectedFilter} />
        )}
        <Link href="/#contact" className="social-icon">
          <IconContext.Provider
            value={{
              className: 'h-[75%]',
            }}
          >
            <FaEnvelope />
          </IconContext.Provider>
        </Link>
        <Link
          href="/#contact"
          className="uppercase pl-2 hidden lg:inline-flex text-[.5em] text-gray-400 hover:text-yellow-500"
        >
          get in touch
        </Link>
      </motion.div>
    </header>
  )
}

export default Header

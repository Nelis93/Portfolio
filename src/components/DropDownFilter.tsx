import React, { useState } from 'react'
import { motion } from 'framer-motion'
import DropDownButton from './DropDownButton';

type Props = {
    selectedFilter: any,
    setSelectedFilter: any
}
export default function DropDownFilter({selectedFilter, setSelectedFilter}: Props) {
    const [ isOpen, setIsOpen ] = useState(false)
    const [isLeftMenu, setIsLefMenu] = useState(false);
    const selectListItem = (event: any) => {
        console.log(event.target.innerText)
        setSelectedFilter((current: any) => {
            if(!current.includes(event.target.innerText)){
                event.target.classList.add('bg-white', 'text-black')
                return [...current, event.target.innerText]
            }
            event.target.classList.remove('bg-white', 'text-black')
            console.log(current.filter((item: any) => item == event.target.innnerText))
            return current.filter((item: Text) => item !== event.target.innnerText) 
        })
        console.log(selectedFilter)
    }
    const leftMenu = [
        "Accessory",
        "Beanie",
        "Hoodie",
        "Long Sleeve",
        "Shirt",
        "Shorts"
    ];
    const rightMenu = ["Small", "Medium", "Large", "X Large", "XX Large"];
    const toggleMenu = () => {
        setIsLefMenu((current)=> !current)
    }
    const slideVerticalAnimation = {
      open: {
        rotateX: 0,
        y: -50,
        x: -200,
        opacity: 1,
        transition: {
          duration: 0.3,
          mass: 0.8,
          type: "spring"
        },
        display: "block"
      },
      close: {
        rotateX: -15,
        x: -200,
        y: -320,
        opacity: 0,
        transition: {
          duration: 0.3
        },
        transitionEnd: {
          display: "none"
        }
      }
    };
    
    const slideHorizontalAnimation = {
     left: {
        x: 0,
        transition: {
          duration: 0.3
        }
      },
      right: {
        x: "-5em",
        transition: {
            duration: 0.3
        }}
};
    return (
    <div className="relative z-50 w-auto">

      <DropDownButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <motion.div
        className="rounded-md shadow-md overflow-x-hidden absolute h-auto w-[5em] z-40 overflow-y-hidden border-2 border-white bg-black"
        initial="close"
        animate={isOpen ? "open" : "close"}
        variants={slideVerticalAnimation}
        style={{
            transition: "height 0.5s"
        }
        }
      >
        <motion.div
          className="flex items-start h-full relative w-[10em]"
          initial="left"
          animate={isLeftMenu ? "left" : "right"}
          variants={slideHorizontalAnimation}
          style={{
            transition: "height 0.5s"
            }}
        >
          <motion.div className="flex flex-col text-[.7em] h-full relative w-[50%]"
          >
            <h4 onClick={toggleMenu} 
            className='cursor-pointer m-0 py-[.5em] text-center hover:text-black hover:bg-white'
            style={{
                transition: "color, background-color",
                transitionDuration: ".2s"
            }}
            >DATES &#8594;</h4>
            <ul className="item-list list-none flex flex-1 flex-col justify-around">
              {leftMenu.map((text, i) => (
                <li 
                key={i} 
                className="item flex-1 text-center cursor-pointer hover:bg-white hover:text-black"
                style={{
                    transition: "color, background-color",
                    transitionDuration: ".2s"
                }}
                onClick={selectListItem}>

                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div className="flex flex-col text-[.7em] h-full relative w-[50%]" >
            <h4 onClick={toggleMenu} 
            className='fill-white cursor-pointer m-0 py-[.5em] text-center hover:text-black hover:bg-white'
            style={{
                transition: "color, background-color",
                transitionDuration: ".2s"
            }}
            >&#8592; COUNTRY</h4>
            <ul 
              className="item-list list-none flex flex-1 flex-col justify-around">
              {rightMenu.map((text, i) => (
                <li key={i} className="item flex-1 text-center cursor-pointer hover:bg-white hover:text-black"
                style={{
                    transition: "color, background-color",
                    transitionDuration: ".2s"
                }}>
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
    )
}

    
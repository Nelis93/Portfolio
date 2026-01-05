import React from 'react'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DropDownButton({isOpen, setIsOpen}: Props) {
  const Path = ({d, style}: {d: string; style?: React.CSSProperties}) => {
    return (
      <path fill="black" strokeWidth="3" stroke="black" strokeLinecap="round" d={d} style={style} />
    )
  }

  const clicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target)
    setIsOpen((current) => !current)
  }

  return (
    <button
      className={`flex flex-row justify-center items-center bg-gray-500 hover:bg-white rounded-[50%] h-full w-full`}
      onClick={clicked}
      style={{
        transition: 'all 0.3s ease',
        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
      }}
    >
      <div className="absolute w-full h-full z-20 bg-transparent"></div>
      <svg
        width="50"
        height="50"
        style={{color: 'gray', borderRadius: '50px', padding: '4px'}}
        viewBox="-5 -5 30 30"
      >
        <Path d={isOpen ? 'M 3 16.5 L 17 2.5' : 'M 2 2.5 L 20 2.5'} />
        <Path
          d="M 2 9.423 L 20 9.423"
          style={{opacity: isOpen ? 0 : 1, transition: 'opacity 0.3s ease'}}
        />
        <Path d={isOpen ? 'M 3 2.5 L 17 16.346' : 'M 2 16.346 L 20 16.346'} />
      </svg>
    </button>
  )
}

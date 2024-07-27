import React from 'react'
import classNames from 'classnames'

const keyMap: { [key: string]: string } = {
  'q': 'left-pinky', 'w': 'left-ring', 'e': 'left-middle', 'r': 'left-index', 't': 'left-index',
  'y': 'right-index', 'u': 'right-index', 'i': 'right-middle', 'o': 'right-ring', 'p': 'right-pinky',
  'a': 'left-pinky', 's': 'left-ring', 'd': 'left-middle', 'f': 'left-index', 'g': 'left-index',
  'h': 'right-index', 'j': 'right-index', 'k': 'right-middle', 'l': 'right-ring', ';': 'right-pinky',
  'z': 'left-pinky', 'x': 'left-ring', 'c': 'left-middle', 'v': 'left-index', 'b': 'left-index',
  'n': 'right-index', 'm': 'right-index', ',': 'right-middle', '.': 'right-ring', '/': 'right-pinky',
  ' ': 'none' // Spacebar is not finger-specific
}

const fingerColors: { [key: string]: string } = {
  'left-pinky': 'bg-red-600', 'left-ring': 'bg-orange-600',
  'left-middle': 'bg-yellow-600', 'left-index': 'bg-green-600',
  'right-index': 'bg-blue-600', 'right-middle': 'bg-indigo-600',
  'right-ring': 'bg-purple-600', 'right-pinky': 'bg-pink-600',
  'none': 'bg-cyan-950'
}

interface KeyboardProps {
  pressedKey: string
}

const Keyboard: React.FC<KeyboardProps> = ({ pressedKey }) => {
  const renderKey = (key: string) => {
    const finger = keyMap[key.toLowerCase()]
    const colorClass = finger ? fingerColors[finger] : 'bg-gray-700'
    const isPressed = key.toLowerCase() === pressedKey.toLowerCase()

    //space bar should be wider than other keys
    const widthClass = key === ' ' ? 'w-36' : 'w-12'

    return (
        <div
        key={key}
        className={classNames(
          'flex items-center justify-center h-12 m-1 rounded',
          widthClass,
          colorClass,
          { 'border-2 border-white': isPressed }
        )}
      >
        {key}
      </div>
    )
  }

  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
    [' '] // Spacebar row
  ]

  return (
    <div className="flex flex-col items-center p-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map(renderKey)}
        </div>
      ))}
    </div>
  )
}

export default Keyboard

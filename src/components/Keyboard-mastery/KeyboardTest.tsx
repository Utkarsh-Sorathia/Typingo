import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faKeyboard } from '@fortawesome/free-solid-svg-icons'

const fingerMap: Record<string, string> = {
  '~': 'Left Pinky',
  '1': 'Left Pinky',
  '2': 'Left Ring',
  '3': 'Left Middle',
  '4': 'Left Index',
  '5': 'Left Index',
  '6': 'Right Index',
  '7': 'Right Index',
  '8': 'Right Middle',
  '9': 'Right Ring',
  '0': 'Right Pinky',
  '-': 'Right Pinky',
  '=': 'Right Pinky',
  Backspace: 'Right Pinky',
  Tab: 'Left Pinky',
  Q: 'Left Pinky',
  W: 'Left Ring',
  E: 'Left Middle',
  R: 'Left Index',
  T: 'Left Index',
  Y: 'Right Index',
  U: 'Right Index',
  I: 'Right Middle',
  O: 'Right Ring',
  P: 'Right Pinky',
  '[': 'Right Pinky',
  ']': 'Right Pinky',
  '\\': 'Right Pinky',
  'Caps Lock': 'Left Pinky',
  A: 'Left Pinky',
  S: 'Left Ring',
  D: 'Left Middle',
  F: 'Left Index',
  G: 'Left Index',
  H: 'Right Index',
  J: 'Right Index',
  K: 'Right Middle',
  L: 'Right Ring',
  ';': 'Right Pinky',
  "'": 'Right Pinky',
  Enter: 'Right Pinky',
  ShiftL: 'Left Pinky',
  Z: 'Left Pinky',
  X: 'Left Ring',
  C: 'Left Middle',
  V: 'Left Index',
  B: 'Left Index',
  N: 'Right Index',
  M: 'Right Index',
  ',': 'Right Middle',
  '.': 'Right Ring',
  '/': 'Right Pinky',
  ShiftR: 'Right Pinky',
  Space: 'Thumbs',
  Ctrl: 'Left/Right Pinky',
  Alt: 'Left/Right Thumb',
  Win: 'Left/Right Pinky',
  Fn: 'Left/Right Pinky',
}

const keyboardRows = [
  [
    { label: 'Esc', code: 'Escape' },
    { label: 'F1', code: 'F1' },
    { label: 'F2', code: 'F2' },
    { label: 'F3', code: 'F3' },
    { label: 'F4', code: 'F4' },
    { label: 'F5', code: 'F5' },
    { label: 'F6', code: 'F6' },
    { label: 'F7', code: 'F7' },
    { label: 'F8', code: 'F8' },
    { label: 'F9', code: 'F9' },
    { label: 'F10', code: 'F10' },
    { label: 'F11', code: 'F11' },
    { label: 'F12', code: 'F12' },
  ],
  [
    { label: '~', code: 'Backquote' },
    { label: '1', code: 'Digit1' },
    { label: '2', code: 'Digit2' },
    { label: '3', code: 'Digit3' },
    { label: '4', code: 'Digit4' },
    { label: '5', code: 'Digit5' },
    { label: '6', code: 'Digit6' },
    { label: '7', code: 'Digit7' },
    { label: '8', code: 'Digit8' },
    { label: '9', code: 'Digit9' },
    { label: '0', code: 'Digit0' },
    { label: '-', code: 'Minus' },
    { label: '=', code: 'Equal' },
    { label: 'Backspace', code: 'Backspace', wide: true },
  ],
  [
    { label: 'Tab', code: 'Tab', wide: true },
    { label: 'Q', code: 'KeyQ' },
    { label: 'W', code: 'KeyW' },
    { label: 'E', code: 'KeyE' },
    { label: 'R', code: 'KeyR' },
    { label: 'T', code: 'KeyT' },
    { label: 'Y', code: 'KeyY' },
    { label: 'U', code: 'KeyU' },
    { label: 'I', code: 'KeyI' },
    { label: 'O', code: 'KeyO' },
    { label: 'P', code: 'KeyP' },
    { label: '[', code: 'BracketLeft' },
    { label: ']', code: 'BracketRight' },
    { label: '\\', code: 'Backslash', wide: true },
  ],
  [
    { label: 'Caps Lock', code: 'CapsLock', wide: true },
    { label: 'A', code: 'KeyA' },
    { label: 'S', code: 'KeyS' },
    { label: 'D', code: 'KeyD' },
    { label: 'F', code: 'KeyF' },
    { label: 'G', code: 'KeyG' },
    { label: 'H', code: 'KeyH' },
    { label: 'J', code: 'KeyJ' },
    { label: 'K', code: 'KeyK' },
    { label: 'L', code: 'KeyL' },
    { label: ';', code: 'Semicolon' },
    { label: "'", code: 'Quote' },
    { label: 'Enter', code: 'Enter', wide: true },
  ],
  [
    { label: 'Shift', code: 'ShiftLeft', wide: true },
    { label: 'Z', code: 'KeyZ' },
    { label: 'X', code: 'KeyX' },
    { label: 'C', code: 'KeyC' },
    { label: 'V', code: 'KeyV' },
    { label: 'B', code: 'KeyB' },
    { label: 'N', code: 'KeyN' },
    { label: 'M', code: 'KeyM' },
    { label: ',', code: 'Comma' },
    { label: '.', code: 'Period' },
    { label: '/', code: 'Slash' },
    { label: 'Shift', code: 'ShiftRight', wide: true },
  ],
  [
    { label: 'Ctrl', code: 'ControlLeft' },
    { label: 'Win', code: 'MetaLeft' },
    { label: 'Alt', code: 'AltLeft' },
    { label: 'Space', code: 'Space', space: true },
    { label: 'Alt', code: 'AltRight' },
    { label: 'Menu', code: 'ContextMenu' },
    { label: 'Ctrl', code: 'ControlRight' },
  ],
]

const navKeys = [
  [
    { label: 'Print', code: 'PrintScreen', small: true },
    { label: 'Scroll', code: 'ScrollLock', small: true },
    { label: 'Pause', code: 'Pause', small: true },
  ],
  [
    { label: 'Inse', code: 'Insert', small: true },
    { label: 'Hom', code: 'Home', small: true },
    { label: 'PgUp', code: 'PageUp', small: true },
  ],
  [
    { label: 'Dele', code: 'Delete', small: true },
    { label: 'End', code: 'End', small: true },
    { label: 'PgDn', code: 'PageDown', small: true },
  ],
]

const arrowKeys = [
  [
    { label: '', code: 'EmptyArrow1', empty: true },
    { label: '↑', code: 'ArrowUp', small: true },
    { label: '', code: 'EmptyArrow2', empty: true },
  ],
  [
    { label: '←', code: 'ArrowLeft', small: true },
    { label: '↓', code: 'ArrowDown', small: true },
    { label: '→', code: 'ArrowRight', small: true },
  ],
]

const numpadRows = [
  [
    { label: 'Num', code: 'NumLock', small: true },
    { label: '/', code: 'NumpadDivide', small: true },
    { label: '*', code: 'NumpadMultiply', small: true },
  ],
  [
    { label: '7', code: 'Numpad7' },
    { label: '8', code: 'Numpad8' },
    { label: '9', code: 'Numpad9' },
  ],
  [
    { label: '4', code: 'Numpad4' },
    { label: '5', code: 'Numpad5' },
    { label: '6', code: 'Numpad6' },
  ],
  [
    { label: '1', code: 'Numpad1' },
    { label: '2', code: 'Numpad2' },
    { label: '3', code: 'Numpad3' },
  ],
  [
    { label: '0', code: 'Numpad0', wide: true },
    { label: '.', code: 'NumpadDecimal' },
  ],
]

const numpadRightColumn = [
  { label: '-', code: 'NumpadSubtract', small: true },
  { label: '+', code: 'NumpadAdd', tall: true },
  { label: 'Enter', code: 'NumpadEnter', tall: true },
]

export default function KeyboardLearning() {
  const [pressedKey, setPressedKey] = useState<string | null>(null)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setEnabled(false)
        setPressedKey(null)
        return
      }
      
      e.preventDefault()
      e.stopPropagation()
      setPressedKey(e.code)
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setPressedKey(null)
    }
    window.addEventListener('keydown', handleKeyDown, true)
    window.addEventListener('keyup', handleKeyUp, true)
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true)
      window.removeEventListener('keyup', handleKeyUp, true)
    }
  }, [enabled])

  const getFingerHint = (label: string, code: string) => {
    if (label === 'Shift' && code === 'ShiftLeft') return 'Left Pinky'
    if (label === 'Shift' && code === 'ShiftRight') return 'Right Pinky'
    if (label === '' || label === undefined) return ''
    if (label === ' ') return 'Thumbs'
    if (label === 'Space') return 'Thumbs'
    return fingerMap[label] || ''
  }

  return (
    <section className="max-w-7xl mx-auto mt-4 px-2 sm:px-4 overflow-x-hidden">
      <Helmet>
        <title>Typingo | Keyboard Mastery</title>
        <meta name="description" content="Learn proper finger placement and typing technique with our interactive keyboard visualization and practice tool." />
        <meta name="keywords" content="typing, keyboard, practice, finger placement, touch typing, learn typing, typing visualization" />
        <meta property="og:title" content="Keyboard Mastery" />
        <meta property="og:description" content="Interactive keyboard visualization for learning proper finger placement and typing skills." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://typingo.vercel.app/keyboard-mastery" />
        <meta property="og:image" content="https://typingo.vercel.app/keyboard-mastery-og-image.png" />
        <meta property="og:site_name" content="Typingo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Keyboard Mastery | Typingo" />
        <meta name="twitter:description" content="Interactive keyboard visualization for learning proper finger placement and typing skills." />
        <meta name="twitter:image" content="https://typingo.vercel.app/keyboard-mastery-og-image.png" />
        <link rel="canonical" href="https://typingo.vercel.app/keyboard-mastery" />
      </Helmet>

      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex flex-col sm:flex-row items-center justify-center">
          <FontAwesomeIcon icon={faKeyboard} className="text-indigo-500 mr-0 sm:mr-4 mb-2 sm:mb-0" />
          <span className="font-bold gradient-text bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 p-2">
            Keyboard Mastery
          </span>
          <FontAwesomeIcon icon={faBolt} className="text-yellow-400 ml-0 sm:ml-4 mt-2 sm:mt-0" />
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">
          Learn proper finger placement and technique with our interactive keyboard visualization.
        </p>
      </div>

      {isMobile ? (
        <div className="flex flex-col items-center justify-center mt-8 mb-8 px-4">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl shadow-lg p-6 sm:p-8 max-w-2xl w-full">
            <div className="text-center">
              <FontAwesomeIcon icon={faKeyboard} className="text-yellow-500 text-4xl sm:text-5xl mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                Not Available on Mobile Devices
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed">
                The Keyboard Mastery feature is designed for desktop and tablet devices with physical keyboards. 
                Please access this page from a larger screen to practice your typing skills.
              </p>
              <p className="text-sm sm:text-base text-gray-500">
                Minimum screen width required: 768px
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-4 mb-8 w-full">
        <div className="bg-white border-2 border-gray-200 rounded-xl shadow-xl p-4 sm:p-5 transition-all hover:shadow-2xl w-full overflow-x-auto">
          <div className="flex flex-row justify-center gap-1.5 items-start" style={{ minWidth: 'max-content' }}>
          <div className="space-y-1 min-w-[330px] sm:min-w-[unset] flex-shrink-0">
            {keyboardRows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex gap-0.5">
                {row.map((key, keyIdx) => {
                  if ('empty' in key && key.empty)
                    return <div key={keyIdx} className="w-4 sm:w-6 h-8 sm:h-10" />
                  if ('space' in key && key.space)
                    return (
                      <>
                        <div key={`spacer-${keyIdx}-1`} className="w-0.1" />
                      <div
                        key={keyIdx}
                          className={`keyboard-key border-2 border-gray-300 rounded-sm px-20 sm:px-32 md:px-40 py-1 flex items-center justify-center font-medium relative transition-all duration-150 ${!enabled ? 'opacity-50 pointer-events-none select-none' : 'hover:border-indigo-400 hover:shadow-md'
                            } ${enabled && pressedKey === 'Space' ? 'bg-indigo-400 border-indigo-500 shadow-inner' : 'bg-white shadow-sm'}`}
                          tabIndex={-1}
                          onMouseEnter={() => enabled && setHoveredKey('Space')}
                          onMouseLeave={() => enabled && setHoveredKey(null)}
                        >
                          Space
                          {hoveredKey === 'Space' && enabled && (
                            <span className="absolute mt-12 sm:mt-16 px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg shadow-xl z-50 font-medium animate-fade-in">
                              {getFingerHint('Space', 'Space')}
                            </span>
                          )}
                        </div>
                        <div key={`spacer-${keyIdx}-2`} className="w-0.1" />
                      </>
                    )
                  const isPressed = enabled && pressedKey === key.code
                  const isHovered =
                    enabled && (hoveredKey === key.label || hoveredKey === key.code)
                  const bgColor = isPressed
                    ? 'bg-indigo-400 border-indigo-500 shadow-inner'
                    : 'bg-white shadow-sm'
                  const borderColor = isPressed
                    ? 'border-indigo-500'
                    : isHovered && enabled
                      ? 'border-indigo-400'
                      : 'border-gray-300'
                  const needsSpacerBeforeBackspace = key.label === 'Backspace'
                  const needsSpacerBeforeBackslash = key.label === '\\'
                  const needsSpacerAfter = key.label === 'Esc' && rowIdx === 0
                  const needsSpacerAfterF4 = key.label === 'F4' && rowIdx === 0
                  const needsSpacerAfterF8 = key.label === 'F8' && rowIdx === 0
                  
                  return (
                    <>
                      {needsSpacerBeforeBackspace && <div className="w-1.5 sm:w-2" />}
                      {needsSpacerBeforeBackslash && <div className="w-0.5 sm:w-0.5" />}
                      <div
                        key={keyIdx}
                        className={`keyboard-key border-2 ${borderColor} rounded-sm flex items-center justify-center font-medium relative select-none py-1 transition-all duration-150
                          ${'wide' in key && key.wide ? 'px-10' : 'px-4'}
                          ${'small' in key && key.small ? 'px-2 text-xs' : ''}
                          ${key.label === 'Tab' ? 'px-10' : ''}
                          ${key.label === '\\' ? 'px-10' : ''}
                          ${key.label === 'Caps Lock' ? 'px-10' : ''}
                          ${key.label === 'Enter' ? 'px-12' : ''}
                          ${key.label === 'Shift' && key.code === 'ShiftLeft' ? 'px-14' : ''}
                          ${key.label === 'Shift' && key.code === 'ShiftRight' ? 'px-14' : ''}
                          ${key.label === 'Esc' ? 'px-4' : ''}
                          ${key.label.startsWith('F') ? 'px-4 text-xs' : ''}
                          ${key.label === 'Ctrl' ? 'px-4' : ''}
                          ${key.label === 'Win' ? 'px-4' : ''}
                          ${key.label === 'Alt' ? 'px-4' : ''}
                          ${key.label === 'Menu' ? 'px-4' : ''}
                          ${bgColor} text-gray-900 ${!enabled ? 'opacity-50 pointer-events-none select-none' : enabled ? 'hover:border-indigo-400 hover:shadow-md cursor-pointer' : ''}
                        `}
                        tabIndex={-1}
                        onMouseEnter={() => enabled && setHoveredKey(key.label)}
                        onMouseLeave={() => enabled && setHoveredKey(null)}
                      >
                        <span>
                          {key.label === 'Caps Lock' ? 'Caps' : key.label}
                        </span>
                        {(key.label === 'F' || key.label === 'J') && (
                          <span className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-black" />
                        )}
                        {isHovered && (
                          <span className="absolute mt-12 sm:mt-16 px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg shadow-xl z-50 font-medium animate-fade-in">
                            {getFingerHint(key.label, key.code)}
                          </span>
                        )}
                      </div>
                      {needsSpacerAfter && <div className="w-4 sm:w-6" />}
                      {needsSpacerAfterF4 && <div className="w-5 sm:w-6" />}
                      {needsSpacerAfterF8 && <div className="w-5 sm:w-6" />}
                    </>
                  )
                })}
              </div>
            ))}
          </div>

          <div className="flex-shrink-0">
            {navKeys.map((row, rowIdx) => (
              <div key={rowIdx} className={`flex justify-center gap-0.5 ${rowIdx === 0 ? 'pb-0.5' : rowIdx === navKeys.length - 1 ? 'py-1' : 'pb-0.5 py-1'}`}>
                {row.map((key, keyIdx) => {
                  const isPressed = enabled && pressedKey === key.code
                  const isHovered = enabled && (hoveredKey === key.label || hoveredKey === key.code)
                  const bgColor = isPressed ? 'bg-indigo-400 border-indigo-500 shadow-inner' : 'bg-white shadow-sm'
                  const borderColor = isPressed
                    ? 'border-indigo-500'
                    : isHovered && enabled
                      ? 'border-indigo-400'
                      : 'border-gray-300'

                  return (
                    <div
                      key={keyIdx}
                      className={`keyboard-key border-2 ${borderColor} rounded-sm px-2 py-1 text-xs flex items-center justify-center font-medium relative select-none transition-all duration-150
                        ${bgColor} text-gray-900 ${!enabled ? 'opacity-50 pointer-events-none select-none' : enabled ? 'hover:border-indigo-400 hover:shadow-md cursor-pointer' : ''}
                      `}
                      tabIndex={-1}
                      onMouseEnter={() => enabled && setHoveredKey(key.label)}
                      onMouseLeave={() => enabled && setHoveredKey(null)}
                    >
                      <span>{key.label}</span>
                      {isHovered && (
                        <span className="absolute mt-12 sm:mt-16 px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg shadow-xl z-50 font-medium animate-fade-in">
                          Navigation
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
            
            <div className="pt-14 sm:pt-14 mt-1">
              {arrowKeys.map((row, rowIdx) => (
                <div key={rowIdx} className={`flex justify-center gap-0.5 ${rowIdx === 0 ? 'pb-0.5' : ''}`}>
                  {row.map((key, keyIdx) => {
                    if ('empty' in key && key.empty)
                      return <div key={keyIdx} className="w-6 sm:w-8 h-8 sm:h-10" />
                    const isPressed = enabled && pressedKey === key.code
                    const isHovered = enabled && (hoveredKey === key.label || hoveredKey === key.code)
                    const bgColor = isPressed ? 'bg-indigo-400 border-indigo-500 shadow-inner' : 'bg-white shadow-sm'
                    const borderColor = isPressed
                      ? 'border-indigo-500'
                      : isHovered && enabled
                        ? 'border-indigo-400'
                        : 'border-gray-300'

                    return (
                      <div
                        key={keyIdx}
                        className={`keyboard-key border-2 ${borderColor} rounded-sm px-4 py-1 text-xs flex items-center justify-center font-medium relative select-none transition-all duration-150
                          ${bgColor} text-gray-900 ${!enabled ? 'opacity-50 pointer-events-none select-none' : enabled ? 'hover:border-indigo-400 hover:shadow-md cursor-pointer' : ''}
                        `}
                        tabIndex={-1}
                        onMouseEnter={() => enabled && setHoveredKey(key.label)}
                        onMouseLeave={() => enabled && setHoveredKey(null)}
                      >
                        <span>{key.label}</span>
                        {isHovered && (
                          <span className="absolute mt-12 sm:mt-16 px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg shadow-xl z-50 font-medium animate-fade-in">
                            Arrow Key
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-shrink-0 gap-1">
            <div className="space-y-1">
              {numpadRows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex gap-0.5">
                  {row.map((key, keyIdx) => {
                    const isPressed = enabled && pressedKey === key.code
                    const isHovered = enabled && (hoveredKey === key.label || hoveredKey === key.code)
                    const baseColor = 
                      key.label === 'Num' || key.label === '/' || key.label === '*'
                        ? 'bg-gray-100'
                        : 'bg-white'
                    const bgColor = isPressed ? 'bg-indigo-400 border-indigo-500 shadow-inner' : baseColor === 'bg-gray-100' ? 'bg-gray-100 shadow-sm' : 'bg-white shadow-sm'
                    const borderColor = isPressed
                      ? 'border-indigo-500'
                      : isHovered && enabled
                        ? 'border-indigo-400'
                        : 'border-gray-300'

                    return (
                      <div
                        key={keyIdx}
                        className={`keyboard-key border-2 ${borderColor} rounded-sm flex items-center justify-center font-medium relative select-none transition-all duration-150
                          ${'wide' in key && key.wide ? 'px-10' : 'px-4'}
                          ${'small' in key && key.small ? 'text-xs' : ''}
                          py-2
                          ${bgColor} text-gray-900 ${!enabled ? 'opacity-50 pointer-events-none select-none' : enabled ? 'hover:border-indigo-400 hover:shadow-md cursor-pointer' : ''}
                        `}
                        tabIndex={-1}
                        onMouseEnter={() => enabled && setHoveredKey(key.label)}
                        onMouseLeave={() => enabled && setHoveredKey(null)}
                      >
                        <span>{key.label}</span>
                        {isHovered && (
                          <span className="absolute mt-12 sm:mt-16 px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg shadow-xl z-50 font-medium animate-fade-in">
                            Number Pad
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
            
            <div className="flex flex-col justify-center gap-1">
            {numpadRightColumn.map((key, keyIdx) => {
              const isPressed = enabled && pressedKey === key.code
              const isHovered = enabled && (hoveredKey === key.label || hoveredKey === key.code)
              const bgColor = isPressed ? 'bg-indigo-400 border-indigo-500 shadow-inner' : 'bg-gray-100 shadow-sm'
              const borderColor = isPressed
                ? 'border-indigo-500'
                : isHovered && enabled
                  ? 'border-indigo-400'
                  : 'border-gray-300'
              const isTall = 'tall' in key && key.tall

              return (
                <div
                  key={keyIdx}
                  className={`keyboard-key border-2 ${borderColor} rounded-sm flex items-center justify-center font-medium relative select-none transition-all duration-150
                    ${isTall && key.label === '+' ? 'py-8' : isTall && key.label === 'Enter' ? 'py-7' : 'py-2'}
                    ${'small' in key && key.small ? 'px-2 text-xs' : ''}
                    ${bgColor} text-gray-900 ${!enabled ? 'opacity-50 pointer-events-none select-none' : enabled ? 'hover:border-indigo-400 hover:shadow-md cursor-pointer' : ''}
                  `}
                  tabIndex={-1}
                  onMouseEnter={() => enabled && setHoveredKey(key.label)}
                  onMouseLeave={() => enabled && setHoveredKey(null)}
                >
                  <span>{key.label}</span>
                  {isHovered && (
                    <span className="absolute mt-12 sm:mt-16 px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg shadow-xl z-50 font-medium animate-fade-in">
                      Number Pad
                    </span>
                  )}
                </div>
              )
            })}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6 w-full">
          <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
            Hover over keys to see proper finger placement. Home keys (F and J) have tactile markers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              className={`bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${enabled ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              onClick={() => {
                if (!enabled) {
                  setEnabled(true)
                }
              }}
              disabled={enabled}
            >
              <FontAwesomeIcon icon={faKeyboard} className="mr-2" /> Start Practice
            </button>
            <button
              className={`bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${!enabled ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              onClick={() => {
                if (enabled) {
                  setEnabled(false)
                }
              }}
              disabled={!enabled}
            >
              <FontAwesomeIcon icon={faKeyboard} className="mr-2" /> Stop Practice
            </button>
          </div>
        </div>
      </div>
      </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </section>
  )
}


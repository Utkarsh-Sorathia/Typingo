import { faBolt, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import {
  FaStopwatch,
  FaTachometerAlt,
  FaBullseye,
  FaTimesCircle,
  FaRedo,
  FaSyncAlt,
} from 'react-icons/fa'

const DURATIONS = [15, 30, 60, 90] as const
type Duration = typeof DURATIONS[number]

const fallbackText =
  'The quick brown fox jumps over the lazy dog. This sentence contains all letters of the alphabet. Typing regularly improves your speed and accuracy. Practice makes perfect in the world of typing tests.'

async function fetchRandomWords(count: number): Promise<string> {
  try {
    const response = await fetch(
      `https://random-word-api.vercel.app/api?words=${count}`,
    )
    const words = await response.json()
    const wordString = Array.isArray(words) && words.length > 0 ? words.join(' ') : fallbackText
    return wordString || fallbackText
  } catch {
    return fallbackText
  }
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

const TypingSpeedTest: React.FC = () => {
  const [testDuration, setTestDuration] = useState<Duration>(30)
  const [timeLeft, setTimeLeft] = useState<number>(30)
  const [testText, setTestText] = useState<string>('')
  const [userInput, setUserInput] = useState<string>('')
  const [testStarted, setTestStarted] = useState<boolean>(false)
  const [wpm, setWpm] = useState<number>(0)
  const [accuracy, setAccuracy] = useState<number>(100)
  const [errors, setErrors] = useState<number>(0)
  const [testCompleted, setTestCompleted] = useState<boolean>(false)
  const [lastTestText, setLastTestText] = useState<string>('')
  const [visibleChars, setVisibleChars] = useState<number>(150)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)

  // Load words on mount and focus input
  useEffect(() => {
    if (!testText) {
      fetchRandomWords(testDuration > 30 ? 150 : 100).then((text) => {
        setTestText(text || fallbackText)
        setLastTestText(text || fallbackText)
      })
    }
    // Auto-focus input on mount
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle duration change
  const handleSelectDuration = async (duration: Duration) => {
    setTestDuration(duration)
    setTimeLeft(duration)
    setUserInput('')
    setTestStarted(false)
    setWpm(0)
    setAccuracy(100)
    setErrors(0)
    setTestCompleted(false)
    setVisibleChars(150)
    
    // Fetch words immediately when duration is selected
    // More words for longer durations to accommodate fast typers
    const wordCount = duration > 60 ? 200 : duration > 30 ? 150 : 100
    const text = await fetchRandomWords(wordCount)
    setTestText(text || fallbackText)
    setLastTestText(text || fallbackText)
  }

  // Start test
  const startTest = async () => {
    if (testStarted) return

    // If no text exists, fetch it (fallback case)
    if (!testText) {
      const wordCount = testDuration > 60 ? 200 : testDuration > 30 ? 150 : 100
      const text = await fetchRandomWords(wordCount)
      setTestText(text || fallbackText)
      setLastTestText(text || fallbackText)
    }
    setUserInput('')
    setTimeLeft(testDuration)
    setWpm(0)
    setAccuracy(100)
    setErrors(0)
    setTestCompleted(false)
    setVisibleChars(150)
    setTestStarted(true)
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }

  // Try again
  const tryAgainTest = () => {
    setTestText(lastTestText)
    setUserInput('')
    setTimeLeft(testDuration)
    setTestStarted(false)
    setWpm(0)
    setAccuracy(100)
    setErrors(0)
    setTestCompleted(false)
    setVisibleChars(150)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  // New test
  const newTest = async () => {
    const wordCount = testDuration > 60 ? 200 : testDuration > 30 ? 150 : 100
    const text = await fetchRandomWords(wordCount)
    setTestText(text || fallbackText)
    setLastTestText(text || fallbackText)
    setUserInput('')
    setTimeLeft(testDuration)
    setTestStarted(false)
    setWpm(0)
    setAccuracy(100)
    setErrors(0)
    setTestCompleted(false)
    setVisibleChars(150)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  // Focus input when test starts
  useEffect(() => {
    if (testStarted && inputRef.current) {
      // Small delay to ensure input is enabled
      const timeoutId = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 50)
      return () => clearTimeout(timeoutId)
    }
  }, [testStarted])

  // Timer effect
  useEffect(() => {
    if (!testStarted) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTestStarted(false)
          setTestCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [testStarted])

  // Calculate stats and update visible text
  useEffect(() => {
    const correctChars = [...userInput].filter((ch, i) => ch === testText[i])
      .length
    const totalTyped = userInput.length
    const newErrors = Math.max(totalTyped - correctChars, 0)
    setErrors(newErrors)
    setAccuracy(
      totalTyped === 0 ? 100 : Math.round((correctChars / totalTyped) * 100),
    )
    const words = userInput.trim().length / 5
    const minutesElapsed = (testDuration - timeLeft) / 60
    setWpm(minutesElapsed > 0 ? Math.round(words / minutesElapsed) : 0)

    // Progressive text display: show more as user types
    // Show 3 lines worth (~150 chars) initially, reveal more when user reaches 70% of visible
    if (testStarted && testText) {
      const threshold = Math.floor(visibleChars * 0.7)
      if (totalTyped >= threshold && visibleChars < testText.length) {
        setVisibleChars(Math.min(visibleChars + 150, testText.length))
      }
    }
  }, [userInput, testText, testDuration, timeLeft, testStarted, visibleChars])

  // Render text with highlights (progressive display)
  const renderText = () => {
    if (!testText) {
      return (
        <p className="text-gray-400">
          Select a duration to load words
        </p>
      )
    }
    
    // Show only visible portion of text (approximately 3 lines)
    const textToShow = testText.slice(0, visibleChars)
    
    return (
      <>
        {textToShow.split('').map((char, i) => {
          let className = ''
          if (i < userInput.length) {
            className = char === userInput[i] ? 'correct' : 'incorrect'
          } else if (i === userInput.length && testStarted) {
            className = 'current'
          }
          return (
            <span key={i} className={className}>
              {char}
            </span>
          )
        })}
      </>
    )
  }

  // Tailwind custom classes
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      .correct { color: #10b981; }
      .incorrect { color: #ef4444; text-decoration: underline; }
      .current { background-color: #e2e8f0; border-radius: 2px; }
      .progress-bar { height: 6px; background-color: #3b82f6; transition: width 0.3s ease; }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Progress bar width
  const progressPercent =
    testStarted && testDuration
      ? ((testDuration - timeLeft) / testDuration) * 100
      : 0

  return (
    <div className="font-sans px-2 py-2 overflow-x-hidden">
      {/* SEO Tags */}
      <Helmet>
        <title>Typingo | Time Based Typing Test</title>
        <meta
          name="description"
          content="Test your typing speed and accuracy in a time-based challenge. Choose from 15, 30, 60, or 90 seconds and practice to improve your typing skills with Typingo!"
        />
        <meta name="keywords" content="typing test, speed test, accuracy, typing challenge, time-based, WPM, typing practice, Typingo" />
        <meta name="author" content="Typingo Team" />
        <meta property="og:title" content="Time Based Typing Test | Typingo" />
        <meta property="og:description" content="Test your typing speed and accuracy in a time-based challenge. Choose from 15, 30, 60, or 90 seconds and practice to improve your typing skills!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://typingo.vercel.app/time-base" />
        <meta property="og:image" content="https://typingo.vercel.app/time-based-og-image.png" />
        <meta property="og:site_name" content="Typingo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Time Based Typing Test | Typingo" />
        <meta name="twitter:description" content="Test your typing speed and accuracy in a time-based challenge. Practice and improve your typing skills!" />
        <meta name="twitter:image" content="https://typingo.vercel.app/time-based-og-image.png" />
        <link rel="canonical" href="https://typingo.vercel.app/time-base" />
      </Helmet>
      <div className="text-center mb-10 pt-8 px-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex flex-col sm:flex-row items-center justify-center gap-2">
          <FontAwesomeIcon icon={faKeyboard} className="text-indigo-500" />
          <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 p-2">
            Time Based Typing Test Challenge
          </span>
          <FontAwesomeIcon icon={faBolt} className="text-yellow-400" />
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">
          Measure your speed, improve your accuracy, and challenge yourself!
        </p>
      </div>
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-lg overflow-hidden mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 p-4 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Typingo</h1>
            </div>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                Speed Mode
              </span>
            </div>
          </div>
        </div>

        {/* Time Selection */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 my-4 sm:my-6">
          {DURATIONS.map((duration) => (
            <button
              key={duration}
              onClick={() => handleSelectDuration(duration)}
              disabled={testStarted}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium flex items-center space-x-2 transition-all
                ${testDuration === duration
                  ? 'bg-blue-500 text-white shadow'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }
                ${testStarted ? 'opacity-60 cursor-not-allowed' : ''}
              `}
            >
              <FaStopwatch className="mr-2" />
              <span>{duration}s</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 pt-0">
          {/* Timer and Stats */}
          {(testText || testStarted) && (
            <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
              <div className="flex items-center text-xl sm:text-2xl font-bold text-gray-800 space-x-2 mx-auto">
                <FaStopwatch />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {testStarted && (
            <div className="w-full bg-gray-200 rounded-full mb-6">
              <div
                className="progress-bar rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}

          {/* Text Display */}
          <div
            ref={textContainerRef}
            className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-6 min-h-24 sm:min-h-28 border border-gray-200 font-mono text-base sm:text-lg leading-relaxed"
            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          >
            {renderText()}
          </div>

          {/* Input Area */}
          <div className="flex flex-col gap-4">
            <input
              ref={inputRef}
              type="text"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Start typing here..."
              value={userInput}
              onChange={(e) => {
                if (testStarted) setUserInput(e.target.value)
              }}
              disabled={!testStarted}
              spellCheck={false}
            />
            <button
              className={`flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all w-full sm:w-1/4 mx-auto
                ${testStarted
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
                }
              `}
              onClick={startTest}
              disabled={testStarted}
              type="button"
            >
              {testStarted ? (
                <>
                  <FaStopwatch className="mr-2" />
                  Testing...
                </>
              ) : (
                <>
                  <FaRedo className="mr-2" />
                  Start Test
                </>
              )}
            </button>
          </div>

          {/* Results Display - Show when test is completed */}
          {testCompleted && (
            <div className="mt-6 space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  Test Results
                </h2>
                <p className="text-gray-600">Your typing performance</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg flex flex-col items-center min-w-[120px]">
                  <FaTachometerAlt className="text-blue-500 text-xl sm:text-2xl mb-1" />
                  <div className="text-blue-500 font-bold text-xl sm:text-3xl mb-1">
                    {wpm}
                  </div>
                  <div className="text-xs text-blue-600">WPM</div>
                </div>
                <div className="bg-green-50 p-3 sm:p-4 rounded-lg flex flex-col items-center min-w-[120px]">
                  <FaBullseye className="text-green-500 text-xl sm:text-2xl mb-1" />
                  <div className="text-green-500 font-bold text-xl sm:text-3xl mb-1">
                    {accuracy}
                  </div>
                  <div className="text-xs text-green-600">Accuracy</div>
                </div>
                <div className="bg-purple-50 p-3 sm:p-4 rounded-lg flex flex-col items-center min-w-[120px]">
                  <FaTimesCircle className="text-purple-500 text-xl sm:text-2xl mb-1" />
                  <div className="text-purple-500 font-bold text-xl sm:text-3xl mb-1">
                    {errors}
                  </div>
                  <div className="text-xs text-purple-600">Errors</div>
                </div>
                <div className="bg-amber-50 p-3 sm:p-4 rounded-lg flex flex-col items-center min-w-[120px]">
                  <FaStopwatch className="text-amber-500 text-xl sm:text-2xl mb-1" />
                  <div className="text-amber-500 font-bold text-xl sm:text-3xl mb-1">
                    {testDuration}
                  </div>
                  <div className="text-xs text-amber-600">Seconds</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 pt-2">
                <button
                  className="flex items-center justify-center px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full sm:w-auto"
                  onClick={tryAgainTest}
                  type="button"
                >
                  <FaRedo className="mr-2" /> Try Again
                </button>
                <button
                  className="flex items-center justify-center px-4 sm:px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
                  onClick={newTest}
                  type="button"
                >
                  <FaSyncAlt className="mr-2" /> New Test
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TypingSpeedTest

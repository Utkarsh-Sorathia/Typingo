import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import {
  FaArrowRight, FaSmile, FaUser, FaFire, FaCode, FaTrophy,
  FaCheckCircle, FaTimesCircle, FaKeyboard, FaTachometerAlt,
  FaBullseye, FaChartLine, FaClock, FaStopwatch,
} from 'react-icons/fa'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

const TEST_TEXT = `The quick brown fox jumps over the lazy dog near the river bank.`

const Typingo: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('')
  const [started, setStarted] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [errors, setErrors] = useState(0)
  const [inputDisabled, setInputDisabled] = useState(true)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [completed, setCompleted] = useState(false)

  // Refs
  const inputRef = useRef<HTMLInputElement>(null)
  const quickTestRef = useRef<HTMLDivElement>(null)

  // Scroll to quick test and focus input
  const scrollToQuickTest = useCallback(() => {
    if (quickTestRef.current) {
      quickTestRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [])

  // Start test
  const startTest = useCallback(() => {
    setUserInput('')
    setStarted(true)
    setWpm(0)
    setAccuracy(100)
    setErrors(0)
    setInputDisabled(false)
    setStartTime(Date.now())
    setCompleted(false)
    scrollToQuickTest()
    // Focus input after a short delay to ensure it's enabled
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 350)
  }, [scrollToQuickTest])

  // Typing logic and completion check
  useEffect(() => {
    if (!started || !startTime || completed) return
    
    const correctChars = userInput
      .split('')
      .filter((ch, i) => ch === TEST_TEXT[i]).length
    const totalTyped = userInput.length
    const errorCount = totalTyped - correctChars
    setErrors(errorCount > 0 ? errorCount : 0)
    setAccuracy(
      totalTyped === 0 ? 100 : Math.round((correctChars / totalTyped) * 100),
    )

    // Check if text is completed
    if (userInput.length >= TEST_TEXT.length) {
      const timeTaken = (Date.now() - startTime) / 1000 // in seconds
      const words = TEST_TEXT.trim().split(/\s+/).filter(Boolean).length
      const calculatedWpm = Math.round((words / timeTaken) * 60)
      setWpm(calculatedWpm)
      setCompleted(true)
      setStarted(false)
      setInputDisabled(true)
    }
  }, [userInput, started, startTime, completed])

  // Handle input
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (completed || inputDisabled) return
    const value = e.target.value
    // Prevent typing beyond the test text length
    if (value.length <= TEST_TEXT.length) {
      setUserInput(value)
    }
  }

  // Handle keyboard events for space key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName
      const isInputFocused = activeTag === 'INPUT' || activeTag === 'TEXTAREA'
      
      if (
        e.code === 'Space' && 
        !started && 
        !isInputFocused &&
        !inputDisabled
      ) {
        e.preventDefault()
        scrollToQuickTest()
      } else if (
        e.code === 'Space' && 
        !started && 
        !isInputFocused &&
        inputDisabled
      ) {
        e.preventDefault()
        startTest()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [started, inputDisabled, scrollToQuickTest, startTest])

  // Text display with coloring - memoized to prevent unnecessary re-renders
  const renderedText = useMemo(() => {
    // Freeze the display when completed
    const displayInput = completed ? userInput.slice(0, TEST_TEXT.length) : userInput
    const isActive = started && !completed
    
    return (
      <p className="font-mono break-words whitespace-pre-wrap">
        {TEST_TEXT.split('').map((char, idx) => {
          let className = ''
          if (idx < displayInput.length) {
            className = char === displayInput[idx] ? 'correct' : 'incorrect'
          }
          // Only show current indicator when actively typing
          if (idx === displayInput.length && isActive && !completed) {
            className += ' current'
          }
          return (
            <span key={idx} className={className}>
              {char}
            </span>
          )
        })}
      </p>
    )
  }, [userInput, started, completed])

  return (
    <div className="bg-white font-sans min-h-screen">
      {/* --- SEO TAGS --- */}
      <Helmet>
        <title>Typingo - Free Online Typing Test & Practice</title>
        <meta name="description" content="Boost your typing speed and accuracy with Typingo. Take interactive typing tests in multiple modes and track your progress!" />
        <meta name="keywords" content="typing test, typing speed, typing accuracy, online typing, typing practice, code typing, keyboard mastery" />
        <meta name="author" content="Typingo Team" />
        <meta property="og:title" content="Typingo - Free Online Typing Test" />
        <meta property="og:description" content="Boost your typing speed and accuracy with Typingo. Take interactive typing tests in multiple modes and track your progress!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://typingo.vercel.app" />
        <meta property="og:image" content="https://typingo.vercel.app/og-image.png" />
        <meta property="og:site_name" content="Typingo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Typingo - Free Online Typing Test" />
        <meta name="twitter:description" content="Boost your typing speed and accuracy with Typingo. Take interactive typing tests in multiple modes and track your progress!" />
        <meta name="twitter:image" content="https://typingo.vercel.app/og-image.png" />
        <link rel="canonical" href="https://typingo.vercel.app" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Typingo",
            "description": "Free online typing test and practice platform to improve your typing speed and accuracy",
            "url": "https://typingo.vercel.app",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1000"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-10 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left */}
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Master Your <span className="text-blue-600">Typing Skills</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8">
                Improve your typing speed and accuracy with our interactive
                typing tests. Perfect for beginners and advanced typists alike.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-center flex items-center justify-center"
                  onClick={startTest}
                  disabled={started}
                >
                  Start Quick Test <FaArrowRight className="ml-2" />
                </button>
                <a
                  href="#modes"
                  onClick={(e) => {
                    e.preventDefault()
                    const modesSection = document.getElementById('modes')
                    if (modesSection) {
                      modesSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="px-8 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all shadow hover:shadow-md text-center"
                >
                  Explore Modes
                </a>
              </div>
            </div>
            {/* Right */}
            <div className="md:w-1/2 flex justify-center w-full">
              <div className="relative max-w-md w-full" ref={quickTestRef}>
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl floating glow transition-all duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition bg-blue-100 text-blue-800 hover:bg-blue-200"
                      onClick={scrollToQuickTest}
                    >
                      Quick Test
                    </span>
                    {completed && (
                      <span className="text-sm text-green-600 font-medium">
                        Completed!
                      </span>
                    )}
                    {!completed && started && (
                      <span className="text-sm text-blue-600 font-medium">
                        Typing...
                      </span>
                    )}
                  </div>
                  <div
                    id="textDisplay"
                    className={`bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 min-h-20 max-h-32 overflow-y-auto border font-mono text-base ${
                      completed ? 'opacity-90' : ''
                    }`}
                  >
                    {renderedText}
                  </div>
                  <input
                    ref={inputRef}
                    value={userInput}
                    onChange={handleInput}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!inputDisabled && inputRef.current) {
                        inputRef.current.focus()
                      }
                    }}
                    onMouseDown={() => {
                      if (!inputDisabled && inputRef.current) {
                        inputRef.current.focus()
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-text"
                    placeholder="Start typing here..."
                    disabled={inputDisabled}
                    tabIndex={inputDisabled ? -1 : 0}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 text-center">
                    <div className="bg-gray-100 p-2 rounded">
                      <p className="text-xs text-gray-500">Speed</p>
                      <p className="font-bold">{wpm} WPM</p>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <p className="text-xs text-gray-500">Accuracy</p>
                      <p className="font-bold">{accuracy}%</p>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <p className="text-xs text-gray-500">Errors</p>
                      <p className="font-bold">{errors}</p>
                    </div>
                  </div>

                  {/* Action Buttons - Show when completed */}
                  {completed && (
                    <div className="mt-6 space-y-3">
                      <p className="text-center text-sm text-gray-600 mb-4">
                        Ready for a bigger challenge? Try these modes:
                      </p>
                      <div className="flex gap-3">
                        <Link
                          to="/tests"
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                        >
                          <FaFire className="mr-2" />
                          Hard Mode
                          <FaArrowRight className="ml-2" />
                        </Link>
                        <Link
                          to="/time-base"
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                        >
                          <FaClock className="mr-2" />
                          Time-Based Mode
                          <FaArrowRight className="ml-2" />
                        </Link>
                      </div>
                      <button
                        onClick={startTest}
                        className="w-full px-6 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all shadow hover:shadow-md"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modes Section */}
      <section id="modes" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Typing Test Modes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from different modes to challenge yourself at various
              difficulty levels.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Easy */}
            <Link to="/tests">
              <ModeCard
                icon={<FaSmile className="text-xl" />}
                color="green"
                title="Easy Mode"
                desc="Perfect for beginners with simple words and sentences."
                highlight={
                  <>
                    <FaCheckCircle className="mr-1" /> Backspace allowed
                  </>
                }
              />
            </Link>
            {/* Normal */}
            <Link to="/tests">
              <ModeCard
                icon={<FaUser className="text-xl" />}
                color="blue"
                title="Normal Mode"
                desc="Standard typing test with regular text passages. Ideal for intermediate typists."
                highlight={
                  <>
                    <FaCheckCircle className="mr-1" /> Backspace allowed
                  </>
                }
              />
            </Link>
            {/* Hard */}
            <Link to="/tests">
              <ModeCard
                icon={<FaFire className="text-xl" />}
                color="red"
                title="Hard Mode"
                desc="No backspace allowed! Mistakes are permanent and test your precision."
                highlight={
                  <>
                    <FaTimesCircle className="mr-1" /> No backspace
                  </>
                }
              />
            </Link>
            {/* Code */}
            <Link to="/tests">
              <ModeCard
                icon={<FaCode className="text-xl" />}
                color="purple"
                title="Code Mode"
                desc="Practice typing code with special characters and syntax. Perfect for developers."
                highlight={<><FaCode className="mr-1" /> Code syntax</>}
              />
            </Link>
            {/* Time-Based */}
            <Link to="/time-base">
              <ModeCard
                icon={<FaClock className="text-xl" />}
                color="purple"
                title="Time-Based Mode"
                desc="Test your typing speed against the clock with timed challenges."
                highlight={
                  <>
                    <FaStopwatch className="mr-1" /> Time based
                  </>
                }
              />
            </Link>
            {/* Keyboard Mastery */}
            <Link to="/keyboard-mastery">
              <ModeCard
                icon={<FaTrophy className="text-xl" />}
                color="amber"
                title="Keyboard Mastery"
                desc="The ultimate challenge with random keys and finger positioning exercises."
                highlight={
                  <>
                    <FaKeyboard className="mr-1" /> Advanced finger positioning
                  </>
                }
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Track Your Progress
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Monitor your typing performance across different metrics.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard
              icon={<FaTachometerAlt className="text-xl" />}
              color="blue"
              title="Speed"
              desc="Words Per Minute (WPM) measures how fast you can type while maintaining accuracy."
              rangeLeft="Beginner: 0-30 WPM"
              rangeRight="Expert: 80+ WPM"
              percent={45}
            />
            <StatCard
              icon={<FaBullseye className="text-xl" />}
              color="green"
              title="Accuracy"
              desc="Percentage of correct characters typed. Aim for 95%+ accuracy in your tests."
              rangeLeft="Acceptable: 90%"
              rangeRight="Excellent: 98%+"
              percent={92}
            />
            <StatCard
              icon={<FaChartLine className="text-xl" />}
              color="purple"
              title="Consistency"
              desc="Measure how consistently you maintain your speed and accuracy over time."
              rangeLeft="Irregular"
              rangeRight="Steady"
              percent={78}
            />
          </div>
        </div>
      </section>

      {/* Inline styles for animation and coloring */}
      <style>{`
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
        .floating { animation: float 3s ease-in-out infinite; }
        .glow { box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
        .correct { color: #10b981; }
        .incorrect { color: #ef4444; text-decoration: underline; }
        .current { background-color: #e2e8f0; border-radius: 2px; }
      `}</style>
    </div>
  )
}

// --- ModeCard Component ---
interface ModeCardProps {
  icon: React.ReactNode
  color: string
  title: string
  desc: string
  highlight: React.ReactNode
}

const colorClasses: Record<string, { border: string; bg: string; text: string }> = {
  green: {
    border: 'border-green-500',
    bg: 'bg-green-100',
    text: 'text-green-600',
  },
  blue: {
    border: 'border-blue-500',
    bg: 'bg-blue-100',
    text: 'text-blue-600',
  },
  red: {
    border: 'border-red-500',
    bg: 'bg-red-100',
    text: 'text-red-600',
  },
  purple: {
    border: 'border-purple-500',
    bg: 'bg-purple-100',
    text: 'text-purple-600',
  },
  amber: {
    border: 'border-amber-500',
    bg: 'bg-amber-100',
    text: 'text-amber-600',
  },
}

const ModeCard: React.FC<ModeCardProps> = ({
  icon,
  color,
  title,
  desc,
  highlight,
}) => {
  const colors = colorClasses[color] || colorClasses.blue

  return (
    <div
      className={clsx(
        'mode-card bg-white p-6 rounded-lg shadow-md border-t-4 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1',
        colors.border,
      )}
    >
      <div
        className={clsx(
          'w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto',
          colors.bg,
          colors.text,
        )}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">
        {title}
      </h3>
      <p className="text-gray-600 mb-4 text-center text-sm">
        {desc}
      </p>
      <div
        className={clsx(
          'text-sm font-medium flex items-center justify-center',
          colors.text,
        )}
      >
        {highlight}
      </div>
    </div>
  )
}

// --- StatCard Component ---
interface StatCardProps {
  icon: React.ReactNode
  color: string
  title: string
  desc: string
  rangeLeft: string
  rangeRight: string
  percent: number
}
const StatCard: React.FC<StatCardProps> = ({
  icon,
  color,
  title,
  desc,
  rangeLeft,
  rangeRight,
  percent,
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
    <div className="flex items-center mb-4">
      <div
        className={`w-12 h-12 bg-${color}-100 text-${color}-600 rounded-full flex items-center justify-center mr-4`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{desc}</p>
    <div className="mt-4">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>{rangeLeft}</span>
        <span>{rangeRight}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`bg-${color}-600 h-2.5 rounded-full`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  </div>
)

export default Typingo

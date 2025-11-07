import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

interface GoogleAnalyticsProps {
  measurementId?: string
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({
  measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID,
}) => {
  const location = useLocation()

  useEffect(() => {
    if (!measurementId) {
      console.warn('Google Analytics measurement ID not provided')
      return
    }

    if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
      document.head.appendChild(script)
    }

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }

    window.gtag('js', new Date())
    window.gtag('config', measurementId, {
      page_path: window.location.pathname + window.location.search,
    })
  }, [measurementId])

  useEffect(() => {
    if (window.gtag && measurementId) {
      window.gtag('config', measurementId, {
        page_path: location.pathname + location.search,
      })
    }
  }, [location, measurementId])

  return null
}

export default GoogleAnalytics

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}

interface GoogleAnalyticsProps {
  measurementId?: string
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ 
  measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID 
}) => {
  const location = useLocation()

  useEffect(() => {
    if (!measurementId) {
      console.warn('Google Analytics measurement ID not provided')
      return
    }

    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script1)

    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag as typeof window.gtag

    gtag('js', new Date())
    gtag('config', measurementId, {
      page_path: location.pathname + location.search,
    })

    return () => {
      const scripts = document.querySelectorAll(`script[src*="googletagmanager"]`)
      scripts.forEach((script) => script.remove())
    }
  }, [])

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


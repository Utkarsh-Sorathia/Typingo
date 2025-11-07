import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

declare global {
  interface Window {
    dataLayer: Record<string, any>[]
    gtag: (...args: any[]) => void
  }
}

const GoogleAnalytics = () => {
  const location = useLocation()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      console.warn("Google Analytics measurement ID not provided")
      return
    }

    if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
      const script = document.createElement("script")
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      document.head.appendChild(script)

      const inlineScript = document.createElement("script")
      inlineScript.id = "google-analytics"
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
        });
      `
      document.head.appendChild(inlineScript)
    }
  }, [])

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    const url = location.pathname + location.search
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      })
    }
  }, [location])

  return null
}

export default GoogleAnalytics

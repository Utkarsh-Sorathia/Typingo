import { Routes, Route } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import Tests from '../components/Typing-test/Tests'
import KeyboardLearning from '../components/Keyboard-mastery/KeyboardTest'
import Typingo from '../components/Home/LandingPage'
import TimeBaseMode from '../components/Modes/TimeBase'
import Contact from '../components/Contact/Contact'
import PrivacyPolicy from '../components/LegalPolicies/PrivacyPolicy'
import TermsOfService from '../components/LegalPolicies/TermsOfService'

const Routers = () => {
  return (
    <div className="overflow-x-hidden">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Typingo />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/time-base" element={<TimeBaseMode />} />
        <Route path='/keyboard-mastery' element={<KeyboardLearning />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </div>
  )
}

export default Routers
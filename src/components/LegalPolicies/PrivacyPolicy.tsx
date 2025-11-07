import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  Clock,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Typingo</title>
        <meta name="description" content="Learn how Typingo protects your privacy and handles your personal information. Read our comprehensive privacy policy." />
        <meta name="keywords" content="privacy policy, Typingo privacy, data protection, user privacy" />
        <meta name="author" content="Typingo Team" />
        <meta property="og:title" content="Privacy Policy | Typingo" />
        <meta property="og:description" content="Learn how Typingo protects your privacy and handles your personal information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://typingo.vercel.app/privacy-policy" />
        <meta property="og:site_name" content="Typingo" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy | Typingo" />
        <meta name="twitter:description" content="Learn how Typingo protects your privacy and handles your personal information." />
        <link rel="canonical" href="https://typingo.vercel.app/privacy-policy" />
      </Helmet>
      <div className='min-h-screen bg-white overflow-x-hidden'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {/* Header */}
          <div className='mb-8'>
            <Link
              to='/'
              className='inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors'
            >
              <ArrowLeft className='h-5 w-5 mr-2' />
              Back to Home
            </Link>

            <div className='text-center'>
              <div className='flex items-center justify-center mb-4'>
                <Shield className='h-10 w-10 text-blue-600 mr-3' />
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-900'>
                  Privacy Policy
                </h1>
              </div>
              <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                Your privacy and rights are important to us. Please review our privacy policy below.
              </p>
              <div className='flex items-center justify-center mt-4 text-sm text-gray-500'>
                <Clock className='h-4 w-4 mr-2' />
                Last updated: {lastUpdated}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <section className='p-8 lg:p-12'>
              <div className='prose prose-lg max-w-none'>
                <div className='bg-blue-50 border-l-4 border-blue-400 p-4 mb-8'>
                  <p className='text-blue-800 font-medium'>
                    We are committed to protecting your privacy and ensuring
                    the security of your personal information.
                  </p>
                </div>

                <div className='space-y-8'>
                  <div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                      Information We Collect
                    </h3>
                    <div className='grid md:grid-cols-2 gap-6'>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <h4 className='font-medium text-gray-900 mb-2'>
                          Account Information
                        </h4>
                        <ul className='text-gray-600 space-y-1 text-sm'>
                          <li>• Name and email address (if you create an account)</li>
                          <li>• Typing statistics and progress data</li>
                          <li>• Test results and performance metrics</li>
                          <li>• Preferences and settings</li>
                        </ul>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <h4 className='font-medium text-gray-900 mb-2'>
                          Usage Information
                        </h4>
                        <ul className='text-gray-600 space-y-1 text-sm'>
                          <li>• Typing test results and statistics</li>
                          <li>• Device and browser information</li>
                          <li>• IP address and location data</li>
                          <li>• Cookies and analytics data</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                      How We Use Your Information
                    </h3>
                    <div className='space-y-4'>
                      <div className='flex items-start'>
                        <CheckCircle className='h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0' />
                        <div>
                          <h4 className='font-medium text-gray-900'>
                            Provide Typing Services
                          </h4>
                          <p className='text-gray-600'>
                            To deliver typing tests, track your progress, and save your statistics.
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start'>
                        <CheckCircle className='h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0' />
                        <div>
                          <h4 className='font-medium text-gray-900'>
                            Customer Support
                          </h4>
                          <p className='text-gray-600'>
                            To provide support and respond to your inquiries about Typingo.
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start'>
                        <CheckCircle className='h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0' />
                        <div>
                          <h4 className='font-medium text-gray-900'>
                            Improve Our Services
                          </h4>
                          <p className='text-gray-600'>
                            To analyze usage patterns and enhance your typing practice experience.
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start'>
                        <CheckCircle className='h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0' />
                        <div>
                          <h4 className='font-medium text-gray-900'>
                            Analytics & Research
                          </h4>
                          <p className='text-gray-600'>
                            To understand how users interact with Typingo and improve our features (anonymized data).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                      Data Security
                    </h3>
                    <div className='bg-green-50 border border-green-200 rounded-lg p-6'>
                      <div className='flex items-start'>
                        <Shield className='h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0' />
                        <div>
                          <h4 className='font-medium text-green-900 mb-2'>
                            Your Data is Protected
                          </h4>
                          <p className='text-green-800'>
                            We use industry-standard encryption and security
                            measures to protect your personal information.
                            Your typing statistics and account data are stored securely and never shared with third parties without your consent.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                      Your Rights
                    </h3>
                    <p className='text-gray-600 mb-4'>
                      You have the right to access, update, or delete your
                      personal information. You can also opt out of marketing
                      communications at any time.
                    </p>
                    <div className='bg-blue-50 p-4 rounded-lg'>
                      <p className='text-blue-800 text-sm'>
                        <strong>Contact us</strong> at support@typingo.com if
                        you have any questions about your data or wish to
                        exercise your rights.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className='bg-gray-50 px-8 lg:px-12 py-8 border-t border-gray-200'>
              <div className='text-center'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  Questions About Our Privacy Policy?
                </h3>
                <p className='text-gray-600 mb-6'>
                  If you have any questions about our privacy policy, please don't hesitate to contact us.
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <Link
                    to='/contact'
                    className='inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                  >
                    <Mail className='h-5 w-5 mr-2' />
                    Contact Support
                  </Link>
                  <Link
                    to='/terms-of-service'
                    className='inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
                  >
                    <ExternalLink className='h-5 w-5 mr-2' />
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;


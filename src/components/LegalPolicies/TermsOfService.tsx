import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Clock,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { Helmet } from 'react-helmet';

const TermsOfService: React.FC = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Helmet>
        <title>Terms of Service | Typingo</title>
        <meta name="description" content="Read Typingo's Terms of Service. Understand the rules and guidelines for using our typing practice platform." />
        <meta name="keywords" content="terms of service, Typingo terms, user agreement, terms and conditions" />
        <meta name="author" content="Typingo Team" />
        <meta property="og:title" content="Terms of Service | Typingo" />
        <meta property="og:description" content="Read Typingo's Terms of Service. Understand the rules and guidelines for using our typing practice platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://typingo.vercel.app/terms-of-service" />
        <meta property="og:site_name" content="Typingo" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Service | Typingo" />
        <meta name="twitter:description" content="Read Typingo's Terms of Service. Understand the rules and guidelines for using our typing practice platform." />
        <link rel="canonical" href="https://typingo.vercel.app/terms-of-service" />
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
                <FileText className='h-10 w-10 text-purple-600 mr-3' />
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-900'>
                  Terms of Service
                </h1>
              </div>
              <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                By using our services, you agree to these terms and conditions. Please read them carefully.
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
                <div className='bg-purple-50 border-l-4 border-purple-400 p-4 mb-8'>
                  <p className='text-purple-800 font-medium'>
                    By using our services, you agree to these terms and
                    conditions. Please read them carefully.
                  </p>
                </div>

                <div className='space-y-8'>
                  <div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                      Account & Registration
                    </h3>
                    <div className='space-y-3 text-gray-600'>
                      <p>
                        • Creating an account is optional - you can use Typingo without signing up
                      </p>
                      <p>
                        • If you create an account, you are responsible for maintaining the
                        confidentiality of your credentials
                      </p>
                      <p>
                        • You must provide accurate information if you choose to register
                      </p>
                      <p>• Accounts are free and intended for personal typing practice</p>
                    </div>
                  </div>

                  <div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                      Service Usage
                    </h3>
                    <div className='grid md:grid-cols-2 gap-6'>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <h4 className='font-medium text-gray-900 mb-2'>
                          Free Service
                        </h4>
                        <ul className='text-gray-600 space-y-1 text-sm'>
                          <li>
                            • Typingo is free to use
                          </li>
                          <li>• No payment or subscription required</li>
                          <li>• All features are available to all users</li>
                          <li>• We may introduce premium features in the future</li>
                        </ul>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <h4 className='font-medium text-gray-900 mb-2'>
                          Data & Statistics
                        </h4>
                        <ul className='text-gray-600 space-y-1 text-sm'>
                          <li>
                            • Your typing statistics are stored locally or in your account
                          </li>
                          <li>• Test results help you track your progress</li>
                          <li>• Data is used to improve Typingo's features</li>
                          <li>
                            • You can delete your account and data at any time
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                      Service Availability
                    </h3>
                    <div className='space-y-4'>
                      <div className='border border-gray-200 rounded-lg p-4'>
                        <h4 className='font-medium text-gray-900 mb-2'>
                          Availability
                        </h4>
                        <p className='text-gray-600 text-sm'>
                          Typingo is available worldwide and accessible through any modern web browser. We strive to maintain 99.9% uptime, but occasional maintenance may cause brief interruptions.
                        </p>
                      </div>
                      <div className='border border-gray-200 rounded-lg p-4'>
                        <h4 className='font-medium text-gray-900 mb-2'>
                          Changes to Service
                        </h4>
                        <p className='text-gray-600 text-sm'>
                          We reserve the right to modify, suspend, or discontinue any part of Typingo at any time. We will notify users of significant changes when possible.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                      Prohibited Uses
                    </h3>
                    <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                      <p className='text-red-800 text-sm mb-2'>
                        <strong>You may not:</strong>
                      </p>
                      <ul className='text-red-700 space-y-1 text-sm'>
                        <li>• Use our services for any unlawful purpose</li>
                        <li>
                          • Attempt to gain unauthorized access to our systems
                        </li>
                        <li>• Interfere with or disrupt our services</li>
                        <li>• Use automated systems to access our website</li>
                        <li>• Violate any applicable laws or regulations</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                      Limitation of Liability
                    </h3>
                    <p className='text-gray-600 mb-4'>
                      Our liability is limited to the maximum extent permitted
                      by law. We are not responsible for indirect, incidental,
                      or consequential damages.
                    </p>
                    <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
                      <p className='text-yellow-800 text-sm'>
                        <strong>Important:</strong> These terms are subject to
                        change. Continued use of our services constitutes
                        acceptance of any modifications.
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
                  Questions About Our Terms?
                </h3>
                <p className='text-gray-600 mb-6'>
                  If you have any questions about our terms of service, please don't hesitate to contact us.
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
                    to='/privacy-policy'
                    className='inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
                  >
                    <ExternalLink className='h-5 w-5 mr-2' />
                    Privacy Policy
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

export default TermsOfService;


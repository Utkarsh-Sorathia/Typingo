import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  ArrowLeft,
  Target,
  Zap,
  Users,
  Award,
  Heart,
  Keyboard,
  TrendingUp,
  Globe,
  Code,
  Clock,
  CheckCircle,
} from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To help people improve their typing skills through fun, interactive, and free typing tests. We believe everyone deserves access to quality typing practice tools.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      icon: Zap,
      title: 'Fast & Efficient',
      description: 'We focus on speed and accuracy, providing instant feedback to help you identify areas for improvement and track your progress over time.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
    },
    {
      icon: Users,
      title: 'For Everyone',
      description: 'Whether you\'re a beginner learning to type or a professional looking to improve your speed, Typingo offers modes for all skill levels.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      icon: Heart,
      title: 'Free Forever',
      description: 'We believe typing practice should be accessible to everyone. Typingo is completely free, with no hidden costs or premium features locked behind paywalls.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
  ];

  const features = [
    {
      icon: Keyboard,
      title: 'Multiple Test Modes',
      description: 'Easy, Hard, Code, and Time-based modes to suit different learning styles and goals.',
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Track your WPM, accuracy, and errors with detailed statistics to monitor your improvement.',
    },
    {
      icon: Code,
      title: 'Code Typing Practice',
      description: 'Specialized mode for developers to practice typing code snippets and improve programming speed.',
    },
    {
      icon: Clock,
      title: 'Time-based Challenges',
      description: 'Test your typing speed under time pressure with customizable duration settings.',
    },
    {
      icon: Award,
      title: 'Keyboard Mastery',
      description: 'Learn proper finger placement and keyboard layout with our interactive keyboard visualization.',
    },
    {
      icon: Globe,
      title: 'Accessible Anywhere',
      description: 'Practice typing from any device, anywhere. No downloads or installations required.',
    },
  ];

  const stats = [
    { label: 'Free Tests', value: 'Unlimited', icon: CheckCircle },
    { label: 'Test Modes', value: '5+', icon: Target },
    { label: 'Languages', value: 'Multiple', icon: Globe },
    { label: 'Users', value: 'Growing', icon: Users },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Typingo</title>
        <meta name="description" content="Learn about Typingo - a free typing test platform designed to help you improve your typing speed and accuracy. Discover our mission, features, and commitment to making typing practice accessible to everyone." />
        <meta name="keywords" content="about Typingo, typing test platform, typing practice, free typing test, improve typing speed" />
        <meta name="author" content="Typingo Team" />
        <meta property="og:title" content="About Us | Typingo" />
        <meta property="og:description" content="Learn about Typingo - a free typing test platform designed to help you improve your typing speed and accuracy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://typingo.vercel.app/about" />
        <meta property="og:site_name" content="Typingo" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About Us | Typingo" />
        <meta name="twitter:description" content="Learn about Typingo - a free typing test platform designed to help you improve your typing speed and accuracy." />
        <link rel="canonical" href="https://typingo.vercel.app/about" />
      </Helmet>
      <div className="min-h-screen bg-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-12">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>

            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                About Typingo
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                We're on a mission to make typing practice accessible, fun, and effective for everyone. 
                Whether you're learning to type or aiming to break speed records, we've got you covered.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
                >
                  <Icon className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              What We Stand For
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className={`${value.bgColor} ${value.borderColor} border rounded-xl p-6 hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`${value.color} p-3 rounded-lg bg-white shadow-sm flex-shrink-0`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                          {value.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              What Makes Typingo Special
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600 mr-3">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Story Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-8 sm:p-12 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  Typingo was born from a simple idea: typing is an essential skill in today's digital world, 
                  and everyone should have access to quality tools to improve their typing speed and accuracy.
                </p>
                <p>
                  We noticed that many typing test platforms were either too complex, required payment, 
                  or lacked the features needed for effective practice. So we set out to create something better—a 
                  free, user-friendly platform that offers multiple test modes, real-time feedback, and detailed analytics.
                </p>
                <p>
                  Today, Typingo serves thousands of users worldwide, helping students, professionals, 
                  and typing enthusiasts improve their skills. We're committed to keeping Typingo free and 
                  continuously improving based on user feedback.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white border-2 border-indigo-200 rounded-xl p-8 sm:p-12 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Improve Your Typing?
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Start practicing today and see your typing speed improve with every test!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/tests"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Start Typing Test
                  <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;


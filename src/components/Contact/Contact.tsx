import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  ArrowLeft,
  Mail,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'general', label: 'General Inquiry', icon: MessageSquare },
    { value: 'support', label: 'Technical Support', icon: HelpCircle },
    { value: 'feature', label: 'Feature Request', icon: CheckCircle },
    { value: 'bug', label: 'Report a Bug', icon: AlertCircle },
    { value: 'feedback', label: 'Feedback & Suggestions', icon: MessageSquare },
    { value: 'partnership', label: 'Partnership Inquiry', icon: MessageSquare },
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'support@typingo.com',
      subtitle: 'We respond within 24 hours',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: 'Typically within 24 hours',
      subtitle: 'Monday - Friday',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      icon: HelpCircle,
      title: 'Help Center',
      details: 'Check our documentation',
      subtitle: 'For quick answers',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      label: 'Facebook',
      href: '#',
      color: 'hover:text-blue-600',
    },
    { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:text-sky-500' },
    {
      icon: Instagram,
      label: 'Instagram',
      href: '#',
      color: 'hover:text-pink-600',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: '#',
      color: 'hover:text-blue-700',
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
      });

      toast.success("Message sent successfully! We'll get back to you soon.");
    } catch (_error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Typingo</title>
        <meta name="description" content="Get in touch with Typingo. Have questions, feedback, or need support? Contact us and we'll be happy to help!" />
        <meta name="keywords" content="contact Typingo, typing test support, feedback, help, customer service" />
        <meta name="author" content="Typingo Team" />
        <meta property="og:title" content="Contact Us | Typingo" />
        <meta property="og:description" content="Get in touch with Typingo. Have questions, feedback, or need support? Contact us and we'll be happy to help!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://typingo.vercel.app/contact" />
        <meta property="og:site_name" content="Typingo" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Us | Typingo" />
        <meta name="twitter:description" content="Get in touch with Typingo. Have questions, feedback, or need support? Contact us!" />
        <link rel="canonical" href="https://typingo.vercel.app/contact" />
      </Helmet>
      <div className='min-h-screen bg-white overflow-x-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
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
            <h1 className='text-3xl font-bold text-gray-900 mb-4'>
              Get in Touch
            </h1>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Have questions about Typingo? Need help with your typing practice? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>

        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Contact Information */}
          <div className='lg:col-span-1'>
            <div className='space-y-6'>
              {/* Contact Cards */}
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className={`${info.bgColor} ${info.borderColor} border rounded-xl p-6 hover:shadow-md transition-shadow`}
                  >
                    <div className='flex items-start space-x-4'>
                      <div
                        className={`${info.color} p-3 rounded-lg bg-white shadow-sm`}
                      >
                        <Icon className='h-6 w-6' />
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-semibold text-gray-900 mb-1'>
                          {info.title}
                        </h3>
                        <p className='text-gray-700 font-medium'>
                          {info.details}
                        </p>
                        <p className='text-sm text-gray-500 mt-1'>
                          {info.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Social Media */}
              <div className='bg-white border border-gray-200 rounded-xl p-6'>
                <h3 className='font-semibold text-gray-900 mb-4'>Follow Us</h3>
                <div className='flex space-x-4'>
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className={`p-3 rounded-lg bg-gray-50 text-gray-600 ${social.color} hover:bg-gray-100 transition-all duration-200`}
                        aria-label={social.label}
                      >
                        <Icon className='h-5 w-5' />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Help Section */}
              <div className='bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6'>
                <div className='flex items-start space-x-3'>
                  <HelpCircle className='h-6 w-6 text-blue-600 mt-0.5' />
                  <div>
                    <h3 className='font-semibold text-blue-900 mb-2'>
                      Need Quick Help?
                    </h3>
                    <p className='text-blue-700 text-sm mb-3'>
                      Check out our typing tips and guides to improve your typing speed and accuracy.
                    </p>
                    <Link
                      to='/'
                      className='inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors'
                    >
                      Explore Typingo
                      <ArrowLeft className='h-4 w-4 ml-1 rotate-180' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-xl shadow-lg p-8'>
              <div className='mb-6'>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                  Send us a Message
                </h2>
                <p className='text-gray-600'>
                  Fill out the form below and we'll get back to you within 24 hours. Whether you have questions about features, found a bug, or have suggestions to improve Typingo, we're here to help!
                </p>
              </div>

              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Name and Email */}
                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Full Name *
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                      placeholder='Enter your full name'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Email Address *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                      placeholder='Enter your email address'
                    />
                  </div>
                </div>

                {/* Subject and Category */}
                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='subject'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Subject
                    </label>
                    <input
                      type='text'
                      id='subject'
                      name='subject'
                      value={formData.subject}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                      placeholder='Brief subject line'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='category'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Category *
                    </label>
                    <select
                      id='category'
                      name='category'
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                    >
                      {categories.map(category => {
                        return (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Message *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none'
                    placeholder='Tell us about your question, suggestion, or issue...'
                  />
                  <p className='text-sm text-gray-500 mt-2'>
                    Please provide as much detail as possible to help us assist you better.
                  </p>
                </div>

                {/* Submit Button */}
                <div className='pt-4'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className='h-5 w-5 mr-2' />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Additional Info */}
              <div className='mt-8 pt-6 border-t border-gray-200'>
                <div className='bg-gray-50 rounded-lg p-4'>
                  <h3 className='font-medium text-gray-900 mb-2'>
                    Response Time
                  </h3>
                  <p className='text-sm text-gray-600'>
                    We typically respond to all inquiries within 24 hours during business days. Your feedback helps us make Typingo better for everyone!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default Contact;

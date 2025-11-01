"use client";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import FillButton from "@/components/FillButton/FillButton";
import Footer from "@/components/Footer/Footer";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
import { useHeaderHeight } from "@/hooks/useHeaderHeight";
import { motion } from "framer-motion";
import { fadeInUp, growFromLeft } from "@/utils/animations";
import Lenis from "lenis";
export default function Contact() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = "service_x2xgt25";
  const EMAILJS_TEMPLATE_ID = "template_cm1pz4g";
  const EMAILJS_PUBLIC_KEY = "AdkxUJyU7D8FxH6T5";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setIsSubmitted(false);
    setShowError(false);
    setShowSuccess(false);

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.message) {
        setError("Please fill in all fields");
        setShowError(true);
        setIsLoading(false);
        // Fade out error after 3 seconds
        setTimeout(() => {
          setShowError(false);
          setTimeout(() => setError(null), 300); // Clear after fade animation
        }, 3000);
        return;
      }

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // Mark as successfully submitted
      setIsSubmitted(true);
      setShowSuccess(true);

      // Clear form after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      // Fade out success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setTimeout(() => setIsSubmitted(false), 300); // Clear after fade animation
      }, 3000);
    } catch (err) {
      setError(
        err.message || "Failed to send message. Please try again."
      );
      setShowError(true);
      console.error("EmailJS Error:", err);
      // Fade out error after 3 seconds
      setTimeout(() => {
        setShowError(false);
        setTimeout(() => setError(null), 300); // Clear after fade animation
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const headerHeight = useHeaderHeight();

  return (
    <div className='w-full bg-white'>
      <div className='h-[calc(100vh-28px)] flex flex-col'>
        <div className='flex flex-col flex-1 min-h-0'>
          <motion.div
            className='section-spacing h1 flex-shrink-0'
            // {...fadeInUp}
          >
            We're excited to collaborate.
          </motion.div>

          <motion.div
            className='flex flex-col flex-1 min-h-0 w-full'
            // {...fadeInUp}
            // transition={{
            //   duration: 0.6,
            //   ease: "easeOut",
            //   delay: 0.2,
            // }}
          >
          {/* Name Field */}
          <div className='flex-shrink-0'>
            <motion.div
              className='h-[1px] w-full bg-black'
              // {...growFromLeft}
              // transition={{
              //   duration: 0.6,
              //   ease: "easeInOut",
              //   delay: 0.3,
              // }}
            />
            <input
              type='text'
              name='name'
              placeholder='NAME'
              value={formData.name}
              onChange={handleChange}
              className='w-full pb-1 pt-2 h2 placeholder-[#838383] bg-transparent border-none outline-none focus:ring-0'
            />
            <motion.div
              className='h-[1px] w-full bg-black'
              // {...growFromLeft}
              // transition={{
              //   duration: 0.6,
              //   ease: "easeInOut",
              //   delay: 0.4,
              // }}
            />
          </div>
          {/* Email Field */}
          <div className='flex-shrink-0'>
            <input
              type='email'
              name='email'
              placeholder='EMAIL'
              value={formData.email}
              onChange={handleChange}
              className='w-full pb-1 pt-2 h2 placeholder-[#838383] bg-transparent border-none outline-none focus:ring-0'
            />
            <motion.div
              className='h-[1px] w-full bg-black'
              // {...growFromLeft}
              // transition={{
              //   duration: 0.6,
              //   ease: "easeInOut",
              //   delay: 0.5,
              // }}
            />
          </div>
          {/* Message Field */}
          <div className='flex-1 flex flex-col min-h-0'>
            <textarea
              name='message'
              placeholder='How can we help?'
              value={formData.message}
              onChange={handleChange}
              className='pt-2 w-full h-full resize-none placeholder-[#838383] h2 bg-transparent border-none outline-none focus:ring-0'
            />
            <motion.div
              className='h-[1px] w-full bg-black flex-shrink-0'
              // {...growFromLeft}
              // transition={{
              //   duration: 0.6,
              //   ease: "easeInOut",
              //   delay: 0.6,
              // }}
            />
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <motion.div
              className='text-green-600 mt-4 h2 flex-shrink-0'
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: showSuccess ? 1 : 0,
                y: showSuccess ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
            >
              Thank you! Your message has been sent successfully.
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              className='text-red-500 mt-4 h2 flex-shrink-0'
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: showError ? 1 : 0,
                y: showError ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div
            className='w-full mt-5 grid grid-cols-12 gap-[14px] flex-shrink-0'
            onClick={
              !isLoading && !isSubmitted ? handleSubmit : undefined
            }
            // {...fadeInUp}
            // viewport={{ once: true, margin: "0px" }}
            // transition={{
            //   duration: 0.6,
            //   ease: "easeOut",
            //   delay: 0.7,
            // }}
          >
            <div className='md:col-span-2 col-span-4 w-full h-full flex items-center'>
              <FillButton
                text={
                  isLoading
                    ? "Sending..."
                    : isSubmitted
                      ? "Message Sent!"
                      : "Submit"
                }
                className={`w-full h-full text-center ${
                  isSubmitted ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            </div>
          </motion.div>
        </motion.div>
        </div>
      </div>

      <motion.div
        className='mt-[120px] grid grid-cols-12 gap-[14px]'
        // {...fadeInUp}
        // transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
      >
        <motion.div
          className='lg:col-start-7 col-span-6 md:col-span-4 lg:col-span-3 w-full h-full aspect-[4/5]'
          // {...fadeInUp}
          // transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
        >
          <img
            src='images/jeff.png'
            className='object-cover w-full h-full'
            alt=''
          />
        </motion.div>
        <motion.div
          className='lg:col-start-10 lg:col-span-3 col-span-6'
          // {...fadeInUp}
          // transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
        >
          <div className='flex flex-col gap-2'>
            <div>
              <p className='eyebrow'>General Inquiries</p>
              <ArrowLink
                link='mailto:info@auw.studio'
                text='info@auw.studio'
              />
            </div>
            <div>
              <p className='eyebrow'>Follow Us</p>
              <div className='flex flex-col'>
                <ArrowLink
                  link='https://www.instagram.com/aunifiedwhole/'
                  text='Instagram'
                />
                <ArrowLink
                  link='https://www.linkedin.com/company/aunifiedwhole/'
                  text='LinkedIn'
                />
                <ArrowLink
                  link='https://www.substack.com/profile/143636563-aunifiedwhole'
                  text='Substack'
                />
              </div>
            </div>
            <div>
              <p className='eyebrow'>Founded by</p>
              <div className='external-link'>Jeff Visoky</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import FillButton from "@/components/FillButton/FillButton";
import Footer from "@/components/Footer/Footer";
import ArrowLink from "@/components/ArrowLink/ArrowLink";
import { useHeaderHeight } from "@/hooks/useHeaderHeight";
import { motion } from "framer-motion";
import { fadeInUp, growFromLeft } from "@/utils/animations";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Please fill in all fields");
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

      // Clear form after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      alert("Thank you! Your message has been sent successfully.");
    } catch (err) {
      setError(
        err.message || "Failed to send message. Please try again."
      );
      console.error("EmailJS Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const headerHeight = useHeaderHeight();

  // Ensure page scrolls to top on mount
  useEffect(() => {
    // Use setTimeout to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='w-full h-full bg-white'>
      <div className='flex flex-col min-h-screen'>
        <div
          style={{ height: "calc(100vh - 28px)" }}
          className='flex flex-col relative'
        >
          <motion.div
            className='h1 text-26 flex-grow items-center flex h-full lg:margin-top lg:margin-bottom'
            {...fadeInUp}
          >
            We're excited to collaborate.
          </motion.div>

          <motion.div
            className='space-y-2 h-full'
            {...fadeInUp}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            {/* Name Field */}
            <div className=''>
              <motion.div
                className='h-[1px] w-full bg-black'
                {...growFromLeft}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              />
              <input
                type='text'
                name='name'
                placeholder='NAME'
                value={formData.name}
                onChange={handleChange}
                className='w-full pb-1 pt-2 h1 placeholder-[#838383] bg-transparent border-none outline-none focus:ring-0'
              />
              <motion.div
                className='h-[1px] w-full bg-black'
                {...growFromLeft}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              />
            </div>

            {/* Email Field */}
            <div className=''>
              <input
                type='email'
                name='email'
                placeholder='EMAIL'
                value={formData.email}
                onChange={handleChange}
                className='w-full pb-1 pt-0 h1 placeholder-[#838383] bg-transparent border-none outline-none focus:ring-0'
              />
              <motion.div
                className='h-[1px] w-full bg-black'
                {...growFromLeft}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </div>

            {/* Message Field */}
            <div>
              <textarea
                name='message'
                placeholder='How can we help?'
                value={formData.message}
                onChange={handleChange}
                rows='8'
                // rows={window.innerWidth < 1536 ? "10" : "8"}
                className='w-full h-full placeholder-[#838383] h1 bg-transparent border-none outline-none focus:ring-0 resize-none'
              />
              <motion.div
                className='h-[1px] w-full bg-black'
                {...growFromLeft}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className='text-red-500 mt-4'>{error}</div>
            )}

            {/* Submit Button */}
            <motion.div
              className='w-full mt-5 grid grid-cols-12 gap-[14px]'
              onClick={!isLoading ? handleSubmit : undefined}
              {...fadeInUp}
              viewport={{ once: true, margin: "0px" }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.7,
              }}
            >
              <div className='md:col-span-2 col-span-4'>
                <FillButton
                  className='w-full flex text-center'
                  text={isLoading ? "Sending..." : "Submit"}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className='grid grid-cols-12 gap-[14px]'
        {...fadeInUp}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
      >
        <motion.div
          className='lg:col-start-7 col-span-6 md:col-span-4 lg:col-span-3 w-full h-full aspect-[4/5]'
          {...fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
        >
          <img
            src='images/jeff.png'
            className='object-cover w-full h-full'
            alt=''
          />
        </motion.div>
        <motion.div
          className='lg:col-start-10 lg:col-span-3 col-span-6'
          {...fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
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

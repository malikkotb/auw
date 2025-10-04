"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import FillButton from "@/components/FillButton/FillButton";
import Footer from "@/components/Footer/Footer";

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

  return (
    <div className='w-full h-full'>
      <div className='h1 margin-top margin-bottom'>
        We're excited to collaborate.
      </div>
      <div className='space-y-2'>
        {/* Name Field */}
        <div className='border-b border-black'>
          <input
            type='text'
            name='name'
            placeholder='NAME'
            value={formData.name}
            onChange={handleChange}
            className='w-full h1 placeholder-[#838383] bg-transparent border-none outline-none focus:ring-0'
          />
        </div>

        {/* Email Field */}
        <div className='border-b border-black'>
          <input
            type='email'
            name='email'
            placeholder='EMAIL'
            value={formData.email}
            onChange={handleChange}
            className='w-full h1 placeholder-[#838383] bg-transparent border-none outline-none focus:ring-0'
          />
        </div>

        {/* Message Field */}
        <div>
          <div className='border-b border-black'>
            <textarea
              name='message'
              placeholder='I would love to work with you on a specific project. Are
            you free tomorrow to chat?'
              value={formData.message}
              onChange={handleChange}
              rows='6'
              className='w-full placeholder-[#838383] h1 bg-transparent border-none outline-none focus:ring-0 resize-none'
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <div className='text-red-500 mt-4'>{error}</div>}
      </div>
      {/* Submit Button */}
      <div
        className='w-full mt-5'
        onClick={!isLoading ? handleSubmit : undefined}
      >
        <FillButton text={isLoading ? "Sending..." : "Submit"} />
      </div>
      <Footer />
    </div>
  );
}

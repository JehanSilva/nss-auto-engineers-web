"use client";
import { useState, FormEvent } from "react";
import { Phone, MapPin, Clock, CheckCircle, Send } from "lucide-react";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@nssauto.lk", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      alert("Something went wrong. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-12 bg-white">
      <div className="max-w-[1100px] mx-auto px-4">
        <h3 className="text-2xl font-bold mb-2">Contact Us</h3>
        <p className="text-gray-600 mb-8">Call, email or send us a message below.</p>

        <div className="grid md:grid-cols-[1fr_320px] gap-8">
          {/* Form Area */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Mail Sent!</h4>
                <p className="text-gray-600 max-w-sm">
                  Thank you for contacting us. We will get back to you soon. For a faster response, please call us at 071 618 8187 or WhatsApp us at 071 618 8187.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-md font-medium transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send Another Email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="hidden" name="_subject" value="New Contact Form Submission - NSS Auto Web" />
                <input type="hidden" name="_captcha" value="false" />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input name="name" type="text" required className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input name="email" type="email" required className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input name="phone" type="tel" className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea name="message" rows={4} required className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-accent text-white py-2.5 px-4 rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Info Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit">
            <h4 className="font-bold text-lg mb-6">Workshop Info</h4>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="text-accent shrink-0" />
                <div>
                  <strong className="block text-gray-900 text-sm">Location</strong>
                  <p className="text-gray-600 text-sm">Negombo - Colombo Main Rd, Ja-Ela</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Phone className="text-accent shrink-0" />
                <div>
                  <strong className="block text-gray-900 text-sm">Phone</strong>
                  <a href="tel:+94716188187" className="text-gray-600 text-sm hover:text-accent font-semibold">+94 71 618 8187</a>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="text-accent shrink-0" />
                <div>
                  <strong className="block text-gray-900 text-sm">Working Hours</strong>
                  <p className="text-gray-600 text-sm">Mon - Sat: 8:30am — 6:00pm</p>
                  <p className="text-gray-500 text-xs">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
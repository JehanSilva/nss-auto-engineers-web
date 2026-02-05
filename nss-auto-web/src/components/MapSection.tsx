export default function MapSection() {
  return (
    <section id="map" className="py-12">
      <div className="max-w-[1100px] mx-auto px-4">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Find Us</h3>
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d416.17393734958443!2d79.89015194780976!3d7.086985605361363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f132136fca39%3A0xb7b2b649b46c9c6e!2sNSS%20Auto%20Engineers!5e0!3m2!1sen!2slk!4v1762264646917!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
      </div>
    </section>
  );
}

import Image from "next/image";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/94716188187"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 bg-[#25d366] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        width={32}
        height={32}
      />
    </a>
  );
}
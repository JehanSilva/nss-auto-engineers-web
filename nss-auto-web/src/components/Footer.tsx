export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-200 bg-white">
      <div className="max-w-[1100px] mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} NSS Auto Engineers — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
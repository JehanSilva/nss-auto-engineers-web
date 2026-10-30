import Navbar from "@/components/Navbar";

// Shown instantly while a part page loads
export default function SparePartLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="pt-28 pb-16 bg-white" aria-busy="true" aria-label="Loading spare part">
        <div className="max-w-[1100px] mx-auto px-4 animate-pulse">
          <div className="h-12 max-w-2xl mx-auto bg-gray-100 rounded-xl mb-8" />
          <div className="h-4 w-64 bg-gray-100 rounded mb-8" />

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="h-72 md:h-[420px] bg-gray-100 rounded-xl" />
            <div className="space-y-4">
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="h-8 w-4/5 bg-gray-200 rounded" />
              <div className="h-4 w-40 bg-gray-100 rounded" />
              <div className="h-7 w-24 bg-gray-100 rounded-full" />
              <div className="flex gap-2 pt-4">
                <div className="h-8 w-28 bg-gray-100 rounded-full" />
                <div className="h-8 w-28 bg-gray-100 rounded-full" />
              </div>
              <div className="flex gap-3 pt-4">
                <div className="h-12 w-44 bg-gray-100 rounded-full" />
                <div className="h-12 w-44 bg-gray-100 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

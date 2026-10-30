import Navbar from "@/components/Navbar";

// Shown instantly while the catalog loads, so clicking "Browse Spare Parts" responds right away
export default function SparePartsLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-20 bg-white" aria-busy="true" aria-label="Loading spare parts">
        <div className="max-w-[1100px] mx-auto px-4 animate-pulse">
          <div className="mb-12 flex flex-col items-center">
            <div className="h-10 w-3/4 max-w-xl bg-gray-200 rounded-lg mb-5" />
            <div className="h-4 w-full max-w-2xl bg-gray-100 rounded mb-2" />
            <div className="h-4 w-2/3 max-w-lg bg-gray-100 rounded mb-8" />
            <div className="h-14 w-full max-w-2xl bg-gray-100 rounded-xl border border-gray-100" />
          </div>

          <div className="h-4 w-40 bg-gray-200 rounded mb-5" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-12">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="h-[72px] bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 p-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-2.5 bg-gray-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-36 sm:h-56 bg-gray-100" />
                <div className="p-3 sm:p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-4/5" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-9 bg-gray-100 rounded-full" />
                  <div className="h-9 bg-gray-100 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

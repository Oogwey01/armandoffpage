// Skeletons con shimmer — match visual aproximado al layout real de cada sección

function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-xl ${className}`}
    />
  );
}

export function StatsSkeleton() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-brand-gray">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-4">
          <Shimmer className="h-4 w-32" />
          <Shimmer className="h-20 w-full" />
          <Shimmer className="h-5 w-2/3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Shimmer key={i} className="h-40 w-full rounded-2xl" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 hidden lg:block">
          <Shimmer className="h-[480px] w-full rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

export function ContentIntroSkeleton() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-brand-black">
      <div className="container-custom">
        <div className="text-center mb-12 space-y-3">
          <Shimmer className="h-4 w-40 mx-auto" />
          <Shimmer className="h-12 w-80 mx-auto" />
          <Shimmer className="h-5 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <Shimmer key={i} className="h-48 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingSkeleton() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-brand-gray">
      <div className="container-custom">
        <div className="text-center mb-10 space-y-3">
          <Shimmer className="h-4 w-32 mx-auto" />
          <Shimmer className="h-5 w-2/3 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <Shimmer key={i} className="h-[640px] w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function VideoShowcaseSkeleton() {
  return (
    <>
      {/* Mobile: 3 carruseles horizontales */}
      <section className="relative md:hidden py-12 overflow-hidden space-y-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <div className="mb-6 px-5 space-y-2">
              <Shimmer className="h-3 w-32 mx-auto" />
              <Shimmer className="h-6 w-64 mx-auto" />
            </div>
            <div className="flex gap-4 overflow-hidden pb-4 px-5">
              {Array.from({ length: 3 }).map((_, j) => (
                <Shimmer key={j} className="shrink-0 w-[72vw] max-w-[260px] aspect-[9/16] rounded-2xl" />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Desktop: triple deck sticky */}
      <div className="hidden md:block h-screen">
        <div className="relative h-full overflow-hidden flex flex-col">
          <div className="h-[3px] bg-white/10" />
          <div className="flex-none pt-24 pb-2 px-6 flex">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-1/3 text-center space-y-2">
                <Shimmer className="h-3 w-24 mx-auto" />
                <Shimmer className="h-8 w-56 mx-auto" />
              </div>
            ))}
          </div>
          <div className="flex-1 flex px-6 pb-6 gap-4 items-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-1/3 flex items-center justify-center">
                <Shimmer className="aspect-[9/16] h-[88%] max-h-full rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function BrandLogosSkeleton() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-14 md:py-20 border-y border-white/5">
      <div className="container-custom text-center max-w-3xl mx-auto space-y-4">
        <Shimmer className="h-3 w-48 mx-auto" />
        <Shimmer className="h-10 w-80 mx-auto" />
        <Shimmer className="h-4 w-96 mx-auto" />
      </div>
    </section>
  );
}

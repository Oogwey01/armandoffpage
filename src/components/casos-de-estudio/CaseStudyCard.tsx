import type { CaseStudy } from "@/lib/types";

export default function CaseStudyCard({ data }: { data: CaseStudy }) {
  return (
    <div className="bg-brand-gray/50 border border-brand-beige/20 rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-brand-gray border-2 border-brand-beige/40 flex items-center justify-center shrink-0">
          <span className="font-barlow font-bold text-sm text-brand-beige">
            {data.avatarInitials}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-barlow font-bold text-white text-sm leading-tight truncate">
            {data.name}
          </p>
          <span className="font-montserrat text-xs text-brand-beige/80 bg-brand-beige/10 border border-brand-beige/20 rounded-full px-2 py-0.5 inline-block">
            {data.brandName}
          </span>
        </div>
      </div>

      {/* Result headline */}
      <p className="font-barlow font-black text-3xl sm:text-4xl text-brand-beige leading-none">
        {data.result}
      </p>

      {/* Story */}
      <p className="font-montserrat text-sm text-gray-300 leading-relaxed flex-1">
        {data.story}
      </p>

      {/* Metrics */}
      {data.metrics && data.metrics.length > 0 && (
        <div className="grid grid-cols-3 gap-2 bg-brand-black/40 rounded-xl p-3">
          {data.metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <p className="font-barlow font-black text-lg text-brand-beige leading-tight">
                {metric.value}
              </p>
              <p className="font-montserrat text-[10px] text-gray-500 leading-tight mt-0.5">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-white/5">
        <span className="font-montserrat text-xs text-gray-500">{data.date}</span>
        {data.category && (
          <span className="font-montserrat text-xs text-gray-400">
            {data.category}
          </span>
        )}
      </div>
    </div>
  );
}

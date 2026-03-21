import { StarIcon } from "@/components/common/Icons";
import type { WrittenReview } from "@/lib/types";

export default function WrittenReviewCard({ data }: { data: WrittenReview }) {
  return (
    <div className="bg-brand-gray/50 border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
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
          <p className="font-montserrat text-xs text-gray-400 truncate">
            {data.role}
          </p>
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className="w-4 h-4"
            filled={i < data.rating}
          />
        ))}
      </div>

      {/* Review */}
      <p className="font-montserrat text-sm text-gray-300 leading-relaxed flex-1">
        {data.review}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-white/5">
        <span className="font-montserrat text-xs text-gray-500">{data.date}</span>
        {data.source && (
          <span className="font-montserrat text-xs text-brand-beige/70 bg-brand-beige/10 border border-brand-beige/20 rounded-full px-2 py-0.5">
            {data.source}
          </span>
        )}
      </div>
    </div>
  );
}

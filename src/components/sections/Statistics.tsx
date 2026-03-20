"use client";

import { STATS } from "@/lib/constants";
import { Stat } from "@/lib/types";
import { useCountUp } from "@/hooks/useCountUp";

function StatCard({ stat }: { stat: Stat }) {
  const { count, ref } = useCountUp(stat.value);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl md:text-4xl lg:text-5xl font-akira font-black text-brand-beige">
        {count}
        {stat.suffix}
      </p>
      <p className="text-sm uppercase tracking-wider text-gray-400 font-barlow mt-2">
        {stat.label}
      </p>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="section-padding bg-brand-black border-y border-brand-beige/10">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

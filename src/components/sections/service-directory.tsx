"use client";

import { useState } from "react";
import {
  serviceCategories as sourceServiceCategories,
  type ServiceCategory
} from "@/lib/services/catalog";

export function ServiceDirectory({
  categories = sourceServiceCategories
}: {
  categories?: ServiceCategory[];
}) {
  const [selected, setSelected] = useState(0);
  const category = categories[selected] || categories[0];
  return (
    <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
      <div className="space-y-2">
        {categories.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
            className={`w-full rounded-md border px-4 py-4 text-left transition-colors ${selected === index ? "border-forest bg-surface-muted text-ink" : "border-border text-muted hover:border-forest hover:text-ink"}`}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-olive">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mt-2 block font-semibold">{item.name}</span>
          </button>
        ))}
      </div>
      <div id={category.slug} className="rounded-md border border-border bg-surface p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-olive">Explore category</p>
        <h2 className="mt-3 font-serif text-4xl">{category.name}</h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted">{category.description}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {category.services.map((service) => (
            <div
              key={service.slug}
              className="border-t border-border py-4"
            >
              <span className="font-semibold">{service.title}</span>
              <span className="mt-2 block text-sm leading-6 text-muted">{service.summary}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

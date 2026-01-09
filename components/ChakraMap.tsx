"use client"
import { CHAKRAS } from "@/components/data/chakras"
import { useState } from "react"

export default function ChakraMap() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="border p-4 rounded space-y-3">
      <h3 className="font-semibold">Melakarta Chakra Map</h3>

      <div className="grid grid-cols-3 gap-3">
        {CHAKRAS.map((c, i) => (
          <div key={c.name}
            onClick={() => setActive(i)}
            className={`cursor-pointer p-3 rounded text-center
              ${active === i ? "bg-gray-200" : "bg-gray-100"}`}>
            <div className="font-semibold">{c.name}</div>
            <div className="text-xs">{c.numbers.join(", ")}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

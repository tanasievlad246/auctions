import { StatsCard } from "@/components/stats-card";
import { Truck, Trophy, Euro } from "lucide-react"

export default async function Home() {
  return (
    <main>
      <div className="flex flex-row gap-4 justify-between w-full px-5 py-2">
        <StatsCard
          title="Revenue"
          value={1000}
          icon={<Truck />}
          color="blue"
          description="Total revenue"
        />
        <StatsCard
          title="Revenue"
          value={1000}
          icon={<Trophy />}
          color="blue"
          description="Total revenue"
        />
        <StatsCard
          title="Revenue"
          value={1000}
          icon={<Euro />}
          color="blue"
          description="Total revenue"
        />
      </div>
    </main>
  )
}

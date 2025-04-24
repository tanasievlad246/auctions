import { AuctionsListTable } from "@/components/AuctionsListTable";
import AuctionsSearchForm from "@/components/AuctionsSearchForm";
import { StatsCard } from "@/components/stats-card";
import { Truck, Trophy, Euro } from "lucide-react"

export default async function Home() {
  return (
    <main className="h-full flex flex-col gap-4 w-full overflow-hidden">
      <div className="flex flex-row gap-4 justify-between w-full px-5 pt-4 flex-shrink-0">
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
      {/* <div className="px-5 py-2 flex-shrink-0">
        <AuctionsSearchForm />
      </div> */}
      <div className="px-5 pb-5 flex-1 overflow-hidden flex flex-col min-h-0">
        <AuctionsListTable />
      </div>
    </main>
  )
}

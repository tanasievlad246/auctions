"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Define the shipment data type
interface Shipment {
    id: string
    title: string
    pickupLocation: string
    pickupTime: string
    dropoffLocation: string
    loadingsCount?: number
    unloadingsCount?: number
    dropoffTime: string
    weight: string
    space: string
    totalKm: string
    price: string
}

function mapShipmentToTableRow(shipment: any): Shipment {
    return ({
        id: shipment.id,
        title: shipment.title,
        pickupLocation: `${shipment.loadings[0].country} ${shipment.loadings[0].city}`,
        loadingsCount: shipment.loadings.length,
        pickupTime: shipment.startDate,
        dropoffLocation: `${shipment.unloadings[0].country} ${shipment.unloadings[0].city}`,
        dropoffTime: shipment.endDate,
        unloadingsCount: shipment.unloadings.length,
        weight: "0",
        space: "0",
        totalKm: "0",
        price: `${shipment.startingPrice} €`,
    })
}

export function AuctionsListTable() {
    const [page, setPage] = React.useState(1)
    const [pageSize, setPageSize] = React.useState(5)
    const [totalPages, setTotalPages] = React.useState(4)
    const [loading, setLoading] = React.useState(false)
    const [shipments, setShipments] = React.useState<Shipment[]>([])

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response = await fetch('/api/auctions');
            const { data } = await response.json();
            console.log(data);
            setShipments(data.auctions.nodes.map(mapShipmentToTableRow));
            setTotalPages(data.auctions.totalCount / data.auctions.nodes.length)
            await new Promise(resolve => setTimeout(resolve, 500))
            setLoading(false)
        }

        fetchData()
    }, [page, pageSize])

    // Handle page change
    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1)
        }
    }

    const handlePageSizeChange = (value: string) => {
        setPageSize(Number(value))
        setPage(1)
    }

    const handleViewDetails = (id: string) => {
        console.log(`View details for shipment ${id}`)
    }

    const handleEditShipment = (id: string) => {
        console.log(`Edit shipment ${id}`)
    }

    const handleDeleteShipment = (id: string) => {
        console.log(`Delete shipment ${id}`)
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="rounded-md border flex-1 overflow-auto">
                <Table>
                    <TableHeader className="sticky top-0 bg-background z-10">
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Pickup Location</TableHead>
                            <TableHead>Pickup Time</TableHead>
                            <TableHead>Total Loadings</TableHead>
                            <TableHead>Dropoff Location</TableHead>
                            <TableHead>Dropoff Time</TableHead>
                            <TableHead>Total Unloadings</TableHead>
                            <TableHead>Weight</TableHead>
                            <TableHead>Space (m³)</TableHead>
                            <TableHead>Total KM</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="sticky right-0 bg-background">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={10} className="h-24 text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : shipments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={10} className="h-24 text-center">
                                    No shipments found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            shipments.map((shipment) => (
                                <TableRow key={shipment.id}>
                                    <TableCell>{shipment.title}</TableCell>
                                    <TableCell>{shipment.pickupLocation}</TableCell>
                                    <TableCell>{shipment.pickupTime}</TableCell>
                                    <TableCell>{shipment.loadingsCount}</TableCell>
                                    <TableCell>{shipment.dropoffLocation}</TableCell>
                                    <TableCell>{shipment.dropoffTime}</TableCell>
                                    <TableCell>{shipment.unloadingsCount}</TableCell>
                                    <TableCell>{shipment.weight}</TableCell>
                                    <TableCell>{shipment.space}</TableCell>
                                    <TableCell>{shipment.totalKm}</TableCell>
                                    <TableCell>{shipment.price}</TableCell>
                                    <TableCell className="sticky right-0 bg-background">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Open menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => handleViewDetails(shipment.id)}
                                                >
                                                    View details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleEditShipment(shipment.id)}
                                                >
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDeleteShipment(shipment.id)}
                                                    className="text-red-600"
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between mt-4 flex-shrink-0">
                <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground">
                        Show
                    </p>
                    <Select
                        value={String(pageSize)}
                        onValueChange={handlePageSizeChange}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={pageSize} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">entries</p>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePreviousPage}
                        disabled={page <= 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="ml-1">Previous</span>
                    </Button>
                    <div className="flex items-center">
                        {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
                            <Button
                                key={i}
                                variant={page === i + 1 ? "default" : "outline"}
                                size="sm"
                                className="h-8 w-8 mx-1"
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={page >= totalPages}
                    >
                        <span className="mr-1">Next</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
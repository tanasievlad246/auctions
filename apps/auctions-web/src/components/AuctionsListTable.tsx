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
import { useQuery, gql } from "@apollo/client"
import { useUser } from "@auth0/nextjs-auth0"

// Define the shipment data type
interface Shipment {
    id: string
    title: string
    pickupLocation: string
    pickupTime: string
    dropoffLocation: string
    dropoffTime: string
    weight: string
    space: string
    totalKm: string
    price: string
}

export function AuctionsListTable() {
    // State for pagination and table data
    const [page, setPage] = React.useState(1)
    const [pageSize, setPageSize] = React.useState(5)
    const [totalPages, setTotalPages] = React.useState(4)
    const [loading, setLoading] = React.useState(false)
    const [shipments, setShipments] = React.useState<Shipment[]>([
        {
            id: "1",
            title: "Furniture Transport",
            pickupLocation: "Berlin, DE",
            pickupTime: "2025-03-15 09:00",
            dropoffLocation: "Paris, FR",
            dropoffTime: "2025-03-16 14:00",
            weight: "2500 kg",
            space: "15",
            totalKm: "1050",
            price: "1850€"
        },
        {
            id: "2",
            title: "Electronics Delivery",
            pickupLocation: "Madrid, ES",
            pickupTime: "2025-03-15 10:30",
            dropoffLocation: "Lisbon, PT",
            dropoffTime: "2025-03-15 18:00",
            weight: "1800 kg",
            space: "12",
            totalKm: "625",
            price: "980€"
        },
        {
            id: "3",
            title: "Medical Supplies",
            pickupLocation: "Amsterdam, NL",
            pickupTime: "2025-03-16 08:15",
            dropoffLocation: "Brussels, BE",
            dropoffTime: "2025-03-16 13:30",
            weight: "950 kg",
            space: "8",
            totalKm: "210",
            price: "650€"
        },
        {
            id: "4",
            title: "Clothing Shipment",
            pickupLocation: "Milan, IT",
            pickupTime: "2025-03-17 07:45",
            dropoffLocation: "Vienna, AT",
            dropoffTime: "2025-03-18 11:00",
            weight: "1250 kg",
            space: "9",
            totalKm: "890",
            price: "1200€"
        },
        {
            id: "5",
            title: "Automotive Parts",
            pickupLocation: "Stuttgart, DE",
            pickupTime: "2025-03-18 09:30",
            dropoffLocation: "Munich, DE",
            dropoffTime: "2025-03-18 15:45",
            weight: "3200 kg",
            space: "18",
            totalKm: "220",
            price: "780€"
        }
    ])

    // Simulate a server request when page or pageSize changes
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            // Simulate API call delay
            const response = await fetch('/api/auctions');
            console.log(await response.json());
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

    // Handle page size change
    const handlePageSizeChange = (value: string) => {
        setPageSize(Number(value))
        setPage(1) // Reset to first page when changing page size
    }

    // Handle shipment actions
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
                            <TableHead>Dropoff Location</TableHead>
                            <TableHead>Dropoff Time</TableHead>
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
                                    <TableCell>{shipment.dropoffLocation}</TableCell>
                                    <TableCell>{shipment.dropoffTime}</TableCell>
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
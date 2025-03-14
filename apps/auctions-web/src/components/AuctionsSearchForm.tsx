"use client"

import { useState } from "react";
import { GenericDatePicker } from "./ui/date-picker";
import { DefaultSelect } from "./ui/default-select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { SearchIcon } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useSearchParams, useRouter } from "next/navigation";

interface ISearchFormData {
    pickupDate: Date;
    pickupCountry: string;
    pickupCity: string;
    priceRange: number[];
    deliveryDate: Date;
    deliveryCountry: string;
    deliveryCity: string;
    kmRange: number[];
}

export default function AuctionsSearchForm() {
    const [searchFormData, setSearchFormData] = useState<ISearchFormData>({
        pickupDate: new Date(),
        pickupCountry: '',
        pickupCity: '',
        priceRange: [],
        deliveryDate: new Date(),
        deliveryCountry: '',
        deliveryCity: '',
        kmRange: [],
    });
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleFormUpdate = (key: string, value: any) => {
        console.log(key, value);
        setSearchFormData({
            ...searchFormData,
            [key]: value,
        });
    }

    const handleSearch = (e: any) => {
        e.preventDefault();

        const params = new URLSearchParams(searchParams.toString());

        for (const [key, value] of Object.entries(searchFormData)) {
            if (value) {
                params.append(key, value);
            }
        }
        console.log(params.toString());
        router.push(`?${params.toString()}`);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* <button className="flex flex-row justify-center items-center gap-1.5 border border-gray-200 rounded-md px-2 py-1 text-white font-sans bg-black font-bold">Filter Search <SearchIcon size={18} /></button> */}
                <Button>Filter Search <SearchIcon /></Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-4 min-w-[100rem] px-14">
                <DialogHeader className="pb-5">
                    <DialogTitle className="text-2xl font-bold">Search for Transport Auctions</DialogTitle>
                    <DialogDescription>
                        Use the form below to search for transport auctions based on your criteria.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-row gap-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Pickup Date</Label>
                        <GenericDatePicker className="w-full" onDateChange={(e) => console.log(e)} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Pickup Country</Label>
                        <DefaultSelect className="w-full" label="Pickup Country" items={[]} onChange={(e) => console.log(e)} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Pickup City</Label>
                        <DefaultSelect className="w-full" label="Pickup City" items={[]} onChange={(e) => console.log(e)} />
                    </div>
                    <div className="flex flex-row gap-4 w-full">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="minPriceRange">Start Price</Label>
                            <Input id="minPriceRange" type="number" placeholder="Starting Price" value={searchFormData.priceRange[0]} onChange={(e) => handleFormUpdate('priceRange', [e.target.value, searchFormData.priceRange[1]])} />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="maxPriceRange">Max Price</Label>
                            <Input id="maxPriceRange" type="number" placeholder="Maximum Price" value={searchFormData.priceRange[1]} onChange={(e) => handleFormUpdate('priceRange', [searchFormData.priceRange[0], e.target.value])} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Delivery Date</Label>
                        <GenericDatePicker className="w-full" onDateChange={(e) => console.log(e)} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Delivery Country</Label>
                        <DefaultSelect className="w-full" label="Pickup Country" items={[]} onChange={(e) => console.log(e)} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Delivery City</Label>
                        <DefaultSelect className="w-full" label="Pickup City" items={[]} onChange={(e) => console.log(e)} />
                    </div>
                    <div className="flex flex-row gap-4 w-full">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="minKmDistance">Start KM</Label>
                            <Input id="minKmDistance" type="number" placeholder="Starting Price" value={searchFormData.priceRange[0]} onChange={(e) => handleFormUpdate('priceRange', [e.target.value, searchFormData.priceRange[1]])} />
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="maxKmDistance">Start KM</Label>
                            <Input id="maxKmDistance" type="number" placeholder="Maximum Price" value={searchFormData.priceRange[1]} onChange={(e) => handleFormUpdate('priceRange', [searchFormData.priceRange[0], e.target.value])} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSearch}>Search <SearchIcon /></Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
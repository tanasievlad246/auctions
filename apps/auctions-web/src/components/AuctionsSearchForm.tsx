"use client"

import { useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { GenericDatePicker } from "./ui/date-picker";
import { DefaultSelect } from "./ui/default-select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function AuctionsSearchForm() {
    const [searchFormData, setSearchFormData] = useState({
        pickupDate: new Date(),
        pickupCountry: '',
        pickupCity: '',
        priceRange: [0, 1000],
        deliveryDate: new Date(),
        deliveryCountry: '',
        deliveryCity: '',
        kmRange: [0, 1000],
    });

    const handleFormUpdate = (key: string, value: any) => {
        console.log(key, value);
        setSearchFormData({
            ...searchFormData,
            [key]: value,
        });
    }

    return (
        <Card className="w-full flex flex-col pt-6">
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                    <GenericDatePicker className="w-full" onDateChange={(e) => console.log(e)} />
                    <DefaultSelect className="w-full" label="Pickup Country" items={[]} onChange={(e) => console.log(e)} />
                    <DefaultSelect className="w-full" label="Pickup City" items={[]} onChange={(e) => console.log(e)} />
                    <div className="flex flex-row gap-4 w-full">
                        <Input type="number" placeholder="Starting Price" value={searchFormData.priceRange[0]} onChange={(e) => handleFormUpdate('priceRange', [e.target.value, searchFormData.priceRange[1]])} />
                        <Input type="number" placeholder="Maximum Price" value={searchFormData.priceRange[1]} onChange={(e) => handleFormUpdate('priceRange', [searchFormData.priceRange[0], e.target.value])} />
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <GenericDatePicker className="w-full" onDateChange={(e) => console.log(e)} />
                    <DefaultSelect className="w-full" label="Pickup Country" items={[]} onChange={(e) => console.log(e)} />
                    <DefaultSelect className="w-full" label="Pickup City" items={[]} onChange={(e) => console.log(e)} />
                    <div className="flex flex-row gap-4 w-full">
                        <Input type="number" placeholder="Starting Price" value={searchFormData.priceRange[0]} onChange={(e) => handleFormUpdate('priceRange', [e.target.value, searchFormData.priceRange[1]])} />
                        <Input type="number" placeholder="Maximum Price" value={searchFormData.priceRange[1]} onChange={(e) => handleFormUpdate('priceRange', [searchFormData.priceRange[0], e.target.value])} />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={() => console.log(searchFormData)}>Search</Button>
            </CardFooter>
        </Card>
    )
}
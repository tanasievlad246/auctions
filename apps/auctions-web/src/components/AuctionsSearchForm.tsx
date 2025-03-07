import { Card, CardContent } from "./ui/card";
import { GenericDatePicker } from "./ui/date-picker";
import { DefaultSelect } from "./ui/default-select";
import { FormSlider } from "./ui/default-slider";
import { Slider } from "./ui/slider";

export default async function AuctionsSearchForm() {
    return (
        <Card className="w-full flex flex-col pt-6">
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                    <GenericDatePicker className="w-full" />
                    <DefaultSelect className="w-full" label="Pickup Country" items={[]} />
                    <DefaultSelect className="w-full" label="Pickup City" items={[]} />
                    <FormSlider label="Price Range" className="w-full" />
                </div>
                <div className="flex flex-row gap-4">
                    <GenericDatePicker className="w-full" />
                    <DefaultSelect className="w-full" label="Pickup Country" items={[]} />
                    <DefaultSelect className="w-full" label="Pickup City" items={[]} />
                    <FormSlider label="KM Range" className="w-full" />
                </div>
            </CardContent>
        </Card>
    )
}
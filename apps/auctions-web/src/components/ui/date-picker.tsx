"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface GenericDatePickerProps {
    // Callback functions
    onDateChange?: (date: Date | undefined) => void;

    // Customization
    defaultDate?: Date;
    placeholder?: string;
    dateFormat?: string;
    disabled?: boolean;

    // Styling
    className?: string;
    buttonClassName?: string;
    popoverClassName?: string;
    calendarClassName?: string;
    iconClassName?: string;
}

export function GenericDatePicker({
    // Callback functions
    onDateChange,

    // Customization
    defaultDate,
    placeholder = "Pick a date",
    dateFormat = "PPP",
    disabled = false,

    // Styling
    className,
    buttonClassName = "w-full justify-start text-left font-normal",
    popoverClassName = "w-auto p-0",
    calendarClassName,
    iconClassName = "mr-2 h-4 w-4",
}: GenericDatePickerProps) {
    const [date, setDate] = React.useState<Date | undefined>(defaultDate)

    // Handle date changes and propagate to parent
    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate)
        if (onDateChange) {
            onDateChange(newDate)
        }
    }

    return (
        <div className={className}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            buttonClassName,
                            !date && "text-muted-foreground"
                        )}
                        disabled={disabled}
                    >
                        <CalendarIcon className={iconClassName} />
                        {date ? format(date, dateFormat) : <span>{placeholder}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={cn(popoverClassName)}>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateChange}
                        initialFocus
                        className={calendarClassName}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
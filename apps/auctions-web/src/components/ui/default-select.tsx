import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils";

interface SelectItem {
    value: string;
    label: string;
}

interface DefaultSelectProps {
    label: string;
    items: SelectItem[];
    onChange?: (value: string) => void;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;

    // Class name props for styling different parts
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
    labelClassName?: string;
    itemClassName?: string;
}

export function DefaultSelect({
    label,
    items,
    onChange,
    defaultValue,
    placeholder,
    disabled = false,

    // Styling props with defaults
    className,
    triggerClassName = "w-full",
    contentClassName,
    labelClassName,
    itemClassName,
}: DefaultSelectProps) {
    return (
        <div className={className}>
            <Select
                onValueChange={onChange}
                defaultValue={defaultValue}
                disabled={disabled}
            >
                <SelectTrigger className={cn(triggerClassName)}>
                    <SelectValue placeholder={placeholder || label} />
                </SelectTrigger>
                <SelectContent className={contentClassName}>
                    <SelectGroup>
                        <SelectLabel className={labelClassName}>{label}</SelectLabel>
                        {items.map((item) => (
                            <SelectItem
                                key={item.value}
                                value={item.value}
                                className={itemClassName}
                            >
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

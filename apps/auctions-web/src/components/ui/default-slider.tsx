"use client"

import * as React from "react"
import { Slider, DualRangeSlider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label" // Assuming you have Label from shadcn

interface FormSliderProps {
    // Core slider props
    label: string;
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number[];
    value?: number[];
    disabled?: boolean;

    // Additional form props
    name?: string;
    required?: boolean;
    helperText?: string;
    showValue?: boolean;
    valuePrefix?: string;
    valueSuffix?: string;

    // Styling props
    className?: string;
    labelClassName?: string;
    sliderClassName?: string;
    helperTextClassName?: string;
    valueDisplayClassName?: string;

    // Event handlers
    onValueChange?: (value: number[]) => void;
    onValueCommit?: (value: number[]) => void;
}

export function FormSlider({
    // Core slider props
    label,
    min = 0,
    max = 100,
    step = 1,
    defaultValue,
    value,
    disabled = false,

    // Additional form props
    name,
    required = false,
    helperText,
    showValue = true,
    valuePrefix = "",
    valueSuffix = "",

    // Styling props
    className,
    labelClassName,
    sliderClassName,
    helperTextClassName = "text-sm text-muted-foreground mt-1",
    valueDisplayClassName = "text-sm font-medium mt-1",

    // Event handlers
    onValueChange,
    onValueCommit,
}: FormSliderProps) {
    // Initialize state with defaultValue or [min] if not provided
    const [sliderValue, setSliderValue] = React.useState<number[]>(
        defaultValue || value || [min]
    );

    // If value is controlled externally, update internal state
    React.useEffect(() => {
        if (value !== undefined) {
            setSliderValue(value);
        }
    }, [value]);

    // Handle value changes
    const handleValueChange = (newValue: number[]) => {
        setSliderValue(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    // Format value for display
    const formattedValue = React.useMemo(() => {
        return `${valuePrefix}${sliderValue[0]}${valueSuffix}`;
    }, [sliderValue, valuePrefix, valueSuffix]);

    // Generate unique ID for label association
    const id = React.useId();

    return (
        <div className={cn("flex flex-col gap-1", className)}>
            <div className="flex justify-between items-center -mt-1">
                <Label
                    htmlFor={id}
                    className={cn(
                        required && "after:content-['*'] after:ml-0.5 after:text-red-500",
                        labelClassName
                    )}
                >
                    {label}
                </Label>

                {showValue && (
                    <span className={valueDisplayClassName}>
                        {formattedValue}
                    </span>
                )}
            </div>

            <Slider
                id={id}
                name={name}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                value={sliderValue}
                onValueChange={handleValueChange}
                onValueCommit={onValueCommit}
                className={sliderClassName}
                aria-required={required}
            />

            {helperText && (
                <p className={helperTextClassName}>
                    {helperText}
                </p>
            )}
        </div>
    );
}

interface DualRangeSliderProps {
    label: React.ReactNode | string;
    values: number[];
    onValueChange: (value: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
    required?: boolean;
    labelClassName?: string;
}

function DefaultDualRangeSlider({
    label,
    className,
    values = [0, 100],
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    required = false,
    labelClassName,
}: DualRangeSliderProps) {
    return (
        <div className={cn(className)}>
            <DualRangeSlider
                label={(value) => <Label className={cn(
                    required && "after:content-['*'] after:ml-0.5 after:text-red-500",
                    labelClassName
                )}>{value}</Label>}
                value={values}
                onValueChange={onValueChange}
                min={min}
                max={max}
                step={step}
            />
        </div>
    );
};

export {
    DefaultDualRangeSlider,
}
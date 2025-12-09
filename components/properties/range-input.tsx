"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RangeInputProps {
    label: string;
    minValue?: number;
    maxValue?: number;
    onMinChange: (value: string) => void;
    onMaxChange: (value: string) => void;
    disabled?: boolean;
    className?: string;
    inputClassName?: string;
    minPlaceholder?: string;
    maxPlaceholder?: string;
}

export function RangeInput({
    label,
    minValue,
    maxValue,
    onMinChange,
    onMaxChange,
    disabled = false,
    className = "",
    inputClassName = "h-9",
    minPlaceholder = "Min",
    maxPlaceholder = "Max"
}: RangeInputProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            <Label className="text-xs font-medium text-slate-600 tracking-wide">{label}</Label>
            <div className="flex gap-2">
                <Input
                    type="number"
                    placeholder={minPlaceholder}
                    value={minValue || ''}
                    onChange={(e) => onMinChange(e.target.value)}
                    disabled={disabled}
                    min="0"
                    className={inputClassName}
                />
                <Input
                    type="number"
                    placeholder={maxPlaceholder}
                    value={maxValue || ''}
                    onChange={(e) => onMaxChange(e.target.value)}
                    disabled={disabled}
                    min="0"
                    className={inputClassName}
                />
            </div>
        </div>
    );
}

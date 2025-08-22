"use client";

import { Badge } from "@/components/ui/badge";
import {
    Command,
    CommandItem,
    CommandEmpty,
    CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { X as RemoveIcon, Check } from "lucide-react";
import React, {
    KeyboardEvent,
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

export type MultiSelectValue = {
    value: string;
    label: string;
    description?: string;
};

interface MultiSelectorProps
    extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {
    values: MultiSelectValue[];
    onValuesChange: (value: MultiSelectValue[]) => void;
    loop?: boolean;
    disabled?: boolean;
}

interface MultiSelectContextProps {
    value: MultiSelectValue[];
    onValueChange: (value: MultiSelectValue) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    ref: React.RefObject<HTMLInputElement | null>;
    disabled: boolean;
}

const MultiSelectContext = createContext<MultiSelectContextProps | null>(null);

const useMultiSelect = () => {
    const context = useContext(MultiSelectContext);
    if (!context) {
        throw new Error("useMultiSelect must be used within MultiSelectProvider");
    }
    return context;
};

/**
 * MultiSelect Docs: {@link: https://shadcn-extension.vercel.app/docs/multi-select}
 */

// TODO : expose the visibility of the popup

function searchForValue(source: MultiSelectValue[], value: MultiSelectValue) {
    for (let i = 0; i < source.length; i++) {
        if (source[i].value === value.value) {
            return i;
        }
    }
    return -1;
}

const MultiSelector = ({
    values: value,
    onValuesChange: onValueChange,
    loop = false,
    disabled = false,
    className,
    children,
    dir,
    ...props
}: MultiSelectorProps) => {
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const onValueChangeHandler = useCallback(
        (val: MultiSelectValue) => {
            const element = searchForValue(value, val);
            if (element !== -1) {
                onValueChange(value.filter((_, index) => index !== element));
            } else {
                onValueChange([...value, val]);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [value],
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLDivElement>) => {
            e.stopPropagation();
            const target = inputRef.current;

            if (!target) return;

            const selectionStart = target.selectionStart ?? 0;
            const selectionEnd = target.selectionEnd ?? 0;

            // If there's a selection, do nothing and let the default behavior take over
            if (selectionStart !== selectionEnd) {
                return;
            }

            const moveNext = () => {
                const nextIndex = activeIndex + 1;
                setActiveIndex(
                    nextIndex > value.length - 1 ? (loop ? 0 : -1) : nextIndex,
                );
            };

            const movePrev = () => {
                const prevIndex = activeIndex - 1;
                setActiveIndex(prevIndex < 0 ? value.length - 1 : prevIndex);
            };

            const moveCurrent = () => {
                const newIndex =
                    activeIndex - 1 <= 0
                        ? value.length - 1 === 0
                            ? -1
                            : 0
                        : activeIndex - 1;
                setActiveIndex(newIndex);
            };

            switch (e.key) {
                case "ArrowLeft":
                    if (dir === "rtl") {
                        if (value.length > 0 && (activeIndex !== -1 || loop)) {
                            moveNext();
                        }
                    } else {
                        if (value.length > 0 && target.selectionStart === 0) {
                            movePrev();
                        }
                    }
                    break;

                case "ArrowRight":
                    if (dir === "rtl") {
                        if (value.length > 0 && target.selectionStart === 0) {
                            movePrev();
                        }
                    } else {
                        if (value.length > 0 && (activeIndex !== -1 || loop)) {
                            moveNext();
                        }
                    }
                    break;

                case "Backspace":
                case "Delete":
                    if (value.length > 0) {
                        if (activeIndex !== -1 && activeIndex < value.length) {
                            onValueChangeHandler(value[activeIndex]);
                            moveCurrent();
                        } else {
                            if (target.selectionStart === 0) {
                                onValueChangeHandler(value[value.length - 1]);
                            }
                        }
                    }
                    break;

                case "Enter":
                    setOpen(true);
                    break;

                case "Escape":
                    if (activeIndex !== -1) {
                        setActiveIndex(-1);
                    } else if (open) {
                        setInputValue("");
                        setOpen(false);
                    }
                    break;
            }
        },
        [value, activeIndex, loop, dir, onValueChangeHandler, open],
    );

    return (
        <MultiSelectContext.Provider
            value={{
                value,
                onValueChange: onValueChangeHandler,
                open,
                setOpen,
                inputValue,
                setInputValue,
                activeIndex,
                setActiveIndex,
                ref: inputRef,
                disabled,
            }}
        >
            <Command
                onKeyDown={handleKeyDown}
                className={cn(
                    "overflow-visible bg-transparent flex flex-col",
                    className,
                )}
                dir={dir}
                {...props}
            >
                {children}
            </Command>
        </MultiSelectContext.Provider>
    );
};

const MultiSelectorTrigger = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { value, onValueChange, activeIndex, disabled, open, setOpen, ref: inputRef } = useMultiSelect();
    const [visibleBadgeCount, setVisibleBadgeCount] = useState(3);
    const containerRef = useRef<HTMLDivElement>(null);
    const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Função para estimar largura do badge baseado no texto
    const estimateBadgeWidth = useCallback((text: string) => {
        // Estimativa baseada em: padding (12px) + texto + botão (16px) + gaps (4px)
        const charWidth = 7; // aproximadamente 7px por caractere em text-xs
        const baseWidth = 32; // padding + botão + gaps
        const textWidth = Math.min(text.length * charWidth, 128); // max-w-32 = 128px
        return baseWidth + textWidth;
    }, []);

    // Função para calcular quantos badges cabem no espaço disponível
    const calculateVisibleBadges = useCallback(() => {
        if (!containerRef.current || value.length === 0) {
            setVisibleBadgeCount(0);
            return;
        }

        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const padding = 24; // px-3 = 12px cada lado
        const inputMinWidth = 32; // min-w-8 = 32px
        const gap = 4; // gap-1 = 4px

        let availableWidth = containerWidth - padding - inputMinWidth;
        let visibleCount = 0;

        console.log('🔍 Debug MultiSelector:', {
            containerWidth,
            availableWidth,
            valueLength: value.length,
            labels: value.map(v => v.label)
        });

        // Primeiro, calcular quantos badges cabem sem considerar contador
        for (let i = 0; i < value.length; i++) {
            const estimatedWidth = estimateBadgeWidth(value[i].label) + gap;

            console.log(`Badge ${i} (${value[i].label}):`, {
                estimatedWidth,
                availableWidth,
                fits: availableWidth >= estimatedWidth
            });

            if (availableWidth >= estimatedWidth) {
                availableWidth -= estimatedWidth;
                visibleCount++;
            } else {
                break;
            }
        }

        // Se há mais itens que cabem, ajustar para dar espaço ao contador
        if (visibleCount < value.length && visibleCount > 1) {
            const counterWidth = 60;
            // Se não há espaço suficiente para o contador, reduzir um badge
            if (availableWidth < counterWidth) {
                visibleCount = Math.max(1, visibleCount - 1);
            }
        }

        const finalCount = Math.max(1, Math.min(visibleCount, value.length));
        console.log('📊 Final result:', { visibleCount, finalCount });
        setVisibleBadgeCount(finalCount);
    }, [value, estimateBadgeWidth]);

    // Recalcular quando valor muda ou componente é redimensionado
    useEffect(() => {
        // Pequeno delay para garantir que o DOM foi atualizado
        const timer = setTimeout(() => {
            calculateVisibleBadges();
        }, 0);

        const handleResize = () => {
            setTimeout(() => {
                calculateVisibleBadges();
            }, 0);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, [calculateVisibleBadges]);

    const mousePreventDefault = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleContainerClick = useCallback((e: React.MouseEvent) => {
        if (!disabled && !open) {
            e.preventDefault();
            setOpen(true);
            // Focar no input após um pequeno delay para garantir que ele esteja disponível
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    }, [disabled, open, setOpen, inputRef]);

    return (
        <div
            ref={(el) => {
                containerRef.current = el;
                if (typeof ref === 'function') {
                    ref(el);
                } else if (ref) {
                    ref.current = el;
                }
            }}
            onClick={handleContainerClick}
            className={cn(
                "transition-all duration-200 ease-in-out border border-input rounded-md bg-transparent shadow-xs",
                "px-3 py-1",
                // Altura sempre fixa para evitar expansão
                "h-9",
                {
                    // Estados visuais
                    "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]": activeIndex === -1 && !disabled,
                    "opacity-50 cursor-not-allowed": disabled,
                    "cursor-pointer": !disabled && !open,
                },
                className,
            )}
            {...props}
        >
            <div className={cn(
                "flex gap-1 h-full items-center overflow-hidden"
            )}>
                {/* Badges calculados dinamicamente */}
                {value.slice(0, visibleBadgeCount).map((item, index) => (
                    <div
                        key={item.value}
                        ref={(el: HTMLDivElement | null) => {
                            badgeRefs.current[index] = el;
                        }}
                    >
                        <Badge
                            className={cn(
                                "px-1.5 rounded-md flex items-center gap-1 min-w-0 max-w-32",
                                activeIndex === index && "ring-2 ring-muted-foreground ",
                            )}
                            variant={"secondary"}
                        >
                            <span className="text-xs truncate">{item.label}</span>
                            <button
                                aria-label={`Remove ${item} option`}
                                aria-roledescription="button to remove option"
                                type="button"
                                onMouseDown={mousePreventDefault}
                                onClick={() => !disabled && onValueChange(item)}
                                disabled={disabled}
                                className="flex-shrink-0"
                            >
                                <span className="sr-only">Remove {item.label} option</span>
                                <RemoveIcon className="h-4 w-4 hover:stroke-destructive" />
                            </button>
                        </Badge>
                    </div>
                ))}
                {value.length > visibleBadgeCount && (
                    <Badge variant="outline" className="px-2 text-xs flex-shrink-0 max-w-20">
                        <span className="truncate">+{value.length - visibleBadgeCount} mais</span>
                    </Badge>
                )}
                <div className={cn(
                    "flex-1 min-w-8 truncate"
                )}>
                    {children}
                </div>
            </div>
        </div>
    );
});

MultiSelectorTrigger.displayName = "MultiSelectorTrigger";

const MultiSelectorInput = forwardRef<
    React.ElementRef<typeof CommandPrimitive.Input>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, _ref) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    const {
        setOpen,
        inputValue,
        setInputValue,
        activeIndex,
        setActiveIndex,
        ref: inputRef,
        disabled,
    } = useMultiSelect();

    const { value } = useMultiSelect();

    return (
        <CommandPrimitive.Input
            {...props}
            tabIndex={disabled ? -1 : 0}
            ref={inputRef}
            value={inputValue}
            onValueChange={activeIndex === -1 && !disabled ? setInputValue : undefined}
            onBlur={() => {
                if (!disabled) {
                    setInputValue("");
                    setOpen(false);
                }
            }}
            onFocus={() => !disabled && setOpen(true)}
            onClick={() => !disabled && setActiveIndex(-1)}
            disabled={disabled}
            placeholder={value.length > 0 ? "" : props.placeholder}
            className={cn(
                "ml-1 bg-transparent outline-none placeholder:text-muted-foreground flex-1 text-sm",
                className,
                activeIndex !== -1 && "caret-transparent",
                disabled && "cursor-not-allowed",
            )}
        />
    );
});

MultiSelectorInput.displayName = "MultiSelectorInput";

const MultiSelectorContent = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ children }, ref) => {
    const { open } = useMultiSelect();
    return (
        <div ref={ref} className="relative">
            {open ? children : null}
        </div>
    );
});

MultiSelectorContent.displayName = "MultiSelectorContent";

const MultiSelectorList = forwardRef<
    React.ElementRef<typeof CommandPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, children }, ref) => {
    return (
        <CommandList
            ref={ref}
            className={cn(
                "p-2 flex flex-col gap-2 rounded-md scrollbar-thin scrollbar-track-transparent transition-colors scrollbar-thumb-muted-foreground dark:scrollbar-thumb-muted scrollbar-thumb-rounded-lg min-w-full max-w-[calc(100vw-2rem)] absolute bg-background shadow-md z-[9999] border border-muted top-0 max-h-60 overflow-y-auto",
                // Responsive positioning
                "sm:left-0 sm:right-auto sm:max-w-sm",
                // Ensure it doesn't overflow on mobile
                "left-0 right-0 mx-2 sm:mx-0",
                className,
            )}
        >
            {children}
            <CommandEmpty>
                <span className="text-muted-foreground">No results found</span>
            </CommandEmpty>
        </CommandList>
    );
});

MultiSelectorList.displayName = "MultiSelectorList";

const MultiSelectorItem = forwardRef<
    React.ElementRef<typeof CommandPrimitive.Item>,
    { value: string; label: string; description?: string } & React.ComponentPropsWithoutRef<
        typeof CommandPrimitive.Item
    >
>(({ className, value, label, description, children, ...props }, ref) => {
    const { value: Options, onValueChange, setInputValue } = useMultiSelect();

    const mousePreventDefault = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const isIncluded =
        searchForValue(Options, {
            value: value,
            label: label,
        }) !== -1;

    return (
        <CommandItem
            ref={ref}
            {...props}
            onSelect={() => {
                onValueChange({
                    value: value,
                    label: label,
                    description: description,
                });
                setInputValue("");
            }}
            className={cn(
                "rounded-md cursor-pointer px-2 py-1 transition-colors flex justify-between ",
                className,
                isIncluded && "opacity-50 cursor-default",
                props.disabled && "opacity-50 cursor-not-allowed",
            )}
            onMouseDown={mousePreventDefault}
        >
            <div className="flex-1">
                <div className="font-medium">{children}</div>
                {description && (
                    <div className="text-xs text-muted-foreground mt-0.5">
                        {description}
                    </div>
                )}
            </div>
            {isIncluded && <Check className="h-4 w-4 flex-shrink-0" />}
        </CommandItem>
    );
});

MultiSelectorItem.displayName = "MultiSelectorItem";

export {
    MultiSelector,
    MultiSelectorTrigger,
    MultiSelectorInput,
    MultiSelectorContent,
    MultiSelectorList,
    MultiSelectorItem,
};
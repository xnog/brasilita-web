"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
    CheckCircle2,
    Circle,
    Clock,
    ExternalLink,
    FileText,
    ChevronDown,
    ChevronRight,
    Loader2
} from "lucide-react";

interface ChecklistItemProps {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    isOptional: boolean;
    estimatedDays?: number;
    resources?: string[];
    notes?: string;
    onToggleComplete: (id: string, completed: boolean, notes?: string) => void;
}

export function ChecklistItem({
    id,
    title,
    description,
    isCompleted,
    isOptional,
    estimatedDays,
    resources = [],
    notes = "",
    onToggleComplete,
}: ChecklistItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [userNotes, setUserNotes] = useState(notes);
    const [showNotes, setShowNotes] = useState(false);
    const [isSavingNotes, setIsSavingNotes] = useState(false);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // Atualizar notas quando receber novas props
    useEffect(() => {
        setUserNotes(notes);
    }, [notes]);

    // Limpar timeout quando componente desmontar
    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    const handleToggleComplete = () => {
        // Limpar qualquer debounce pendente
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        onToggleComplete(id, !isCompleted, userNotes);
    };

    // Debounce para salvar notas apenas após 1 segundo de inatividade
    const debouncedSaveNotes = useCallback((newNotes: string) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        setIsSavingNotes(true);

        debounceRef.current = setTimeout(() => {
            if (isCompleted) {
                onToggleComplete(id, true, newNotes);
            }
            setIsSavingNotes(false);
        }, 1000); // 1 segundo de debounce
    }, [id, isCompleted, onToggleComplete]);

    const handleNotesChange = (newNotes: string) => {
        setUserNotes(newNotes);

        // Se o item estiver completo, usar debounce para salvar
        if (isCompleted) {
            debouncedSaveNotes(newNotes);
        }
    };

    const handleNotesBlur = () => {
        // Salvar imediatamente quando o usuário sair do campo
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (isCompleted && userNotes !== notes) {
            setIsSavingNotes(true);
            onToggleComplete(id, true, userNotes);
            setTimeout(() => setIsSavingNotes(false), 500);
        }
    };

    return (
        <Card className={`transition-all duration-200 ${isCompleted ? 'bg-green-50 border-green-200' : 'hover:shadow-md'}`}>
            <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-6 w-6 mt-1"
                        onClick={handleToggleComplete}
                    >
                        {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                            <Circle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                    </Button>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <CardTitle className={`text-lg ${isCompleted ? 'text-green-800 line-through' : ''}`}>
                                {title}
                            </CardTitle>
                            {isOptional && (
                                <Badge variant="secondary" className="text-xs">
                                    Opcional
                                </Badge>
                            )}
                            {estimatedDays && (
                                <Badge variant="outline" className="text-xs flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {estimatedDays}d
                                </Badge>
                            )}
                        </div>

                        <p className={`text-sm text-muted-foreground ${isCompleted ? 'line-through' : ''}`}>
                            {description}
                        </p>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-6 w-6"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </CardHeader>

            {isExpanded && (
                <CardContent className="pt-0">
                    <div className="space-y-4">
                        {/* Resources */}
                        {resources.length > 0 && (
                            <div>
                                <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                                    <ExternalLink className="h-4 w-4" />
                                    Recursos Úteis
                                </h4>
                                <ul className="space-y-1">
                                    {resources.map((resource, index) => (
                                        <li key={index} className="text-sm text-blue-600 hover:text-blue-800">
                                            • {resource}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Notes Section */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-sm flex items-center gap-1">
                                    <FileText className="h-4 w-4" />
                                    Suas Anotações
                                    {isSavingNotes && (
                                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                            Salvando...
                                        </span>
                                    )}
                                </h4>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowNotes(!showNotes)}
                                >
                                    {showNotes ? 'Ocultar' : 'Adicionar'}
                                </Button>
                            </div>

                            {(showNotes || userNotes) && (
                                <Textarea
                                    placeholder="Adicione suas anotações sobre este item..."
                                    value={userNotes}
                                    onChange={(e) => handleNotesChange(e.target.value)}
                                    onBlur={handleNotesBlur}
                                    className="min-h-[80px] text-sm"
                                />
                            )}
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}
"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
    targetDate: Date;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const calculateTimeLeft = (): TimeLeft => {
            const difference = targetDate.getTime() - new Date().getTime();

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }

            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, [targetDate]);

    // Avoid hydration mismatch by not rendering countdown until mounted
    if (!mounted) {
        return (
            <div className="flex items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl p-6 min-w-[100px]">
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-1">--</div>
                        <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider">Dias</div>
                    </div>
                </div>
                <div className="text-3xl text-white/50 font-bold">:</div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl p-6 min-w-[100px]">
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-1">--</div>
                        <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider">Horas</div>
                    </div>
                </div>
                <div className="text-3xl text-white/50 font-bold">:</div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl p-6 min-w-[100px]">
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-1">--</div>
                        <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider">Minutos</div>
                    </div>
                </div>
                <div className="text-3xl text-white/50 font-bold">:</div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl p-6 min-w-[100px]">
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-1">--</div>
                        <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider">Segundos</div>
                    </div>
                </div>
            </div>
        );
    }

    const { days, hours, minutes, seconds } = timeLeft;
    const isExpired = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

    if (isExpired) {
        return (
            <div className="bg-green-500/20 backdrop-blur-md border-2 border-green-400 rounded-2xl p-8 mb-8">
                <div className="flex items-center justify-center gap-3 text-white">
                    <Clock className="w-8 h-8" />
                    <p className="text-2xl font-bold">O lançamento começou! Garanta sua vaga agora!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-6 h-6 text-yellow-400" />
                <p className="text-white text-lg font-semibold">LANÇAMENTO EM:</p>
            </div>

            <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                {/* Days */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-xl border border-white/20">
                    <div className="text-center">
                        <div className="text-3xl md:text-5xl font-bold text-yellow-400 mb-1">
                            {days.toString().padStart(2, "0")}
                        </div>
                        <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider font-medium">
                            Dias
                        </div>
                    </div>
                </div>

                <div className="text-2xl md:text-3xl text-white/50 font-bold">:</div>

                {/* Hours */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-xl border border-white/20">
                    <div className="text-center">
                        <div className="text-3xl md:text-5xl font-bold text-yellow-400 mb-1">
                            {hours.toString().padStart(2, "0")}
                        </div>
                        <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider font-medium">
                            Horas
                        </div>
                    </div>
                </div>

                <div className="text-2xl md:text-3xl text-white/50 font-bold">:</div>

                {/* Minutes */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-xl border border-white/20">
                    <div className="text-center">
                        <div className="text-3xl md:text-5xl font-bold text-yellow-400 mb-1">
                            {minutes.toString().padStart(2, "0")}
                        </div>
                        <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider font-medium">
                            Minutos
                        </div>
                    </div>
                </div>

                <div className="text-2xl md:text-3xl text-white/50 font-bold">:</div>

                {/* Seconds */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-xl border border-white/20">
                    <div className="text-center">
                        <div className="text-3xl md:text-5xl font-bold text-yellow-400 mb-1 animate-pulse">
                            {seconds.toString().padStart(2, "0")}
                        </div>
                        <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider font-medium">
                            Segundos
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


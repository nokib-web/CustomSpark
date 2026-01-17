"use client";

import { useState, useEffect } from "react";

export default function PerformanceBars() {
    const [bars, setBars] = useState<number[]>([45, 65, 55]);

    useEffect(() => {
        // Initialize bars with stable values
        setBars([
            Math.random() * 60 + 30,
            Math.random() * 60 + 30,
            Math.random() * 60 + 30,
        ]);
    }, []);

    return (
        <div className="space-y-6">
            {bars.map((width, i) => (
                <div key={i} className="h-4 bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary-600 rounded-full"
                        style={{ width: `${width}%` }}
                    />
                </div>
            ))}
        </div>
    );
}

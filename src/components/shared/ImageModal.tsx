"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageModal({
    imageUrl,
    title,
}: {
    imageUrl: string;
    title: string;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {imageUrl && (
                <figure
                    className="relative w-full aspect-video rounded-md overflow-hidden shadow-lg group cursor-zoom-in"
                    role="button"
                    tabIndex={0}
                    aria-label="View full image"
                    onClick={() => setIsOpen(true)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setIsOpen(true);
                        }
                    }}
                >
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-white tracking-wide">
                        Click to view
                    </div>
                </figure>
            )}
            {imageUrl && isOpen && (
                <dialog
                    className="modal modal-open"
                    onClose={() => setIsOpen(false)}
                >
                    <div className="modal-box max-w-5xl p-0 shadow-xl rounded-md">
                        <div className="relative w-full">
                            <Image
                                src={imageUrl}
                                alt={title}
                                width={1600}
                                height={900}
                                className="w-full h-auto object-contain rounded"
                                priority={false}
                            />
                        </div>
                    </div>
                    <form
                        method="dialog"
                        className="modal-backdrop"
                        onClick={() => setIsOpen(false)}
                    >
                        <button aria-label="Close" />
                    </form>
                </dialog>
            )}
        </>
    );
}

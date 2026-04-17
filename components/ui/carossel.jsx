'use client';

import React, { useMemo, useRef, useEffect, useCallback } from 'react';

const FALLBACK =
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="240">' +
    '<rect width="100%" height="100%" fill="%230f172a"/>' +
    '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="16">Item</text></svg>';

const DEFAULT_ITEMS = [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
];

const getSrc = item => (typeof item === 'string' ? item : item?.src || FALLBACK);
const getAlt = (item, idx) =>
    typeof item === 'string' ? `Carousel item ${idx + 1}` : item?.alt || `Carousel item ${idx + 1}`;

const ThreeDCarousel = ({
    children,
    className = '',
    items = DEFAULT_ITEMS,
    cardContent = null,
    radius = 260,
    cardW = 170,
    cardH = 230,
    tiltSensitivity = 10,
    dragSensitivity = 0.5,
    inertiaFriction = 0.95,
    autoSpinSpeed = 0.08,
    idleTimeout = 1800,
    showOrbitDecor = true,
    panelClassName = '',
    showCenterPanel = true,
}) => {
    const parentRef = useRef(null);
    const wheelRef = useRef(null);

    const rotationRef = useRef(0);
    const tiltRef = useRef(0);
    const targetTiltRef = useRef(0);
    const velocityRef = useRef(0);
    const isDraggingRef = useRef(false);
    const dragStartRef = useRef(0);
    const initialRotationRef = useRef(0);
    const lastInteractionRef = useRef(0);
    const animationFrameRef = useRef(null);

    const safeItems = useMemo(() => (Array.isArray(items) && items.length > 0 ? items : DEFAULT_ITEMS), [items]);

    useEffect(() => {
        lastInteractionRef.current = Date.now();

        const handleMouseMove = e => {
            if (!parentRef.current || isDraggingRef.current) return;

            lastInteractionRef.current = Date.now();
            const parentRect = parentRef.current.getBoundingClientRect();
            const mouseY = e.clientY - parentRect.top;
            const normalizedY = (mouseY / parentRect.height - 0.5) * 2;
            targetTiltRef.current = -normalizedY * tiltSensitivity;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [tiltSensitivity]);

    useEffect(() => {
        const animate = () => {
            if (!isDraggingRef.current) {
                if (Math.abs(velocityRef.current) > 0.01) {
                    rotationRef.current += velocityRef.current;
                    velocityRef.current *= inertiaFriction;
                } else if (Date.now() - lastInteractionRef.current > idleTimeout) {
                    rotationRef.current += autoSpinSpeed;
                }
            }

            tiltRef.current += (targetTiltRef.current - tiltRef.current) * 0.1;

            if (wheelRef.current) {
                wheelRef.current.style.transform = `rotateX(${tiltRef.current}deg) rotateY(${rotationRef.current}deg)`;
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [autoSpinSpeed, idleTimeout, inertiaFriction]);

    const handleDragStart = useCallback(clientX => {
        lastInteractionRef.current = Date.now();
        isDraggingRef.current = true;
        velocityRef.current = 0;
        dragStartRef.current = clientX;
        initialRotationRef.current = rotationRef.current;
    }, []);

    const handleDragMove = useCallback(
        clientX => {
            if (!isDraggingRef.current) return;
            lastInteractionRef.current = Date.now();

            const deltaX = clientX - dragStartRef.current;
            const newRotation = initialRotationRef.current + deltaX * dragSensitivity;

            velocityRef.current = newRotation - rotationRef.current;
            rotationRef.current = newRotation;
        },
        [dragSensitivity]
    );

    const handleDragEnd = useCallback(() => {
        isDraggingRef.current = false;
        lastInteractionRef.current = Date.now();
    }, []);

    const cards = useMemo(
        () =>
            safeItems.map((item, idx) => {
                const angle = (idx * 360) / safeItems.length;
                return {
                    key: idx,
                    src: getSrc(item),
                    alt: getAlt(item, idx),
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                };
            }),
        [safeItems, radius]
    );

    return (
        <div
            ref={parentRef}
            className={`relative w-full h-full overflow-visible cursor-grab active:cursor-grabbing ${className}`}
            style={{ userSelect: 'none' }}
            onMouseDown={e => handleDragStart(e.clientX)}
            onMouseMove={e => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={e => handleDragStart(e.touches[0].clientX)}
            onTouchMove={e => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
        >
            <div className="absolute inset-0" aria-hidden="true">
                {showOrbitDecor && (
                    <>
                        <div className="absolute left-1/2 top-1/2 h-104 w-104 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20 animate-spin" />
                        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/20 animate-[spin_18s_linear_infinite_reverse]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_58%)]" />
                    </>
                )}
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className="relative"
                    style={{
                        perspective: 1500,
                        perspectiveOrigin: 'center',
                        width: Math.max(cardW * 2, radius * 2.1),
                        height: Math.max(cardH * 1.8, radius * 1.55),
                    }}
                >
                    <div
                        ref={wheelRef}
                        className="relative"
                        style={{
                            width: cardW,
                            height: cardH,
                            transformStyle: 'preserve-3d',
                            willChange: 'transform',
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            marginLeft: -cardW / 2,
                            marginTop: -cardH / 2,
                        }}
                    >
                        {cards.map(card => (
                            <div
                                key={card.key}
                                className="absolute"
                                style={{
                                    width: cardW,
                                    height: cardH,
                                    transform: card.transform,
                                    transformStyle: 'preserve-3d',
                                    willChange: 'transform',
                                }}
                            >
                                <div
                                    className="h-full w-full overflow-hidden rounded-2xl border border-cyan-950/40 bg-slate-900/65 shadow-xl shadow-cyan-900/20"
                                    style={{ backfaceVisibility: 'hidden' }}
                                >
                                    {cardContent ? (
                                        <div className="h-full w-full overflow-hidden bg-slate-900/90 p-3 text-slate-100">
                                            {cardContent}
                                        </div>
                                    ) : (
                                        <>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={card.src}
                                                alt={card.alt}
                                                width={cardW}
                                                height={cardH}
                                                className="h-full w-full object-cover opacity-85"
                                                loading="lazy"
                                                draggable="false"
                                                onError={e => {
                                                    e.currentTarget.src = FALLBACK;
                                                }}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showCenterPanel && (
                <div className="relative z-10 flex h-full w-full items-center justify-center p-4 sm:p-6 pointer-events-none">
                    <div className={`pointer-events-auto w-full max-w-sm rounded-2xl border border-cyan-900/45 bg-slate-900/80 p-5 shadow-[0_0_36px_rgba(34,211,238,0.14)] backdrop-blur-md ${panelClassName}`}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThreeDCarousel;

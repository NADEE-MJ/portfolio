import React, { useEffect, useRef } from 'react';
import { SVG } from '@svgdotjs/svg.js';

interface AnimatedTextProps {
    text: string;
}

/**
 * AnimatedText component that displays text with a drawing animation.
 * @param text - The text to display with a drawing animation.
 * @returns JSX element that displays text with a drawing animation.
 */
const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
    const drawingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (drawingRef.current) {
            // Clear previous SVG to reset the animation when text changes
            drawingRef.current.innerHTML = '';

            // Create SVG canvas
            const draw = SVG().addTo(drawingRef.current).size('100%', '100%');

            // Create text element
            const svgText = draw.text(text)
                .font({ family: 'Helvetica', size: 100 })
                .move(0, 0)
                .fill('none')
                .stroke({ width: 2, color: '#FFF' });

            // Get length of the text stroke
            const length = svgText.length();

            // Animate the stroke drawing
            console.log(length);
            svgText.attr({
                'stroke-dasharray': length + 80,
                'stroke-dashoffset': length
            });

            svgText.animate(1500).attr({ 'stroke-dashoffset': 0 })
                .after(() => {
                    // Fill the text color after stroke animation
                    svgText.animate(1000).attr({ fill: '#FFF' });
                });
        }
    }, [text]); // Re-run animation if text prop changes

    return (
        <div ref={drawingRef} style={{ width: '100%', height: '100px' }} />
    );
};

export default AnimatedText;

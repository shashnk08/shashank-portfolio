import React, { useEffect, useState, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const ScrambleText: React.FC<ScrambleTextProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const queueRef = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    let active = true;
    const oldText = displayText;
    const newText = text;
    const length = Math.max(oldText.length, newText.length);
    const queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20) + 10;
      queue.push({ from, to, start, end });
    }

    queueRef.current = queue;

    let frame = 0;
    const update = () => {
      let output = '';
      let complete = 0;

      for (let i = 0, n = queueRef.current.length; i < n; i++) {
        const { from, to, start, end, char } = queueRef.current[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            queueRef.current[i].char = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          output += queueRef.current[i].char;
        } else {
          output += from;
        }
      }

      if (active) {
        setDisplayText(output);
      }

      if (complete === queueRef.current.length) {
        return;
      }

      frame++;
      frameRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      active = false;
      cancelAnimationFrame(frameRef.current);
    };
  }, [text]);

  return <span>{displayText}</span>;
};

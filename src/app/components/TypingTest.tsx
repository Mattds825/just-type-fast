"use client";
import React, { useState, useEffect, useRef } from "react";
import Keyboard from "./Keybaord";

const sampleText = "The quick brown fox jumps over the lazy dog.";

const TypingTest: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [currentKey, setCurrentKey] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputValue.length === 1 && startTime === null) {
      setStartTime(Date.now());
    }

    if (inputValue.length === sampleText.length) {
      calculateResults();
    }
  }, [inputValue]);

  // Updates the input value as the user types
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setCurrentKey(e.target.value.slice(-1));
  };
  // handle user keys to finish and restart the test
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        calculateResults()
      } else if (e.key === 'Escape') {
        handleRestart()
      } else {
        setCurrentKey(e.key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [inputValue])

  // Calculates WPM and accuracy when the user finishes typing
  const calculateResults = () => {
    if (!startTime) return;

    const durationInMinutes = (Date.now() - startTime) / 60000;
    const wordsTyped = inputValue.trim().split(" ").length;
    const correctChars = inputValue
      .split("")
      .filter((char, idx) => char === sampleText[idx]).length;

    setWpm(wordsTyped / durationInMinutes);
    setAccuracy((correctChars / sampleText.length) * 100);
  };

  // Resets the typing test and focuses the text area for a new test
  const handleRestart = () => {
    setInputValue("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setCurrentKey("");
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 text-lg">{sampleText}</div>
      <textarea
        ref={textAreaRef}
        className="w-full h-32 p-2 bg-gray-800 text-white border border-gray-600 rounded"
        value={inputValue}
        onChange={handleChange}
        placeholder="Start typing here..."
      />
      <Keyboard pressedKey={currentKey} />
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleRestart}
        >
          Restart
        </button>
      </div>
      <div className="mt-4">
        <p>Words per minute: {wpm.toFixed(2)}</p>
        <p>Accuracy: {accuracy.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default TypingTest;

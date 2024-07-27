"use client";
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import Keyboard from "./Keybaord";
import { Button } from "@/components/ui/button"



const sampleText = "The quick brown fox jumps over the lazy dog.";

interface HighlightedChar {
  char: string
  color: string
}

const TypingTest: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [currentKey, setCurrentKey] = useState<string>("");
  const [highlightedText, setHighlightedText] = useState<HighlightedChar[]>([])
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // start the time when user start typing and update the text color
  useEffect(() => {
    if (inputValue.length === 1 && startTime === null) {
      setStartTime(Date.now());
    }

    if (inputValue.length === sampleText.length) {
      calculateResults();
    }

    updateHighlightedText()
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
        setCurrentKey(e.key) //if not one of the hotkey set it as a char in the text box
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

  // funtion to handle highlighting the text appropriate colors
  const updateHighlightedText = () => {
    const inputLength = inputValue.length
    const sampleLength = sampleText.length

    // Create a new array by iterating over each character in the sample text
    const newHighlightedText = Array.from(sampleText).map((char, idx) => {
      if (idx >= inputLength) return { char, color: 'gray' } // Character not typed yet
      if (char === inputValue[idx]) return { char, color: 'green' } // Correctly typed
      return { char, color: 'red' } // Incorrectly typed
    })

    setHighlightedText(newHighlightedText)
  }

  return (
    <div className="p-4">
     <div className="mb-4 text-lg">
        <div className="flex flex-wrap">
          {highlightedText.map((item, idx) => (
            <span
              key={idx}
              className={classNames(
                'inline-block px-1',
                {
                  'text-green-500': item.color === 'green',
                  'text-red-500': item.color === 'red',
                  'text-gray-500': item.color === 'gray',
                  'border-b-2 border-blue-500': idx === inputValue.length // Underline current character
                }
              )}
            >
              {item.char}
            </span>
          ))}
        </div>
      </div>
      <textarea
        ref={textAreaRef}
        className="w-full h-32 p-2 bg-gray-800 text-white border border-gray-600 rounded"
        value={inputValue}
        onChange={handleChange}
        placeholder="Start typing here..."
      />
      <Keyboard pressedKey={currentKey} />
      <div className="mt-4 text-center">
        <small className="py-2 text-gray-500 block">'Esc' to Restart 'Enter' to submit</small>
        {/* <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleRestart}
        >
          Restart
        </button> */}
        <Button variant="ghost" className="px-4 py-2"
          onClick={handleRestart}>Restart</Button>

      </div>
      <div className="mt-4 text-center">
        <p className="text-sm">Words per minute: {wpm.toFixed(2)}</p>
        <p className="text-sm">Accuracy: {accuracy.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default TypingTest;

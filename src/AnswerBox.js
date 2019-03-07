import React, { useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";

const isBackspace = c => c === 8;
const isEnter = c => c === 13;
const isUpperCase = c => !!c.match(/^[A-Z]$/);

const toPlaceholder = (value, answer) =>
  [...value].reduce((placeholder, char) => {
    return placeholder.replace("_", char);
  }, answer.replace(/[^\s]/g, "_"));

const isCorrect = (value, answer) =>
  answer.replace(/[\s]/g, "").toUpperCase() === value;

const updateValue = (value, keyCode) => {
  if (isBackspace(keyCode)) {
    return value.substr(0, value.length - 1);
  }

  const char = String.fromCharCode(keyCode).toUpperCase();

  return isUpperCase(char) ? `${value}${char}` : value;
};

const AnswerBox = ({ answer, onCorrect, onIncorrect, ...props }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(
    () => {
      setValue("");
    },
    [answer]
  );

  const onKeyDown = ({ keyCode }) => {
    if (isEnter(keyCode)) {
      isCorrect(value, answer) ? onCorrect() : onIncorrect();
      setValue("");
      return;
    }

    const newValue = updateValue(value, keyCode);

    if (newValue.length <= answer.length) {
      setValue(newValue);
    }
  };

  const placeholder = useMemo(() => toPlaceholder(value, answer), [
    value,
    answer
  ]);

  return (
    <input
      {...props}
      ref={inputRef}
      onKeyDown={onKeyDown}
      onBlur={() => inputRef.current.focus()}
      value={placeholder}
    />
  );
};

export default styled(AnswerBox)`
  font-family: courier;
  font-size: 2em;
  letter-spacing: 0.2em;
  border: 0;
  text-align: center;
  outline-width: 0;
  margin: 0.5em 0 1em 0;
  color: transparent;
  text-shadow: 0 0 0 #000;
`;

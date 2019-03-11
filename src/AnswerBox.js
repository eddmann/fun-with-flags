import React, { useState, useMemo } from "react";
import styled from "styled-components";

const toPlaceholder = (value, answer) =>
  [...value].reduce((placeholder, char) => {
    return placeholder.replace("_", char);
  }, answer.replace(/[^\s]/g, "_"));

const removeSpaces = value => value.replace(/\s+/g, "");

const checkValue = (value, answer) =>
  removeSpaces(answer).toUpperCase() === removeSpaces(value).toUpperCase();

const AnswerBox = ({ answer, onCorrect, onIncorrect, ...props }) => {
  const [value, setValue] = useState("");

  const handleChange = event => {
    const {
      target: { value }
    } = event;

    const valueWithoutSpaces = removeSpaces(value);

    if (valueWithoutSpaces.length <= answer.length) {
      setValue(valueWithoutSpaces);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    checkValue(value, answer) ? onCorrect() : onIncorrect();
    setValue("");
    return;
  };

  const placeholder = useMemo(() => toPlaceholder(value, answer), [
    value,
    answer
  ]);

  return (
    <Form onSubmit={handleSubmit}>
      <Input {...props} onChange={handleChange} value={value} autoFocus />
      <FakeInput>{placeholder}</FakeInput>
    </Form>
  );
};

const Form = styled.form`
  position: relative;
  margin-bottom: 1em;
`;

const FakeInput = styled.span`
  font-family: courier;
  font-size: 2em;
  padding-left: 0.2em;
  letter-spacing: 0.2em;
  border: 0;
  text-align: center;
  outline-width: 0;
  margin: 0.5em 0 1em 0;
  color: transparent;
  text-shadow: 0 0 0 #000;
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &:focus + ${FakeInput} {
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  }
`;

export default AnswerBox;

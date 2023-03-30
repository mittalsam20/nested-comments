import React, { useState } from "react";

const CommentForm = (props) => {
  const { submitLabel, handleSubmit } = props;
  const [text, setText] = useState("");
  const isTextAreaDisabled = text.length === 0;

  const onClickSubmit = (event) => {
    event.preventDefault();
    handleSubmit({ text });
    setText("");
  };

  return (
    <form onSubmit={onClickSubmit}>
      <textarea
        className={"comment-form-textarea"}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={"comment-form-button"} disabled={isTextAreaDisabled}>
        {submitLabel}
      </button>
    </form>
  );
};

export default CommentForm;

import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  console.log('render');
  const { id, text, checked } = todo;

  return (
    <div className="TodoListItem">
      <div
        className={classNames('checkbox', { checked })}
        onClick={() => onToggle(id)}
      >
        {checked ? <MdCheckBoxOutlineBlank /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div className="remove" onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;

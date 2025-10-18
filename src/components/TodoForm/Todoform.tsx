import React from 'react';
import { useState } from 'react';
import { Nullable } from '../Types/Nullable';
import { User } from '../Types/User';
import { Todo } from '../Types/Todo';

export type UserListProps = {
  onSubmit: (todo: Omit<Todo, 'id'>) => void;
  users: User[];
};

export const TodoForm: React.FC<UserListProps> = ({ onSubmit, users }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState<Nullable<string>>(null);

  const [owner, setOwner] = useState<number>(0);
  const [ownerError, setownerError] = useState<Nullable<string>>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(null);

    setTitle(event.target.value.trimStart());
  };

  const handleOwnerIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setownerError(null);

    setOwner(+event.target.value);
  };

  const handleReset = () => {
    setTitle('');
    setTitleError(null);
    setOwner(0);
    setownerError(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError('Please enter a title');
    }

    if (owner === 0) {
      setownerError('Please choose a user');
    }

    if (!title || owner === 0) {
      return;
    }

    onSubmit({
      title: title,
      completed: false,
      userId: owner,
    });

    handleReset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          required
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={owner}
          onChange={handleOwnerIdChange}
          required
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {ownerError && <span className="error">{ownerError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

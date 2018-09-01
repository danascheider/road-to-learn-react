import React from 'react';

export const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    <input
      type='text'
      name='search'
      value={value}
      onChange={onChange}
      placeholder={children}
    />
    <button type='submit'>
      {children}
    </button>
  </form>

export const Table = ({ list, pattern, onDismiss }) => {
  const largeColumn = { width: '40%', };
  const medColumn = { width: '30%', };
  const smallColumn = { width: '10%', };

  if (!list) { return null; }

  return(
    <div className='table'>
      {list.map(item =>
        <div key={item.objectID} className='table-row'>
          <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={medColumn}>
            {item.author}
          </span>
          <span style={smallColumn}>
            {item.numComments}
          </span>
          <span style={smallColumn}>
            {item.points}
          </span>
          <span style={smallColumn}>
            <Button
              onClick={() => onDismiss(item.objectID)}
              className='button-inline'
            >
              Dismiss
            </Button>
          </span>
        </div>
      )}
    </div>
  );
}

export const Button = ({ onClick, className = '', children }) =>
  <button
    onClick={onClick}
    className={className}
    type='button'
  >
    {children}
  </button>
import React, { useState, useEffect, useRef } from 'react';
import './AutoComplete.css';
import Item from '../models/Item';
import getUsers from '../api/api';

//interface for the props
interface AutoCompleteProps {
  onSelect: (item: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ onSelect }) => {
  
  //input value state
  const [inputValue, setInputValue] = useState('');
  //[] array of suggestions from the API
  const [suggestions, setSuggestions] = useState<Item[]>([]);
  //index of the highlighted suggestion
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  //input reference
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {

    const fetchSuggestions = async () => {
      
      //fetch data from the API with the input value
      const filteredData = await getUsers(inputValue);
      setSuggestions(filteredData);

    };
    fetchSuggestions();
    
  //reference to the input value
  }, [inputValue]);

  //function to handle the input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  //cases for the arrow keys and enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => prevIndex + 1);
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => prevIndex - 1);
    } else if (e.key === 'Enter') {
      onSelect(suggestions[highlightedIndex].firstName);
    }
  };

  //function to handle the selection of a suggestion
  const handleSelect = (item: Item) => {
    onSelect(item.firstName);
    setInputValue('');
    setSuggestions([]);
  };

  return (
    <div className="auto-complete">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search a name..."
      />
      {inputValue != '' && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item, index) => (
            <li
              key={item.id}
              className={index === highlightedIndex? 'highlighted' : ''}
              onMouseDown={() => handleSelect(item)}
            >
              <span>
                {item.firstName.substring(0, inputValue.length)}{' '}
                <strong>{item.firstName.substring(inputValue.length)}</strong>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
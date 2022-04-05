import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  play,
  selectCards,
} from './memorySlice';
import './memory.css';

export function MemoryGame() {
  const cards = useSelector(selectCards);
  const dispatch = useDispatch();

  return (
    <div>
      {cards.map((c, i) => (
        <div
          className={c.hidden 
          ? "card hidden" : c.found
          ? "card found" : "card"
          }
          onClick={() => dispatch(play(i))}
          key={i}
        >
          {c.value}
        </div>
      ))}
    </div>
  );
}


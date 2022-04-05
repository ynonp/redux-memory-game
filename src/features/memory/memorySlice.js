import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  cards: _.shuffle(_.range(10).map(i => ({
    value: Math.floor(i / 2),
    hidden: true,
    found: false,
  }))),
};

export const memorySlice = createSlice({
  name: 'memory',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    play: (state, action) => {
      const index = action.payload;
      if (state.cards[index].hidden) {
        state.cards[index].hidden = false;
      }

      const visibleCards = state.cards.filter(c => !c.found && !c.hidden);
      if (visibleCards.length === 2) {
        if (visibleCards[0].value === visibleCards[1].value) {
          visibleCards[0].found = true;
          visibleCards[1].found = true;
        }
      }
    },

    check: (state) => {
      for (let c of state.cards) {
        if (!c.found) {
          c.hidden = true;
        }
      }
    },
  },
});

export const { play, check } = memorySlice.actions;

export const selectFoundAll = (state) => state.memory.cards.filter(c => c.found).length === state.cards.length;

export const selectVisibleCards = (state) => state.memory.cards.filter(c => !c.hidden && !c.found);

export const selectCards = (state) => state.memory.cards;

export default memorySlice.reducer;


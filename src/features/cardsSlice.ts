import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Card {
  id: number;
  title: string;
}

export interface CardsState {
  cards: Card[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  hasMore: boolean;
}

const initialState: CardsState = {
  cards: [],
  status: 'idle',
  error: null,
  page: 0,
  hasMore: true,
};

export const fetchCards = createAsyncThunk<Card[], number>(
  'cards/fetchCards',
  async (page: number) => {
    if (page >= 3) {
      // simulate no more data
      return [];
    }
    const start = page * 10;
    const cards = Array.from({ length: 10 }, (_, i) => ({
      id: start + i + 1,
      title: `Card ${start + i + 1}`,
    }));
    return cards;
  },
);

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cards = [...state.cards, ...action.payload];
        state.page += 1;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch';
      });
  },
});

export default cardsSlice.reducer;

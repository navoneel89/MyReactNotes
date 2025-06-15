import cardsReducer, { fetchCards, CardsState } from './cardsSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('cardsSlice pagination', () => {
  it('appends fetched cards and updates page/hasMore', async () => {
    const store = configureStore({ reducer: { cards: cardsReducer } });

    await store.dispatch(fetchCards(0));
    let state = store.getState().cards as CardsState;
    expect(state.cards).toHaveLength(10);
    expect(state.page).toBe(1);
    expect(state.hasMore).toBe(true);

    await store.dispatch(fetchCards(1));
    state = store.getState().cards as CardsState;
    expect(state.cards).toHaveLength(20);
    expect(state.page).toBe(2);
    expect(state.hasMore).toBe(true);

    await store.dispatch(fetchCards(2));
    state = store.getState().cards as CardsState;
    expect(state.cards).toHaveLength(30);
    expect(state.page).toBe(3);
    expect(state.hasMore).toBe(true);

    await store.dispatch(fetchCards(3));
    state = store.getState().cards as CardsState;
    expect(state.cards).toHaveLength(30);
    expect(state.page).toBe(4);
    expect(state.hasMore).toBe(false);
  });
});

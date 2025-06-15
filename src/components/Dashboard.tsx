import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchCards } from '../features/cardsSlice';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cards, status, page, hasMore } = useAppSelector((state) => state.cards);
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (page === 0) {
      dispatch(fetchCards(0));
    }
  }, [dispatch, page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && status !== 'loading' && hasMore) {
        dispatch(fetchCards(page));
      }
    });
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [dispatch, page, status, hasMore]);

  return (
    <div>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>{card.title}</li>
        ))}
      </ul>
      {status === 'loading' && <p>Loading...</p>}
      <div ref={loader} />
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { ITendersList } from '../../types/models';
import { TenderCard } from '../TenderCard';

interface ITendersResult {
  tenders: ITendersList;
}

export const TenderList: React.FC<ITendersResult> = ({ tenders }) => {
  return (
    <>
      {tenders.data.map((tender) => (
        <TenderCard
          key={tender.number}
          tender={tender}
          isRelevance={tenders.isRelevance}
        />
      ))}
    </>
  );
};

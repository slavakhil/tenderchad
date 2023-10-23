import React from 'react';
import './title-page.scss';

interface props {
  title: string;
}

export const TitlePage: React.FC<props> = ({ title }) => {
  return <div className="title-page">{title}</div>;
};

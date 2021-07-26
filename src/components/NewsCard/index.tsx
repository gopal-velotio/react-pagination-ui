import React from 'react';
import './NewsCard.css';


interface INewsCard {
    url: string;
    title: string;
    author: string;
};


const NewsCard: React.FC<INewsCard> = (props) => {
  return (
    <div className='news-card'>
      <a href={props.url}>
        {props.title}
        <sub> - {props.author}</sub>
      </a>
    </div>
  );
};

export default NewsCard;

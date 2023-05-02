import React from 'react';
import styled from 'styled-components';
import 'bulma/css/bulma.min.css';

const CardContainer = styled.div`
  display: inline-block;
  background-color: white;
  margin:  1.3rem .8rem .8rem .3rem;
  
  border-radius: 0.5rem;
  border: ${props => props.isCommun ? '2px solid rgb(51 230 153);' : '2px solid grey'};
  min-width: 290px;
  max-width: 290px;
  max-height: 170px;
  min-height: 170px;

  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardReading = styled.p`
  font-size: .9rem;
  margin-left: .2rem;
  margin-top: -10px;
  font-weight: italic;
  color: grey;
`;

const Pill = styled.span`
  display: inline-block;
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: #ffdd57;
  color: #333;
  font-size: 0.75rem;
  font-weight: bold;
`;

const EmptyPill = styled.span`
  display: inline-block;
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: transparent;
  color: transparent;
  font-size: 0.75rem;
  font-weight: bold;
`;

const CardButton = styled.button`
  background-color: transparent;
  border: ${props => props.isSaved ? '1px solid red' : 'none'};
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: .8rem;
  cursor: pointer;
  float: right;

  &:hover {
    border: 1px solid rgb(175 0 0);
    color: #333;
  }
`;

const CardComponent = ({ title, reading, description, pillText, onBookmarkClick, isCommon, isSaved }) => {
  return (
    <CardContainer isCommon={isCommon}>
      <div className="card-content">
        <CardReading>{reading}</CardReading>
        <CardTitle className="title">{title}</CardTitle>
        <CardDescription className="subtitle">{description}</CardDescription>

        {pillText ? <Pill>N{pillText}</Pill> : <EmptyPill>N0</EmptyPill>}
        <CardButton isSaved={isSaved} onClick={onBookmarkClick}>🔖</CardButton>
        
      </div>
    </CardContainer>
  );
};

export default CardComponent;

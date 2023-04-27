import styled from "styled-components";
import { useState } from "react";

const ModalContainer = styled.div`
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    width: 70%;
    height: 50%;
`;

const ModalScrollBox = styled.div`
    overflow-y: scroll;
    height: 70%;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
`;

const ModalCloseButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
`;

const ModalTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const ModalTableHeader = styled.th`
    border: none;
    padding: 8px;
    color: rgb(180 180 180);
    text-align: center;
    vertical-align: middle;

    &:hover {
        color: rgb(150 150 150);
    }
`;

const ModalTableRow = styled.tr`
    border: none;
    padding: 8px;
    text-align: center;
`;

//spaced out for readability
const DeckNameTableCell = styled.td`
    border: solid 3px white;
    padding: 8px;
    background-color: rgb(230 230 230);
    border-radius: 0.5rem;
    font-weight: bold;
    margin: 3px;

    transition: scale 0.3s ease-in-out;

    &:hover {
        background-color: rgb(200 200 200);
        scale: 0.98;
    }
    
`;

const CardNumberTableCell = styled.td`

    padding: 8px;

    border-radius: 50%;
    font-weight: bold;
    margin: 3px;
    width: 0.3rem;
    text-align: right;
    vertical-align: middle;

`;

//action button green circle with white icon
const ActionButton = styled.button`
    background-color: rgb(240, 240, 240);
    border: none;
    border-radius: 50%;
    padding: 8px;
    margin: 3px;
    cursor: pointer;
    transition: scale 0.3s ease-in-out;
    color: white;
    margin-right: 0.5rem;

    &:hover {
        scale: 1.2;
    }

    &:focus {
        outline: none;
    }
`;



const ModalDeckList = ({isOpen, onClose ,decks}) => {
    const deckSampleCards = (cards) => {
        //return string of the first 3 cards.front
        return cards.slice(0,3).map((card) => card.front).join(", ");
    };

    return(
        <ModalContainer isOpen={isOpen}>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>All online decks</ModalTitle>
                    <ModalCloseButton onClick={onClose}>❌</ModalCloseButton>
                </ModalHeader>
                <ModalScrollBox>
                    <ModalTable>
                        <thead>
                            <tr>
                                <ModalTableHeader>Deck Name</ModalTableHeader>
                                <ModalTableHeader>Cards</ModalTableHeader>
                                <ModalTableHeader>Sample</ModalTableHeader>
                                <ModalTableHeader>Actions</ModalTableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {decks.map((deck) => (
                                <ModalTableRow key={deck.id}>
                                    <DeckNameTableCell>{deck.name}</DeckNameTableCell>
                                    <CardNumberTableCell>{deck.cards.length}</CardNumberTableCell>
                                    <td>{deckSampleCards(deck.cards)}</td>
                                    <td>
                                        <ActionButton>💚</ActionButton>
                                        <ActionButton>📝</ActionButton>
                                        <ActionButton>📤</ActionButton>
                                    </td>
                                </ModalTableRow>
                            ))}
                        </tbody>
                    </ModalTable>
                </ModalScrollBox>
            </ModalContent>
        </ModalContainer>
    );
}

export default ModalDeckList;

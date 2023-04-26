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
    border: 1px solid #ddd;
    padding: 8px;
`;

const ModalTableRow = styled.tr`
    border: 1px solid #ddd;
    padding: 8px;
`;


const ModalDeckList = ({isOpen, onClose ,decks}) => {
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
                                <ModalTableHeader>Deck Description</ModalTableHeader>
                                <ModalTableHeader>Deck Cards</ModalTableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {decks.map((deck) => (
                                <ModalTableRow key={deck.id}>
                                    <td>{deck.name}</td>
                                    <td>{deck.description}</td>
                                    <td>{deck.cards.length}</td>
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

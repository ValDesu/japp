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

    //adapt to mobile
    @media (max-width: 907px) {
        align-items: flex-start;

    }


`;

const ModalContent = styled.div`
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    width: 50%;
    height: 50%;

    //adapt to mobile
    @media (max-width: 907px) {
        width: 100%;
        height: 100%;
        border-radius: 0;
    }
`;

const ModalScrollBox = styled.div`
    overflow-y: scroll;
    height: 70%;

    //adapt to mobile
    @media (max-width: 907px) {
        height: 80%;
    }
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

    //adapt to mobile
    @media (max-width: 907px) {
        display: none;
    }

`;

const ModalTableRow = styled.tr`
    border: none;
    padding: 8px;
    text-align: center;

    //adapt to mobile
    @media (max-width: 907px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-top: solid 2rem rgb(245 245 245);
    }
`;

//spaced out for readability
const DeckNameTableCell = styled.td`
    border: solid 3px white;
    padding: 8px;
    background-color: rgb(230 230 230);
    border-radius: 0.5rem;
    font-weight: bold;
    margin: 3px;
    cursor: pointer;

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
`;

const SearchBar = styled.input`
    border: solid 1px rgb(180 180 180);
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin-bottom: 1rem;
    width: 40%;
    font-size: 1rem;
    padding-left: 1rem;
    padding-top: 0.5rem;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
`;

const ButtonNextPage = styled.button`
    background-color: transparent;
    border: none;
    border-radius: 50%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    width: 5%;
    font-size: 1rem;
    rotate: ${props => props.rotation}deg;

    color:rgb(100 100 100);
    font-size: 1rem; 
    font-weight: bold;
    cursor: pointer;
    transition: scale 0.3s ease-in-out;

    &:hover {
        scale: 1.1;
    }

    //adapt to mobile
    @media (max-width: 907px) {
        width: 8%;
    }
`;

const SearchButton = styled.button`
    background-color: rgb(240, 240, 240);
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin-bottom: 1rem;
    width: 10%;
    font-size: 1rem;

    color:rgb(100 100 100);
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
`;

const PageNumber = styled.span`
    color:rgb(100 100 100);
    font-size: 1rem;
`;

const ModalDeckList = ({isOpen, onClose, onSearch ,decks, onOpenReviewSetting}) => {
    const deckSampleCards = (cards) => {
        //return string of the first 3 cards.front
        return cards.slice(0,3).map((card) => card.slug).join(", ");
    };

    const searchDeckHandler = (e) => {
        e.preventDefault();
        setSearchPage(0);
        onSearch({name: searchTerm, page: 0});
    };

    const nextPageHandler = (dir) => {
        if(searchPage + dir < 0) return;
        console.log(searchPage + dir);
        setSearchPage(prev => prev + dir);
        onSearch({name: searchTerm, page: searchPage + dir});
    }

    const onCloseHandler = () => {
        setSearchTerm("");
        setSearchPage(0);
        onClose();
    }


    const [searchTerm, setSearchTerm] = useState("");
    const [searchPage, setSearchPage] = useState(0);

    return(
        <ModalContainer isOpen={isOpen}>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>All online decks</ModalTitle>
                    <ModalCloseButton onClick={onCloseHandler.bind(this)}>❌</ModalCloseButton>
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
                                    <DeckNameTableCell data-deck-id={deck.id} onClick={onOpenReviewSetting} >{deck.name}</DeckNameTableCell>
                                    <CardNumberTableCell>{deck.cards.length}</CardNumberTableCell>
                                    <td>{deckSampleCards(deck.cards)}</td>
                                    <td>
                                        <ActionButton>💚</ActionButton>
                                        <ActionButton data-deck-id={deck.id} onClick={onOpenReviewSetting}>📝</ActionButton>
                                        <ActionButton>📤</ActionButton>
                                    </td>
                                </ModalTableRow>
                            ))}
                        </tbody>
                    </ModalTable>
                </ModalScrollBox>
                <ModalFooter>
                    <ButtonNextPage rotation={'-90'} onClick={() => {nextPageHandler(-1)}}>🛆</ButtonNextPage>
                    <SearchBar 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search decks..."
                        onKeyDown={(e) => {if(e.key === 'Enter') searchDeckHandler(e)}}
                    />
                    {
                    //<SearchButton onClick={(e) => searchDeckHandler(e)}>Search</SearchButton>
                    }
                    <ButtonNextPage rotation={'90'} onClick={() => {nextPageHandler(1)}}>🛆</ButtonNextPage>

                </ModalFooter>
                <PageNumber>{searchPage}</PageNumber>
            </ModalContent>
        </ModalContainer>
    );
}

export default ModalDeckList;

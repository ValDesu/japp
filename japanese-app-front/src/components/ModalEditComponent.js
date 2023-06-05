import styled from 'styled-components';
import { useState } from "react";
import axios from 'axios';
import { set } from 'react-ga';
import { useEffect } from 'react';

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);

    display: ${props => props.isOpen ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    width: 30%;
    height: auto;

    //adapt to mobile
    @media (max-width: 907px) {
        width: 100%;
        height: 100%;
        border-radius: 0;
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

const ModalLoginContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1rem;

    //adapt to mobile: center the grid horizontally and vertically
    @media (max-width: 907px) {
        margin-top: 50%;
    }

`;

const ModalLoginButton = styled.button`
    background-color: rgb(51, 230, 153);
    border: none;
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: rgb(61, 240, 163);
    }
`;

const ModalAutofindDeckButton = styled.button`
    background-color: #ddd;
    border: none;
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #ccc;
    }
`;

const ModalLoginInput = styled.input`
    border: 1px solid #ddd;
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    width: 100%;
`;

const ModalSeparator = styled.div`
    width: 100%;
    height: 1px;
    background-color: #ddd; 
    margin: 1rem 0;
`;

const ModalFoundDeckContainer = styled.div`
    display: flex;
    grid-template-columns: 1fr;
    gap: 1rem;

`;


const ModalFoundDeckButton = styled.button`
    background-color: #ddd;
    border: none;
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    width: auto;

    &:hover {
        background-color: #ccc;
    }
`;


const ModalEditComponent = ({isOpen, onClose, onEdit, loadingCallback, flashCallback, API_DECKS}) => {
    const [deckName, setDeckName] = useState('');
    const [deckPassword, setDeckPassword] = useState('');
    const [decks, setDecks] = useState([]); //decks found by autofind, used to display a list of decks found and let the user choose which one to load

    const handleEdit = () => {
        console.log(deckName, deckPassword);
        onEdit({name: deckName, password: deckPassword});
    };

    const handleAutofind = () => {
        loadingCallback(true);
        axios.get("https://api4.my-ip.io/ip.json").then((res_ip) => {
            axios.get(`${API_DECKS}autofind?ip=${res_ip.data.ip}`).then((res) => {
                if (res.data.length === 0) {
                    flashCallback("No deck found", "error");
                } else if (res.data.length === 1) {
                    flashCallback("Deck found", "success");
                    console.log(res.data);
                    //onEdit({name: res.data[0].name, password: res.data[0].password});
                    //update deck name and password and call handleEdit after setStates are done
                    setDeckName(res.data[0].name);
                    setDeckPassword(res.data[0].password);
                    setDecks(res.data);
                } else {
                    flashCallback("Multiple decks found","success");
                    setDecks(res.data);
                }
            }).catch((err) => {
                console.error(err);
                flashCallback("Couldn't find deck", "error");
            });
        }).catch((err) => {
            flashCallback("Couldn't get user's IP address", "error");
        }).finally(() => {
            loadingCallback(false);
        }
        );

    };

    useEffect(() => {
        if (decks.length === 1) {
            handleEdit();
        }
    }, [decks]);

    return (
        <ModalContainer isOpen={isOpen}>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>Edit your deck</ModalTitle>
                    <ModalCloseButton onClick={onClose}>❌</ModalCloseButton>
                </ModalHeader>
                <ModalLoginContainer>
                    <ModalLoginInput onChange={(e) => {setDeckName(e.target.value)}} type="text" placeholder="Deck name" />
                    <ModalLoginInput onChange={(e) => {setDeckPassword(e.target.value)}} type="password" placeholder="Deck password" />
                    <ModalLoginButton onClick={handleEdit}>Load deck</ModalLoginButton>
                    <ModalAutofindDeckButton onClick={handleAutofind}>Autofind deck(s)</ModalAutofindDeckButton>
                    {decks.length > 1 && 
                        <>
                            <ModalSeparator />
                            <ModalFoundDeckContainer>
                            {decks.map((deck) => {
                                return (
                                    <ModalFoundDeckButton key={deck.name} onClick={() => {setDeckName(deck.name); setDeckPassword(deck.password); setDecks([deck]);}}>Load {deck.name}</ModalFoundDeckButton>
                                );
                            })}
                            </ModalFoundDeckContainer>
                        </>
                    }
                </ModalLoginContainer>
                
            </ModalContent>
        </ModalContainer>
    );
};

export default ModalEditComponent;
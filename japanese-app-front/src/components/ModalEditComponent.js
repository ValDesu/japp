import styled from 'styled-components';
import { useState } from "react";

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
    width: 40%;
    height: 25%;

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

const ModalEditComponent = ({isOpen, onClose, onEdit}) => {
    const [deckName, setDeckName] = useState('');
    const [deckPassword, setDeckPassword] = useState('');

    const handleEdit = () => {
        onEdit({name: deckName, password: deckPassword});
    };

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
                    <ModalLoginButton onClick={handleEdit}>Edit</ModalLoginButton>
                </ModalLoginContainer>
                
            </ModalContent>
        </ModalContainer>
    );
};

export default ModalEditComponent;
import styled from 'styled-components';
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
    width: 70%;
    max-height: 80%;

    //adapt to mobile
    @media (max-width: 907px) {
        width: 100%;
        height: 100%;
        border-radius: 0;
        max-height: 100%;
    }
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

const ModalTableData = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
`;

const ModalValidationButton = styled.button`
    background-color: ${props => props.isDisabled ? '#ddd' : 'rgb(51, 230, 153)'};
    border: none;
    border-radius: 9999px;
    color: #333;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    cursor: pointer;
    pointer-events: ${props => props.isDisabled ? 'none' : 'auto'};
`;

const ModalDeleteButton = styled.button`
    background-color: rgb(255, 51, 51);
    border: none;
    border-radius: 9999px;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    cursor: pointer;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
`;

const ModalNameInput = styled.input`
    border: 1px solid #ddd;
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    width: 40%;
`;

const ModalPasswordInput = styled.input`
    border: 1px solid #ddd;
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    width: 40%;
`;


const WarningLabelPassword = styled.label`
    display: flex;
    position: relative;
    z-index: 1;
    top: 2rem;
    color: red;
    font-size: 0.8rem;
`;

const ModalRemoveButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
`;




const ModalComponent = ({ children, isOpen, onClose, onSave, onRemoveCardFromModal, isEditing, onUpdate, onDelete }) => {
    const [deckName, setDeckName] = useState("");
    const [deckPassword, setDeckPassword] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(false);

    return (
        <ModalContainer isOpen={isOpen}>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>Create a deck with these cards</ModalTitle>
                    <ModalCloseButton onClick={onClose}>❌</ModalCloseButton>
                </ModalHeader>
                <ModalScrollBox>
                    <ModalTable>
                        <thead>
                            <tr>
                                <ModalTableHeader>Card</ModalTableHeader>
                                <ModalTableHeader>Reading</ModalTableHeader>
                                <ModalTableHeader>Meaning</ModalTableHeader>
                                <ModalTableHeader>Actions</ModalTableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {children.map((child, index) => {
                                return (
                                    <ModalTableRow key={index}>
                                        <ModalTableData>{child.slug}</ModalTableData>
                                        <ModalTableData>{child.reading}</ModalTableData>
                                        <ModalTableData>{child.meanings.join(", ")}</ModalTableData>
                                        <ModalTableData><ModalRemoveButton onClick={onRemoveCardFromModal} data-card-slug={child.slug}>❌</ModalRemoveButton></ModalTableData>
                                    </ModalTableRow>
                                );
                            })}
                        </tbody>
                    </ModalTable>
                </ModalScrollBox>
            {children.length < 5 && 
            <WarningLabelPassword>⚠️ Decks must be at least 5 cards</WarningLabelPassword>
            }
            <WarningLabelPassword>⚠️ Password will be needed to updated this Deck. Don't use one of your usual passwords. (not encrypted)</WarningLabelPassword>
            <ModalFooter>
                {!isEditing && 
                <>
                    <ModalNameInput onChange={(e)=>setDeckName(e.target.value)} type="text" placeholder="Deck name" maxLength={30}/>
                    <ModalPasswordInput onChange={(e)=>setDeckPassword(e.target.value)} type="password" placeholder="Password"/>
                    <ModalValidationButton onClick={onSave} data-deck-name={deckName} data-deck-password={deckPassword} isDisabled={children.length < 5}>Save</ModalValidationButton>
                </>
                }

                {isEditing &&
                <>
                    <ModalValidationButton onClick={onUpdate}>Update</ModalValidationButton>
                    {confirmDelete ?
                    <>
                    <ModalDeleteButton onClick={onDelete}>CONFIRM DELETE</ModalDeleteButton>
                    <ModalValidationButton onClick={() => {setConfirmDelete(false)}}>Cancel</ModalValidationButton>
                    </>
                    :
                    <ModalDeleteButton onClick={() => {setConfirmDelete(true)}}>Delete</ModalDeleteButton>
                    }
                </>
                }
                
            </ModalFooter>
            </ModalContent>
            
        </ModalContainer>
    );
};

export default ModalComponent;
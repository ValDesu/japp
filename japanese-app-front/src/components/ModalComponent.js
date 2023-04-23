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

const ModalTableData = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
`;

const ModalValidationButton = styled.button`
    background-color: rgb(51, 230, 153);
    border: none;
    border-radius: 9999px;
    color: #333;
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
    width: 60%;
`;

const ModalRemoveButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
`;


const ModalComponent = ({ children, isOpen, onClose, onSave, onRemoveCardFromModal }) => {
    const [deckName, setDeckName] = useState("");

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
                                        <ModalTableData>{child.japanese[0].reading}</ModalTableData>
                                        <ModalTableData>{child.senses[0].english_definitions.join(", ")}</ModalTableData>
                                        <ModalTableData><ModalRemoveButton onClick={onRemoveCardFromModal} data-card-slug={child.slug}>❌</ModalRemoveButton></ModalTableData>
                                    </ModalTableRow>
                                );
                            })}
                        </tbody>
                    </ModalTable>
                </ModalScrollBox>
            <ModalFooter>
                <ModalNameInput onChange={(e)=>setDeckName(e.target.value)} type="text" placeholder="Deck name" maxLength={30}/>
                <ModalValidationButton onClick={onSave} data-deck-name={deckName}>Save</ModalValidationButton>
            </ModalFooter>
            </ModalContent>
            
        </ModalContainer>
    );
};

export default ModalComponent;
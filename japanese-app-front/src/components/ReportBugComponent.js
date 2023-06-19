import styled from "styled-components";

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
`;

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: white;
    width: 50vw;
    height: 50vh;
    border-radius: 10px;
    padding: 2rem;

    @media (max-width: 907px) {
        width: 90vw;
        height: 90vh;
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
    font-weight: 600;
`;

const ModalCloseButton = styled.button`
    font-size: 1.5rem;
    font-weight: 600;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const ModalBugTypeSelect = styled.select`
    width: 100%;
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.5rem;
    margin-bottom: 1rem;
`;

const ModalBugDescription = styled.textarea`
    width: 100%;
    height: 10rem;
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.5rem;
    margin-bottom: 1rem;
    resize: none;
`;

const ModalSubmitButton = styled.button`
    float: right;
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


const ReportBugComponent = ({onClose, loadingCallback}) => {
    return (
        <ModalContainer>
            <Modal>
                <ModalHeader>
                    <ModalTitle>Report a bug</ModalTitle>
                    <ModalCloseButton onClick={onClose}>❌</ModalCloseButton>
                </ModalHeader>
                <ModalBugTypeSelect>
                    <option value="Searching word in Japanese">Searching word in Japanese</option>
                    <option value="Searching word in English">Searching word in English</option>
                    <option value="Bookmarking words">Bookmarking words</option>
                    <option value="Viewing online decks">Viewing online decks</option>
                    <option value="Creating deck">Creating deck</option>
                    <option value="Editing deck">Editing deck</option>
                    <option value="Deleting deck">Deleting deck</option>
                    <option value="Review Flahscard">Review Flahscard</option>
                    <option value="Review AI">Review AI</option>
                    <option value="suggestion">Suggestion</option>
                </ModalBugTypeSelect>
                <ModalBugDescription placeholder="Describe the bug here..."></ModalBugDescription>
                <ModalSubmitButton onClick={loadingCallback}>Submit</ModalSubmitButton>

            </Modal>
        </ModalContainer>
    );
}

export default ReportBugComponent;
import styled from "styled-components";

//floating horizontal pill at the bottom of the screen
const Pill = styled.span`
    position: fixed;
    display: inline-block;
    margin-right: 0.5rem;
    padding: 0.5rem 0.7rem;
    border-radius: 9999px;
    background-color: #ffdd57;
    color: #333;
    font-size: 1rem;
    font-weight: bold;

    bottom: 5.5rem;
    left: 2rem;
    z-index: 15;
    cursor: default;

    opacity: ${props => props.isVertical ? 0.3 : 1};
    transition: opacity 0.3s ease-in-out;

    &:hover {
        opacity: 1;
    }
`;

//round white background button onClose
const CloseButton = styled.button`
    display: inline-block;
    border-radius: 9999px;
    border: none;
    background-color: #fff;
    padding: .4rem;
    font-size: .7rem;
    margin-left: 1rem;
    cursor: pointer;
`;

const EditNotifierComponent = ({deckName, onClose, isVertical}) => {
    return (
        <Pill isVertical={isVertical}>Editing : {deckName}
            <CloseButton onClick={onClose}>❌</CloseButton>
        </Pill>
    );
};

export default EditNotifierComponent;
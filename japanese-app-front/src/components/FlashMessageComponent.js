import styled, {keyframes} from 'styled-components';

const flash = keyframes`
    0% { opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
`;

const FlashMessageContainer = styled.div`
    opacity: 0;
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    height: 3em;
    width: 50%;
    z-index: 100;
    background-color: ${props => props.type === "error" ? "rgb(235, 64, 52)" : "rgb(51, 230, 153)"};
    border-radius: 0.5rem;
    top: 1em;
    left: 25%;
    border-width: 2px;
    border-style: solid;
    border-color: ${props => props.type === "error" ? "rgb(173, 45, 36)" : "rgb(35, 161, 107)"};
    animation: ${flash} 7s ease-in-out;

    box-shadow: 0 0 13px 0 rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
        width: 90%;
        left: 5%;
    }
`;

const FlashMessageText = styled.p`
    color: ${props => props.type === "error" ? "white" : "#4a4a4a"};;
    font-size: 1.5rem;
    font-weight: bold;
`;


const flashMessageComponent = (props) => {
    return (
        <FlashMessageContainer type={props.type}>
            <FlashMessageText type={props.type}>{props.message}</FlashMessageText>
        </FlashMessageContainer>
    );
};

export default flashMessageComponent;
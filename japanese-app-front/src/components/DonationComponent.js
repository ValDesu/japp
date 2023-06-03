import styled from "styled-components";
import ReactGA from "react-ga";

const ModalContainer = styled.div`
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, ${props => props.isOpen ? '0.5' : '0'});
    z-index: 100;
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

    opacity: ${props => props.isOpen ? '1' : '0'};
    transition: opacity 0.5s ease-in-out;

    //adapt to mobile
    @media (max-width: 907px) {
        width: 100%;
        height: 100%;
        border-radius: 0;
    }
`;

const DonationButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 0.5rem 0;
    text-decoration: none;
    color: #000;
    width: 100%;

    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #e5e5e5;
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
    background-color: #fff;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
`;

const DonationText = styled.p`
    font-size: 1.2rem;
    margin: 0.5rem 0;
`;

const DonationTextWarning = styled.p`
    font-size: 1.2rem;
    margin: 0.5rem 0;
    color: rgba(255, 0, 0, 0.5);
    font-style: italic;
`;

const DonationTextItalic = styled.p`
    font-size: 1.2rem;
    margin: 0.5rem 0;
    font-style: italic;
    margin-left: 0.5rem;
    opacity: 0.5;
`;




const DonationComponent = ({ isOpen, onClose }) => {
    return (
        <ModalContainer isOpen={isOpen}>
            <ModalContent isOpen={isOpen}>
                <ModalHeader>
                    <ModalTitle>You've been using JAPP for 5 minutes !</ModalTitle>
                    <ModalCloseButton onClick={onClose}>❌</ModalCloseButton>
                </ModalHeader>
                <DonationTextWarning>🛑This message will only display one time so it doesn't bother you while you study !</DonationTextWarning>
                <DonationText>This app is free to use, but it costs me money to keep it running.</DonationText>
                <DonationText>If you like it, please consider donating to help me improve it and add new features !</DonationText>
                <DonationButton onClick={
                    () => {
                    ReactGA.event({
                        category: 'Donation',
                        action: 'Clicked on donation link via modal'
                    });
                    window.open("https://buy.stripe.com/dR64hg8vLg0x28EbII", "_blank");
                    }
                }>Donate<DonationTextItalic>(don't do if you can't)</DonationTextItalic></DonationButton>
            </ModalContent>
        </ModalContainer>
    )
};

export default DonationComponent;
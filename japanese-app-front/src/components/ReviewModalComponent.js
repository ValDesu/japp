import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from "react";

const SpinAnimation = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

const ModalContainer = styled.div`
    display: flex;
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

const TransparentClockTimer = styled.div`
    position: absolute;
    display: flex;
    top: 0;

    font-size: 10rem;
    font-weight: bold;
    font-family: 'Orbitron', sans-serif;
    color: #424549;


    justify-content: center;
    
    width: 100%;
    height: 10rem;

    //adapt to mobile
    @media (max-width: 907px) {
        height: 5rem;
        font-size: 5rem;
        
        color: #fff;
        opacity: 0.2;
    }

`;

const ModalContentBorder = styled.div`
    padding: .3rem;
    
    background: linear-gradient(-45deg, #f0f 0%, #0ff 25%, #00f 50%, #f0f 75%, #f0f 100%);
    background-size: 400% 400%;

    border-radius: 0.5rem;
    animation: ${SpinAnimation} 10s ease infinite ;

    width: 70%;
    height: 50%;

    //adapt to mobile
    @media (max-width: 907px) {
        width: 100%;
        height: 100%;
        border-radius: 0;
    }
`;

const ModalContent = styled.div`
    background-color: #424549;
    border-radius: 0.5em;
    width: 100%;
    height: 100%;

`;

const ModalFooterButtonsHolder = styled.div`
    display: flex;
    justify-content: center;

`;

const FlashCardButton = styled.button`
    background-color: #fff;
    color: #000;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin-right: 1rem;

    &:hover {
        cursor: pointer;
    }
`;


const ReviewModalComponent = ({reviewSetting }) => {

    const [timeClock, setTimeClock] = useState(0);
    

    useEffect(() => {
        let intervalId;
        intervalId = setInterval(() => setTimeClock(timeClock + 1), 10);
        return () => clearInterval(intervalId);
    }, [timeClock]);

    const minute = Math.floor((timeClock % 360000) / 6000);
    const second = Math.floor((timeClock % 6000) / 100);

    return (
        <ModalContainer>
            <TransparentClockTimer>
                <span>{minute.toString().padStart(2, "0")} : {second.toString().padStart(2, "0")}</span>
            </TransparentClockTimer>
            <ModalContentBorder>
                <ModalContent>
                    <ModalFooterButtonsHolder>
                        <FlashCardButton>SHOW</FlashCardButton>
                    </ModalFooterButtonsHolder>
                </ModalContent>
            </ModalContentBorder>
        </ModalContainer>
    );
};

export default ReviewModalComponent;
import styled from "styled-components";
import { useState } from "react";

const ModalContainer = styled.div`
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    //background-color: rgba(0, 0, 0, 0.5);
    z-index: 15;
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
    width: 40%;
    //height: 50%;
    //soft drop shadow
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
    
    //adapt to mobile
    @media (max-width: 907px) {
        width: 100%;
        height: 100%;
        border-radius: 0;
    }
`;

const ModalReviewModeSelectInput = styled.select`
    width: 60%;
    height: 2rem;
    border: 1px solid #333;
    border-radius: 0.5rem;

    cursor: pointer;

    //adapt to mobile
    @media (max-width: 907px) {
        width: 100%;
    }


`;

const ModalSelectInputLabel = styled.label`
    font-size: 1rem;
    font-weight: bold;
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

const ModalStartButton = styled.button`
    background-color: rgb(51, 230, 153);
    border: none;
    border-radius: 9999px;
    color: #333;
    font-size: 1rem;
    font-weight: bold;
    width: 100%;

    padding: 0.5rem 0;
    cursor: pointer;
`;

const ModalSelectAndLabelContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    //adapt to mobile
    @media (max-width: 907px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;


const ReviewFlashcardsSettingComponent = ({isOpen, onClose, onStart}) => {

    const handleStart = (reviewSetting) => {
        onStart(reviewSetting);
    }

    const [reviewSetting, setReviewSetting] = useState({
        reviewMode: 1,
        reviewWith: 1,
        reviewTimes: 1,
        reviewType: 1,
        reviewExercice: 1
    });

    return (
        <ModalContainer isOpen={isOpen}>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>Review Flashcards Settings</ModalTitle>
                    <ModalCloseButton onClick={onClose}>❌</ModalCloseButton>
                </ModalHeader>

                <ModalSelectAndLabelContainer>
                    <ModalSelectInputLabel>I want to review</ModalSelectInputLabel>
                    <ModalReviewModeSelectInput onChange={
                        (e) => {
                            setReviewSetting({
                                ...reviewSetting,
                                reviewMode: e.target.value
                            });
                        }
                    }>
                        <option value="1">Everything</option>
                        <option value="2">Lastest flashcards</option>
                        <option value="3">Difficult flashcards</option>
                    </ModalReviewModeSelectInput>
                </ModalSelectAndLabelContainer>

                <ModalSelectAndLabelContainer>
                    <ModalSelectInputLabel>With</ModalSelectInputLabel>
                    <ModalReviewModeSelectInput onChange={
                        (e) => {
                            setReviewSetting({
                                ...reviewSetting,
                                reviewWith: e.target.value
                            });
                        }
                    }>
                        <option value="1">All flashcards</option>
                        {}
                        <option value="2">10 flashcards (20 questions)</option>
                        <option value="3">20 flashcards (40 questions)</option>
                        <option value="4">30 flashcards (60 questions)</option>
                        <option value="5">40 flashcards (80 questions)</option>
                    </ModalReviewModeSelectInput>
                </ModalSelectAndLabelContainer>

                <ModalSelectAndLabelContainer>
                    <ModalSelectInputLabel>Until I get it right</ModalSelectInputLabel>
                    <ModalReviewModeSelectInput onChange={
                        (e) => {
                            setReviewSetting({
                                ...reviewSetting,
                                reviewTimes: e.target.value
                            });
                        }
                    }>
                        <option value="1">Review 1 time</option>
                        <option value="2">Review 2 times</option>
                        <option value="3">Review 3 times</option>
                    </ModalReviewModeSelectInput>
                </ModalSelectAndLabelContainer>

                <ModalSelectAndLabelContainer>
                    <ModalSelectInputLabel>I want to see</ModalSelectInputLabel>
                    <ModalReviewModeSelectInput onChange={
                        (e) => {
                            setReviewSetting({
                                ...reviewSetting,
                                reviewType: e.target.value
                            });
                        }
                    }>
                        <option value="1">English and Japanese</option>
                        <option disabled value="2">English to Japanese (soon)</option>
                        <option disabled value="3">Japanese to English (soon)</option>
                    </ModalReviewModeSelectInput>
                </ModalSelectAndLabelContainer>

                <ModalSelectAndLabelContainer>
                    <ModalSelectInputLabel>I want to use</ModalSelectInputLabel>
                    <ModalReviewModeSelectInput onChange={
                        (e) => {
                            setReviewSetting({
                                ...reviewSetting,
                                reviewExercice: e.target.value
                            });
                        }
                    }>
                        <option value="1">Just flashcards</option>
                        <option value="2">Flashcards and typing</option>
                        <option value="3">AI output exercices (soon)</option>
                    </ModalReviewModeSelectInput>
                </ModalSelectAndLabelContainer>

                <ModalStartButton onClick={handleStart.bind(this, reviewSetting)}>Start</ModalStartButton>
                
            </ModalContent>
        </ModalContainer>
    );
};

export default ReviewFlashcardsSettingComponent;
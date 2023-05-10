import styled, { keyframes } from 'styled-components';
import { useEffect, useState, useRef} from "react";

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

    &:hover {
        cursor: pointer;
    }
`;

const FlashCardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 80%;
`;

const FlashCardQuestionText = styled.h1`
    font-size: 4cqw;
    font-weight: bold;
    font-family: 'Orbitron', sans-serif;
    color: #fff;

    //adapt to mobile
    @media (max-width: 907px) {
        font-size: 8cqw;
    }
`;

const FlashCardResponseText = styled.h1`
    font-size: 3.3cqw;
    font-weight: 100;
    font-family: 'Orbitron', sans-serif;
    color: #fff;

    //adapt to mobile
    @media (max-width: 907px) {
        font-size: 8cqw;
    }
`;

class ICardReview {
    constructor(card, reviewedTimes, side, isCorrect) {
        this.card = card;
        this.side = side;
        this.reviewedTimes = reviewedTimes;
        this.isCorrect = isCorrect;
    }
}
/**
 * Review "reviewSetting.reviewExercice = 1" algorithm:
 * 
 * Goal: 
 * - All cards must be reviewed at least once: 
 *  - If reviewSetting.reviewType = 1 : from both sides.
 *  - If reviewSetting.reviewType = 2 : from "meanings" side only.
 *  - If reviewSetting.reviewType = 3 : from "slug" side only.
 * 
 * - If a card is reviewed wrongly, it should be reviewed again based on the reviewSetting.reviewTimes:
 *  - If reviewSetting.reviewTimes = 1 : review the card again after 1 time.
 *  - If reviewSetting.reviewTimes = 2 : review the card again after 2 times.
 *  - If reviewSetting.reviewTimes = 3 : review the card again after 3 times.
 * 
 * - The exercise is finished when all cards are reviewed correctly and the reviewSetting.reviewTimes is reached for all cards.
 * 
 */
const ReviewModalComponent = ({reviewSetting, cards}) => {

    const [setupFinished, setSetupFinished] = useState(false);
    const isInitialMount = useRef(true);

    const [timeClock, setTimeClock] = useState(0);
    const [isQuestion, setIsQuestion] = useState(true);

    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const [toReviewCards, setToReviewCards] = useState([]);
    const [reviewedCards, setReviewedCards] = useState([]);
    
    useEffect(() => {
        let intervalId;
        intervalId = setInterval(() => setTimeClock(timeClock + 1), 10);
        return () => clearInterval(intervalId);
    }, [timeClock]);

    const minute = Math.floor((timeClock % 360000) / 6000);
    const second = Math.floor((timeClock % 6000) / 100);

    useEffect(() => {   
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            let id = 0;
            cards.forEach(element => {
                let cardReview_slug = new ICardReview(element, 0, 'slug', true);
                let cardReview_meaning  = new ICardReview(element, 0, 'meaning', true);
                setToReviewCards(toReviewCards => [...toReviewCards, cardReview_slug, cardReview_meaning]);
                id++;
            });

            setToReviewCards(toReviewCards => toReviewCards.sort(() => Math.random() - 0.5));
            setSetupFinished(true);
        }
    }, []);

    const handleShowAnswer = () => {
        setIsQuestion(false);
    };

    const handleValidateAnswer = ({result}) => {
        const c_card = toReviewCards[currentCardIndex];
        const updatedCards = [...toReviewCards];

        if(result === 'correct'){
            if(c_card.isCorrect === false && c_card.reviewedTimes < reviewSetting.reviewTimes){
                const updatedCard = {...c_card, reviewedTimes: c_card.reviewedTimes + 1};
                updatedCards[currentCardIndex] = updatedCard;
            }else{
                const updatedCard = {...c_card, isCorrect: true};
                updatedCards[currentCardIndex] = updatedCard;
            }
        }

        if(result === 'wrong'){
            const updatedCard = {...c_card, isCorrect: false};
            updatedCards[currentCardIndex] = updatedCard;
        }

        setToReviewCards(updatedCards);
        
        setIsQuestion(true);
        
        if(currentCardIndex < toReviewCards.length - 1){
            setCurrentCardIndex((v) => v+1);
        }else{
            console.log(toReviewCards);
            setCurrentCardIndex(0);
            //put correct reviewed cards in the reviewedCards state and remove them from toReviewCards state
            let correctReviewedCards = toReviewCards.filter((card) => card.isCorrect === true);
            setReviewedCards(reviewedCards => [...reviewedCards, ...correctReviewedCards]);
            setToReviewCards(toReviewCards => toReviewCards.filter((card) => card.isCorrect === false));
            
            
        }

    };


    return (
        <ModalContainer>
            <TransparentClockTimer>
                <span>{minute.toString().padStart(2, "0")} : {second.toString().padStart(2, "0")}</span>
            </TransparentClockTimer>
            <ModalContentBorder>
                <ModalContent>
                    {setupFinished ? 
                    <>
                    
                    <FlashCardContent>
                        <FlashCardQuestionText>
                            {
                            toReviewCards[currentCardIndex].side === 'slug' ?
                            toReviewCards[currentCardIndex].card.slug :
                            toReviewCards[currentCardIndex].card.meanings.join(', ')
                            }
                        </FlashCardQuestionText>
                        {
                            !isQuestion ?

                            <FlashCardResponseText>
                                {
                                    toReviewCards[currentCardIndex].side === 'meaning' ?
                                    toReviewCards[currentCardIndex].card.slug :
                                    toReviewCards[currentCardIndex].card.meanings.join(', ')
                                }
                            </FlashCardResponseText>

                            :null
                        }
                    </FlashCardContent>
                    <ModalFooterButtonsHolder>
                        {isQuestion ? 
                        <FlashCardButton onClick={handleShowAnswer}>SHOW</FlashCardButton>
                        :
                        <>
                        <FlashCardButton onClick={handleValidateAnswer.bind(this, {result: 'correct'})}>CORRECT</FlashCardButton>
                        <FlashCardButton onClick={handleValidateAnswer.bind(this, {result: 'wrong'})}>WRONG</FlashCardButton>
                        </>
                        }
                        
                    </ModalFooterButtonsHolder>
                    </>
                    : null}
                </ModalContent>
            </ModalContentBorder>
        </ModalContainer>
    );
};

export default ReviewModalComponent;
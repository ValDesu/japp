import styled, { keyframes } from 'styled-components';
import { useEffect, useState, useRef} from "react";
import Confetti from 'react-confetti';

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

const ProgressBar = styled.div`
    position: relative;
    width: 70%;
    height: 1rem;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 1;
    border-radius: 0.5rem;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
`;

const Progress = styled.div`
    width: ${props => props.progress}%;
    height: 100%;
    background-color: ${props => props.status === "correct" ? 'rgb(51, 230, 153)' : "yellow"};
    border-radius: 0.5rem;

    transition: width 0.5s ease-in-out, background-color 0.5s ease-in-out;
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
    const [isReviewFinished, setIsReviewFinished] = useState(false);
    const isInitialMount = useRef(true);

    const [timeClock, setTimeClock] = useState(0);
    const [isQuestion, setIsQuestion] = useState(true);

    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const [toReviewCards, setToReviewCards] = useState([]);
    const [reviewedCards, setReviewedCards] = useState([]);
    const [statusCardProgress, setStatusCardProgress] = useState('correct');


    
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
          const updatedToReviewCards = cards.map((element) => {
            const cardReviewSlug = new ICardReview(element, 0, 'slug', true);
            const cardReviewMeaning = new ICardReview(element, 0, 'meaning', true);
            return [cardReviewSlug, cardReviewMeaning];
          }).flat();
          setToReviewCards(updatedToReviewCards.sort(() => Math.random() - 0.5));
          setSetupFinished(true);
        }
      }, [cards]);

    const handleShowAnswer = () => {
        setIsQuestion(false);
    };


    const handleValidateAnswer = ({result}) => {

        if(toReviewCards.length == 1 && (toReviewCards[0].reviewedTimes == reviewSetting.reviewTimes || toReviewCards[0].isCorrect)){
            console.log('finished');
            setIsReviewFinished(true);
            setStatusCardProgress('correct');
        }

        const c_card = toReviewCards[currentCardIndex];
        const updatedCards = [...toReviewCards];

        if(result === 'correct'){
            if(c_card.isCorrect === false && c_card.reviewedTimes < reviewSetting.reviewTimes){
                const updatedCard = {...c_card, reviewedTimes: c_card.reviewedTimes + 1};
                updatedCards[currentCardIndex] = updatedCard;
                //shuffle the cards to review
                updatedCards.sort(() => Math.random() - 0.5);
            }else{
                updatedCards.splice(currentCardIndex, 1);
                setReviewedCards(reviewedCards => [...reviewedCards, c_card.card]);
            }
        }

        if(result === 'wrong'){
            const updatedCard = {...c_card, isCorrect: false};
            updatedCards[currentCardIndex] = updatedCard;
            //shuffle the cards to review
            updatedCards.sort(() => Math.random() - 0.5);
        }

        setToReviewCards(updatedCards);
        setIsQuestion(true);
    };

    //useEffect on current card to update progress bar color
    useEffect(() => {
        console.log('length: ', toReviewCards.length, 'currentCardIndex: ', currentCardIndex, 'toReviewCards: ', toReviewCards);
        if(toReviewCards.length > 0){
            const c_card = toReviewCards[currentCardIndex];
            if(c_card.isCorrect){
                setStatusCardProgress('correct');
            }else{
                setStatusCardProgress('wrong');
            }
        }
    }, [currentCardIndex, toReviewCards]);



    return (
        <ModalContainer>
            <TransparentClockTimer>
                <span>{minute.toString().padStart(2, "0")} : {second.toString().padStart(2, "0")}</span>
            </TransparentClockTimer>
            <ModalContentBorder>
                <ModalContent>

                    {isReviewFinished ? 
                        <Confetti
                        recycle={false}
                        gravity={0.2}
                        />
                        : null
                    }
                    
                    <ProgressBar>
                        <Progress status={statusCardProgress} progress={((reviewedCards.length) / (reviewedCards.length + toReviewCards.length)) * 100}/>
                    </ProgressBar>
                    {setupFinished && !isReviewFinished ? 
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
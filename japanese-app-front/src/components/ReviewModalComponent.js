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

const ExitButtonModal = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
    background-color: #424549;
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.3rem 1rem;
    font-size: 1.3rem;
    z-index: 11;
    
    &:hover {
        cursor: pointer;
    }

    //adapt to mobile
    @media (max-width: 907px) {
        margin: .7rem;
        font-size: 1.2rem;
        background-color: transparent;
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
        top: 1.3rem;
        
        color: #fff;
        opacity: 0.2;
    }

    @media (max-height: 700px) {
        fheight: 5rem;
        font-size: 5rem;
        top: 1.3rem;
        
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

    width: 50%;
    height: 50%;

    //adapt to mobile
    @media (max-width: 907px) {
        width: 100%;
        height: 100%;
        border-radius: 0;
    }

    @media (max-height: 700px) {
        width: 100%;
        height: 100%;
    }
`;

const ModalContent = styled.div`
    background-color: #424549;
    border-radius: 0.5em;
    width: 100%;
    height: 100%;

    :focus {
        outline: none;
    }

`;

const ModalFooterButtonsHolder = styled.div`
    display: flex;
    justify-content: center;

    //adapt to mobile
    @media (max-width: 907px) {
        align-items: center;
    }

`;

const FlashCardButton = styled.button`
    background-color: ${props => props.color};
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.3rem 1rem;
    margin-left : 1rem;
    margin-right : 1rem;

    font-size: 1rem;

    &:hover {
        cursor: pointer;
    }

    //adapt to mobile
    @media (max-width: 907px) {
        font-size: 2rem;
        margin-left : 2rem;
        margin-right : 2rem;
    }
`;

const FlashCardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 80%;

    //adapt to mobile
    @media (max-width: 907px) {
        height: 70%;
    }
`;

const FlashCardQuestionText = styled.h1`
    font-size: 4cqw;
    font-weight: bold;
    font-family: 'Orbitron', sans-serif;
    text-align: center;
    color: #fff;

    //adapt to mobile
    @media (max-width: 907px) {
        font-size: 12cqw;
    }
`;

const FlashCardResponseText = styled.h1`
    font-size: 3.3cqw;
    font-weight: 100;
    font-family: 'Orbitron', sans-serif;
    text-align  : center;
    color: #fff;

    //adapt to mobile
    @media (max-width: 907px) {
        font-size: 9.5cqw;
    }
`;

const FuriganaText = styled.span`
    font-size: 1.5cqw;
    font-weight: 100;
    color: ${(props) => props.display ? "#fff" : "transparent"};

    border-radius: 0.5rem;
    padding: 0.3rem 1rem;
    background-color: #2b2e31;

    transition: color 0.3s ease-in-out;
    cursor: pointer;

    //adapt to mobile
    @media (max-width: 907px) {
        font-size: 4cqw;
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

const FinalScoreContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 80%;

    //adapt to mobile
    @media (max-width: 907px) {
        height: 100%;
    }
`;

const FinalScoreText = styled.h1`
    font-size: 2cqw;
    font-weight: bold;
    color: #fff;

    //adapt to mobile
    @media (max-width: 907px) {
        font-size: 5cqw;
    }

    @media (max-width: 500px) {
        font-size: 8cqw;
    }
`;

const FinalScoreValue = styled.p`
    font-size: 1.5cqw;
    font-weight: 10;
    color: #fff;
    text-align: center;

    //adapt to mobile
    @media (max-width: 907px) {
        font-size: 4cqw;
    }

    @media (max-width: 500px) {
        font-size: 6cqw;
    }
`;

const SeparatorLine = styled.div`
    width: 80%;
    height: 0.1rem;
    background-color: rgba(0, 0, 0, 0.2);
    margin-top: 1rem;
    margin-bottom: 1rem;
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
const ReviewModalComponent = ({reviewSetting, cards, onClose, onCloseFinished}) => {

    const [setupFinished, setSetupFinished] = useState(false);
    const [isReviewFinished, setIsReviewFinished] = useState(false);
    const isInitialMount = useRef(true);
    const flashCardContentRef = useRef(null);

    const [timeClock, setTimeClock] = useState(0);
    const [isQuestion, setIsQuestion] = useState(true);

    const [toReviewCards, setToReviewCards] = useState([]);
    const [reviewedCards, setReviewedCards] = useState([]);
    const [statusCardProgress, setStatusCardProgress] = useState('correct');
    const [displayFurigana, setDisplayFurigana] = useState(false);

    const handleOnCloseFinished = () => {
        onCloseFinished({reviewedCards: reviewedCards});
    };

    const handleOnClose = () => {
        console.log('handleOnClose');
        onClose();
    };

    
    useEffect(() => {
        if (isReviewFinished) return;
        let intervalId;
        intervalId = setInterval(() => setTimeClock(timeClock + 1), 10);
        return () => clearInterval(intervalId);
    }, [timeClock, isReviewFinished]);

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
        setDisplayFurigana(false);

        if(toReviewCards.length == 1 && (toReviewCards[0].reviewedTimes == reviewSetting.reviewTimes || toReviewCards[0].isCorrect)){
            console.log('finished');
            setIsReviewFinished(true);
            setStatusCardProgress('correct');
        }

        const c_card = toReviewCards[0];
        const updatedCards = [...toReviewCards];

        if(result === 'correct'){
            if(c_card.isCorrect === false && c_card.reviewedTimes < reviewSetting.reviewTimes){
                const updatedCard = {...c_card, reviewedTimes: c_card.reviewedTimes + 1};
                updatedCards[0] = updatedCard;
                //shuffle the cards to review
                updatedCards.sort(() => Math.random() - 0.5);
            }else{
                updatedCards.splice(0, 1);
                setReviewedCards(reviewedCards => [...reviewedCards, c_card]);
            }
        }

        if(result === 'wrong'){
            const updatedCard = {...c_card, isCorrect: false};
            updatedCards[0] = updatedCard;
            //shuffle the cards to review
            updatedCards.sort(() => Math.random() - 0.5);
        }

        setToReviewCards(updatedCards);
        setIsQuestion(true);
    };

    //useEffect on current card to update progress bar color
    useEffect(() => {
        if(toReviewCards.length > 0){
            const c_card = toReviewCards[0];
            if(c_card.isCorrect){
                setStatusCardProgress('correct');
            }else{
                setStatusCardProgress('wrong');
            }
        }
    }, [toReviewCards]);

    useEffect(() => {
        flashCardContentRef.current.focus();
    }, [isQuestion]);



    return (
        <ModalContainer>
            <ExitButtonModal onClick={handleOnClose}>❌</ExitButtonModal>
            <TransparentClockTimer>
                <span>{minute.toString().padStart(2, "0")} : {second.toString().padStart(2, "0")}</span>
            </TransparentClockTimer>
            <ModalContentBorder>
                <ModalContent ref={flashCardContentRef} 
                tabIndex={0} onKeyDown={(e) => {
                    if(isReviewFinished || !setupFinished) return;
                    
                    if(e.key === 'ArrowRight' && !isQuestion){
                        handleValidateAnswer({result: 'wrong'});
                    }
                    if(e.key === 'ArrowLeft' && !isQuestion){
                        handleValidateAnswer({result: 'correct'});
                    }
                    if(e.key === 'ArrowUp' && isQuestion){
                        handleShowAnswer();
                    }
                }}>

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
                            toReviewCards[0].side === 'slug' ?
                            toReviewCards[0].card.slug :
                            toReviewCards[0].card.meanings.join(', ')
                            }
                        </FlashCardQuestionText>
                        {
                            toReviewCards[0].side === 'slug' ?
                            <FuriganaText display={displayFurigana} onClick={setDisplayFurigana.bind(this, true)}>
                                {toReviewCards[0].card.reading}
                            </FuriganaText>
                            : null
                        }
                        {
                            !isQuestion ?
                            <>
                            <FlashCardResponseText>
                                {
                                    toReviewCards[0].side === 'meaning' ?
                                    toReviewCards[0].card.slug :
                                    toReviewCards[0].card.meanings.join(', ')
                                }
                            </FlashCardResponseText>
                            {
                                toReviewCards[0].side === 'meaning' ?
                                <FuriganaText display={true}>
                                    {toReviewCards[0].card.reading}
                                </FuriganaText>
                                : null
                            }
                            </>

                            :null
                        }
                    </FlashCardContent>
                    <ModalFooterButtonsHolder>
                        {isQuestion ? 
                        <FlashCardButton color={'rgb(17 42 52)'} onClick={handleShowAnswer}>🔄</FlashCardButton>
                        :
                        <>
                        <FlashCardButton color={'rgb(55 50 80)'} onClick={handleValidateAnswer.bind(this, {result: 'correct'})}>✔️</FlashCardButton>
                        <FlashCardButton color={'rgb(78 35 35)'} onClick={handleValidateAnswer.bind(this, {result: 'wrong'})}>❌</FlashCardButton>
                        </>
                        }
                    </ModalFooterButtonsHolder>
                    </>
                    : null}
                    {isReviewFinished ?
                        <FinalScoreContent>
                            <FinalScoreText>
                                Congratulations 🎏
                            </FinalScoreText>
                            <FinalScoreValue>
                                You have finished reviewing all the cards in {minute.toString().padStart(2, "0")} : {second.toString().padStart(2, "0")}
                            </FinalScoreValue>
                            <FinalScoreValue>
                                You have reviewed {reviewedCards.length} cards ({reviewedCards.length*2} questions)
                            </FinalScoreValue>
                            <FinalScoreValue>
                                {reviewedCards.filter(card => card.isCorrect).length} correct answers and {reviewedCards.filter(card => !card.isCorrect).length} wrong answers
                            </FinalScoreValue>
                            {reviewedCards.filter(card => !card.isCorrect).length > 0 ?
                            <FinalScoreValue>
                                You should review these cards : {reviewedCards.filter(card => !card.isCorrect).map((r_card) => {
                                    if(r_card.side === 'slug'){
                                        return r_card.card.slug;
                                    }else{
                                        return r_card.card.meanings[0];
                                    }
                                }).join(', ')}
                             </FinalScoreValue>
                            :
                            <FinalScoreValue>
                                You have reviewed all the cards correctly, good job !
                            </FinalScoreValue>}
                            <SeparatorLine/>
                            <FlashCardButton color={'rgb(55 50 80)'} onClick={handleOnCloseFinished}>✔️</FlashCardButton>
                        </FinalScoreContent>
                    :null
                    }
                </ModalContent>
            </ModalContentBorder>
        </ModalContainer>
    );
};

export default ReviewModalComponent;
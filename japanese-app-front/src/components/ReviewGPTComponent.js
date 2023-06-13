import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from "react";
import axios from 'axios';


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

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const SpeakingRobotAnimation = keyframes`
    0% { transform: translateY(0px) scale(1) rotate(0); }
    25% { transform: translateY(-5px) scale(1.2) rotate(5deg); }
    50% { transform: translateY(0px) scale(1) rotate(0); }
    75% { transform: translateY(-5px) scale(1.2) rotate(-5deg); }
    100% { transform: translateY(0px) scale(1) rotate(0); }
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
`;

const ModalContent = styled.div`
    background-color: #424549;
    border-radius: 0.25em;
    width: 100%;
    height: 100%;

    :focus {
        outline: none;
    }
`;

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 0.25em;
`;

const Spinner = styled.div`
    border: 10px solid rgb(51, 230, 153);
    border-radius: 15px;
    width: 75px;
    height: 75px;
    animation: ${spin} 5s linear infinite;
`;

const ModalWordsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.5rem 1rem;
    border-top-left-radius: 0.25em;
    border-top-right-radius: 0.25em;

    //adapt to mobile
    @media (max-width: 907px) {
        flex-direction: column;
        padding: 0.5rem 1rem;
    }
`;

const WordsSelectedPill = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    color: white;
    border-radius: 0.25em;
    padding: 0.3rem 1rem;
    font-size: 1.3rem;
    margin: 0.5rem 0.5rem;
    //adapt to mobile
    @media (max-width: 907px) {
        margin-top: .12rem;
        padding: 0.5rem 0.5rem;
    }
`;

const ModalSentenceContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0rem 1rem;
    border-top-left-radius: 0.25em;
    border-top-right-radius: 0.25em;
`;

const SentenceSelectedPill = styled.div`
    display: block;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255,1);
    width: 100%;
    color: rgba(0, 0, 0, 0.8);
    border-radius: 0.25em;
    padding: 0.3rem 1rem;
    font-size: 1.3rem;
    margin: 0.5rem 0.5rem;
    //adapt to mobile
    @media (max-width: 907px) {
        margin-top:2.5rem;
        padding: 0.5rem 0.5rem;
    }
`;

const SentenceTranslationInput = styled.input`
    display: block;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .5);
    border: none;
    width: 100%;
    color: rgba(255, 255, 255, 0.8);
    border-radius: 0.25em;
    padding: 0.3rem 1rem;
    font-size: 1.3rem;
    margin: 0.5rem 0.5rem;
    //adapt to mobile
    @media (max-width: 907px) {
        margin-top:2.5rem;
        padding: 0.5rem 0.5rem;
    }
`;


const EmojiSelectedPill = styled.div`
    display: block;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.backgroundColor};
    width: auto;
    color: rgba(0, 0, 0, 0.8);
    border-radius: 9999px;
    padding: 0.3rem 1rem;
    font-size: 1.3rem;
    margin: 0.5rem 0.5rem;

    //adapt to mobile
    @media (max-width: 907px) {
        margin-top:2.5rem;
        padding: 0.5rem 0.5rem;
        border-radius:25%;
    }
`;

const RobotEmoji = styled.div`
    position: ${props => props.position};
    animation: ${SpeakingRobotAnimation} 2s ease-in-out infinite;
`;

const TanguEmoji = styled.div`
    animation: ${SpeakingRobotAnimation} 2s ease-in-out infinite;
    animation-delay: 1s;
`;

const HighlightWord = styled.span`
    background-color: #85ffcb;
    color: #3a3d40;

    padding: 0 .5rem;
    border-radius: 5px;
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

    //adapt to mobile
    @media (max-width: 907px) {
        margin-bottom: 1.5rem;
    }
`;

const Progress = styled.div`
    width: ${props => props.progress}%;
    height: 100%;
    background-color: ${props => props.status === "correct" ? 'rgb(51, 230, 153)' : "yellow"};
    border-radius: 0.5rem;

    transition: width 0.5s ease-in-out, background-color 0.5s ease-in-out;
`;

const ModalButtonSend = styled.button`
    background-color: ${props => props.color};
    float: right;
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.3rem 1rem;
    margin-right : 1.5rem;

    font-size: 1rem;

    &:hover {
        cursor: pointer;
    }
    &:active {
        transform: scale(0.95);
    }
`;

const SentenceDifficulty = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    width: 100%;
    color: rgba(255, 255, 255, 0.6);

    font-size: 1rem;
    font-style: italic;

    //adapt to mobile
    @media (max-width: 907px) {

    }
`;


const API_GPT = process.env.REACT_APP_API_GPT;

const ReviewGPTComponent = ({cards, onClose, callBackFlashMessage}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [cardsToReview, setCardsToReview] = useState([]);
    const [sentence, setSentence] = useState("");
    const [sentenceReading, setSentenceReading] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [sentenceTranslation, setSentenceTranslation] = useState("");
    const [questionNumber, setQuestionNumber] = useState(0);

    const selectRandomCards = (cards, number = 4) => {
        let availableCards = cards;
        let randomCards = [];
        for (let i = 0; i < number; i++) {
            let randomIndex = Math.floor(Math.random() * availableCards.length);
            randomCards.push(availableCards[randomIndex]);
            availableCards.splice(randomIndex, 1);
        }
        return randomCards;
    };

    const highlightWords = (input = "", words) => {
        const regex = new RegExp(`(${words.join('|')})`, 'gi');
        const parts = input.split(regex);
      
        return parts.map((part, index) =>
          regex.test(part) ? <HighlightWord key={index}>{part}</HighlightWord> : part
        ); 
    };

    const generateSentenceGPT = (rcards) => {
        axios.post(`${API_GPT}generate/japanese/`, {cards: rcards}).then((response) => {
            //setSentence(response.data.sentence);
            let response_gpt = JSON.parse(response.data.choices[0].message.content)[0];

            setSentence(response_gpt.japanese_sentence);
            setSentenceReading(response_gpt.japanese_sentence_hiragana);
            setDifficulty(response_gpt.sentence_difficulty);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    useEffect(() => {
        console.log(cards);
        let rcards = selectRandomCards(cards.map(card => card.slug));
        setCardsToReview(rcards);
    }, []);

    useEffect(() => {
        if (cardsToReview.length > 0) {
            generateSentenceGPT(cardsToReview);
        }
    }, [cardsToReview]);
    

    return(
        <ModalContainer>
            <ExitButtonModal onClick={onClose}>❌</ExitButtonModal>
            <ModalContentBorder>
                <ModalContent>
                    {isLoading ? 
                        <SpinnerContainer>
                            <Spinner />
                            <RobotEmoji position={"absolute"}>🤖</RobotEmoji>
                        </SpinnerContainer>
                    :
                    <>
                    <ProgressBar>
                        <Progress status={"correct"} progress={(questionNumber/10)*100}/>
                    </ProgressBar>
                    <ModalWordsContainer>
                        {cardsToReview.map((card, index) => {
                            return (
                                <WordsSelectedPill key={index}>{card}</WordsSelectedPill>
                            )
                        })}
                    </ModalWordsContainer>
                    <ModalSentenceContainer>
                        <EmojiSelectedPill backgroundColor={'white'}>
                            <RobotEmoji position={"relative"}>🤖</RobotEmoji>
                        </EmojiSelectedPill>
                        <SentenceSelectedPill>
                            {highlightWords(sentence, cardsToReview)}
                        </SentenceSelectedPill>
                    </ModalSentenceContainer>
                    <SentenceDifficulty>This sentence should be around {difficulty} level.</SentenceDifficulty>
                    <ModalSentenceContainer>
                        <EmojiSelectedPill backgroundColor={'rgba(0,0,0,.3)'}>
                            <TanguEmoji>👺</TanguEmoji>
                        </EmojiSelectedPill>
                        <SentenceTranslationInput placeholder={"Translate the sentence !"}/>
                    </ModalSentenceContainer>
                    <ModalButtonSend color={'rgba(0,0,0,.3)'}>Send</ModalButtonSend>
                    </>
                    }
                    
                    
                </ModalContent>
            </ModalContentBorder>
        </ModalContainer>

    );
};

export default ReviewGPTComponent;
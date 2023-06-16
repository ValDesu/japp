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

    min-height: auto;

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
    height: 35rem;


    :focus {
        outline: none;
    }

    //adapt to mobile
    @media (max-width: 907px) {
        height: 99vh;
    }
`;

const SpinnerContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-top: -1rem;

    border-radius: 0.25em;

    //adapt to mobile
    @media (max-width: 907px) {
        margin-top: -2.5rem;
    }
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
    justify-content: space-evenly;
    align-items: center;
    padding: 1.5rem 1rem .5rem 1rem;
    border-top-left-radius: 0.25em;
    border-top-right-radius: 0.25em;

    //adapt to mobile
    @media (max-width: 907px) {
        flex-direction: column;
        padding: .1rem 1rem .5rem 1rem;
        flex-wrap: wrap;
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
    //adapt to mobile
    @media (max-width: 907px) {
        //each row
        width: 20rem;
        margin: 0.1rem 0.1rem;
        padding: 0.1rem 1rem;
        flex-wrap: wrap;

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
        margin-top:.1rem;
        padding: 0.5rem 0.5rem;
    }
`;

const SentenceTranslationInput = styled.textarea`
    display: block;
    align-items: center;
    resize: none;
    justify-content: center;
    background-color: rgba(0, 0, 0, .5);
    border: none;
    width: 100%;
    color: rgba(255, 255, 255, 0.8);
    border-radius: 0.25em;
    padding: 0.3rem 1rem;
    font-size: 1.3rem;
    margin: 0.5rem 0.5rem;

    ${props => props.disabled ? `
        pointer-events: none;
        border: 1px solid rgba(255, 255, 255, 0.8);
        padding: .1rem .1rem;
    `: ""};
    //adapt to mobile
    @media (max-width: 907px) {
        margin-top: 1rem;
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

const IsTypingAnimation = keyframes`
    0% {
        transform: translateY(0.2rem);
        background-color: rgba(180, 180, 180, 1);
    }
    50% {
        transform: translateY(-0.2rem);
        background-color: rgba(190, 190, 190, 1);
    }
    100% {
        transform: translateY(0.2rem);
        background-color: rgba(170, 170, 170, 1);
    }
`;

const IsTypingDotsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    width: 100%;
    height: 1.5rem;
    color: rgba(255, 255, 255, 0.6);

    font-size: 1rem;
    font-style: italic;

    //adapt to mobile
    @media (max-width: 907px) {

    }
`;

const IsTypingDot = styled.div`
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: rgba(180, 180, 180, 1);
    margin: 0 0.2rem;

    animation: ${IsTypingAnimation} 1s ease-in-out infinite;
    animation-delay: ${props => props.delay}s;
`;

const Grade = styled.span`
    font-size: 1rem;
    font-weight: bold;
    color: ${props => props.grade >= 8 ? "rgb(32, 177, 114)" : props.grade >= 5 ? "yellow" : "red"};
`;

const AdviceTitleContainer = styled.div`
    font-size: 1.3rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.8);
    margin-left: 2rem;
    margin-bottom: -2.3rem;
`;

const AdviceTitle = styled.span`
    background-color: white;
`;

const Advice = styled.div`
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
`;

const SentenceCorrection = styled.span`
    color: rgba(0, 0, 0, 1);
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    background-color: rgba(133, 255, 203, 1);
`;

const ResponseTextContainer = styled.div`
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    height: 15rem;

    color: rgba(0, 0, 0, 1);

    overflow-y: scroll;
`;

const AppearAnimation = keyframes`
    0% {
        opacity: 0;
        transform: translateY(1rem);
    }
    100% {
        opacity: 1;
        transform: translateY(0rem);
    }
`;

const AppearResponseContainer = styled.div`
    opacity: 0;
    animation: ${AppearAnimation} ${props => props.time}s ease-in-out;
    animation-delay:${props => props.delay}ms;
    animation-fill-mode: forwards;
`;

const NextExerciseButton = styled.button`
    position: sticky;
    background-color: rgb(32, 177, 114);
    float: right;
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.3rem 1rem;
    margin-top: .3rem;
    bottom: 0;
    font-size: 1rem;
    opacity: 0.8;

    &:hover {
        cursor: pointer;
        opacity: 1;

    }
    &:active {
        transform: scale(0.95);
    }
`;


const API_GPT = process.env.REACT_APP_API_GPT;

const ReviewGPTComponent = ({cards, onClose, callbackFlashMessage}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [cardsToReview, setCardsToReview] = useState([]);
    const [sentence, setSentence] = useState("");
    const [sentenceReading, setSentenceReading] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [sentenceTranslation, setSentenceTranslation] = useState("");
    const [questionNumber, setQuestionNumber] = useState(0);
    const [englishCards, setEnglishCards] = useState([]);

    const [isCorrection, setIsCorrection] = useState(false);
    const [sentenceCorrection, setSentenceCorrection] = useState("");
    const [sentenceCorrectionReading, setSentenceCorrectionReading] = useState("");
    const [grammarAdvice, setGrammarAdvice] = useState("");
    const [generalAdvice, setGeneralAdvice] = useState("");
    const [grade, setGrade] = useState("");

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
        console.log("generateSentenceGPT");
        let japanese_or_english = questionNumber % 2 === 0 ? "japanese" : "english";
        axios.post(`${API_GPT}generate/${japanese_or_english}`, {cards: rcards}).then((response) => {
            //setSentence(response.data.sentence);
            let response_gpt = JSON.parse(response.data.choices[0].message.content)[0];

            if(japanese_or_english === "english") {
                setSentence(response_gpt.english_sentence);
                console.log(response_gpt.japanese_words_in_english_sentence.split("/"));
                setEnglishCards(response_gpt.japanese_words_in_english_sentence.split("/"));
            }

            if(japanese_or_english === "japanese") {
                setSentence(response_gpt.japanese_sentence);
                setSentenceReading(response_gpt.japanese_sentence_hiragana);
            }

            setDifficulty(response_gpt.sentence_difficulty);

        }).catch((error) => {
            console.log(error);
            callbackFlashMessage("An error occured! Please wait.", "error");
            nextQuestionHandler();
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const sendTranslationHandler = () => {
        if (sentenceTranslation === "") {
            callbackFlashMessage("You must write a translation!", "error");
            return;
        }

        setIsCorrection(true);
        let japanese_or_english = questionNumber % 2 === 0 ? "english" : "japanese";
        axios.post(`${API_GPT}correct/${japanese_or_english}`, {japanese_sentence: sentence, english_sentence: sentenceTranslation}).then((response) => {
            let response_gpt = JSON.parse(response.data.choices[0].message.content)[0];
            console.log(response_gpt);

            setSentenceCorrection(response_gpt.proposed_correction);
            setGrammarAdvice(response_gpt.advice_grammar);
            setGeneralAdvice(response_gpt.advice_general);
            setGrade(response_gpt.grade);
        }).catch((error) => {
            console.log(error);
            callbackFlashMessage("An error occured! Please wait.", "error");
            nextQuestionHandler();
        }).finally(() => {
            
        });
    };

    const nextQuestionHandler = () => {
        if (questionNumber === 10) {
            onClose();
            return;
        }

        setQuestionNumber(questionNumber + 1);
        setIsCorrection(false);

        setSentenceTranslation("");
        setSentenceCorrection("");
        setGrammarAdvice("");
        setGeneralAdvice("");
        setGrade("");
        setSentence("");
        setSentenceReading("");
        setDifficulty("");
        setCardsToReview([]);
        setEnglishCards([]);

        setIsLoading(true);

        let rcards = selectRandomCards(cards.map(card => card.slug));
        setCardsToReview(rcards);
    };

    useEffect(() => {
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
                    <ProgressBar>
                        <Progress status={"correct"} progress={(questionNumber/10)*100}/>
                    </ProgressBar>
                    {isLoading ? 
                        <SpinnerContainer>
                            <Spinner />
                            <RobotEmoji position={"absolute"}>🤖</RobotEmoji>
                        </SpinnerContainer>
                    :
                    <>
                    
                    <ModalWordsContainer>
                        {
                           (questionNumber % 2 === 0) 
                           ? 
                           cardsToReview.map((card, index) => {
                            return (
                                <AppearResponseContainer key={index} delay={index*150} time={1}>
                                    <WordsSelectedPill >{card}</WordsSelectedPill>
                                </AppearResponseContainer>
                            )
                        })
                           :
                           englishCards.map((card, index) => {
                            return (
                                <AppearResponseContainer key={index} delay={index*150} time={1}>
                                    <WordsSelectedPill >{card}</WordsSelectedPill>
                                </AppearResponseContainer>
                            )
                        })
                        }
                    </ModalWordsContainer>
                    <AppearResponseContainer delay={1000} time={1.3}>
                    <ModalSentenceContainer>
                        <EmojiSelectedPill backgroundColor={'white'}>
                            <RobotEmoji position={"relative"}>🤖</RobotEmoji>
                        </EmojiSelectedPill>
                        <SentenceSelectedPill>
                            {highlightWords(sentence, (questionNumber % 2 === 0) ? cardsToReview : englishCards)}
                        </SentenceSelectedPill>
                    </ModalSentenceContainer>
                    </AppearResponseContainer>
                    
                    <AppearResponseContainer delay={1200} time={1.3}>
                        <SentenceDifficulty>This sentence should be around {difficulty} level.</SentenceDifficulty>
                    </AppearResponseContainer>

                    <AppearResponseContainer delay={1850} time={2}>
                    <ModalSentenceContainer>
                        <EmojiSelectedPill backgroundColor={'rgba(0,0,0,.3)'}>
                            <TanguEmoji>👺</TanguEmoji>
                        </EmojiSelectedPill>
                        <SentenceTranslationInput onChange={(e) => {setSentenceTranslation(e.target.value)}} disabled={isCorrection} placeholder={`Translate the above sentence ! ${questionNumber %2 === 0 ? "(Any language is fine ! ✨)": "(Use Japanase this time ! 🎌)"}`}/>
                    </ModalSentenceContainer>
                    {!isCorrection && <ModalButtonSend onClick={sendTranslationHandler} color={'rgba(0,0,0,.3)'}>Send</ModalButtonSend>}
                    </AppearResponseContainer>
                    {isCorrection &&
                    <AppearResponseContainer delay={0} time={1}>
                    <ModalSentenceContainer>
                        <EmojiSelectedPill backgroundColor={'white'}>
                            <RobotEmoji position={"relative"}>🤖</RobotEmoji>
                        </EmojiSelectedPill>
                        <SentenceSelectedPill>
                            {
                                sentenceCorrection !== "" && grammarAdvice !== "" && generalAdvice !== "" ? 
                                <ResponseTextContainer>
                                    <NextExerciseButton onClick={nextQuestionHandler}>Next question</NextExerciseButton>
                                    I would give the student a <Grade grade={grade.substring(0, grade.indexOf('/'))}>{grade}</Grade> for this sentence. <br/>
                                    <AdviceTitleContainer>
                                        <AdviceTitle>Proposition</AdviceTitle>
                                    </AdviceTitleContainer><br/>
                                    <Advice>
                                        <SentenceCorrection>{sentenceCorrection}</SentenceCorrection>
                                    </Advice>
                                    
                                    <AdviceTitleContainer>
                                        <AdviceTitle>Grammar advice</AdviceTitle>
                                    </AdviceTitleContainer> <br/>
                                    <Advice>{highlightWords(grammarAdvice, (questionNumber % 2 === 0) ? cardsToReview : englishCards)}</Advice> 
                                    <AdviceTitleContainer>
                                        <AdviceTitle>General advice</AdviceTitle>
                                    </AdviceTitleContainer> <br/>
                                    <Advice>{highlightWords(generalAdvice, (questionNumber % 2 === 0) ? cardsToReview : englishCards)}</Advice>
                                    
                                </ResponseTextContainer>
                                :
                                <IsTypingDotsContainer>
                                    <IsTypingDot delay={0}/>
                                    <IsTypingDot delay={0.2}/>
                                    <IsTypingDot delay={0.4}/>
                                </IsTypingDotsContainer>
                            }
                                
                        </SentenceSelectedPill>
                    </ModalSentenceContainer>
                    </AppearResponseContainer>
                    }
                    </>
                    }
                </ModalContent>
            </ModalContentBorder>
        </ModalContainer>

    );
};

export default ReviewGPTComponent;
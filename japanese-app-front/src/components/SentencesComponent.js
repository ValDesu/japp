import styled, {keyframes} from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const SentenceHolder = styled.div`
    position: absolute;
    bottom: ${props => props.display === 'true' ? '1rem' : '-150%'};
    width: 50%;
    height: auto;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0px 0px 15px 10px rgba(0,0,0,0.1);

    transition: all 0.5s ease-in-out;
    z-index: 10;

    //adapt to mobile
    @media (max-width: 600px) {
        ${props => props.isVertical ? `
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 80%;
        z-index: 10;
        ` : 
        `
        width: 95%;
        `
        }
    }

`;

const Sentence = styled.p`
    font-size: 1rem;
    margin-bottom: 1rem;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    //-webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

`;

const SentenceTranslation = styled.div`
    font-size: .9rem;
    margin-left: .2rem;
    margin-top: -10px;
    font-weight: italic;
    color: grey;
`;

const HighlightWord = styled.span`
    background-color: #85ffcb;
    color: #3a3d40;
    font-size: 1rem;

    padding: 0 .5rem;
    border-radius: 5px;
`;

//TODO make separate component :
const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    border: 5px solid rgb(51, 230, 153);
    border-radius: 5px;
    width: 35px;
    height: 35px;
    animation: ${spin} 4s linear infinite;
    margin-left: 48%;
`;

const TwitterCornerButton = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    width: 25px;
    height: 25px;
    background-color: rgb(29, 161, 242, 0.3);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    color: transparent;
    text-shadow: 0 0 0 #fff;

    &:hover {
        background-color: rgb(29, 161, 242);
    }
`;

const CloseButton = styled.div`
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 25px;
    height: 25px;
    background-color: transparent;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    color: rgba(0,0,0,0.3);
    
    &:hover {
        color: rgba(0,0,0,1);
    }
`;

const SwitchToReadingButton = styled.div`
    bottom: 5px;
    left: 5px;
    width: 25px;
    height: 25px;
    background-color: transparent;
    border-radius: 50%;
    display: inline;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    color: rgba(0,0,0,0.3);

    &:hover {
        color: rgba(0,0,0,1);
    }
`;

const API_TWITTER = process.env.REACT_APP_API_TWITTER;

const SentencesComponent = ({display, slug, isVertical, onClose}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [sentence, setSentence] = useState("");
    const [sentenceTranslation, setSentenceTranslation] = useState("");
    const [sentenceReading, setSentenceReading] = useState("");
    const [displayReading, setDisplayReading] = useState(false);

    const highlightWord = (input, word) => {
        const regex = new RegExp(`(${word})`, 'gi');
        const parts = input.split(regex);
      
        return parts.map((part, index) =>
          regex.test(part) ? <HighlightWord key={index}>{part}</HighlightWord> : part
        ); 
    };

    const getSentence = (slug) => {
        setDisplayReading(false);
        axios.post(API_TWITTER + "retrieve/", {word: slug}).then((res) => {
            console.log(res.data);
            //verify if there is a sentence
            if(res.data.sentences.length === 0) {
                setSentence("No sentence found 😿");
                setSentenceTranslation("Try using the twitter button and find real life examples !");
                setSentenceReading("");
                setIsLoading(false);
                return;
            }

            //verify if there is a translation
            if(res.data.sentences[0].translations.length === 0 || res.data.sentences[0].translations[0].filter((word) => word.lang === "eng").length === 0 ) {
                setSentence(res.data.sentences[0].text);
                setSentenceTranslation("No translation found");
                setIsLoading(false);
                return;
            }

            setSentence(highlightWord(res.data.sentences[0].text, slug));
            setSentenceTranslation(res.data.sentences[0].translations[0].filter((word) => word.lang === "eng")[0].text);
            setSentenceReading(res.data.sentences[0].transcriptions[0].text);
            setIsLoading(false);

        }).catch((err) => {
            console.log(err);
        });
    }



    useEffect(() => {
        if(slug === "") {
            return;
        }
        setIsLoading(true);
        getSentence(slug);
    }, [slug]);


    return (
        <>
        <SentenceHolder display={`${display}`} isVertical={isVertical}>
            {isLoading ?
             <Spinner />
             : 
             <>
                <TwitterCornerButton onClick={() => window.open(`https://twitter.com/search?q=${slug}%20lang%3Aja&src=typed_query`, "_blank")}>
                    🐤
                </TwitterCornerButton>
                <CloseButton onClick={onClose}>
                    ❌
                </CloseButton>
                <Sentence>
                    {sentence}
                </Sentence>
                <SentenceTranslation>
                    {displayReading ? sentenceReading : sentenceTranslation} <SwitchToReadingButton onClick={setDisplayReading.bind(this, !displayReading)}>◀️</SwitchToReadingButton>
                </SentenceTranslation>
             </>
            }
        </SentenceHolder>
        
        </>
    );
};

export default SentencesComponent;
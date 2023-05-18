import styled, {keyframes} from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const API_TWITTER = "http://localhost:3000/api/v1/twitter/";

const SentenceHolder = styled.div`
    position: absolute;
    bottom: ${props => props.display ? '1rem' : '-150%'};
    width: 50%;
    height: auto;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0px 0px 15px 10px rgba(0,0,0,0.1);

    transition: all 0.5s ease-in-out;

    //adapt to mobile
    @media (max-width: 600px) {
        ${props => props.isVertical ? `
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 80%;
        z-index: 10;
        ` : ''
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

const SentenceTranslation = styled.p`
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
    margin-left: 50%;
`;

const SentencesComponent = ({display, slug, isVertical}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [sentence, setSentence] = useState("");
    const [sentenceTranslation, setSentenceTranslation] = useState("");

    const highlightWord = (input, word) => {
        const regex = new RegExp(`(${word})`, 'gi');
        const parts = input.split(regex);
      
        return parts.map((part, index) =>
          regex.test(part) ? <HighlightWord key={index}>{part}</HighlightWord> : part
        ); 
    };

    const getSentence = (slug) => {
        axios.post(API_TWITTER + "retrieve/", {word: slug}).then((res) => {
            setSentence(highlightWord(res.data.sentences[0].text, slug));
            setSentenceTranslation(res.data.sentences[0].translations[0].filter((word) => word.lang === "eng")[0].text);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    }



    useEffect(() => {
        if(slug === "") return;
        setIsLoading(true);
        getSentence(slug);
    }, [slug]);


    return (
        <>
        <SentenceHolder display={display} isVertical={isVertical}>
            {isLoading ?
             <Spinner />
             : 
             <>
                <Sentence>
                    {sentence}
                </Sentence>
                <SentenceTranslation>
                    {sentenceTranslation}
                </SentenceTranslation>
             </>
            }
        </SentenceHolder>
        
        </>
    );
};

export default SentencesComponent;
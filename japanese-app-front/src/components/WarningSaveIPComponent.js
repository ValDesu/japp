import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ModalContainer = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
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
    background-color: ${props => props.disabled ? "#ccc" : "rgb(51, 230, 153)"};
    border: none;
    border-radius: 9999px;
    color: #333;
    font-size: 1rem;
    font-weight: bold;
    width: 100%;

    padding: 0.5rem 0;
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
`;

const ModalWarningText = styled.p`
    font-size: 1rem;
    margin-bottom: 1rem;
`;

const ModalIPAdressSpan = styled.span`
    font-size: 1rem;
    font-weight: bold;
    color: rgb(51, 230, 153);
`;

const SpanWaitingTime = styled.span`
    font-size: 1rem;
    font-weight: bold;
    color: rgb(51, 230, 153);
`;


const WarningSaveIPComponent = ({onClose, onStart, loadingCallback, API_URL}) => {

    const [isFreeTry, setIsFreeTry] = useState(false);
    const [userIPAddress, setUserIPAddress] = useState("");
    const [waitingTime, setWaitingTime] = useState("");
    const initialRender = useRef(true);

    const startButtonHandler = () => {
        loadingCallback(true);
        axios.post(`${API_URL}register_ip`, {'ip': userIPAddress}).then((response) => {
            console.log(response.data);
            
        }).catch((error) => {
            console.log('error', error);
            
        }).finally(() => {
            loadingCallback(false);
            onClose();
        });
    };

    const checkForFreeTry = () => {
        //get user's IP address from https://api.ipify.org?format=json
        axios.get("https://api4.my-ip.io/ip.json").then((response) => {
            setUserIPAddress(response.data.ip);
            const userIP = response.data.ip;
            //check if user's IP is in the database
            axios.post(`${API_URL}free_try`, {'ip': userIP}).then((response) => {
                console.log(response.data);
                setIsFreeTry(response.data.free_try);
                setWaitingTime(response.data.waiting_time);
                loadingCallback(false);
            }).catch((error) => {
                console.log(error);
                onClose();
            });

        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        if(initialRender.current) {
            checkForFreeTry();
            initialRender.current = false;
        }
    }, []);

    return(
    <>
        <ModalContainer>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>Warning (not available yet)</ModalTitle>
                    <ModalCloseButton onClick={onClose}>❌</ModalCloseButton>
                </ModalHeader>
                <ModalWarningText>
                    {!isFreeTry ? 
                    <>
                    Your IP address was found in the database. You can't use this feature anymore.
                    You will be able to use it again in <SpanWaitingTime>{waitingTime}</SpanWaitingTime>.&nbsp;

                    </>
                    : 
                    `Using the "AI output exercices" feature cost a lot of money.
                    Because JAPP is a free app, I can't afford to pay for it.
                    Your IP address will be saved to prevent abuse, so you can use it only once every 24 hours.
                    `
                    }
                    In the future, I will add a credit system to allow you to use it more often.
                </ModalWarningText>
                <ModalIPAdressSpan>
                    Your IP address: {userIPAddress}
                </ModalIPAdressSpan>
                {
                    isFreeTry && <ModalStartButton disabled={false} onClick={startButtonHandler}>I'm ok with storing my IP (soon)</ModalStartButton>
                }
            </ModalContent>
        </ModalContainer>
    </>
    );
}

export default WarningSaveIPComponent;
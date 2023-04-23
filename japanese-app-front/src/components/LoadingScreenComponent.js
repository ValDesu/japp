
import styled, {keyframes} from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const LoadingScreenContainer = styled.div`
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
`;

const Spinner = styled.div`
    border: 10px solid rgb(51, 230, 153);
    border-radius: 15px;
    width: 75px;
    height: 75px;
    animation: ${spin} 5s linear infinite;
    margin-right: 1rem;
`;




const LoadingScreenComponent = () => {
    return (
        <LoadingScreenContainer>
            <Spinner />
        </LoadingScreenContainer>
    );
}

export default LoadingScreenComponent;


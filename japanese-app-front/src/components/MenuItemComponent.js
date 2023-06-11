import styled from "styled-components";

const BubbleMenuItem = styled.div`
  position: absolute;
  width: 15rem;
  height: 3rem;
  border-radius: 5rem;
  z-index: 5;
  background-color: ${props => props.disabled === 'true' ? '#b3b3b3' : '#33e699'};
  opacity: ${props => props.disabled === 'true' ? '0.5' : '1'};
  color: #36383c;
  align-items:center;
  justify-content: right;
  display: flex;

  bottom: ${props => 12 + props.bottom*4}rem;
  right: ${props => props.displayItems ? '3rem' : '-15rem'};

  cursor: pointer;
  transition: right 0.7s ease-in-out ${props => props.delay}s, transform 0.3s ease-in-out;

  box-shadow: 0 0 13px 0 rgba(0, 0, 0, 0.079);

    &:hover {
        transform: scale(1.05);
    }

    &:disabled {
        background-color: #b3b3b3;
        color: #fff;
        cursor: not-allowed;
    }

    //adapt to mobile
    @media (max-width: 907px) {
        width: 10rem;
        height: 2rem;
        bottom: ${props => 10 + props.bottom*3}rem;
        right: ${props => props.displayItems ? '1rem' : '-10rem'};
    }
`;

const BubbleMenuItemText = styled.span`
  position: absolute;
  right: 1rem;

  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.5rem;

    //adapt to mobile
    @media (max-width: 907px) {
        font-size: 1rem;
        right: .5rem;
    }
`;

const BubbleNotification = styled.div`
  display: ${props => props.displayNotification};
  position:absolute;
  top: .5rem;
  left: .5rem;
  font-size: .8rem;
  color: black;
  padding: 0.3rem;
  background-color: white;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  text-align: center;

  animation: bubblePop 1s ease-in-out;

  //adapt to mobile
    @media (max-width: 907px) {
        top: .5rem;
        left: .25rem;
        width: 1rem;
        height: 1rem;
        font-size: .4rem;
        padding: 0.2rem;
    }
`;



const MenuItemComponent = ({ text, bottom, display, btnFunction, displayNotification = "none", disabled="false" }) => {
  return (
    <BubbleMenuItem disabled={disabled} bottom={bottom} displayItems={display} delay={bottom/12} onClick={btnFunction}>
        <BubbleMenuItemText>{text}</BubbleMenuItemText>
        <BubbleNotification displayNotification={displayNotification}>🔔</BubbleNotification>
    </BubbleMenuItem>
  );
};

export default MenuItemComponent;
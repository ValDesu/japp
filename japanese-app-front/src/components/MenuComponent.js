import styled from "styled-components";
import { useState } from "react";

import MenuItemComponent from "./MenuItemComponent";

const BubbleMenu = styled.div`
  position: absolute;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  z-index: 10;
  background-color: rgb(51, 230, 153);

  bottom: 3rem;
  right: 3rem;

  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 13px 0 rgba(0, 0, 0, 0.3);

    &:hover {
        transform: scale(1.1);
    }

    //adapt to mobile
    @media (max-width: 907px) {
        width: 4rem;
        height: 4rem;
        bottom: 5rem;
        right: 2rem;
    }

    @media (max-height: 500px) {
        bottom: 3rem;
        left: 3rem;
    }
`;

const BubbleNotification = styled.div`
  display: ${props => props.displayNotification};
  position:absolute;
  top: -1.3rem;
  right: -.7rem;
  font-size: 1rem;
  color: black;
  padding: 0.5rem;
  background-color: white;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  text-align: center;

  animation: bubblePop 0.5s ease-in-out;

  //adapt to mobile
    @media (max-width: 907px) {
        top: -.9rem;
        right: -.5rem;
        width: 2rem;
        height: 2rem;
        font-size: .8rem;
    }
`;

const BubbleText = styled.span`
  position: absolute;
  left: .7rem;

  font-size: 3rem;
  color: white;
  padding: 0.5rem;

    //adapt to mobile
    @media (max-width: 907px) {
        font-size: 1.8rem;
        left: .5rem;
    }
`;


const MenuComponent = ({displayNotification, onCreateNewDeck, onEdit, onDeckList}) => {
    const [displayItems, setDisplayItems] = useState(false);
    
    const OnClickMenuItemsAndHide = (func) => {
        func();
        setDisplayItems(false);
    }


    return (
        <>
        <BubbleMenu onClick={() => setDisplayItems(!displayItems) }>
            <BubbleNotification displayNotification={displayNotification}>🔔</BubbleNotification>
            <BubbleText>✒️</BubbleText>
        </BubbleMenu>

        <MenuItemComponent display={displayItems}
            btnFunction={OnClickMenuItemsAndHide.bind(this, onCreateNewDeck)}
            text={"Create new deck"}
            bottom={0}
        />

        <MenuItemComponent display={displayItems}
            btnFunction={OnClickMenuItemsAndHide.bind(this, onDeckList)}
            text={"View online decks"}
            bottom={1}
        />

        <MenuItemComponent display={displayItems}
            btnFunction={OnClickMenuItemsAndHide.bind(this, onEdit)}
            text={"Edit my decks"}
            bottom={2}
        />
        </>
         
    );
}

export default MenuComponent;
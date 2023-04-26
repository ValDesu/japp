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
`;

const BubbleText = styled.span`
  position: absolute;
  left: .7rem;

  font-size: 3rem;
  color: white;
  padding: 0.5rem;
`;


const MenuComponent = ({displayNotification, onCreateNewDeck, onDeckList}) => {
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
            btnFunction={() => console.log("Edit my decks")}
            text={"Edit my decks"}
            bottom={2}
        />
        </>
         
    );
}

export default MenuComponent;
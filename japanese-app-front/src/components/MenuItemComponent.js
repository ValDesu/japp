import styled from "styled-components";

const BubbleMenuItem = styled.div`
  position: absolute;
  width: 15rem;
  height: 3rem;
  border-radius: 5rem;
  z-index: 10;
  background-color: #33e699;
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
`;

const BubbleMenuItemText = styled.span`
  position: absolute;
  right: 1rem;

  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.5rem;
`;


const MenuItemComponent = ({ text, bottom, display, btnFunction }) => {
  return (
    <BubbleMenuItem bottom={bottom} displayItems={display} delay={bottom/12} onClick={btnFunction}>
        <BubbleMenuItemText>{text}</BubbleMenuItemText>
    </BubbleMenuItem>
  );
};

export default MenuItemComponent;
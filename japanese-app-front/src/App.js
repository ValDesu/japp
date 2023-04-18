import "./App.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "bulma/css/bulma.min.css";
import logo from "./logo.png";
import CardComponent from "./components/CardComponent";
import ModalComponent from "./components/ModalComponent";

const API_JISHO = "http://localhost:3000/api/v1/jisho/";
const API_DECKS = "http://localhost:3000/api/v1/decks/";

function App() {
  const [cards, setCards] = useState([]);
  const [blur, setBlur] = useState("");
  const [displayModalNewDeck, setDisplayModalNewDeck] = useState(false);
  const [requestQueue, setRequestQueue] = useState([]);
  const [filterCommun, setFilterCommun] = useState(false);

  const [displayCardHolder, setDisplayCardHolder] = useState("card-holder-hidden");
  const [displayNotification, setDisplayNotification] = useState("display-none");

  const [savedCards, setSavedCards] = useState([]);

  const lastRequestItem = useRef('');

  const onBookmarkClick = (card) => {
    //if the card slug is already in the savedCards array, we remove it
    if(savedCards.some((savedCard) => savedCard.slug === card.slug)){
      filterCardsBySlug(card);
      return;
    }

    setSavedCards((cards) => [...cards, card]);
  };

  const onRemoveCardFromModal = (btn) => {
    let cardSlug = btn.target.getAttribute("data-card-slug");
    filterCardsBySlug({slug: cardSlug});
  };

  const filterCardsBySlug = (card) => {
    setSavedCards((cards) => cards.filter((savedCard) => savedCard.slug !== card.slug));
  };

  const handleRequest =  (request) => {
    setBlur("blur");
    axios.get(API_JISHO + (filterCommun ? 'commun/':'') + request).then((response) => {
      if (lastRequestItem.current !== request) return;
      setCards(response.data.data);
      setBlur("");
    });
  };

  useEffect(() => {
    if (requestQueue.length === 0) return;
    
    lastRequestItem.current = requestQueue[requestQueue.length - 1];
    handleRequest(lastRequestItem.current);

  }, [requestQueue]);

  useEffect(() => {
    if (requestQueue.length === 0) return;

    handleRequest(lastRequestItem.current);
  }, [filterCommun]);

  useEffect(() => {
    console.log(savedCards);
    
    if(savedCards.length > 0){
      setDisplayNotification("");
    }else{
      setDisplayNotification("display-none");
    }
  }
  , [savedCards]);

  const handleInputChange = (event) => {
    let valid = event.target.value.length > 0;
    setDisplayCardHolder( !valid ? "card-holder-hidden" : "");
    if(!valid) return;

    setRequestQueue((queue) => [...queue, event.target.value]);
  };

  const onSaveFromModal = (btn) => {
    let deckName = btn.target.getAttribute("data-deck-name");
    createDeck(deckName, "").then((response) => {
      if(response === -1) return;
      let deckId = response.id;
      console.log(deckId);
    });
  };

  const createDeck = async (name, password) => {
    try {
      const response = await axios.post(API_DECKS, { name, password });
      return response.data;
    } catch (error) {
      console.error(error);
      return -1;
    }
  };

  return (
    <div className="App">
      <ModalComponent 
        isOpen={displayModalNewDeck}
        children={savedCards}
        onClose={setDisplayModalNewDeck.bind(this, false)}
        onRemoveCardFromModal={onRemoveCardFromModal}
        onSave={onSaveFromModal}
      />
      <div className="bubble-menu">
        <div className={`bubble-notification ${displayNotification}`} >
          <span className="bubble-notification-text">🔔</span>
        </div>
        <span className="bubble-text">✒️</span>
      </div>
      <div className="bubble-menu-item" onClick={setDisplayModalNewDeck.bind(this, true)}>
          <span className="bubble-menu-text" >Make a new deck</span>
      </div>
      <div className={`card-holder ${blur} ${displayCardHolder}`} >
        {cards.map((card) => (
          <CardComponent
            key={card.slug}
            title={card.slug}
            reading={card.japanese[0].reading}
            description={card.senses[0].english_definitions.join(", ")}
            pillText={card.jlpt[0] || ""}
            isCommun={card.is_common}
            onBookmarkClick={onBookmarkClick.bind(this, card)}
            isSaved={savedCards.some((savedCard) => savedCard.slug === card.slug)}
          />
        ))}
      </div>
      <div className="hero">
        <div className="hero-body">
          <div className="container has-text-centered ">
            <img src={logo} alt="logo" className="logo" />
            <p className="title is-5 has-text-white">Look for any word !</p>
            <input
              type="text"
              placeholder="探しましょうか..."
              className="search-bar"
              onChange={handleInputChange}
            />
            <div className="filter">
              <input type={"checkbox"} onChange={() => setFilterCommun(!filterCommun)} />
              <label>Filter commun words</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

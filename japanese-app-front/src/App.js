import "./App.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "bulma/css/bulma.min.css";
import logo from "./logo.png";
import CardComponent from "./components/CardComponent";
import ModalComponent from "./components/ModalComponent";
import LoadingScreenComponent from "./components/LoadingScreenComponent";
import FlashMessageComponent from "./components/FlashMessageComponent";
import MenuComponent from "./components/MenuComponent";
import ModalDeckList from "./components/ModalDeckList";
import ModalEditComponent from "./components/ModalEditComponent";
import EditNotifierComponent from "./components/EditNotifierComponent";
import ReviewFlashcardsSettingComponent from "./components/ReviewFlashcardsSettingComponent";
import ReviewModalComponent from "./components/ReviewModalComponent";

const API_JISHO = "http://localhost:3000/api/v1/jisho/";
const API_DECKS = "http://localhost:3000/api/v1/decks/";

class ICard {
  constructor(
    slug,
    reading,
    meanings,
    jlpt,
    isCommon
  ) {
    this.slug = slug;
    this.reading = reading;
    this.meanings = meanings;
    this.jlpt = jlpt;
    this.isCommon = isCommon;
  }
}

class IReviewSetting {
  constructor(
    reviewMode,
    reviewWith,
    reviewTimes,
    reviewType,
    reviewExercice
  ) {
    this.reviewMode = reviewMode;
    this.reviewWith = reviewWith;
    this.reviewTimes = reviewTimes;
    this.reviewType = reviewType;
    this.reviewExercice = reviewExercice;
  }
}

function App() {

  //Loading screen states
  const [loading, setLoading] = useState(false);
  const [blur, setBlur] = useState("");

  //Flash message states
  const [displayFlashMessage, setDisplayFlashMessage] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashMessageType, setFlashMessageType] = useState("");

  const displayFlashMessageHandler = (message, type) => {
    setFlashMessage(message);
    setFlashMessageType(type);
    setDisplayFlashMessage(true);
  };

  useEffect(() => {
    //setDisplayFlashMessage(false) after 7 seconds
    if (displayFlashMessage) {
      setTimeout(() => {
        setDisplayFlashMessage(false);
      }, 7000);
    }
  }, [displayFlashMessage]);

  //Cards states
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  //Search states
  const [requestQueue, setRequestQueue] = useState([]);
  const [filterCommon, setFilterCommon] = useState(false);
  const [displayCardHolder, setDisplayCardHolder] = useState("card-holder-hidden");
  const lastRequestItem = useRef('');

  //Decks states
  const [decks, setDecks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDeck, setCurrentDeck] = useState({name: "", password: ""});
  const [reviewDeckID, setReviewDeckID] = useState(0);
  const [reviewSetting, setReviewSetting] = useState(new IReviewSetting());
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewCards, setReviewCards] = useState([]);

  const onCancelEdit = () => {
    setIsEditing(false);
    setCurrentDeck({name: "", password: ""});
    setSavedCards([]);
  };

  const flashcardsSettingHandler = (btn) => {
    setDisplayModalReviewFlashcardsSetting(true);
    setReviewDeckID(btn.target.getAttribute("data-deck-id"));
    console.log(btn.target.getAttribute("data-deck-id"));
  };

  const onStartReview = (reviewSetting) => {
    setDisplayCardHolder("card-holder-hidden");
    setLoading(true);
    setReviewSetting(reviewSetting);

    axios.post(API_DECKS + "review/", {'deck_id': reviewDeckID, 'review_setting': reviewSetting} ).then((response) => {
      console.log(response.data);

      setReviewCards(response.data);
      setDisplayModalDeckList(false);
      setDisplayModalReviewFlashcardsSetting(false);
      setIsReviewing(true);
    }).catch((error) => {
      console.log(error.response.data.error);
      displayFlashMessageHandler(error.response.data.error, "error");
    }).finally(() => {
      setLoading(false);
    });
    
  }

  const saveReview = ({reviewedCards}) => {
    console.log(reviewedCards);
    setLoading(true);
    axios.post(API_DECKS + "review/update/", {'deck_id': reviewDeckID, 'reviewed_cards': reviewedCards} ).then((response) => {
      console.log(response.data);
      displayFlashMessageHandler("Review saved successfully !", "success");
    }).catch((error) => {
      console.log(error.response.data.error);
      displayFlashMessageHandler(error.response.data.error, "error");
    }).finally(() => {
      setLoading(false);
      setIsReviewing(false);
    });
  };


  //Menu states
  const [displayModalNewDeck, setDisplayModalNewDeck] = useState(false);
  const [displayModalDeckList, setDisplayModalDeckList] = useState(false);
  const [displayModalEdit, setDisplayModalEdit] = useState(false);
  const [displayNotification, setDisplayNotification] = useState("none");

  //Review flashcards states
  const [displayModalReviewFlashcardsSetting, setDisplayModalReviewFlashcardsSetting] = useState(false);

  const displayModalDeckListHandler = ({name = "", page = 0}) => {
    setDisplayModalDeckList(true);
    setLoading(true);
    axios.get(API_DECKS + "search/", { params: {'name': name, 'page': page} }).then((response) => {
      setLoading(false);
      setDecks(response.data);
      console.log(response.data);
    });
  };

  const onDeckEdit = ({name = null, password = null}) => {
    setLoading(true);
    axios.get(API_DECKS + "edit/", { params: {'name': name, 'password': password} }).then((response) => {
      console.log(response.data);

      setSavedCards(response.data.cards);
      setIsEditing(true);
      setCurrentDeck({name: name, password: password});

      setDisplayModalEdit(false);
      displayFlashMessageHandler("Deck loaded successfully !", "success");
    }).catch((error) => {
      console.log(error.response.data.error);
      displayFlashMessageHandler(error.response.data.error, "error");
    }).finally(() => {
      setLoading(false);
    });

  };
  
  //User interaction handlers
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
    axios.get(API_JISHO + (filterCommon ? 'common/':'') + request).then((response) => {
      if (lastRequestItem.current !== request) return;

      let cards = response.data.data.map((raw_card) => {
        console.log(raw_card.is_common);
        return new ICard(
          raw_card.slug,
          raw_card.japanese[0].reading,
          raw_card.senses[0].english_definitions,
          (!raw_card.jlpt.length ? "" : raw_card.jlpt[0].substring(6)),
          raw_card.is_common
        );
      });

      setCards(cards);
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
  }, [filterCommon]);

  useEffect(() => {
    console.log(savedCards);
    
    if(savedCards.length > 0){
      setDisplayNotification("");
    }else{
      setDisplayNotification("none");
    }
  }
  , [savedCards]);


  const handleInputChange = (event) => {
    let valid = event.target.value.length > 0;
    setDisplayCardHolder( !valid ? "card-holder-hidden" : "");
    if(!valid) return;

    setRequestQueue((queue) => [...queue, event.target.value]);
  };

  const onUpdateFromModal = () => {
    setLoading(true);
    axios.put(API_DECKS + "update/",
      { name: currentDeck.name, password: currentDeck.password, cards: savedCards}
    ).then((response) => {
      console.log(response.data);
      displayFlashMessageHandler("Deck updated successfully !", "success");
    }).catch((error) => {
      console.log(error.response.data.error);
      displayFlashMessageHandler(error.response.data.error, "error");
    }).finally(() => {
      setLoading(false);
    });
  };

  const onSaveFromModal = (btn) => {
    setLoading(true);

    let deckName = btn.target.getAttribute("data-deck-name");
    let deckPassword = btn.target.getAttribute("data-deck-password");
    createDeck(deckName, deckPassword).then((response) => {
      setLoading(false);
      if(response === -1){
        console.error("Error while creating deck");
        //Display error message
        displayFlashMessageHandler("Error while creating deck: name not unique", "error");
        return;
      };


      //Display success message
      displayFlashMessageHandler("Deck created successfully", "success");
      setSavedCards([]);
      setDisplayModalNewDeck(false);

      console.log(response.id);
    });
  };

  const createDeck = async (name, password) => {
    try {
      const response = await axios.post(API_DECKS, { name, password, cards: savedCards});
      return response.data;
    } catch (error) {
      console.error(error);
      return -1;
    }
  };



  return (
    <div className="App">
      
      {displayFlashMessage && <FlashMessageComponent message={flashMessage} type={flashMessageType} />}
      {loading && <LoadingScreenComponent />}
      {isEditing && <EditNotifierComponent deckName={currentDeck.name} onClose={onCancelEdit}/> }
      {isReviewing && <ReviewModalComponent
        onCloseFinished={saveReview}
        reviewSetting={reviewSetting} 
        cards={reviewCards}
      />}
      

      <ReviewFlashcardsSettingComponent
        isOpen={displayModalReviewFlashcardsSetting}
        onClose={setDisplayModalReviewFlashcardsSetting.bind(this, false)}
        onStart={onStartReview}
      />

      <ModalEditComponent
        isOpen={displayModalEdit}
        onClose={setDisplayModalEdit.bind(this, false)}
        onEdit={onDeckEdit}
      />

      <ModalDeckList
        isOpen={displayModalDeckList}
        onClose={setDisplayModalDeckList.bind(this, false)}
        decks={decks}
        onSearch={displayModalDeckListHandler}
        onOpenReviewSetting={flashcardsSettingHandler}
      />

      <ModalComponent 
        isOpen={displayModalNewDeck}
        children={savedCards}
        onClose={setDisplayModalNewDeck.bind(this, false)}
        onRemoveCardFromModal={onRemoveCardFromModal}
        onSave={onSaveFromModal}
        onUpdate={onUpdateFromModal}
        isEditing={isEditing}

      />

      <MenuComponent 
        displayNotification={displayNotification}
        isEditing={isEditing}
        //Menu items functions
        onCreateNewDeck={setDisplayModalNewDeck.bind(this, true)}
        onDeckList={displayModalDeckListHandler.bind(this, {'name': "", 'page': 0})}
        onEdit={setDisplayModalEdit.bind(this, true)}
      />
            
      <div className={`card-holder ${blur} ${displayCardHolder}`} >
        {cards.map((card) => (
          <CardComponent
            key={card.slug}
            title={card.slug}
            reading={card.reading}
            description={card.meanings.join(", ")}
            pillText={card.jlpt || ""}
            isCommon={card.isCommon}
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
              <input type={"checkbox"} onChange={() => setFilterCommon(!filterCommon)} />
              <label>Filter common words</label>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;

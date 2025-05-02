import { useCallback, useEffect, useState } from "react";
import Card from "../Card/Card";
import { Animal, animals } from "../../constants/animals";
import "./Deck.css";

function Deck() {
  const [cards, setCards] = useState<Animal[]>([]);
  const [foundCards, setFoundCards] = useState<Animal[]>([]);
  const [activeCards, setActiveCard] = useState<[number?, number?]>([]);

  const isGameComplete = foundCards.length === animals.length;

  const initCards = useCallback(() => {
    const cards: Animal[] = [];

    for (const animal of animals) {
      cards.push(animal, animal);
    }

    setCards(shuffleCards(cards));
  }, []);

  const onSetActive = (index: number) => {
    // Disable clicks in case:
    // - There are currently 2 selected cards
    // - When clicking already active card
    // - When clicking a previously found card
    if (
      activeCards.length === 2 ||
      index === activeCards[0] ||
      foundCards.includes(cards[index])
    ) {
      return;
    }

    // If no cards selected
    if (activeCards[0] === undefined) {
      return setActiveCard([index]);
      // If both cards match
    } else if (cards[activeCards[0]] === cards[index]) {
      setActiveCard([activeCards[0], index]);
      setTimeout(() => {
        setFoundCards((found) => [...found, cards[index]]);
        setActiveCard([]);
      }, 500);
      // If one card selected and the second card doesn't match
    } else {
      setActiveCard([activeCards[0], index]);
      setTimeout(() => {
        setActiveCard([]);
      }, 1000);
    }
  };

  const shuffleCards = (_cards: Animal[]) => {
    return _cards.toSorted(() => Math.random() - 0.5);
  };

  const resetCards = async () => {
    for (let i = 0; i <= animals.length - 1; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setFoundCards((_found) => {
            const index = _found.indexOf(_found[i]);
            return _found.toSpliced(index, 1);
          });
          resolve("");
        }, 50);
      });
    }
    // Await transition to finish before shuffling the cards
    setTimeout(() => setCards((_cards) => shuffleCards(_cards)), 500);
  };

  // On mount
  useEffect(() => {
    initCards();
  }, [initCards]);

  return (
    <>
      <ul className="deck">
        {cards.map((card, i) => (
          <Card
            key={card + i}
            index={i}
            active={activeCards.includes(i)}
            found={foundCards.includes(card)}
            animal={card}
            setActive={onSetActive}
          />
        ))}
      </ul>
      {isGameComplete && (
        <div className="overlay">
          <div className="overlay--content">
            <h2>You won!</h2>
            <button className="reset" onClick={() => resetCards()}>
              Reset Game
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Deck;

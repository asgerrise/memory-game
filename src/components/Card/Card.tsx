import { Icon } from "@iconify/react";
import "./Card.css";
import { Animal } from "../../constants/animals";
import cardBack from "../../assets/card-back.svg"

type Props = {
  active: boolean;
  found: boolean;
  animal: Animal;
  index: number;
  setActive: (index: number) => void;
};

function Card(props: Props) {
  return (
    <li
      tabIndex={!props.found ? 0 : undefined}
      className={[
        "card",
        props.active ? "active" : "",
        props.found ? "found" : "",
      ]
        .join(" ")
        .trim()}
      onClick={() => props.setActive(props.index)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          props.setActive(props.index);
        }
      }}
    >
      <div className="card--inner">
        <div className="card--front">
          <Icon icon={`noto:${props.animal}`} />
        </div>
        <div className="card--back">
          <img src={cardBack} alt="Playing card background" />
        </div>
      </div>
    </li>
  );
}

export default Card;

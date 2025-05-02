import { Icon } from "@iconify/react";
import "./Card.css";
import { Animal } from "../../constants/animals";

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
      tabIndex={0}
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
          <img src="/src/assets/card-back.svg" alt="Playing card background" />
        </div>
      </div>
    </li>
  );
}

export default Card;

import { Star } from "phosphor-react";

export function StarsMapping(score: number) {
    return (
      <div>
        {Array.from({ length: 7 }, (_, i) => (
          <Star
            key={i}
            color={i < score ? "yellow" : "grey"} // replace 'grey' with your unfilled star color
            weight="fill"
            size={22}
          />
        ))}
      </div>
    );
  }
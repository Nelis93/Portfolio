import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
import {
  TiChevronLeftOutline,
  TiChevronRightOutline,
} from "https://cdn.skypack.dev/react-icons@4.12.0/ti";

const CARDS = 10;
const MAX_VISIBILITY = 3;

const Card = ({ title, content }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      padding: "2rem",
      backgroundColor: "hsl(280deg, 40%, 80%)", // Purple color with a dynamic lightness
      borderRadius: "1rem",
      color: "#9CA3AF", // Gray color
      textAlign: "justify",
      transition: "all 0.3s ease-out",
    }}
  >
    <h2
      style={{
        textAlign: "center",
        fontSize: "2rem",
        fontWeight: "bold",
        marginBottom: "0.7em",
        color: "#1F2937", // Black color
      }}
    >
      {title}
    </h2>
    <p>{content}</p>
  </div>
);

const Carousel = ({ children }) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);

  return (
    <div
      style={{
        position: "relative",
        width: "23rem",
        height: "23rem",
        perspective: "500px",
        transformStyle: "preserve-3d",
      }}
    >
      {active > 0 && (
        <button
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateX(-100%) translateY(-50%)",
            zIndex: 2,
            fontSize: "5rem",
            color: "white",
            cursor: "pointer",
            background: "unset",
            border: "unset",
          }}
          onClick={() => setActive((i) => i - 1)}
        >
          <TiChevronLeftOutline />
        </button>
      )}
      {React.Children.map(children, (child, i) => {
        const offset = (active - i) / 3;
        const absOffset = Math.abs(active - i) / 3;
        const direction = Math.sign(active - i);
        return (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              filter: `blur(${Math.abs((active - i) / 3)}rem)`,
              transform: `
                rotateY(${offset * 50}deg)
                scaleY(${1 + absOffset * -0.4})
                translateZ(${absOffset * -30}rem)
                translateX(${direction * -5}rem)
              `,
              transition: "all 0.3s ease-out",
              pointerEvents: active === i ? "auto" : "none",
              opacity: Math.abs(active - i) >= MAX_VISIBILITY ? 0 : 1,
              display: "block",
            }}
          >
            {child}
          </div>
        );
      })}
      {active < count - 1 && (
        <button
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateX(100%) translateY(-50%)",
            zIndex: 2,
            fontSize: "5rem",
            color: "white",
            cursor: "pointer",
            background: "unset",
            border: "unset",
          }}
          onClick={() => setActive((i) => i + 1)}
        >
          <TiChevronRightOutline />
        </button>
      )}
    </div>
  );
};

const App = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100vw",
      height: "100vh",
      backgroundImage: "linear-gradient(45deg, #8B5CF6, #EC4899)", // Gradient from purple to pink
      fontFamily: "'Montserrat', sans-serif",
      overflow: "hidden",
    }}
  >
    <Carousel>
      {[...new Array(CARDS)].map((_, i) => (
        <Card
          title={"fuck " + (i + 1)}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
      ))}
    </Carousel>
  </div>
);

ReactDOM.render(<App />, document.body);

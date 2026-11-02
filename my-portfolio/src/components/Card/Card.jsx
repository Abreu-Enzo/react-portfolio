import "./Card.css";

// Superfície única do sistema. `as` troca a tag (ex.: "article" para itens de lista).
const Card = ({ as: Element = "div", interactive = false, className = "", children, ...rest }) => {
  const classes = ["fo-card", interactive && "fo-card-interactive", className].filter(Boolean).join(" ");

  return (
    <Element className={classes} {...rest}>
      {children}
    </Element>
  );
};

export default Card;

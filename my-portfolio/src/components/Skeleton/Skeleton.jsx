import "./Skeleton.css";

// Bloco de carregamento. Monte com as dimensões finais do conteúdo para não haver salto de layout.
const Skeleton = ({ width = "100%", height, radius, shape }) => {
  const classes = ["fo-skel", shape && `fo-skel-${shape}`].filter(Boolean).join(" ");

  return <span className={classes} style={{ width, height, borderRadius: radius }} aria-hidden="true" />;
};

export default Skeleton;

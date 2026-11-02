import "./FrameSection.css";

// Moldura "blueprint" das seções: linhas finas nas bordas e marcas de canto em cruz (decorativas).
const FrameSection = ({ as: Element = "section", ticks = true, className = "", children, ...rest }) => {
  return (
    <Element className={`fo-frame ${className}`} {...rest}>
      {ticks && (
        <>
          <span className="fo-frame-tick fo-frame-tl" aria-hidden="true" />
          <span className="fo-frame-tick fo-frame-tr" aria-hidden="true" />
          <span className="fo-frame-tick fo-frame-bl" aria-hidden="true" />
          <span className="fo-frame-tick fo-frame-br" aria-hidden="true" />
        </>
      )}
      {children}
    </Element>
  );
};

export default FrameSection;

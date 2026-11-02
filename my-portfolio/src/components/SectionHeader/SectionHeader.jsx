import "./SectionHeader.css";

// Título de seção curto e terminado em ponto ("Projetos."). O ponto é adicionado se faltar.
const SectionHeader = ({ title, eyebrow, meta, action, as: Heading = "h2", id }) => {
  const text = title.endsWith(".") ? title : `${title}.`;

  return (
    <div className="fo-section-head">
      <div>
        {eyebrow && <p className="fo-section-eyebrow">{eyebrow}</p>}
        <Heading className="fo-section-title" id={id}>
          {text}
        </Heading>
        {meta && (
          <p className="fo-section-meta" aria-live="polite">
            {meta}
          </p>
        )}
      </div>
      {action}
    </div>
  );
};

export default SectionHeader;

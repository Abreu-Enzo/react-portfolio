import "./ProfilePhotos.css";

// Duas fotos do Dono: a principal e um retrato menor sobreposto no canto.
// width/height reservam o espaço (sem salto de layout) e loading="lazy" só baixa quando chega perto da tela.
const ProfilePhotos = ({ main, detail }) => {
  return (
    <div className="fo-photos">
      <img
        className="fo-photo-main"
        src={main.src}
        width={main.width}
        height={main.height}
        alt={main.alt}
        loading="lazy"
        decoding="async"
      />
      <img
        className="fo-photo-detail"
        src={detail.src}
        width={detail.width}
        height={detail.height}
        alt={detail.alt}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default ProfilePhotos;

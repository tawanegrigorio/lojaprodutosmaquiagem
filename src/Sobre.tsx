
import "./Sobre.css";

function Sobre() {
    return (
        <section id="sobre" className="about-section">
          
            <div className="about-content">
                <p className="about-eyebrow">NOSSA ESSÊNCIA</p>

                <h2>
                    Beleza que inspira
                    <span> confiança.</span>
                </h2>

                <div className="about-divider"></div>

                <p className="about-description">
                    A CosBEAUTY acredita que a beleza está na liberdade de ser quem você é.
                    Mais do que maquiagem, oferecemos uma forma de expressão, confiança e autenticidade.
                </p>

                <p className="about-description">
                    Cada produto é um convite para explorar novas cores,
                    valorizar seus traços e transformar pequenos momentos em experiências especiais.
                    Acreditamos que não existe uma única maneira de ser bonita — existe a sua maneira.
                </p>

                <p className="about-description">
                    Nossa essência está nos detalhes, na elegância e na individualidade de cada pessoa.
                    Porque a maquiagem não precisa transformar quem você é,
                    mas revelar ainda mais aquilo que faz você ser única.
                </p>

                <p className="about-signature">COSBEAUTY</p>
            </div>
              <div className="about-video">
                <video
                    src="/video/video.mp4"
                    poster="/imagens/capa.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                />
            </div>

        </section>
    );
}

export default Sobre;

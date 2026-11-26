import './Hero.css'

interface HeroProps {
    setCarrinhoAberto: (aberto: boolean) => void
}

function Hero({ setCarrinhoAberto }: HeroProps) {
    return (
    <section className="hero">

      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        poster="/imagens/capa-marca.png"
      >
        <source
          src="/video/video12.mp4"
          type="video/mp4"
        />
      </video>
          <video
      className="hero-video-mobile"
      autoPlay
      muted
      loop
      playsInline> 
      <source
              src="/video/hero-vertical.mp4"
              type="video/mp4"
            />
    </video>

      <div className="hero-overlay"></div>

      <nav className="navbar">

        <a href="/" className="logo">
          CosBEAUTY
        </a>

        <div className="nav-links">
          <a href="#produtos">Produtos</a>
          <a href="#sobre">Sobre</a>
          <a
            href="#carrinho"
            onClick={(event) => {
              event.preventDefault()
              setCarrinhoAberto(true)
            }}
          >
            Carrinho
          </a>
        </div>

      </nav>

      <div className="hero-content">

        <p className="hero-eyebrow">
          BELEZA QUE REALÇA QUEM VOCÊ É
        </p>

        <h1>
          Sua beleza,
          <br />
          sua essência.
        </h1>

        <p className="hero-description">
          Produtos que valorizam sua beleza
          e revelam sua essência.
        </p>


      </div>

    </section>
  )
}

export default Hero
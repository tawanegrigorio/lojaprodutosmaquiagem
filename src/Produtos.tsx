
import './Produtos.css'

interface IProducts {
    id: number
    name: string
    price: number
    stock: number
    category: string
    image?: string
}

interface ProdutosProps {
    cartQuantity: number
    setCarrinhoAberto: (aberto: boolean) => void
    busca: string
    setBusca: (busca: string) => void
    loading: boolean
    error: string
    produtosFiltrados: IProducts[]
    addToCart: (product: IProducts) => void
    favoritos: IProducts[]
    toggleFavorito: (product: IProducts) => void
}

export default function Produtos({
    cartQuantity,
    setCarrinhoAberto,
    busca,
    setBusca,
    loading,
    error,
    produtosFiltrados,
    addToCart,
    favoritos,
    toggleFavorito,
}: ProdutosProps) {
    return (
        <section id="produtos" className="products-section">
            <div className="section-heading">
                <div className="products-heading-title">
                    <h2>Produtos</h2>
                </div>

                <button
                    className="cart-link"
                    onClick={() => setCarrinhoAberto(true)}
                >
                    <span>Ver carrinho</span>
                    <span className="cart-count">{cartQuantity}</span>
                </button>
            </div>

            <label className="product-search">
                <span aria-hidden="true">⌕</span>
                <input
                    type="search"
                    placeholder="Buscar produtos"
                    value={busca}
                    onChange={event => setBusca(event.target.value)}
                    aria-label="Buscar produtos"
                />
            </label>

            {loading && <p>Carregando produtos...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && (
                <div className="products">
                    {produtosFiltrados.map(product => {
                        const favorito = favoritos.some(
                            item => item.id === product.id
                        )

                        return (
                            <article
                                key={product.id}
                                className="product-card"
                            >
                                <button
                                    type="button"
                                    className={`favorite-button ${favorito ? 'is-favorite' : ''}`}
                                    onClick={() => toggleFavorito(product)}
                                    aria-label={
                                        favorito
                                            ? 'Remover dos favoritos'
                                            : 'Adicionar aos favoritos'
                                    }
                                    aria-pressed={favorito}
                                >
                                    {favorito ? '♥' : '♡'}
                                </button>

                                <div className="product-image-box">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="product-image"
                                        />
                                    ) : (
                                        <div className="image-placeholder">
                                            Sem imagem
                                        </div>
                                    )}
                                </div>

                                <p className="product-category">
                                    {product.category}
                                </p>

                                <h3>{product.name}</h3>

                                <div className="product-rating">
                                    <span className="rating-stars">
                                        {'★'.repeat(
                                            Math.round(3.8 + (product.id % 13) / 10)
                                        )}
                                        {'☆'.repeat(
                                            5 - Math.round(3.8 + (product.id % 13) / 10)
                                        )}
                                    </span>

                                    <span className="rating-score">
                                        {(3.8 + (product.id % 13) / 10)
                                            .toFixed(1)
                                            .replace('.', ',')}/5
                                    </span>
                                </div>

                                <p className="product-price">
                                    {product.price.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })}
                                </p>

                                {product.stock > 0 && product.stock < 5 && (
                                    <p className="low-stock">
                                        Restam {product.stock} unidades
                                    </p>
                                )}

                                {product.stock <= 0 && (
                                    <p className="out-of-stock">
                                        Produto esgotado
                                    </p>
                                )}

                                <button
                                    className="add-cart-button"
                                    onClick={() => {
                                        addToCart(product)
                                        setCarrinhoAberto(true)
                                    }}
                                    disabled={product.stock <= 0}
                                >
                                    Adicionar ao carrinho
                                </button>
                            </article>
                        )
                    })}
                </div>
            )}
        </section>
    )
}

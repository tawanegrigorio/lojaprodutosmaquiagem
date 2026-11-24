
import './Favoritos.css';

interface IProducts {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    image?: string;
}

interface FavoritosProps {
    favoritos: IProducts[];
    removerFavorito: (id: number) => void;
}

export default function Favoritos({
    favoritos,
    removerFavorito,
}: FavoritosProps) {
    return (
        <section id="favoritos" className="favorites-section">
            <div className="section-heading">
                <h2>Meus favoritos</h2>
            </div>

            {favoritos.length === 0 ? (
                <p className="empty-favorites">
                    Você ainda não adicionou produtos aos favoritos.
                </p>
            ) : (
                <div className="products">
                    {favoritos.map(product => (
                        <article
                            key={product.id}
                            className="product-card"
                        >
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

                            <p className="product-price">
                                {product.price.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </p>

                            <button
                                type="button"
                                className="remove-favorite-button"
                                onClick={() => removerFavorito(product.id)}
                            >
                             Remover dos favoritos
                            </button>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
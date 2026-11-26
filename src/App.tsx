
import { useEffect, useState } from 'react';
import api from './services/api';
import './App.css';
import Hero from './Hero';
import Sobre from './Sobre';
import Carrinho from './Carrinho';
import Footer from './Footer';
import Produtos from './Produtos';
import Favoritos from './Favoritos';

interface IProducts {
    id: number
    name: string
    price: number
    stock: number
    category: string
    image?: string
}

interface ICartItem {
    product: IProducts
    quantity: number
}

interface IViaCepResponse {
    cep: string
    logradouro: string
    bairro: string
    localidade: string
    uf: string
    erro?: boolean
}

interface ICepRange {
    inicio: string
    fim: string
}


function App() {
    const [carrinhoAberto, setCarrinhoAberto] = useState(false)
    const [products, setProducts] = useState<IProducts[]>([])
    const [cart, setCart] = useState<ICartItem[]>([])
    const [busca, setBusca] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [compraFinalizada, setCompraFinalizada] = useState(false)
    const [pagamentoAberto, setPagamentoAberto] = useState(false)
    const [metodoPagamento, setMetodoPagamento] = useState<'cartao' | 'pix'>('cartao')
    const [cep, setCep] = useState('')
    const [consultandoCep, setConsultandoCep] = useState(false)
    const [endereco, setEndereco] = useState<IViaCepResponse | null>(null)
    const [mensagemEntrega, setMensagemEntrega] = useState('')
    const [entregaDisponivel, setEntregaDisponivel] = useState(false)
    const FRETE_PADRAO = 15
    const VALOR_FRETE_GRATIS = 200
    const FAIXAS_CEP_ATENDIDAS: ICepRange[] = [
        {
            inicio: '01000000',
            fim: '05999999',
        },
        {
            inicio: '08000000',
            fim: '08499999',
        },
    ]
    const [abaAtiva, setAbaAtiva] = useState<'produtos' | 'favoritos'>('produtos');
    const [favoritos, setFavoritos] = useState<IProducts[]>([]);
    useEffect(() => {
        api.get<IProducts[]>('/produtos')
            .then(response => {
                setProducts(response.data)
            })
            .catch(() => {
                setError('Não foi possível carregar os produtos.')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    function addToCart(product: IProducts) {
        setCart(currentCart => {
            const item = currentCart.find(
                item => item.product.id === product.id
            )

            if (item) {
                if (item.quantity >= product.stock) {
                    return currentCart
                }

                return currentCart.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            if (product.stock <= 0) {
                return currentCart
            }

            return [...currentCart, { product, quantity: 1 }]
        })
    }

    function removeFromCart(productId: number) {
        setCart(currentCart =>
            currentCart.filter(item => item.product.id !== productId)
        )
    }
    function atualizarQuantidade(productId: number, novaQuantidade: number) {
        setCart(carrinhoAtual =>
            carrinhoAtual.map(item => {
                if (item.product.id !== productId) return item

                const quantidadeValida = Math.min(
                    Math.max(novaQuantidade || 1, 1),
                    item.product.stock
                )

                return { ...item, quantity: quantidadeValida }
            })
        )
    }
    function finalizarCompra() {
        setProducts(produtosAtuais =>
            produtosAtuais.map(product => {
                const itemComprado = cart.find(item => item.product.id === product.id)

                if (!itemComprado) return product

                return {
                    ...product,
                    stock: Math.max(product.stock - itemComprado.quantity, 0),
                }
            })
        )

        setCart([])
        setCompraFinalizada(true)
    }

function toggleFavorito(product: IProducts) {
    setFavoritos(atuais =>
        atuais.some(item => item.id === product.id)
            ? atuais.filter(item => item.id !== product.id)
            : [...atuais, product]
    )
}

function removerFavorito(id: number) {
    setFavoritos(atuais =>
        atuais.filter(item => item.id !== id)
    )
}

    const produtosFiltrados = products.filter(product =>
        product.name.toLowerCase().includes(busca.toLowerCase()) ||
        product.category.toLowerCase().includes(busca.toLowerCase())
    )
    const cartQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    )

    const cartTotal = cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    )

    const valorFrete =
        cart.length > 0 && entregaDisponivel
            ? cartTotal >= VALOR_FRETE_GRATIS
                ? 0
                : FRETE_PADRAO
            : 0

    const totalComFrete = cartTotal + valorFrete

    function normalizarCep(valor: string) {
        return valor.replace(/\D/g, '').slice(0, 8)
    }

    function cepEstaNaCobertura(cepConsultado: string) {
        return FAIXAS_CEP_ATENDIDAS.some(({ inicio, fim }) => {
            const cepInicial = normalizarCep(inicio)
            const cepFinal = normalizarCep(fim)

            return (
                cepConsultado >= cepInicial &&
                cepConsultado <= cepFinal
            )
        })
    }

    async function consultarEntrega() {
        const cepNumerico = normalizarCep(cep)

        setEndereco(null)
        setEntregaDisponivel(false)
        setMensagemEntrega('')

        if (cepNumerico.length !== 8) {
            setMensagemEntrega(
                'Informe um CEP válido com 8 dígitos.'
            )
            return
        }

        setConsultandoCep(true)

        try {
            const response = await fetch(
                `https://viacep.com.br/ws/${cepNumerico}/json/`
            )

            if (!response.ok) {
                throw new Error('Erro ao consultar o CEP')
            }

            const dados: IViaCepResponse = await response.json()

            if (dados.erro) {
                setMensagemEntrega(
                    'CEP não encontrado. Confira os números e tente novamente.'
                )
                return
            }

            setEndereco(dados)

            if (dados.uf !== 'SP') {
                setMensagemEntrega(
                    'No momento, não realizamos entregas para este estado.'
                )
                return
            }

            if (!cepEstaNaCobertura(cepNumerico)) {
                setMensagemEntrega(
                    'Infelizmente, ainda não realizamos entregas para esta região.'
                )
                return
            }

            setEntregaDisponivel(true)

            setMensagemEntrega(
                `Entrega disponível para ${dados.localidade} - ${dados.uf}.`
            )
        } catch {
            setMensagemEntrega(
                'Não foi possível consultar o CEP agora. Tente novamente.'
            )
        } finally {
            setConsultandoCep(false)
        }
    }
    return (
        <main>
            <Hero setCarrinhoAberto={setCarrinhoAberto} />
            <div className="store-tabs">
                <div className="store-tabs">
                <button
                    className={abaAtiva === 'produtos' ? 'active' : ''}
                    onClick={() => setAbaAtiva('produtos')}
                >
                    Produtos
                </button>

                <button
                    className={abaAtiva === 'favoritos' ? 'active' : ''}
                    onClick={() => setAbaAtiva('favoritos')}
                >
                 Favoritos ({favoritos.length})
                </button>
            </div>
            </div>

            {abaAtiva === 'produtos' ? (
                <Produtos
                    cartQuantity={cartQuantity}
                    setCarrinhoAberto={setCarrinhoAberto}
                    busca={busca}
                    setBusca={setBusca}
                    loading={loading}
                    error={error}
                    produtosFiltrados={produtosFiltrados}
                    addToCart={addToCart}
                    favoritos={favoritos}
                    toggleFavorito={toggleFavorito}
                />
            ) : (
                <Favoritos
                    favoritos={favoritos}
                    removerFavorito={removerFavorito}
                />
            )}
        
            <div className="blush-hero">
            <video autoPlay muted loop playsInline className="blush-video">
                <source src="/video/videoblush.mp4" type="video/mp4" />
            </video>
               <video autoPlay muted loop playsInline className="blush-video-vertical">
                <source src="/video/videoblush-vertical.mp4" type="video/mp4" />
            </video>

            <div className="blush-info">
                <span className="blush-label">M·A·C COSMETICS</span>

                <h1>Skinfinish<br />Colourstruck Blush</h1>

                <p className="blush-shade">SUNBASQUE · 4,5 g</p>

                <p className="blush-description">
                Textura sedosa. Acabamento natural radiante.
                Beleza que dura até 12 horas.
                </p>
            </div>
            </div>
            <Sobre />

         <Carrinho 
        carrinhoAberto={carrinhoAberto}
        setCarrinhoAberto={setCarrinhoAberto}
        compraFinalizada={compraFinalizada}
        setCompraFinalizada={setCompraFinalizada}
        pagamentoAberto={pagamentoAberto}
        setPagamentoAberto={setPagamentoAberto}
        metodoPagamento={metodoPagamento}
        setMetodoPagamento={setMetodoPagamento}
        cart={cart}
        atualizarQuantidade={atualizarQuantidade}
        removeFromCart={removeFromCart}
        cep={cep}
        setCep={setCep}
        endereco={endereco}
        setEndereco={setEndereco}
        entregaDisponivel={entregaDisponivel}
        setEntregaDisponivel={setEntregaDisponivel}
        mensagemEntrega={mensagemEntrega}
        setMensagemEntrega={setMensagemEntrega}
        consultandoCep={consultandoCep}
        consultarEntrega={consultarEntrega}
        normalizarCep={normalizarCep}
        cartTotal={cartTotal}
        valorFrete={valorFrete}
        totalComFrete={totalComFrete}
        finalizarCompra={finalizarCompra}
    />
    <Footer />
        </main>
    )
}

export default App



import "./Carrinho.css";

export default function Carrinho(p: any) {
      const {
        carrinhoAberto,
        setCarrinhoAberto,
        compraFinalizada,
        setCompraFinalizada,
        pagamentoAberto,
        setPagamentoAberto,
        metodoPagamento,
        setMetodoPagamento,
        cart,
        atualizarQuantidade,
        removeFromCart,
        cep,
        setCep,
        endereco,
        setEndereco,
        entregaDisponivel,
        setEntregaDisponivel,
        mensagemEntrega,
        setMensagemEntrega,
        consultandoCep,
        consultarEntrega,
        normalizarCep,
        cartTotal,
        valorFrete,
        totalComFrete,
        finalizarCompra,
    } = p;
    if (!carrinhoAberto) return null;

    return (
        <div
            className="cart-overlay"
            onClick={() => setCarrinhoAberto(false)}
        >
            <section
                id="carrinho"
                className="cart-sidebar"
                onClick={(event) => event.stopPropagation()}
            >
                {compraFinalizada ? (
                    <div className="purchase-success">
                        <span className="success-check">✓</span>

                        <h2>Compra realizada!</h2>

                        <p>
                            Obrigada por confiar na CosBEAUTY.
                        </p>

                        <button
                            className="payment-submit"
                            onClick={() => {
                                setCompraFinalizada(false);
                                setPagamentoAberto(false);
                                setCarrinhoAberto(false);
                            }}
                        >
                            Continuar explorando
                        </button>
                    </div>
                ) : pagamentoAberto ? (
                    <>
                        <button
                            className="payment-back"
                            onClick={() => setPagamentoAberto(false)}
                        >
                            ← Voltar ao carrinho
                        </button>

                        <p className="section-eyebrow">PAGAMENTO</p>

                        <h2>Pagamento</h2>

                        <p className="payment-subtitle">
                            Escolha uma forma de pagamento.
                        </p>

                        <div className="payment-methods">
                            <button
                                type="button"
                                className={
                                    metodoPagamento === "cartao"
                                        ? "payment-method active"
                                        : "payment-method"
                                }
                                onClick={() => setMetodoPagamento("cartao")}
                            >
                                Cartão de crédito
                            </button>

                            <button
                                type="button"
                                className={
                                    metodoPagamento === "pix"
                                        ? "payment-method active"
                                        : "payment-method"
                                }
                                onClick={() => setMetodoPagamento("pix")}
                            >
                                Pix
                            </button>
                        </div>

                        {metodoPagamento === "cartao" ? (
                            <div className="payment-fields">
                                <label>Nome no cartão</label>
                                <input
                                    type="text"
                                    placeholder="Nome do titular"
                                />

                                <label>Número do cartão</label>
                                <input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    maxLength={19}
                                />

                                <div className="payment-row">
                                    <div>
                                        <label>Validade</label>
                                        <input
                                            type="text"
                                            placeholder="MM/AA"
                                            maxLength={5}
                                        />
                                    </div>

                                    <div>
                                        <label>Parcelas</label>
                                        <select>
                                            <option>1x sem juros</option>
                                            <option>2x sem juros</option>
                                            <option>3x sem juros</option>
                                        </select>
                                    </div>
                                </div>

                                <p className="payment-demo-note">
                                    Demonstração apenas. Não informe dados reais.
                                </p>
                            </div>
                        ) : (
                            <div className="pix-demo">
                                <div className="pix-symbol">◇</div>

                                <h3>Pagamento via Pix</h3>

                                <p>
                                    Esta área representa o pagamento via Pix.
                                </p>

                                <div className="pix-placeholder">
                                    QR Code ilustrativo
                                </div>

                                <p className="payment-demo-note">
                                    Nenhuma transação será realizada.
                                </p>
                            </div>
                        )}

                        <button
                            className="payment-submit"
                            onClick={finalizarCompra}
                        >
                            Finalizar compra
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="close-cart"
                            onClick={() => setCarrinhoAberto(false)}
                        >
                            ×
                        </button>

                        <p className="section-eyebrow">SUA SELEÇÃO</p>

                        <h2>Meu carrinho</h2>

                        {cart.length === 0 ? (
                            <div className="empty-cart">
                                <p>Seu carrinho está vazio.</p>
                            </div>
                        ) : (
                            <>
                                <div className="cart-items">
                                    {cart.map((item: any) => (
                                        <div
                                            className="cart-item"
                                            key={item.product.id}
                                        >
                                            <div>
                                                <h3>{item.product.name}</h3>

                                                <label className="cart-quantity">
                                                    Quantidade:
                                                    <select
                                                        value={item.quantity}
                                                        onChange={(event) =>
                                                            atualizarQuantidade(
                                                                item.product.id,
                                                                Number(event.target.value)
                                                            )
                                                        }
                                                    >
                                                        {Array.from(
                                                            {
                                                                length: Math.min(
                                                                    item.product.stock,
                                                                    50
                                                                ),
                                                            },
                                                            (_, index) => index + 1
                                                        ).map((numero) => (
                                                            <option
                                                                key={numero}
                                                                value={numero}
                                                            >
                                                                {numero}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </label>
                                            </div>

                                            <strong>
                                                {(
                                                    item.product.price *
                                                    item.quantity
                                                ).toLocaleString("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                })}
                                            </strong>

                                            <button
                                                onClick={() =>
                                                    removeFromCart(item.product.id)
                                                }
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="delivery-check">
                                    <label htmlFor="cep-entrega">
                                        Consulte a entrega pelo CEP
                                    </label>

                                    <div className="delivery-cep-row">
                                        <input
                                            id="cep-entrega"
                                            type="text"
                                            inputMode="numeric"
                                            value={cep}
                                            maxLength={8}
                                            placeholder="Digite seu CEP"
                                            onChange={(event) => {
                                                const novoCep = normalizarCep(
                                                    event.target.value
                                                );

                                                setCep(novoCep);
                                                setEndereco(null);
                                                setEntregaDisponivel(false);
                                                setMensagemEntrega("");
                                            }}
                                        />

                                        <button
                                            type="button"
                                            onClick={consultarEntrega}
                                            disabled={consultandoCep}
                                        >
                                            {consultandoCep
                                                ? "Consultando..."
                                                : "Consultar"}
                                        </button>
                                    </div>

                                    {endereco && (
                                        <p className="delivery-address">
                                            {endereco.logradouro}
                                            {endereco.bairro
                                                ? `, ${endereco.bairro}`
                                                : ""}
                                            {" — "}
                                            {endereco.localidade} - {endereco.uf}
                                        </p>
                                    )}
                                        {endereco && entregaDisponivel && (
             <p className="delivery-time">
            Prazo estimado: 3 a 7 dias úteis
        </p>
    )}

                                    {mensagemEntrega && (
                                        <p
                                            className={
                                                entregaDisponivel
                                                    ? "delivery-message is-available"
                                                    : "delivery-message is-error"
                                            }
                                        >
                                            {mensagemEntrega}
                                        </p>
                                    )}
                                </div>

                                <div className="shipping-summary">
                                    <p>
                                        <span>Subtotal</span>

                                        <strong>
                                            {cartTotal.toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })}
                                        </strong>
                                    </p>

                                    <p>
                                        <span>Frete</span>

                                        <strong>
                                            {!cart.length
                                                ? "—"
                                                : !entregaDisponivel
                                                  ? "Consulte o CEP"
                                                  : valorFrete === 0
                                                    ? "Grátis"
                                                    : valorFrete.toLocaleString(
                                                          "pt-BR",
                                                          {
                                                              style: "currency",
                                                              currency: "BRL",
                                                          }
                                                      )}
                                        </strong>
                                    </p>

                                    <p className="shipping-grand-total">
                                        <span>Total</span>

                                        <strong>
                                            {totalComFrete.toLocaleString(
                                                "pt-BR",
                                                {
                                                    style: "currency",
                                                    currency: "BRL",
                                                }
                                            )}
                                        </strong>
                                    </p>

                                    <button
                                        className="payment-submit"
                                        onClick={() => {
                                            if (!entregaDisponivel) {
                                                setMensagemEntrega(
                                                    "Consulte um CEP de uma região atendida antes de finalizar a compra."
                                                );
                                                return;
                                            }

                                            setPagamentoAberto(true);
                                        }}
                                    >
                                        Fechar compra
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </section>
        </div>
    );
}

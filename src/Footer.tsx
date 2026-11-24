import './Footer.css';
export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <a href="#produtos" className="footer-logo">
                            Cos<span>BEAUTY</span>
                        </a>
                        <p>Maquiagem, skincare e cuidados para sua rotina.</p>
                    </div>

                    <div className="footer-column">
                        <h3>Atendimento</h3>
                        <a href="#contato">Fale conosco</a>
                        <a href="#trocas">Trocas e devoluções</a>
                        <a href="#privacidade">Política de privacidade</a>
                        <a href="#termos">Termos de uso</a>
                    </div>

                    <div className="footer-column">
                        <h3>Departamentos</h3>
                        <a href="#produtos">Maquiagem</a>
                        <a href="#produtos">Mais vendidos</a>
                        <a href="#produtos">Novidades</a>
                    </div>

                    <div className="footer-column">
                        <h3>Minha conta</h3>
                        <a href="#conta">Meus dados</a>
                        <a href="#pedidos">Meus pedidos</a>
                        <a href="#carrinho">Meu carrinho</a>
                    </div>

                    <div className="footer-social">
                        <h3>Acompanhe a CosBEAUTY</h3>
                        <p>Novidades e lançamentos da marca.</p>
                        <div className="footer-social-links">
                            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
                            <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">TikTok</a>
                        </div>
                    </div>
                </div>

                <div className="footer-payment">
                    <div>
                        <h3>Pagamento</h3>
                        <p>Consulte as opções disponíveis na finalização da compra.</p>
                    </div>

                    <div>
                        <h3>Segurança</h3>
                        <p>Compre com atenção e confira os dados do pedido antes de concluir.</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} CosBEAUTY. Todos os direitos
                        reservados (Este site é meramente ilustrativo, obrigada por
                        chegar até aqui.)
                    </p>
                    <a href="#produtos">Voltar ao início ↑</a>
                </div>
            </div>
        </footer>
    );
}

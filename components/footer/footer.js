class AppFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/`
            <link rel="stylesheet" href="./components/footer/footer.css">
            <footer class="app-footer">
                <div class="footer-content">
                    <div class="footer-bio">
                        <h2>Farmácia Mauá</h2>
                        <p>Somos uma farmácia dedicada a fornecer produtos de qualidade e um atendimento excepcional. Nossa missão é cuidar da saúde e bem-estar de nossos clientes, oferecendo uma ampla variedade de medicamentos, produtos de higiene e beleza, além de serviços farmacêuticos personalizados.</p>
                    </div>
                    <div class="footer-links">
                        <h3>Links Úteis</h3>
                        <ul>
                            <li><a href="/">Sobre nós</a></li>
                            <li><a href="/contato">Contato</a></li>
                            <li><a href="#servicos">Serviços</a></li>
                        </ul>
                    </div>
                    <div class="footer-customer-service">
                        <h3>Atendimento ao Cliente</h3>
                        <p>Email: suporte@farmaciamaua.com</p>
                        <p>Telefone: (11) 1234-5678</p>
                    </div>
                    <div class="footer-newsletter">
                        <h3>Newsletter</h3>
                        <p>Inscreva-se para receber novidades e promoções</p>
                        <form>
                            <input type="email" placeholder="Endereço de email">
                            <button type="submit">Entrar</button>
                        </form>
                    </div>
                </div>
                <div class="footer-bottom">
                    &copy; 2026 Farmácia Mauá. Todos os direitos reservados.
                </div>
            </footer>
        `;
    }
}

customElements.define('app-footer', AppFooter);
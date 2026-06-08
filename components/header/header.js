class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }

    attachEventListeners() {
        const logo = this.shadowRoot.querySelector('.logo');
        const cartBtn = this.shadowRoot.querySelector('.cart-btn');

        logo?.addEventListener('click', () => {
            window.location.hash = '/';
        });

        cartBtn?.addEventListener('click', () => {
            window.location.hash = '/carrinho';
        });
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/`
            <link rel="stylesheet" href="./components/header/header.css">
            <header class="app-header">
                <div class="logo" style="cursor: pointer;">
                    <h1>Farmácia Mauá</h1>
                </div>

                <div class="search-container">
                    <input 
                        type="text" 
                        class="search-input" 
                        placeholder="Buscar produtos..."
                        aria-label="Barra de busca"
                    >
                    <button class="search-btn" aria-label="Buscar">
                        <img src="./assets/search.svg" alt="Buscar" class="search-icon"/>
                    </button>
                </div>

                <nav class="navigation">
                    <ul class="nav-list">
                        <li><a href="#/" class="nav-link">Produtos</a></li>
                        <li><a href="#/produtos/cadastro" class="nav-link">Cadastro Produtos</a></li>
                        <li><a href="#/fornecedores/cadastro" class="nav-link">Fornecedores</a></li>
                    </ul>
                </nav>

                <div class="actions">
                    <button class="action-btn cart-btn" aria-label="Carrinho de compras">
                        <img src="./assets/cart.svg" alt="Carrinho" class="cart-icon"/>
                    </button>
                    <button class="action-btn profile-btn" aria-label="Perfil do usuário">
                        <img src="./assets/profile.svg" alt="Perfil" class="profile-icon"/>
                    </button>
                </div>
            </header>
        `;
        this.attachEventListeners();
    }
}

customElements.define('app-header', AppHeader);	
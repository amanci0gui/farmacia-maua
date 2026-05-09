class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/`
            <link rel="stylesheet" href="./components/header/header.css">
            <header class="app-header">
                <div class="logo">
                    <h1>Farmácia Mauá</h1>
                </div>

                <div class="search-container">
                    <input 
                        type="text" 
                        class="search-input" 
                        placeholder="Buscar fornecedores..."
                        aria-label="Barra de busca"
                    >
                    <button class="search-btn" aria-label="Buscar">
                        <img src="./assets/search.svg" alt="Buscar" class="search-icon"/>
                    </button>
                </div>

                <nav class="navigation">
                    <ul class="nav-list">
                        <li><a href="/" class="nav-link">Home</a></li>
                        <li><a href="#categorias" class="nav-link">Categorias</a></li>
                        <li><a href="#servicos" class="nav-link">Serviços</a></li>
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
    }
}

customElements.define('app-header', AppHeader);	
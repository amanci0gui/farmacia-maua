class ProductList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/`
            <link rel="stylesheet" href="./components/product-list/product-list.css">
            <div class="product-list-container">
                <section class="hero-section">
                    <h1>Produtos</h1>
                    <p>Confira nossa seleção de produtos farmacêuticos</p>
                </section>

                <div class="products-grid">
                    ${appState.products.map(product => `
                        <div class="product-card">
                            <div class="product-image">
                                ${product.image ? `<img src="${product.image}" alt="${product.name}">` : ''}
                            </div>
                            <div class="product-info">
                                <span class="product-category">${product.category}</span>
                                <h3>${product.name}</h3>
                                <p class="product-description">${product.description}</p>
                                <div class="product-footer">
                                    <span class="product-price">R$ ${product.price.toFixed(2)}</span>
                                    <button class="btn-details" onclick="window.location.hash = 'produto/${product.id}'">Detalhes</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

customElements.define('product-list', ProductList);

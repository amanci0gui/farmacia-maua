class ProductDetail extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }

    attachEventListeners() {
        const btn = this.shadowRoot.querySelector('.btn-add-cart');
        const input = this.shadowRoot.querySelector('.quantity-input');
        btn?.addEventListener('click', () => {
            const quantity = parseInt(input.value) || 1;
            const id = parseInt(this.getAttribute('product-id'));
            addToCart(id, quantity);
            this.showNotification();
        });
    }

    showNotification() {
        const msg = this.shadowRoot.querySelector('.notification');
        msg.classList.add('show');
        setTimeout(() => msg.classList.remove('show'), 2000);
    }

    render() {
        const id = parseInt(this.getAttribute('product-id'));
        const product = appState.products.find(p => p.id === id);

        if (!product) {
            this.shadowRoot.innerHTML = '<p>Produto não encontrado</p>';
            return;
        }

        this.shadowRoot.innerHTML = /*html*/`
            <link rel="stylesheet" href="./components/product-detail/product-detail.css">
            <div class="product-detail-container">
                <div class="breadcrumb">
                    <a href="#/" class="breadcrumb-link">Produtos</a>
                    <span>/</span>
                    <span>${product.name}</span>
                </div>

                <div class="product-content">
                    <div class="product-image-section">
                        <div class="product-image">
                            ${product.image ? `<img src="${product.image}" alt="${product.name}">` : ''}
                        </div>
                    </div>

                    <div class="product-details-section">
                        <span class="category-badge">${product.category}</span>
                        <h1>${product.name}</h1>
                        
                        <div class="price-section">
                            <span class="price">R$ ${product.price.toFixed(2)}</span>
                            <span class="stock ${product.stock > 0 ? 'in-stock' : 'out-stock'}">
                                ${product.stock > 0 ? `${product.stock} em estoque` : 'Fora de estoque'}
                            </span>
                        </div>

                        <div class="description-section">
                            <h3>Descrição</h3>
                            <p>${product.description}</p>
                        </div>

                        <div class="benefits-section">
                            <h3>Benefícios</h3>
                            <ul>
                                <li>Produto de qualidade garantida</li>
                                <li>Fornecedor confiável: ${product.supplier}</li>
                                <li>Entrega rápida e segura</li>
                            </ul>
                        </div>

                        <div class="purchase-section">
                            <div class="quantity-selector">
                                <label for="quantity">Quantidade:</label>
                                <input type="number" id="quantity" class="quantity-input" value="1" min="1">
                            </div>
                            <button class="btn-add-cart" ${product.stock === 0 ? 'disabled' : ''}>
                                Adicionar ao Carrinho
                            </button>
                        </div>

                        <div class="notification">✓ Adicionado ao carrinho</div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('product-detail', ProductDetail);

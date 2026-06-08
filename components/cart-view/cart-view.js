class CartView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
        window.addEventListener('cartUpdated', () => this.render());
    }

    attachEventListeners() {
        const table = this.shadowRoot.querySelector('tbody');
        const clearBtn = this.shadowRoot.querySelector('.btn-clear-cart');
        const continueBtn = this.shadowRoot.querySelector('.btn-continue');
        const checkoutBtn = this.shadowRoot.querySelector('.btn-checkout');

        table?.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-remove')) {
                const id = parseInt(e.target.getAttribute('data-id'));
                removeFromCart(id);
                this.render();
                this.attachEventListeners();
            }
        });

        table?.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const id = parseInt(e.target.getAttribute('data-id'));
                const quantity = parseInt(e.target.value);
                updateCartQuantity(id, quantity);
                this.render();
                this.attachEventListeners();
            }
        });

        clearBtn?.addEventListener('click', () => {
            if (confirm('Limpar carrinho?')) {
                clearCart();
                this.render();
                this.attachEventListeners();
            }
        });

        continueBtn?.addEventListener('click', () => {
            window.location.hash = '/';
        });

        checkoutBtn?.addEventListener('click', () => {
            if (appState.cart.length > 0) {
                alert('Pedido finalizado com sucesso!');
                clearCart();
                window.location.hash = '/';
            }
        });
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/`
            <link rel="stylesheet" href="./components/cart-view/cart-view.css">
            <div class="cart-container">
                <h1>Carrinho de Compras</h1>

                ${appState.cart.length === 0 ? `
                    <div class="empty-cart">
                        <p>Seu carrinho está vazio</p>
                        <button class="btn-continue">Continuar Comprando</button>
                    </div>
                ` : `
                    <div class="cart-content">
                        <div class="cart-items">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Preço</th>
                                        <th>Quantidade</th>
                                        <th>Subtotal</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${appState.cart.map(item => `
                                        <tr>
                                            <td>${item.name}</td>
                                            <td>R$ ${item.price.toFixed(2)}</td>
                                            <td>
                                                <input type="number" class="quantity-input" data-id="${item.id}" value="${item.quantity}" min="1">
                                            </td>
                                            <td>R$ ${(item.price * item.quantity).toFixed(2)}</td>
                                            <td>
                                                <button class="btn-remove" data-id="${item.id}">Remover</button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>

                        <div class="cart-summary">
                            <h3>Resumo do Pedido</h3>
                            <div class="summary-row">
                                <span>Subtotal:</span>
                                <span>R$ ${getCartTotal().toFixed(2)}</span>
                            </div>
                            <div class="summary-row">
                                <span>Frete:</span>
                                <span>R$ 10.00</span>
                            </div>
                            <div class="summary-row total">
                                <span>Total:</span>
                                <span>R$ ${(getCartTotal() + 10).toFixed(2)}</span>
                            </div>
                            <div class="cart-actions">
                                <button class="btn-continue">Continuar Comprando</button>
                                <button class="btn-checkout">Finalizar Pedido</button>
                                <button class="btn-clear-cart">Limpar Carrinho</button>
                            </div>
                        </div>
                    </div>
                `}
            </div>
        `;
    }
}

customElements.define('cart-view', CartView);

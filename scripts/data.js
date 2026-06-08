const appState = {
    products: [
        { id: 1, name: 'Dipirona 500mg', category: 'Analgésico', price: 5.99, stock: 100, supplier: 'Fornecedor A', description: 'Medicamento analgésico e antipirético.' },
        { id: 2, name: 'Ibuprofeno 200mg', category: 'Anti-inflamatório', price: 8.50, stock: 75, supplier: 'Fornecedor B', description: 'Anti-inflamatório não esteroidal.' },
        { id: 3, name: 'Vitamina C', category: 'Vitamina', price: 12.90, stock: 150, supplier: 'Fornecedor A', description: 'Suplemento de vitamina C para imunidade.' },
        { id: 4, name: 'Protetor Solar 30', category: 'Cuidados', price: 25.00, stock: 50, supplier: 'Fornecedor C', description: 'Protetor solar com FPS 30.' },
        { id: 5, name: 'Antiacido', category: 'Digestão', price: 6.50, stock: 120, supplier: 'Fornecedor B', description: 'Alivia azia e indigestão.' }
    ],
    suppliers: [
        { id: 1, name: 'Fornecedor A', phone: '(11) 1234-5678', email: 'contato@fornecedor-a.com', city: 'São Paulo', products: [1, 3] },
        { id: 2, name: 'Fornecedor B', phone: '(11) 2222-3333', email: 'suporte@fornecedor-b.com', city: 'Santo André', products: [2, 5] },
        { id: 3, name: 'Fornecedor C', phone: '(11) 4444-5555', email: 'vendas@fornecedor-c.com', city: 'Guarulhos', products: [4] }
    ],
    cart: []
};

function addToCart(productId, quantity = 1) {
    const product = appState.products.find(p => p.id === productId);
    if (!product) return;
    
    const cartItem = appState.cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        appState.cart.push({ ...product, quantity });
    }
    window.dispatchEvent(new CustomEvent('cartUpdated'));
}

function removeFromCart(productId) {
    appState.cart = appState.cart.filter(item => item.id !== productId);
    window.dispatchEvent(new CustomEvent('cartUpdated'));
}

function updateCartQuantity(productId, quantity) {
    const item = appState.cart.find(i => i.id === productId);
    if (item) item.quantity = Math.max(1, quantity);
    window.dispatchEvent(new CustomEvent('cartUpdated'));
}

function clearCart() {
    appState.cart = [];
    window.dispatchEvent(new CustomEvent('cartUpdated'));
}

function getCartTotal() {
    return appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

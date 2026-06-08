class AppRouter {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.render());
        this.render();
    }

    render() {
        let hash = window.location.hash.slice(1) || '/';
        const main = document.getElementById('app-main');
        if (!main) return;
        
        main.innerHTML = '';
        
        // Normalizar hash removendo a primeira barra se existir
        if (hash.startsWith('/')) {
            hash = hash.slice(1);
        }

        if (hash === '' || hash === 'produtos') {
            const component = document.createElement('product-list');
            main.appendChild(component);
        } else if (hash === 'produtos/cadastro') {
            const component = document.createElement('product-form');
            main.appendChild(component);
        } else if (hash === 'fornecedores/cadastro') {
            const component = document.createElement('supplier-form');
            main.appendChild(component);
        } else if (hash.startsWith('produto/')) {
            const id = parseInt(hash.split('/')[1]);
            const component = document.createElement('product-detail');
            component.setAttribute('product-id', id);
            main.appendChild(component);
        } else if (hash === 'carrinho') {
            const component = document.createElement('cart-view');
            main.appendChild(component);
        } else {
            const component = document.createElement('product-list');
            main.appendChild(component);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AppRouter();
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new AppRouter();
    });
} else {
    new AppRouter();
}

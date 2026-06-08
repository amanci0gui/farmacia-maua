class ProductForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.editingId = null;
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }

    attachEventListeners() {
        const form = this.shadowRoot.querySelector('form');
        const saveBtn = this.shadowRoot.querySelector('.btn-save');
        const clearBtn = this.shadowRoot.querySelector('.btn-clear');
        const table = this.shadowRoot.querySelector('tbody');

        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct();
        });

        clearBtn?.addEventListener('click', () => form?.reset());

        table?.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-edit')) {
                const id = parseInt(e.target.getAttribute('data-id'));
                this.editProduct(id);
            } else if (e.target.classList.contains('btn-delete')) {
                const id = parseInt(e.target.getAttribute('data-id'));
                appState.products = appState.products.filter(p => p.id !== id);
                this.render();
                this.attachEventListeners();
            }
        });
    }

    saveProduct() {
        const form = this.shadowRoot.querySelector('form');
        const name = form.querySelector('input[name="name"]').value;
        const category = form.querySelector('input[name="category"]').value;
        const price = parseFloat(form.querySelector('input[name="price"]').value);
        const stock = parseInt(form.querySelector('input[name="stock"]').value);
        const supplier = form.querySelector('input[name="supplier"]').value;
        const description = form.querySelector('textarea[name="description"]').value;

        if (this.editingId) {
            const product = appState.products.find(p => p.id === this.editingId);
            if (product) {
                product.name = name;
                product.category = category;
                product.price = price;
                product.stock = stock;
                product.supplier = supplier;
                product.description = description;
            }
            this.editingId = null;
        } else {
            const newId = Math.max(...appState.products.map(p => p.id), 0) + 1;
            appState.products.push({ id: newId, name, category, price, stock, supplier, description });
        }

        form.reset();
        this.render();
        this.attachEventListeners();
    }

    editProduct(id) {
        const product = appState.products.find(p => p.id === id);
        if (product) {
            this.editingId = id;
            const form = this.shadowRoot.querySelector('form');
            form.querySelector('input[name="name"]').value = product.name;
            form.querySelector('input[name="category"]').value = product.category;
            form.querySelector('input[name="price"]').value = product.price;
            form.querySelector('input[name="stock"]').value = product.stock;
            form.querySelector('input[name="supplier"]').value = product.supplier;
            form.querySelector('textarea[name="description"]').value = product.description;
            const title = this.shadowRoot.querySelector('.form-title');
            title.textContent = 'Editar Produto';
        }
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/`
            <link rel="stylesheet" href="./components/product-form/product-form.css">
            <div class="product-form-container">
                <div class="form-section">
                    <h2 class="form-title">Cadastro de Produto</h2>
                    <form>
                        <div class="form-group">
                            <label for="name">Nome do Produto</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="category">Categoria</label>
                                <input type="text" id="category" name="category" required>
                            </div>
                            <div class="form-group">
                                <label for="price">Preço</label>
                                <input type="number" id="price" name="price" step="0.01" required>
                            </div>
                            <div class="form-group">
                                <label for="stock">Estoque</label>
                                <input type="number" id="stock" name="stock" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="supplier">Fornecedor</label>
                            <input type="text" id="supplier" name="supplier" required>
                        </div>
                        <div class="form-group">
                            <label for="description">Descrição</label>
                            <textarea id="description" name="description" rows="3"></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn-save">Salvar</button>
                            <button type="button" class="btn-clear">Limpar</button>
                        </div>
                    </form>
                </div>

                <div class="table-section">
                    <h3>Produtos Cadastrados</h3>
                    <div class="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Produto</th>
                                    <th>Categoria</th>
                                    <th>Preço</th>
                                    <th>Estoque</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${appState.products.map(p => `
                                    <tr>
                                        <td>${p.id}</td>
                                        <td>${p.name}</td>
                                        <td>${p.category}</td>
                                        <td>R$ ${p.price.toFixed(2)}</td>
                                        <td>${p.stock}</td>
                                        <td>
                                            <button class="btn-edit" data-id="${p.id}">Editar</button>
                                            <button class="btn-delete" data-id="${p.id}">Deletar</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('product-form', ProductForm);

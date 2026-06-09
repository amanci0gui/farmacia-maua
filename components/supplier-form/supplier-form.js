class SupplierForm extends HTMLElement {
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
            this.saveSupplier();
        });

        clearBtn?.addEventListener('click', () => form?.reset());

        table?.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-edit')) {
                const id = parseInt(e.target.getAttribute('data-id'));
                this.editSupplier(id);
            } else if (e.target.classList.contains('btn-delete')) {
                const id = parseInt(e.target.getAttribute('data-id'));
                appState.suppliers = appState.suppliers.filter(s => s.id !== id);
                this.render();
                this.attachEventListeners();
            }
        });
    }

    saveSupplier() {
        const form = this.shadowRoot.querySelector('form');
        const name = form.querySelector('input[name="name"]').value;
        const phone = form.querySelector('input[name="phone"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const city = form.querySelector('input[name="city"]').value;

        if (this.editingId) {
            const supplier = appState.suppliers.find(s => s.id === this.editingId);
            if (supplier) {
                supplier.name = name;
                supplier.phone = phone;
                supplier.email = email;
                supplier.city = city;
            }
            this.editingId = null;
        } else {
            const newId = Math.max(...appState.suppliers.map(s => s.id), 0) + 1;
            appState.suppliers.push({ id: newId, name, phone, email, city, products: [] });
        }

        form.reset();
        this.render();
        this.attachEventListeners();
    }

    editSupplier(id) {
        const supplier = appState.suppliers.find(s => s.id === id);
        if (supplier) {
            this.editingId = id;
            const form = this.shadowRoot.querySelector('form');
            form.querySelector('input[name="name"]').value = supplier.name;
            form.querySelector('input[name="phone"]').value = supplier.phone;
            form.querySelector('input[name="email"]').value = supplier.email;
            form.querySelector('input[name="city"]').value = supplier.city;
            const title = this.shadowRoot.querySelector('.form-title');
            title.textContent = 'Editar Fornecedor';
        }
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/`
            <link rel="stylesheet" href="./components/supplier-form/supplier-form.css">
            <div class="supplier-form-container">
                <div class="form-section">
                    <h2 class="form-title">Cadastro de Fornecedor</h2>
                    <form>
                        <div class="form-group">
                            <label for="name">Nome do Fornecedor</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="phone">Telefone</label>
                                <input type="tel" id="phone" name="phone" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="city">Cidade</label>
                            <input type="text" id="city" name="city" required>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn-save">Salvar</button>
                            <button type="button" class="btn-clear">Limpar</button>
                        </div>
                    </form>
                </div>

                <div class="table-section">
                    <h3>Fornecedores Cadastrados</h3>
                    <div class="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Contato</th>
                                    <th>Email</th>
                                    <th>Cidade</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${appState.suppliers.map(s => `
                                    <tr>
                                        <td>${s.name}</td>
                                        <td>${s.phone}</td>
                                        <td>${s.email}</td>
                                        <td>${s.city}</td>
                                        <td>
                                            <div class="btn-group">
                                                <button class="btn-edit" data-id="${s.id}">Editar</button>
                                                <button class="btn-delete" data-id="${s.id}">Deletar</button>
                                            </div>
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

customElements.define('supplier-form', SupplierForm);

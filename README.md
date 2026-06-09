# Farmácia Mauá - Aplicação Web

Aplicação web moderna para gerenciamento e venda de produtos farmacêuticos, desenvolvida com **Web Components** e JavaScript puro, sem dependências externas.

---

## 📋 Índice

1. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
2. [Arquitetura Geral](#-arquitetura-geral)
3. [Sistema de Roteamento](#-sistema-de-roteamento)
4. [Componentes](#-componentes)
5. [Gerenciamento de Estado](#-gerenciamento-de-estado)
6. [Como Utilizar](#-como-utilizar)
7. [Estrutura de Diretórios](#-estrutura-de-diretórios)

---

## 🛠️ Tecnologias Utilizadas

### Web Components

A aplicação é construída utilizando **Web Components**, um conjunto de padrões web que permitem criar componentes reutilizáveis encapsulados.

#### Principais características dos Web Components utilizados:

- **Custom Elements**: Criação de elementos HTML customizados (ex: `<product-list>`, `<cart-view>`)
- **Shadow DOM**: Encapsulamento de estilos e markup dentro de cada componente
- **Templates e Slots**: Estruturação modular do conteúdo
- **Lifecycle Hooks**: Gerenciamento do ciclo de vida dos componentes

#### Exemplo básico de um Web Component:

```javascript
class ProductList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Encapsulamento com Shadow DOM
    }

    connectedCallback() {
        // Executado quando o elemento é inserido no DOM
        this.render();
    }

    render() {
        // Renderiza o componente com HTML, CSS e lógica
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./components/product-list/product-list.css">
            <div class="product-list-container">
                <!-- Conteúdo do componente -->
            </div>
        `;
    }
}

customElements.define('product-list', ProductList); // Registra o componente
```

### Tecnologias Complementares

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos encapsulados em cada componente
- **JavaScript Vanilla**: Sem frameworks (React, Vue, Angular)
- **LocalStorage**: Persistência de dados do carrinho
- **Fonts Google**: Tipografia (Poppins, Inter)

---

## 🏗️ Arquitetura Geral

A aplicação segue uma arquitetura baseada em componentes com os seguintes elementos principais:

```
┌─────────────────────────────────┐
│      index.html (Shell)         │
│  ┌──────────────────────────┐   │
│  │     app-header           │   │
│  ├──────────────────────────┤   │
│  │    Router + Main         │   │
│  │  (Renderiza componentes) │   │
│  ├──────────────────────────┤   │
│  │     app-footer           │   │
│  └──────────────────────────┘   │
└─────────────────────────────────┘

      ↓ Utiliza ↓
      
┌──────────────────────────┐
│   appState (Global)      │
│  - products              │
│  - suppliers             │
│  - cart                  │
└──────────────────────────┘
```

---

## 🗺️ Sistema de Roteamento

O sistema de roteamento é implementado através da classe `AppRouter`, que gerencia a navegação entre diferentes visualizações baseada em **URLs com hash (#)**.

### Como Funciona o Roteador

#### 1. **Inicialização**

```javascript
class AppRouter {
    constructor() {
        this.init();
    }

    init() {
        // Escuta mudanças na URL
        window.addEventListener('hashchange', () => this.render());
        // Renderiza a rota atual
        this.render();
    }
}
```

#### 2. **Renderização de Rotas**

O roteador captura a URL hash e mapeia para o componente correto:

```javascript
render() {
    let hash = window.location.hash.slice(1) || '/';
    const main = document.getElementById('app-main');
    
    // Limpa renderização anterior
    main.innerHTML = '';
    
    // Normaliza o hash
    if (hash.startsWith('/')) {
        hash = hash.slice(1);
    }
    
    // Mapeia rota para componente
    if (hash === '' || hash === 'produtos') {
        const component = document.createElement('product-list');
        main.appendChild(component);
    }
    // ... mais rotas
}
```

### Rotas Disponíveis

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `#/` ou `#/produtos` | `<product-list>` | Lista de todos os produtos |
| `#/produtos/cadastro` | `<product-form>` | Formulário para cadastrar novo produto |
| `#/fornecedores/cadastro` | `<supplier-form>` | Formulário para cadastrar novo fornecedor |
| `#/produto/:id` | `<product-detail>` | Detalhes de um produto específico (ex: `#/produto/1`) |
| `#/carrinho` | `<cart-view>` | Visualização do carrinho de compras |

### Exemplo de Navegação

```javascript
// Ao clicar em um link, a URL muda
window.location.hash = '#/produto/1';

// Isso dispara o evento 'hashchange'
// Que executa o método render() novamente
// Que renderiza o componente <product-detail product-id="1">
```

### Fluxo de Renderização

```
URL muda (ex: #/produto/1)
        ↓
hashchange event
        ↓
render() é chamado
        ↓
Hash é extraído e normalizado
        ↓
Componente correto é criado
        ↓
Componente é inserido no main
```

---

## 🧩 Componentes

### Header (`app-header`)
**Arquivo**: `components/header/header.js`

Componente de cabeçalho presente em todas as páginas.

**Funcionalidades**:
- Logo clicável para voltar à página inicial
- Navegação entre principais rotas
- Barra de busca
- Botão do carrinho (leva a `#/carrinho`)
- Botão de perfil

```javascript
// Navegação programática
logo?.addEventListener('click', () => {
    window.location.hash = '/';
});
```

---

### Lista de Produtos (`product-list`)
**Arquivo**: `components/product-list/product-list.js`

Exibe uma grade com todos os produtos disponíveis.

**Funcionalidades**:
- Renderiza produtos do `appState.products`
- Exibe imagem, nome, categoria, descrição e preço
- Botão "Detalhes" que navega para a página do produto

```javascript
// Cada produto rende um card
${appState.products.map(product => `
    <div class="product-card">
        <h3>${product.name}</h3>
        <button onclick="window.location.hash = 'produto/${product.id}'">
            Detalhes
        </button>
    </div>
`).join('')}
```

---

### Detalhes do Produto (`product-detail`)
**Arquivo**: `components/product-detail/product-detail.js`

Página de detalhes de um produto específico.

**Funcionalidades**:
- Recebe o ID do produto como atributo: `<product-detail product-id="1">`
- Exibe informações completas do produto
- Mostra estoque disponível
- Seletor de quantidade
- Botão para adicionar ao carrinho
- Notificação de sucesso ao adicionar

```javascript
// Recebe o product-id como atributo
connectedCallback() {
    const id = parseInt(this.getAttribute('product-id'));
    const product = appState.products.find(p => p.id === id);
}

// Adiciona ao carrinho
btn?.addEventListener('click', () => {
    addToCart(id, quantity);
    this.showNotification(); // Mostra "✓ Adicionado ao carrinho"
});
```

---

### Carrinho de Compras (`cart-view`)
**Arquivo**: `components/cart-view/cart-view.js`

Visualiza e gerencia os itens do carrinho.

**Funcionalidades**:
- Tabela com os itens do carrinho
- Atualizar quantidades
- Remover itens
- Calcular subtotal por item
- Total do carrinho
- Botão para limpar carrinho
- Botão para finalizar compra (checkout)
- Mensagem quando carrinho está vazio

```javascript
// Escuta atualizações no carrinho
window.addEventListener('cartUpdated', () => this.render());

// Remove item
if (e.target.classList.contains('btn-remove')) {
    removeFromCart(id);
}

// Atualiza quantidade
if (e.target.classList.contains('quantity-input')) {
    updateCartQuantity(id, quantity);
}
```

---

### Formulário de Produto (`product-form`)
**Arquivo**: `components/product-form/product-form.js`

Formulário para cadastrar novos produtos.

**Funcionalidades**:
- Campos: nome, categoria, preço, estoque, descrição, fornecedor, imagem
- Validação de campos
- Adição de novo produto ao `appState`
- Redirecionamento após cadastro

---

### Formulário de Fornecedor (`supplier-form`)
**Arquivo**: `components/supplier-form/supplier-form.js`

Formulário para cadastrar novos fornecedores.

**Funcionalidades**:
- Campos: nome, telefone, email, cidade
- Validação de dados
- Adição ao `appState.suppliers`
- Redirecionamento após cadastro

---

### Footer (`app-footer`)
**Arquivo**: `components/footer/footer.js`

Componente de rodapé presente em todas as páginas.

---

## 💾 Gerenciamento de Estado

O estado global da aplicação é gerenciado através do objeto `appState`, localizado em `scripts/data.js`.

### Estrutura do appState

```javascript
const appState = {
    // Array de produtos com suas informações
    products: [
        { 
            id: 1, 
            name: 'Dipirona 500mg',
            category: 'Analgésico',
            price: 5.99,
            stock: 100,
            supplier: 'Fornecedor A',
            description: 'Medicamento analgésico e antipirético.',
            image: '../assets/dipirona.jpeg'
        },
        // ... mais produtos
    ],
    
    // Array de fornecedores
    suppliers: [
        {
            id: 1,
            name: 'Fornecedor A',
            phone: '(11) 1234-5678',
            email: 'contato@fornecedor-a.com',
            city: 'São Paulo',
            products: [1, 3] // IDs dos produtos fornecidos
        },
        // ... mais fornecedores
    ],
    
    // Carrinho do usuário
    cart: [
        {
            id: 1,
            name: 'Dipirona 500mg',
            price: 5.99,
            quantity: 2,
            // ... outras propriedades do produto
        }
    ]
};
```

### Funções de Gerenciamento do Carrinho

#### `addToCart(productId, quantity = 1)`
Adiciona um produto ao carrinho ou aumenta a quantidade se já existe.

```javascript
function addToCart(productId, quantity = 1) {
    const product = appState.products.find(p => p.id === productId);
    if (!product) return;
    
    const cartItem = appState.cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += quantity; // Aumenta quantidade
    } else {
        appState.cart.push({ ...product, quantity }); // Novo item
    }
    
    // Notifica componentes que dependem do carrinho
    window.dispatchEvent(new CustomEvent('cartUpdated'));
}
```

#### `removeFromCart(productId)`
Remove um produto do carrinho.

```javascript
function removeFromCart(productId) {
    appState.cart = appState.cart.filter(item => item.id !== productId);
    window.dispatchEvent(new CustomEvent('cartUpdated'));
}
```

#### `updateCartQuantity(productId, quantity)`
Atualiza a quantidade de um item no carrinho.

```javascript
function updateCartQuantity(productId, quantity) {
    const item = appState.cart.find(i => i.id === productId);
    if (item) item.quantity = Math.max(1, quantity);
    window.dispatchEvent(new CustomEvent('cartUpdated'));
}
```

#### `clearCart()`
Limpa todos os itens do carrinho.

```javascript
function clearCart() {
    appState.cart = [];
    window.dispatchEvent(new CustomEvent('cartUpdated'));
}
```

#### `getCartTotal()`
Calcula o valor total do carrinho.

```javascript
function getCartTotal() {
    return appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}
```

### Comunicação entre Componentes

Os componentes se comunicam através de **eventos customizados**:

```javascript
// Componente 1: Dispara evento
window.dispatchEvent(new CustomEvent('cartUpdated'));

// Componente 2: Escuta evento
window.addEventListener('cartUpdated', () => {
    console.log('Carrinho foi atualizado!');
    this.render(); // Re-renderiza o componente
});
```

---

## 📖 Como Utilizar

### Abrindo a Aplicação

1. Abra o arquivo `index.html` em um navegador moderno
2. A aplicação iniciará na página de produtos (`#/`)

### Navegando pela Aplicação

**Via Links no Header:**
- Clique em "Produtos" para ver a lista
- Clique em "Cadastro de Produtos" para adicionar novo produto
- Clique em "Cadastro de Fornecedores" para adicionar novo fornecedor

**Via Carrinho:**
- Clique no ícone do carrinho no header
- Ou navegue para `#/carrinho`

**Via URL:**
Você pode digitar as URLs diretamente na barra de endereço:
- `http://seu-dominio/#/` - Produtos
- `http://seu-dominio/#/produtos/cadastro` - Cadastro de Produto
- `http://seu-dominio/#/fornecedores/cadastro` - Cadastro de Fornecedor
- `http://seu-dominio/#/produto/1` - Detalhes do Produto 1
- `http://seu-dominio/#/carrinho` - Carrinho

### Adicionando Produtos ao Carrinho

1. Clique em "Detalhes" em qualquer produto
2. Ajuste a quantidade desejada
3. Clique em "Adicionar ao Carrinho"
4. Acesse o carrinho para visualizar o item adicionado

### Finalizando Compra

1. Vá para o carrinho (`#/carrinho`)
2. Revise os itens e quantidades
3. Clique em "Finalizar Compra"
4. Será exibida uma confirmação de sucesso

---

## 📁 Estrutura de Diretórios

```
farmacia/
├── index.html                          # Arquivo principal (Shell da aplicação)
├── README.md                           # Este arquivo
│
├── assets/                             # Recursos estáticos
│   ├── cart.svg
│   ├── search.svg
│   ├── profile.svg
│   ├── dipirona.jpeg
│   ├── ibuprofeno.jpeg
│   └── ...
│
├── components/                         # Web Components
│   ├── header/
│   │   ├── header.js                   # Componente do cabeçalho
│   │   └── header.css                  # Estilos do cabeçalho
│   │
│   ├── footer/
│   │   ├── footer.js                   # Componente do rodapé
│   │   └── footer.css
│   │
│   ├── product-list/
│   │   ├── product-list.js             # Lista de produtos
│   │   └── product-list.css
│   │
│   ├── product-detail/
│   │   ├── product-detail.js           # Detalhes do produto
│   │   └── product-detail.css
│   │
│   ├── product-form/
│   │   ├── product-form.js             # Formulário de cadastro
│   │   └── product-form.css
│   │
│   ├── supplier-form/
│   │   ├── supplier-form.js            # Formulário de fornecedor
│   │   └── supplier-form.css
│   │
│   ├── cart-view/
│   │   ├── cart-view.js                # Visualização do carrinho
│   │   └── cart-view.css
│   │
│   ├── sidebar/
│   │   └── sidebar.js                  # Sidebar de navegação
│   │
│   └── router/
│       └── router.js                   # Sistema de roteamento
│
├── pages/                              # Páginas (futuro uso)
│
├── scripts/
│   └── data.js                         # Estado global e funções utilitárias
│
└── styles/                             # Estilos globais (futuro uso)
```

---

## 🔄 Ciclo de Vida Completo de Navegação

```
1. Usuário clica em um link ou digita uma URL
   ↓
2. URL muda (ex: #/produto/1)
   ↓
3. Evento 'hashchange' é disparado
   ↓
4. AppRouter.render() é chamado
   ↓
5. Hash é extraído: "produto/1"
   ↓
6. Componente correspondente é criado: <product-detail product-id="1">
   ↓
7. Conteúdo anterior é removido: main.innerHTML = ''
   ↓
8. Novo componente é adicionado ao DOM: main.appendChild(component)
   ↓
9. connectedCallback() do componente é disparado
   ↓
10. Componente renderiza seu conteúdo no Shadow DOM
    ↓
11. Estilos e markup encapsulados são aplicados
    ↓
12. Página é exibida ao usuário
```

---

## 🎨 Padrões de Design Utilizados

- **Web Components Pattern**: Criação de componentes reutilizáveis e encapsulados
- **Shadow DOM**: Encapsulamento de estilos e markup
- **Observer Pattern**: Comunicação entre componentes via eventos customizados
- **Single Page Application (SPA)**: Navegação sem recarregar a página
- **Hash-based Routing**: Roteamento baseado em URLs com hash
- **State Management**: Gerenciamento centralizador de estado em `appState`

---

## 🚀 Melhorias Futuras

- [ ] Persistência de dados com LocalStorage
- [ ] Integração com backend/API
- [ ] Validação de formulários avançada
- [ ] Busca e filtro de produtos
- [ ] Temas de cores (dark mode)
- [ ] Internacionalização (i18n)
- [ ] Testes automatizados
- [ ] Otimização de performance

---

## 📝 Notas

- Não há dependências externas; a aplicação usa JavaScript vanilla
- O Shadow DOM encapsula os estilos, evitando conflitos de CSS globais
- Os dados são armazenados em memória; página recarregada limpa os dados
- O roteador usa URLs com hash para compatibilidade com navegação tradicional

---

**Desenvolvido como projeto de aprendizado em Web Components e SPA**

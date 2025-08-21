const { test: base, expect } = require('@playwright/test');

const { LandingPage } = require('../pages/LandingPage');
const { LoginPage } = require('../pages/LoginPage');
const { MoviesPage } = require('../pages/MoviesPage');
const { Toast } = require('../pages/Components');

const test = base.extend({ // Aqui você pode adicionar fixtures personalizadas que serão usadas em todos os testes)}
    page: async ({ page }, use) => { //Novo context para o Playwright
        await use({
            ...page,// Mantém as funcionalidades padrão do page
            // Adiciona as páginas personalizadas
            landing: new LandingPage(page),
            login: new LoginPage(page),
            movies: new MoviesPage(page),
            toast: new Toast(page),
        });
    }
});

export { test, expect }; // Exporta o teste estendido para ser usado nos arquivos de teste
const { test: base, expect } = require('@playwright/test');

const { Leads } = require('./actions/leads');
const { Login } = require('./actions/Login');
const { Movies } = require('./actions/Movies');
const { PopUp } = require('./actions/Components');

const { Api } = require('./api');

const test = base.extend({ // Aqui você pode adicionar fixtures personalizadas que serão usadas em todos os testes)}
    page: async ({ page }, use) => { //Novo context para o Playwright
        const context = page

        context['leads'] = new Leads(page);
        context['login'] = new Login(page);
        context['movies'] = new Movies(page);
        context['popup'] = new PopUp(page);

        await use(context); // Fornece o contexto modificado para os testes
    },
    request: async ({ request }, use) => {
        const context = request;

        context['api'] = new Api(request);

        await context['api'].setToken();

        await use(context); // Fornece o contexto modificado para os testes
    }
});

export { test, expect }; // Exporta o teste estendido para ser usado nos arquivos de teste
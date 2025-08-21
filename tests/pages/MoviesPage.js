const { expect } = require('@playwright/test');

export class MoviesPage {

    constructor(page) {
        this.page = page;
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle'); //espera a página carregar completamente
        await expect(this.page).toHaveURL(/.*admin/);
    }

    async create(title, overview, company, realese_year) {
        await this.page.locator('a[href$="register"]').click();
        await this.page.getByLabel('Titulo do filme').fill(title); //label vinculada ao id do input
        await this.page.getByLabel('Sinopse').fill(overview);
        await this.page.locator('#select_company_id .react-select__indicator')
        .click();

        await this.page.locator('.react-select__option')
        .filter({ hasText: company })
        .click();

        await this.page.locator('#select_year .react-select__indicator')
        .click();

        await this.page.locator('.react-select__option')
        .filter({ hasText: realese_year })
        .click();
    }

    async submitRegisterForm() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    }


}
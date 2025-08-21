const { expect } = require('@playwright/test');

export class LandingPage {

    constructor(page) {
        this.page = page;
    }


    async visit() {
        await this.page.goto('http://localhost:3000/');
    }

    async openLeadModal() {
        await this.page.getByRole('button', { name: /Aperte o play/ }).click(); //utilizando substring para localizar o botão

        // checkpoint: garantir que o modal de fila de espera foi aberto
        await expect(this.page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera');
    }

    async submitLeadForm(name, email) {
        await this.page.locator('#name').fill(name); //pegando por id
        // await this.page.locator('input[placeholder="Seu nome completo"]').fill('Teste QAx'); //pegando por placeholder
        // await this.page.getByPlaceholder('Seu nome completo').fill('Teste QAx'); //pegando por placeholder
        await this.page.locator('input[name=email]').fill(email); //pegando por name

        await this.page.getByRole('button', { name: /Quero entrar na fila!/ }).click();
        // await page.getByTestId('modal').getByText('Você está na fila!').click(); // clicando no btn por texto
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

}
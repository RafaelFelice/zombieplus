const { expect } = require('@playwright/test');

export class Toast{

    constructor(page) {
        this.page = page;
    }

        async containText(message) {
        // await this.page.getByText('seus dados').click(); // pegando html do elemento flutuante
        // const content = await page.content();
        // console.log(content);
        const toast = this.page.locator('.toast');
        await expect(toast).toContainText(message)
        await expect(toast).not.toBeVisible({ timeout: 5000 }); // espera o toast desaparecer
    }

}
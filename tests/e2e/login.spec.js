const { test } = require('../support');

test('deve logar como admin', async ({ page }) => {
    await page.login.visit();
    await page.login.submitLoginForm('admin@zombieplus.com', 'pwd123');
    await page.login.isLoggedIn('Admin');
});

test('não deve logar com senha incorreta', async ({ page }) => {
    await page.login.visit();
    await page.login.submitLoginForm('admin@zombieplus.com', 'abc123');

    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
    await page.popup.haveText(message);
});

test('não deve logar quando o email é incorreto', async ({ page }) => {
    await page.login.visit();
    await page.login.submitLoginForm('zombieplus.com', 'pwd123');
    await page.login.alertFieldRequired('Email incorreto');
});

test('não deve logar quando o email não é preenchido', async ({ page }) => {
    await page.login.visit();
    await page.login.submitLoginForm('', 'pwd123');
    await page.login.alertFieldRequired('Campo obrigatório');
});

test('não deve logar quando senha não é preenchida', async ({ page }) => {
    await page.login.visit();
    await page.login.submitLoginForm('admin@zombieplus.com', '');
    await page.login.alertFieldRequired('Campo obrigatório');
});

test('não deve logar quando nenhum campo é preenchida', async ({ page }) => {
    await page.login.visit();
    await page.login.submitLoginForm('', '');
    await page.login.alertFieldRequired(['Campo obrigatório', 'Campo obrigatório']);
});
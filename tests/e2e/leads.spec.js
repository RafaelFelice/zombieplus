const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker');

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const userName = faker.person.firstName();
  const userEmail = faker.internet.email();

  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(userName, userEmail);

  const message = ('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!');
  await page.toast.containText(message);
});

test('Não deve cadastrar com um email já cadastrado', async ({ page, request }) => {
  const userName = faker.person.firstName();
  const userEmail = faker.internet.email();

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: userName,
      email: userEmail
    }
  });

  expect(newLead.ok()).toBeTruthy();

  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm(userName, userEmail);
  const message = ('O endereço de e-mail fornecido já está registrado em nossa fila de espera.');
  await page.toast.containText(message);
});

test('Não deve cadastrar um lead com email incorreto', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('Teste', 'teste.com');

  await page.landing.alertHaveText('Email incorreto');
});

test('Não deve cadastrar um lead quando nome não for informado', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('', 'teste@qax.com');

  await page.landing.alertHaveText('Campo obrigatório');
});

test('Não deve cadastrar um lead quando email não for informado', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('Teste', '');

  await page.landing.alertHaveText('Campo obrigatório');
});

test('Não deve cadastrar um lead quando nenhum campo obrigatório for informado', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
  await page.landing.submitLeadForm('', '');

  await page.landing.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório' // Verifica se ambos os campos obrigatórios estão com a mensagem de erro
  ]);
});
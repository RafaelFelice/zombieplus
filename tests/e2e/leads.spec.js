const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker');

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const userName = faker.person.firstName();
  const userEmail = faker.internet.email();

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(userName, userEmail);

  const message = ('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.');
  await page.popup.haveText(message);
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

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(userName, userEmail);
  const message = ('Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.');
  await page.popup.haveText(message);
});

test('Não deve cadastrar um lead com email incorreto', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('Teste', 'teste.com');

  await page.leads.alertHaveText('Email incorreto');
});

test('Não deve cadastrar um lead quando nome não for informado', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('', 'teste@qax.com');

  await page.leads.alertHaveText('Campo obrigatório');
});

test('Não deve cadastrar um lead quando email não for informado', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('Teste', '');

  await page.leads.alertHaveText('Campo obrigatório');
});

test('Não deve cadastrar um lead quando nenhum campo obrigatório for informado', async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm('', '');

  await page.leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório' // Verifica se ambos os campos obrigatórios estão com a mensagem de erro
  ]);
});
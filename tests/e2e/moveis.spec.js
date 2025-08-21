const { test } = require('../support');

const data = require('../support/fixtures/movies.json');

const { executeSQL } = require('../support/database');

test.only('deve poder cadastrar um novo filme', async ({ page }) => {
    const movie = data.create

    executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)

    await page.login.visit();
    await page.login.submitLoginForm('admin@zombieplus.com', 'pwd123');
    await page.movies.isLoggedIn();

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year);

    await page.movies.submitRegisterForm();

    const message = 'UhullCadastro realizado com sucesso!';
    await page.toast.containText(message);

});
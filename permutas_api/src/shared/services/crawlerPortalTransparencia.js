import puppeteer from 'puppeteer';
import Window from 'window';

const { document } = new Window();

const scrape = async ({ cpf }) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Vai até a pagina do portal da transparencia e busca pelo cpf indicado
    await page.goto(
      `http://www.portaltransparencia.gov.br/busca?termo=${cpf}&servidores=true`
    );

    // função que fica escutando caso para o caso de não existir nenhum resultado para a busca
    process.on('unhandledRejection', error => {
      browser.close();
    });

    // busca o primeiro resultado para o cpf passado
    page.click('ul#resultados h4.busca-portal-title-text-1 a');
    await page.waitForNavigation({ timeout: 60000 });

    const data = {};

    // pega as informações do card principal
    const principal = await page.evaluate(() => {
      const nodeList = document.querySelectorAll(
        'section.dados-tabelados span'
      );
      const spansArray = [...nodeList];

      const list = spansArray.map(span => ({
        value: span.innerText,
      }));

      return list;
    });

    // pega as informações dentro do card minimizado
    const result = await page.evaluate(() => {
      const nodeList = document.querySelectorAll(`
      section.box-detalhamento--tipo-b div#collapse-1 span
      `);
      const spansArray = [...nodeList];

      const list = spansArray.map(span => ({
        value: span.innerText,
      }));

      return list;
    });

    // formata e devolve os dados
    data.name = principal[0].value;
    data.position = result[1].value;
    data.institution = principal[5].value.replace(/(\r\n|\n|\r)/gm, '');
    data.role = result[17].value;
    data.allocation = result[21].value;
    data.state = principal[4].value.replace(/(\r\n|\n|\r)/gm, '');

    browser.close();

    return data;
  } catch (err) {
    return { error: 'Servidor nao encontrado' };
  }
};

export default scrape;

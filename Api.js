const http = require('http');

// Função para fazer a requisição à API externa
async function ApiTeste() {
    try {
        const fetch = await import('node-fetch');
        const response = await fetch.default('https://api.coindesk.com/v1/bpi/currentprice.json'); // Substitua 'https://api.example.com/data' pela URL da API que deseja utilizar
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
}

// Criação do servidor HTTP
const server = http.createServer(async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Verifica se a requisição é na rota raiz
    if (req.url === '/') {
        try {
            const apiData = await ApiTeste();
            console.log('Resultado da API:', apiData); // Imprime o resultado no terminal/console
            res.end(JSON.stringify(apiData)); // Retorna o resultado da API como resposta
        } catch (error) {
            res.end('Erro ao buscar dados da API');
        }
    } else {
        res.end('Rota não encontrada');
    }
});

// Define a porta em que o servidor irá ouvir
const PORT = 8080;

// Inicia o servidor
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

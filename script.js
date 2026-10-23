// 1. Função assíncrona com fetch()
async function buscarCEP(cep) {
    const mensagemEl = document.getElementById('mensagem');
    const ruaEl = document.getElementById('rua');

    // Limpa resultados anteriores do DOM
    mensagemEl.textContent = '';
    ruaEl.textContent = '';

    // 2. Tratamento de erros com try/catch
    try {
        // Validação de entrada
        if (!cep || cep.length !== 8 || isNaN(cep)) {
            throw new Error('Por favor, informe um CEP válido com 8 dígitos (apenas números).');
        }

        // Requisição à API pública ViaCEP
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        if (!resposta.ok) {
            throw new Error('Erro ao conectar com a API.');
        }

        // Conversão dos dados em JSON
        const dados = await resposta.json();

        // Caso a API retorne flag de erro para CEP não localizado
        if (dados.erro) {
            throw new Error('CEP não encontrado na base de dados.');
        }

        // 3. Atualização dinâmica do DOM com os dados retornados
        ruaEl.textContent = `Endereço: ${dados.logradouro}, ${dados.bairro} - ${dados.localidade}/${dados.uf}`;

    } catch (erro) {
        // 4. Mensagem de erro amigável
        mensagemEl.textContent = erro.message || 'Não foi possível realizar a busca.';
    }
}

function executarBusca() {
    const inputCep = document.getElementById('cepInput').value.trim();
    buscarCEP(inputCep);
}

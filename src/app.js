const form = document.querySelector('#formProduto');
const inputProduto = document.querySelector('#txtProduto');
const mensagem = document.querySelector('#mensagem');
const listaProdutos = document.querySelector('#listaProdutos');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const nomeProduto = inputProduto.value.trim(); // .trim() evita enviar espaços em branco vazios
    if (!nomeProduto) {
        mensagem.textContent = 'Por favor, digite o nome de um produto.';
        mensagem.className = 'erro';
        return;
    }

    mensagem.textContent = 'Enviando para o servidor...';
    mensagem.className = 'carregando';

    try {
        const resposta = await fetch('http://localhost:3000/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ produto: nomeProduto })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            mensagem.textContent = dados.mensagem;
            mensagem.className = 'sucesso';
            
            const li = document.createElement('li');
            li.textContent = `ID ${dados.id_inserido}: ${nomeProduto}`;
            listaProdutos.appendChild(li);
            
            inputProduto.value = '';
        } else {
            mensagem.textContent = `Erro: ${dados.erro}`;
            mensagem.className = 'erro';
        }

    } catch (error) {
        console.error("Erro na requisição:", error); // Corrigido para 'error'
        mensagem.textContent = 'Falha ao conectar com o servidor. Verifique se a API está rodando.';
        mensagem.className = 'erro'; // Adicionado o ponto e vírgula
    }
});
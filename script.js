async function consultarNotificacao() {
    const numeroNotificacao = document.getElementById("numeroNotificacao").value;

    const response = await fetch('/.netlify/functions/consultar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ no: numeroNotificacao })
    });

    const data = await response.json();

    if (response.ok) {
        exibirNotificacao(data);
    } else {
        exibirErro(data.error);
    }
}

function exibirNotificacao(notificacao) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <h2>Notificação ${notificacao.no}</h2>
        <p>Fornecedor: ${notificacao.fornecedor}</p>
        <p>Material: ${notificacao.material}</p>
        <p>Descrição do Problema: ${notificacao.descricao_problema}</p>
        <p>Data: ${notificacao.data}</p>
        <p>Código: ${notificacao.codigo}</p>
        <p>Quantidade Interditada: ${notificacao.quantidade_interditada}</p>
        <p>Contato: ${notificacao.contato}</p>
    `;
}

function exibirErro(mensagem) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `<p class="error">${mensagem}</p>`;
}

// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o cliente Supabase
    const supabaseUrl = 'https://moxtgncxkadcjcghnmar.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1veHRnbmN4a2FkY2pjZ2hubWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1MzczNjcsImV4cCI6MjAzODExMzM2N30.bs5T2G2Bgv2NROsPOJrUguwIw2fWes79YGWg8u4yjIs';
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);
  
    // Função para consultar a notificação
    async function consultarNotificacao() {
      const numeroNotificacao = document.getElementById('numeroNotificacao').value;
      const resultadoDiv = document.getElementById('resultado');
  
      // Faz a consulta ao Supabase
      const { data, error } = await supabase
        .from('notificacoes') 
        .select('*')
        .eq('numero', numeroNotificacao); 
  
      // Limpa o resultado anterior
      resultadoDiv.innerHTML = '';
  
      if (error) {
        resultadoDiv.textContent = 'Erro ao consultar notificação: ' + error.message;
      } else if (data.length === 0) {
        resultadoDiv.textContent = 'Notificação não encontrada.';
      } else {
        // Exibe os dados da notificação
        const notificacao = data[0];
        resultadoDiv.innerHTML = `
          <h2>Notificação ${notificacao.numero}</h2>
          <p>Mensagem: ${notificacao.mensagem}</p>
          <p>Data: ${notificacao.data}</p>
          `;
      }
    } // <-- Adicione esta chave de fechamento aqui
  }); // <-- Esta chave já estava presente
  
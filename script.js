// Substitua pelos detalhes do seu projeto Supabase
const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

// Inicialize o cliente Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function consultarNotificacao() {
    const numero = document.getElementById('numeroNotificacao').value;
    
    // Consulta ao Supabase
    const { data, error } = await supabase
        .from('notificacoes')
        .select('*')
        .eq('id', numero);

    if (error) {
        document.getElementById('resultado').innerText = 'Erro: ' + error.message;
    } else {
        if (data.length > 0) {
            document.getElementById('resultado').innerText = 'Notificação: ' + JSON.stringify(data[0]);
        } else {
            document.getElementById('resultado').innerText = 'Notificação não encontrada.';
        }
    }
}

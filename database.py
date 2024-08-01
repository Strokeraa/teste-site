import requests
import json

# Defina as informações do seu projeto Supabase
supabase_url = 'https://moxtgncxkadcjcghnmar.supabase.co'
supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1veHRnbmN4a2FkY2pjZ2hubWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1MzczNjcsImV4cCI6MjAzODExMzM2N30.bs5T2G2Bgv2NROsPOJrUguwIw2fWes79YGWg8u4yjIs'
table_name = 'notificacoes'

# Dados a serem inseridos
data = {
    "fornecedor": "A teste",
    "material": "a",
    "no": "234",
    "descricao_problema": "c",
    "data": "2025-02-06",
    "codigo": "023412",
    "quantidade_interditada": 50.0,
    "contato": "RsdsaSJCOSTA@sabo.com.br"
}

# Configuração dos headers
headers = {
    "apikey": supabase_key,
    "Authorization": f"Bearer {supabase_key}",
    "Content-Type": "application/json"
}

# URL da tabela no Supabase
url = f"{supabase_url}/rest/v1/{table_name}"

# Enviar os dados para o Supabase
response = requests.post(url, headers=headers, data=json.dumps(data))

# Verificar a resposta
if response.status_code == 201:
    print("Dados inseridos com sucesso!")
else:
    print("Falha ao inserir dados:", response.status_code, response.text)
<?php
// Verifica se o método da requisição é POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Obtém o valor do RNC enviado pelo JavaScript
  $numeroRNC = $_POST["numero_rnc"];

  // Validação do RNC (ajuste conforme suas regras de negócio)
  if (/* sua lógica de validação aqui */) {
    // Consulta ao SAP (substitua com sua lógica de consulta)
    $resultadoConsulta = /* ... (seu código para consultar o SAP) ... */;

    // Retorna o resultado (pode ser em formato JSON)
    echo json_encode($resultadoConsulta);
  } else {
    // Retorna um erro de validação
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Número RNC inválido"]);
  }
} else {
  // Retorna um erro se o método não for POST
  http_response_code(405); // Method Not Allowed
  echo json_encode(["error" => "Método não permitido"]);
}

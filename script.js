document.querySelector("button[type='submit']").addEventListener("click", function(event) {
    event.preventDefault();

    const numeroRNC = document.getElementById("numero_rnc").value;

    fetch("seu_script_servidor.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ numero_rnc: numeroRNC })
    })
    .then(response => response.text()) // Ou response.json() se esperar JSON
    .then(data => {
        console.log(data); // Trate a resposta aqui
    })
    .catch(error => {
        console.error("Erro:", error);
    });
});

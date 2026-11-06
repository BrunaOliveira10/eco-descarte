const base_url="http://127.0.0.1:5000"

async function enviar(url, formulario) {

    const dados = Object.fromEntries(
        new FormData(formulario)
    );

   // delete dados["confirmar-senha"];

    const resposta = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(dados),
    });

    const json = await resposta.json();

    alert (json.mensagem || json.erro);

    return resposta.ok;
    
}

document.getElementById("formLogin").addEventListener("submit", async (evento) => {

    evento.preventDefault();

    if (await enviar(`${base_url}/api/login`, evento.target)) evento.target.reset();
});

document.getElementById("formCadastro").addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const formulario = evento.target;

    if (formulario.elements["senha"].value !==
        formulario.elements["confirmar-senha"].value) {

            alert("As senhas não coincidem");
            return;
    }

    if (await enviar("/api/cadastro", formulario)) {
        location.href = "login.html";
    }
});


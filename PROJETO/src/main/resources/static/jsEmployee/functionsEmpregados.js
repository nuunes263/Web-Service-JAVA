var criarEmpregado = false;
var idSelecionado = null;

function novoEmpregado() {
  criarEmpregado = !criarEmpregado;

  if (criarEmpregado) {
    document.getElementById("txtNome").value = "";
    document.getElementById("txtCargo").value = "";
    document.getElementById("txtSalario").value = "";

    document.getElementById("tabela-empregados").style.display = "none";
    document.getElementById("formulario").style.display = "inline";
  } else {
    document.getElementById("formulario").style.display = "none";
    document.getElementById("tabela-empregados").style.display = "inline";
  }
}

function salvarEmpregado() {
  if (criarEmpregado) {
    event.preventDefault();
    let url = "http://localhost:8080/empregados";
    let nome = document.getElementById("txtNome").value;
    let cargo = document.getElementById("txtCargo").value;
    let salario = document.getElementById("txtSalario").value;

    body = {
      nome: nome,
      cargo: cargo,
      salario: salario,
    };
    fazPost(url, body);
  } else {
    event.preventDefault();
    if (idSelecionado) {
      let url = `http://localhost:8080/empregados/${idSelecionado}`;
      let nome = document.getElementById("txtNome").value;
      let cargo = document.getElementById("txtCargo").value;
      let salario = document.getElementById("txtSalario").value;

      body = {
        nome: nome,
        cargo: cargo,
        salario: salario,
      };
      fazPut(url, body);
    } else {
      alert("ID do empregado inválido!");
    }
  }
}

function fazPut(url, body) {
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ocorreu um erro ao atualizar o empregado.");
      }
      alert("Empregado atualizado com sucesso!");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

function fazPost(url, body) {
  let request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(body));

  alert("Empregado adicionado com sucesso!!");
  preencherTabelaEmpregados();
  novoEmpregado();
  afterSave();
}

function fazDelete() {
  const URL = `http://localhost:8080/empregados/${idSelecionado}`;
  const deleteRequest = {
    method: "DELETE",
  };
  fetch(URL, deleteRequest)
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error(resposta.status);
      }
      alert("Empregado apagado com sucesso!");
      window.location.reload();
      return resposta;
    })
    .catch((error) => {
      console.error("Erro na requisição DELETE:", error);
    });
}

function salvarId(id) {
  idSelecionado = id;
}

function preencherTabelaEmpregados() {
  fetch("http://localhost:8080/empregados")
    .then((response) => response.json())
    .then((data) => {
      const corpoTabela = document.getElementById("corpoTabelaEmpregados");
      corpoTabela.innerHTML = "";

      data.forEach((empregado) => {
        const { id, cargo, salario, nome } = empregado;
        const novaLinha = document.createElement("tr");
        const colunaId = document.createElement("td");
        const colunaNome = document.createElement("td");
        const colunaCargo = document.createElement("td");
        const colunaSalario = document.createElement("td");
        let alink = document.createElement("a");

        alink.textContent = id;
        alink.href = "javascript:void(0)";
        alink.onclick = function () {
          selecionarEmpregado(empregado.id);
          salvarId(empregado.id);
        };
        colunaId.appendChild(alink);
        colunaNome.textContent = nome;
        colunaCargo.textContent = cargo;
        colunaSalario.textContent = salario;

        novaLinha.appendChild(colunaId);
        novaLinha.appendChild(colunaNome);
        novaLinha.appendChild(colunaCargo);
        novaLinha.appendChild(colunaSalario);

        corpoTabela.appendChild(novaLinha);
      });
    })
    .catch((error) => {
      console.error("Ocorreu um erro:", error);
    });
}

async function selecionarEmpregado(id) {
  const URL = `http://localhost:8080/empregados/${id}`;
  fetch(URL)
    .then((resposta) => {
      if (!resposta.ok) throw Error(resposta.status);
      return resposta;
    })
    .then((resposta) => resposta.json())
    .then((jsonresponse) => preencherFormulario(jsonresponse));
}

function preencherFormulario(empregado) {
  document.getElementById("txtNome").value = empregado.nome;
  document.getElementById("txtCargo").value = empregado.cargo;
  document.getElementById("txtSalario").value = empregado.salario;

  document.getElementById("tabela-empregados").style.display = "none";
  document.getElementById("formulario").style.display = "inline";
}

function cancelarCadastro() {
  novoEmpregado();
}
window.addEventListener("load", preencherTabelaEmpregados);
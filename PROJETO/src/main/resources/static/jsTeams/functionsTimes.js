var criarTime = false;
var idTimeSelecionado = null;

function novoTime() {
  criarTime = !criarTime;

  if (criarTime) {
    document.getElementById('txtNomeTime').value = '';
    document.getElementById('txtAnoFundacao').value = '';
    document.getElementById('txtCidade').value = '';
    document.getElementById('txtEstado').value = '';


    document.getElementById('tabela-times').style.display = 'none';
    document.getElementById('formulario-times').style.display = 'inline';
  } else {
    document.getElementById('formulario-times').style.display = 'none';
    document.getElementById('tabela-times').style.display = 'inline';
  }
}

function salvarTime(){
    if(criarTime){
        event.preventDefault();
        let url = 'http://localhost:8080/times';
        let nome = document.getElementById("txtNomeTime").value;
        let anofundacao = document.getElementById("txtAnoFundacao").value;
        let cidade = document.getElementById("txtCidade").value;
        let estado = document.getElementById("txtEstado").value;


        body = {
            "nome":nome,
            "anofundacao":anofundacao,
            "cidade":cidade,
            "estado":estado
        }
        fazPostTime(url, body);
    } else {
        event.preventDefault();
        if (idTimeSelecionado) {
          let url = `http://localhost:8080/times/${idTimeSelecionado}`;
          let nome = document.getElementById("txtNomeTime").value;
          let anofundacao = document.getElementById("txtAnoFundacao").value;
          let cidade = document.getElementById("txtCidade").value;
          let estado = document.getElementById("txtEstado").value;

          body = {
            nome: nome,
            anofundacao: anofundacao,
            cidade: cidade,
            estado:estado
          };
          fazPutTime(url, body);
        } else {
          console.log("ID do Time inválido!");
        }
    }


}

function fazPutTime(url, body){
    fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ocorreu um erro ao atualizar o time.");
      }
      alert("Time atualizado com sucesso!");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

function fazPostTime(url, body) {
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(body));

    alert("Time adicionado com sucesso!!");
    preencherTabelaTimes();
    novoTime();
    afterSaveTime();
}

function fazDeleteTime() {
  const URL = `http://localhost:8080/times/${idTimeSelecionado}`;
  const deleteRequest = {
    method: "DELETE",
  };
  fetch(URL, deleteRequest)
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error(resposta.status);
      }
      alert("Time apagado com sucesso!");
      window.location.reload();
      return resposta;
    })
    .catch((error) => {
      console.error("Erro na requisição DELETE:", error);
    });
}

function salvarTimeId(id) {
  idTimeSelecionado = id;
}

function preencherTabelaTimes() {
    fetch('http://localhost:8080/times')
      .then(response => response.json())
      .then(data => {
        const corpoTabela = document.getElementById('corpoTabelaTimes');
        corpoTabela.innerHTML = '';

        data.forEach(time => {
          const { id, nome, anofundacao, cidade, estado } = time;
          const novaLinha = document.createElement('tr');
          const colunaId = document.createElement('td');
          const colunaNome = document.createElement('td');
          const colunaAnofundacao = document.createElement('td');
          const colunaCidade= document.createElement('td');
          const colunaEstado= document.createElement('td');
          let alink = document.createElement('a');

          alink.textContent = id;
          alink.href="javascript:void(0)";
          alink.onclick = function () { selecionarTime(time.id); salvarTimeId(time.id);}
          colunaId.appendChild(alink);
          colunaNome.textContent = nome;
          colunaAnofundacao.textContent = anofundacao;
          colunaCidade.textContent = cidade;
          colunaEstado.textContent = estado;

          novaLinha.appendChild(colunaId);
          novaLinha.appendChild(colunaNome);
          novaLinha.appendChild(colunaAnofundacao);
          novaLinha.appendChild(colunaCidade);
          novaLinha.appendChild(colunaEstado);

          corpoTabela.appendChild(novaLinha);
        });
      })
      .catch(error => {
        console.error('Ocorreu um erro:', error);
      });
}

async function selecionarTime(id) {
  const URL = `http://localhost:8080/times/${id}`;
  fetch(URL)
    .then(resposta => { if (!resposta.ok) throw Error(resposta.status); return resposta;})
    .then(resposta => resposta.json())
    .then(jsonresponse => preencherFormularioTime(jsonresponse))

}

function preencherFormularioTime(time){
  document.getElementById('txtNomeTime').value = time.nome;
  document.getElementById('txtAnoFundacao').value = time.anofundacao;
  document.getElementById('txtCidade').value = time.cidade;
  document.getElementById('txtEstado').value = time.estado;

  document.getElementById('tabela-times').style.display = 'none';
  document.getElementById('formulario-times').style.display = 'inline';
}

function cancelarCadastroTime(){
  novoTime();
}

window.addEventListener('load', preencherTabelaTimes);
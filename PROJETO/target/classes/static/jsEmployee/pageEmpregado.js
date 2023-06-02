var temp1 = false;

function enablePage() {
  temp1 = !temp1;
  let tabela = document.getElementById("resultado");
  let empregadosDiv = document.getElementById("empregados");


  if (temp1) {
    tabela.style.display = 'inline';
    empregadosDiv.style.backgroundImage = 'none';
  } else {
    tabela.style.display = 'none';
    empregadosDiv.style.backgroundImage = 'url("https://www.betterup.com/hubfs/group%20of%20business%20people%20having%20a%20meeting.jpg")';
  }
}

function afterSave(){
  let tabela = document.getElementById("resultado");
  let empregadosDiv = document.getElementById("empregados");
  tabela.style.display = 'inline';
  empregadosDiv.style.backgroundImage = 'none';
}


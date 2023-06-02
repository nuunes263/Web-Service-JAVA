var temp = false;

function enablePageTimes() {
  temp = !temp;
  let tabela = document.getElementById("resultado-times");
  let empregadosDiv = document.getElementById("times");


  if (temp) {
    tabela.style.display = 'inline';
    empregadosDiv.style.backgroundImage = 'none';
  } else {
    tabela.style.display = 'none';
    empregadosDiv.style.backgroundImage = 'url("https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/The-Club-Badges-of-the-12-European-Super-League-te-f96ef5b9bedaef6138b1054107ffa68f.jpg")';
  }
}

function afterSaveTime(){
  let tabela = document.getElementById("resultado-times");
  let empregadosDiv = document.getElementById("times");
  tabela.style.display = 'inline';
  empregadosDiv.style.backgroundImage = 'none';
}



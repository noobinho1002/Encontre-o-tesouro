//Tempo
let texto = ""
let TempoOriginal = 15
let Tempo = TempoOriginal
function Contador(){
    Tempo--
    document.getElementById("Tempo").innerHTML = "⏱️Tempo Restante⏱️:" + Tempo
    if (Tempo == 0){ 
        TerminarJogo();  
        return
    }
    setTimeout(Contador, 1000);
}
//Terminar Jogo
function TerminarJogo(){
    document.getElementById("PlacarJogo").style.display = "none";
        document.getElementById("PlacarFinal").style.display = "block";
        document.getElementById("PontosFinais").innerHTML = "Pontos Finais: "+Tesouros
        let mensagens = ["Otima pontuacao","Voce pode melhorar"," Treine mais", "Melhore na proxima","Aprimpore suas habilidades"];
        
        for (i = 0; i < mensagens.length; i++){
            texto += (i + 1) + ". " + mensagens[i] + "<br>";
        }
        document.getElementById("mensagemFinal").innerHTML = texto
}
//Tesouros
let Tesouros = 0

window.onload = function() {
    const bau = document.getElementById('Bau');
    bau.addEventListener('mouseenter', ganharTesouros);
};
function ganharTesouros(){
    Tesouros ++
    moveBau();
    document.getElementById("Tesouros").innerHTML = "💎Tesouros encontrados💎: " + Tesouros;
    if ( Tesouros % 5 === 0){
        document.getElementById("mensagem").innerHTML = "Voce vai conseguir!"
    }else{
        document.getElementById("mensagem").innerHTML = "..."
    }
    
}
function moveBau() {
    let Bau = document.getElementById("Bau");
  let x = Math.floor(Math.random() * (window.innerWidth - 150));
  let y = Math.floor(Math.random() * (window.innerHeight - 150));
    Bau.style.left = x + "px";
    Bau.style.top = y + "px";
}
//Locais
function iniciarJogo(){   
    texto = ""
    Tempo = TempoOriginal
    Tesouros = 0
    document.getElementById("Nome").value = ""
    document.getElementById("Ranking").innerHTML = ""
    document.getElementById("Top10").style.display = "none";
    document.getElementById("PlacarJogo").style.display = "block";
    document.getElementById("PlacarFinal").style.display = "none";
    document.getElementById("Tesouros").innerHTML = "💎Tesouros encontrados💎: " + Tesouros;
    Contador();
}

let TopPlacar =[];

function AddPlacar(){
    let NomeValor = document.getElementById("Nome").value ;
    document.getElementById("PlacarFinal").style.display = "none";
    document.getElementById("Top10").style.display = "block";
    //verifica se tem Save
    if (localStorage.getItem("TopPlacar")) {
        TopPlacar = JSON.parse(localStorage.getItem("TopPlacar"));
    }
    TopPlacar.push([NomeValor, Tesouros]);
    TopPlacar.sort(function(a, b){
        return b[1] - a[1];
    })

    for (let i = 0 ;i < 10 ;i++){
    if (TopPlacar[i] == undefined){
        document.getElementById("Ranking").innerHTML += `${i+1}. Sem Campeão <br>`;
    }else{
    document.getElementById("Ranking").innerHTML += `${i+1}. ${TopPlacar[i][0]} - Tesouros: ${TopPlacar[i][1]} <br>`;
    }
    //salva
    localStorage.setItem("TopPlacar", JSON.stringify(TopPlacar));
}
}

iniciarJogo();
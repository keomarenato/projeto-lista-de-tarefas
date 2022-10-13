 const inputTarefa = document.querySelector('.input-tarefa') 
const btnTarefa = document.querySelector('.btn-tarefa') //botão
const tarefas = document.querySelector('.tarefas')  

function criaLi() { //essa função cria li da ul
  const li = document.createElement('li')
  return li
}

inputTarefa.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return; //se o input estiver vazio nao vai acontecer nada
    criaTarefa(inputTarefa.value); //se tiver algum valor, vai adicionar
  }
});

function limpaInput() { //quando adicona nova tarefa ele vai limpa sozinho
   inputTarefa.value = ''
   inputTarefa.focus()
}

function criaBotaoApagar(li) { // cria um botao apagar
   li.innerText += ' '
   const botaoApagar = document.createElement('button') //criar um botao para apagar
   botaoApagar.innerText = 'Apagar'
   botaoApagar.setAttribute('class', 'apagar')
   botaoApagar.setAttribute('title', 'Apagar está tarefa')
   li.appendChild(botaoApagar)
}

function criaTarefa(textoInput) {
  const li = criaLi()
  li.innerText = textoInput
  tarefas.appendChild(li) //adiciona uma tarefa na li
  limpaInput()
  criaBotaoApagar(li)  
  salvarTarefas()
}

btnTarefa.addEventListener('click', function() {
  if (!inputTarefa.value) return; //se o input tiver vazio nao vai acontecer nada
  criaTarefa(inputTarefa.value); //se o input tiver algum valor, vai adicionar
});

document.addEventListener('click', function(e) {
 const el = e.target //onde esta sendo clicado
 
 if(el.classList.contains('apagar')) {
   el.parentElement.remove() //do elemento o pai dele é removido, que é o LI
   salvarTarefas()
 }
})

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas); //converte um elemento no formato Json
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas'); 
  const listaDeTarefas = JSON.parse(tarefas);

  for(let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas();

const inputTarefa = document.querySelector('.input-tarefa');
const btnEnviar = document.querySelector('.btn-enviar');
const listaTarefas = document.querySelector('.tarefas');

function criaLi() {
  const li = document.createElement('li');
  return li;
}

inputTarefa.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) {
      return;
    }
    criarTarefa(inputTarefa.value);
  }
});

function criarTarefa(tarefa) {
  console.log(tarefa);
  const li = criaLi();
  li.innerText = tarefa;
  listaTarefas.appendChild(li);
  limparInput();
  criarBotaoApagar(li);
  salvarTarefas();
};

btnEnviar.addEventListener('click', function () {
  if (!inputTarefa.value) {
    return;
  }
  criarTarefa(inputTarefa.value);
});

function limparInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

function criarBotaoApagar(li) {
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'apagar';
  botaoApagar.setAttribute('class', 'btn-apagar');
  li.appendChild(botaoApagar);
}

document.addEventListener('click', function (e) {
  const el = e.target;
  if (el.classList.contains('btn-apagar')) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

function salvarTarefas() {
  const liTarefas = listaTarefas.querySelectorAll('li');
  const tarefas = [];

  for (let tarefa of liTarefas) {
    let textoTarefa = tarefa.innerText;
    textoTarefa = textoTarefa.replace('apagar', '').trim();
    tarefas.push(textoTarefa);
  }
  const tarefasJSON = JSON.stringify(tarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefaSalva() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);

  for (let tarefa of listaDeTarefas) {
    criarTarefa(tarefa);
  }
}
adicionaTarefaSalva();
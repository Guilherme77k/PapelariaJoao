const formAutorizacao = document.querySelector('#form-autorizacao');
const nomeNc = document.querySelector('.formNome');
const emailEC = document.querySelector('.formEmail');
const telefoneTC = document.querySelector('.formTelefone');
const erro = document.querySelector('.error');

import { isEmail } from 'validator';

function tempo(value) {
    setTimeout(() => {
        value.innerHTML = '';
    }, 3000);
}

function validarCampos() {

    let formErro = false;

    const nomeNcArray = nomeNc.value.split(' ');

    if (nomeNcArray.length < 2) {
        erro.innerHTML = '<p>Nome Representante Invalido</p>';
        tempo(erro);
        formErro = true;
    }

    const regexTelefone = new RegExp(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/);

    if (!regexTelefone.test((telefoneTC.value))) {
        erro.innerHTML = '<p>Telefone do contratante inválido!</p>';
        tempo(erro);
        formErro = true;
    }

    if (!isEmail(String(emailEC.value))) {
        erro.innerHTML = '<p>Email do contratante inválido!</p>';
        tempo(erro);
        formErro = true;
    }

    if (formErro) return;

    console.log('Buscar dados');
}

document.addEventListener('input', function(e) {
    const element = e.target;

    if (
        element.classList.contains(('telefone-contratante'))) {
        element.value = element.value.replace(/[^0-9]/g, '');
        element.value = element.value.replace(/(\d{2})(\d)/, '($1) $2');
        element.value = element.value.replace(/(\d)(\d{4})$/, '$1-$2');
    }

    if (element.classList.contains('nome-contratante')) {
        element.value = element.value.replace(/[^A-Za-z ]/g, '');
    }

});

formAutorizacao.addEventListener('submit', function(e) {
    e.preventDefault();

    validarCampos();
});
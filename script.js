let dados_bancarios = [
    {
        nome: "João da Silva",
        cpf: 15458205626,
        celular: "(31) 9198-8191",
        senha: "123654",
        conta: "9999",
        saldo: 150,
    }
]

function gerador_numero_conta(){
    let numero_conta
    let numero_unico
    do{
        numero_unico = true
        numero_conta = JSON.stringify(Math.floor((Math.random() * 9000)) + 1000)
        dados_bancarios.forEach(objeto => {
            if (objeto.conta == numero_conta){
                numero_unico = false
                console.log("Numero conta")
            }
        })
    }while (numero_unico == false)
    return numero_conta
}

function valida_e_salva(event) {

    event.preventDefault();

    const nome = event.target.nome.value
    const cpf = event.target.cpf.value
    const celular = event.target.celular.value
    const senha = event.target.senha.value
    const senha_conf = event.target.senha_conf.value

    //Validação de campos preenchidos
    const valores = [nome, cpf, celular, senha, senha_conf]
    let campo_vazio = false
    valores.forEach(valor => {
        if (valor == "") {
            campo_vazio = true
        }
    });
    if (campo_vazio == true) { 
        return alert("É necessário preencher todos os campos para realizar o cadastro!") 
    }
    //Validação senha e confirmação de senha
    if (valores[3] != valores[4]) {
        return alert("As senhas digitadas devem ser iguais!")
    }
    const novo_cadastro = {
        nome: nome,
        cpf: cpf,
        celular: celular,
        senha: senha,
        conta: gerador_numero_conta(),
        saldo: 0,
    }
    dados_bancarios.unshift(novo_cadastro)
    alert(`Conta criada com sucesso!
Número da conta: ${novo_cadastro.conta}`)
}

function altera_tamanho_botoes(botao) {
    document.getElementById('saque').classList.replace("ativo","operacao");
    document.getElementById('deposito').classList.replace("ativo","operacao");
    document.getElementById('saldo').classList.replace("ativo","operacao");
    botao.classList.replace("operacao", "ativo");
}

function desabilita_campo_valor(acao){
    document.getElementById("valor_op").disabled = acao;
    
}

const formulario_cadastro = document.getElementById('formulario-cadastro');
formulario_cadastro.addEventListener('submit', valida_e_salva);

const formulario_operacao =  document.getElementById("formulario-operacao");
formulario_operacao.addEventListener('submit', (event) => event.preventDefault)

const botao_saque = document.getElementById('saque');
botao_saque.addEventListener('click',() => {
    altera_tamanho_botoes(botao_saque)
    desabilita_campo_valor(false)
});

const botao_deposito = document.getElementById('deposito');
botao_deposito.addEventListener('click', () => {
    altera_tamanho_botoes(botao_deposito)
    desabilita_campo_valor(false)
});

const botao_saldo = document.getElementById('saldo');
botao_saldo.addEventListener('click', () => {
    altera_tamanho_botoes(botao_saldo)
    desabilita_campo_valor(true)
});
let dados_bancarios = [
    {
        nome: "João da Silva",
        cpf: 15458205626,
        celular: "(31) 9198-8191",
        senha: "123654",
        conta: "9999",
        saldo: 150,
    },
    {
        nome: "Cleber da Silva",
        cpf: 12345678900,
        celular: "(31) 9198-8191",
        senha: "654abc",
        conta: "1012",
        saldo: 1500,
    }
]

function gerador_numero_conta() {
    let numero_conta
    let numero_unico
    do {
        numero_unico = true
        numero_conta = JSON.stringify(Math.floor((Math.random() * 9000)) + 1000)
        dados_bancarios.forEach(objeto => {
            if (objeto.conta == numero_conta) {
                numero_unico = false
                console.log("Numero conta")
            }
        })
    } while (numero_unico == false)
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
    document.getElementById('saque').classList.replace("ativo", "operacao");
    document.getElementById('deposito').classList.replace("ativo", "operacao");
    document.getElementById('saldo').classList.replace("ativo", "operacao");
    botao.classList.replace("operacao", "ativo");
}

function desabilita_campo_valor(acao) {
    document.getElementById("valor_op").disabled = acao;
}

function valida_operacao(event) {

    event.preventDefault();

    //Verifica a operação selecionada e interrrompe as validações caso não haja operação
    let operacao_selecionada = ""
    const id_operacoes = ["saque", "deposito", "saldo"]
    id_operacoes.forEach((id) => {
        if (document.getElementById(id).className == "ativo") {
            operacao_selecionada = id
        }
    }
    )

    if (operacao_selecionada == "") {
        return alert("Selecione uma operação!")
    }

    //Percorre o array de contas até encontrar (ou não) o número de conta e confere a respectiva senha
    let contaExiste = false
    let senhaInvalida = true
    let indice

    for (indice = 0; indice < dados_bancarios.length; indice++) {
        if (event.target.conta_op.value == dados_bancarios[indice].conta) {
            contaExiste = true
            if (event.target.senha_op.value == dados_bancarios[indice].senha) {
                senhaInvalida = false
            }
            break
        }
    }

    if (!contaExiste) {
        return alert("Este número de conta não está cadastrado no sistema.")
    }

    if (senhaInvalida) {
        return alert("A senha está incorreta.")
    }

    //Chama a função correspondente à operação selecionada
    let valor = Number(event.target.valor_op.value)
    switch (operacao_selecionada) {
        case "saque":
            operacao_saque();
            break;
        case "deposito":
            operacao_deposito(dados_bancarios[indice].conta, valor);
            break;
        case "saldo":
            operacao_saldo(dados_bancarios[indice].conta);
            break;
    }
}

function operacao_saque() {
    console.log("Saque")
}

function operacao_deposito(conta, valor) {
    if (valor <= 0 || isNaN(valor)) {
        return alert("O valor inserido não é válido")
    }
    let indice = indice_da_conta(conta)
    let saldo_antigo = Number(dados_bancarios[indice].saldo)
    dados_bancarios[indice].saldo = saldo_antigo + valor
    alert(`Depósito na conta ${conta} efetuado com sucesso!
Saldo anterior: R$ ${saldo_antigo}
Saldo atual: R$ ${saldo_antigo + valor}`)
}

function operacao_saldo(conta) {
    let indice = indice_da_conta(conta)
    alert(`O saldo atual da conta ${conta} é de:
R$ ${dados_bancarios[indice].saldo}`)
}

function indice_da_conta(conta) {
    let indice
    dados_bancarios.forEach((objeto) => {
        if (objeto.conta == conta) {
            indice = dados_bancarios.indexOf(objeto)
        }
    })
    return indice
}

const formulario_cadastro = document.getElementById('formulario-cadastro');
formulario_cadastro.addEventListener('submit', valida_e_salva);

const formulario_operacao = document.getElementById("formulario-operacao");
formulario_operacao.addEventListener('submit', valida_operacao)

const botao_saque = document.getElementById('saque');
botao_saque.addEventListener('click', () => {
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
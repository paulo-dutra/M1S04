let dados_bancarios = []

function gerador_numero_conta(){
    let numero_conta
    let numero_unico
    do{
        numero_unico = true
        numero_conta = JSON.stringify(Math.floor((Math.random() * 10000)) + 1)
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

const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', valida_e_salva);

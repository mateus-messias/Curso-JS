/* 
4. Agora surgiu a necessidade de Cliente ser 
Pessoa Física ou Juridica.

Pessoa Física tem documento CPF 
e Juridica tem documento CNPJ
*/

class Cliente{
    constructor(nome, documento, tipoDocumento){
        if(this.constructor === Cliente){
            throw new Error('Cliente é uma classe abstrata')
        }
        this.nome = nome
        this.documento = documento
        this.tipoDocumento = tipoDocumento
    }
}

class PessoaFisica extends Cliente{
    constructor(nome, documento){
        super(nome, documento, 'CPF')       
    }
}
class PessoaJuridica extends Cliente{
    constructor(nome, documento){
        super(nome, documento, 'CNPJ')       
    }
}

const cliente1 = new PessoaFisica('mateus', '123.456.789-01')
const cliente2 = new PessoaJuridica('mateus oliveira', '123.456.789/0001-02')
console.log(cliente1)
console.log(cliente2)

class ContaBancaria{

    constructor(cliente, numero){
        if(this.constructor === ContaBancaria){
            throw Error('ContaBacaria é uma classe abstrata')
        }
        this.cliente = cliente
        this.numero = numero
        this.saldo = 0
    }

    get dadosCliente(){
        return `${this.cliente.nome}, ${this.cliente.tipoDocumento}: ${this.cliente.documento} `
    }

    depositar(valor){
        this.saldo += valor
    }
    sacar(){
        throw Error('metodo sacar() precisa ser implmementado')
    }
}

class ContaCorrente extends ContaBancaria{
    constructor(cliente, numero){
        super(cliente, numero)
        this.limite = 0        
    }
    sacar(valor){    
        let disponivel = this.saldo + this.limite    
        if (valor > disponivel){
            throw new Error('Saldo Insuficiente')
        }
        this.saldo -= valor            
    }
}

class ContaPoupanca extends ContaBancaria{
    constructor(cliente, numero){
        super(cliente, numero)
        this.aniversario = Date.now()
    }
    sacar(valor){
        if (valor > this.saldo){
            throw new Error('Saldo Insuficiente')
        }
        this.saldo -= valor
    }
}

const mateus = new PessoaFisica('mateus', '064.239.429-60')
const maria = new PessoaJuridica('maria', '087.608.808/0001-89')

const cp1 = new ContaPoupanca(mateus, 1)
const cp2 = new ContaPoupanca(maria, 2)
const cc1 = new ContaCorrente(maria, 3)

cp1.depositar(1000)
console.log(cp1)
cc1.limite = 1000
cc1.depositar(2000)
console.log(cc1)
cc1.sacar(3000)
console.log(cc1)
console.log(cp1.dadosCliente)
console.log(cp2.dadosCliente)
console.log(cc1.dadosCliente)

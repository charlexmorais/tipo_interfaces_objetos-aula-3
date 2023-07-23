import prompt from "prompt-sync";

// Definindo a interface Cliente que descreve a estrutura dos dados de um cliente
interface Cliente {
  cpf: string;
  nome: string;
  idade: number;
  estadoCivil: string;
  endereco: string;
  cidade: string;
  estado: string;
}

// Função para validar um CPF
function validarCPF(cpf: string): boolean {
  // Verifica se o CPF possui exatamente 11 dígitos, sem formatação
  if (!/^\d{11}$/.test(cpf)) {
    return false;
  }

  // Realiza a validação do dígito verificador do CPF
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === parseInt(cpf.charAt(9))) {
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    return remainder === 10 || remainder === parseInt(cpf.charAt(10));
  }

  return false;
}

// Função para cadastrar um cliente
function cadastrarCliente(): Cliente {
  const promptSync = prompt();
  let cpf: string;
  let nome: string;
  let idade: number;
  let estadoCivil: string;
  let endereco: string;
  let cidade: string;
  let estado: string;

  // Solicita o CPF ao usuário e valida se é válido usando a função validarCPF
  while (true) {
    cpf = promptSync("Digite o CPF do cliente (11 dígitos): ");
    if (validarCPF(cpf)) {
      break;
    } else {
      console.log("CPF inválido! Digite um CPF válido.");
    }
  }

  // Solicita os demais dados do cliente
  nome = promptSync("Digite o nome do cliente: ");
  idade = Number(promptSync("Digite a idade do cliente: "));
  estadoCivil = promptSync("Digite o estado civil do cliente: ");
  endereco = promptSync("Digite o endereço do cliente: ");
  cidade = promptSync("Digite a cidade do cliente: ");
  estado = promptSync("Digite o estado do cliente: ");

  // Cria um objeto do tipo Cliente com os dados informados
  const cliente: Cliente = {
    cpf: cpf,
    nome: nome,
    idade: idade,
    estadoCivil: estadoCivil,
    endereco: endereco,
    cidade: cidade,
    estado: estado,
  };

  return cliente;
}

// Função principal que inicia o cadastro de clientes
function main(): void {
  console.log("=== Cadastro de Clientes ===");
  // Chama a função cadastrarCliente para obter os dados do cliente
  const cliente = cadastrarCliente();
  console.log("\nDados do cliente cadastrado:");
  console.log(cliente);
}

// Executa a função principal para iniciar o cadastro de clientes
main();

// precisar instalar 
// npm install --save-dev @types/prompt-sync

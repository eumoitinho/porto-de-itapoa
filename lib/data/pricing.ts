export interface ServicoPreco {
  id: string
  nome: string
  codigo: string
  descricao: string
  categoria: "armazenagem" | "movimentacao" | "inspecao" | "reefer" | "agendamento" | "armazem" | "lcl" | "administrativo" | "outros"
  tipoCobranca: "percentual" | "fixo" | "diario" | "consulta"
  valor: string
  valorMinimo?: string
  unidade?: string
  periodo?: string
  aplicavelA?: string[]
  observacoes?: string[]
  adicionais?: string[]
}

export const servicosPrecos: ServicoPreco[] = [
  // ARMAZENAGEM DE IMPORTAÇÃO
  {
    id: "arm-imp-1",
    nome: "Armazenagem de Importação - 1º Período",
    codigo: "1.1",
    descricao: "Da descarga ao 5º dia - Contêineres de 20' ou 40'",
    categoria: "armazenagem",
    tipoCobranca: "percentual",
    valor: "0,656% sobre o valor CIF",
    valorMinimo: "R$ 1.197,00 por período",
    unidade: "Por contêiner",
    periodo: "5 dias",
    aplicavelA: ["importacao"],
    observacoes: [
      "A contagem da armazenagem se inicia na data da descarga",
      "Os períodos são cobrados cumulativamente até a retirada da carga"
    ],
    adicionais: [
      "Mercadorias perigosas: adicional de 150%",
      "Cargas OOG (FR, OT, Platform): adicional de 150%"
    ]
  },
  {
    id: "arm-imp-2",
    nome: "Armazenagem de Importação - 2º Período",
    codigo: "1.2",
    descricao: "Do 6º dia ao 10º dia - Contêineres de 20' ou 40'",
    categoria: "armazenagem",
    tipoCobranca: "percentual",
    valor: "0,348% sobre o valor CIF ao dia",
    valorMinimo: "R$ 264,00 ao dia",
    unidade: "Por contêiner",
    periodo: "Diário",
    aplicavelA: ["importacao"],
    observacoes: [
      "Cobrança diária após o 5º dia",
      "Períodos cobrados cumulativamente"
    ],
    adicionais: [
      "Mercadorias perigosas: adicional de 150%",
      "Cargas OOG: adicional de 150%"
    ]
  },
  {
    id: "arm-imp-3",
    nome: "Armazenagem de Importação - 3º Período",
    codigo: "1.3",
    descricao: "Do 11º dia ao 29º dia - Contêineres de 20' ou 40'",
    categoria: "armazenagem",
    tipoCobranca: "percentual",
    valor: "0,440% sobre o valor CIF ao dia",
    valorMinimo: "R$ 372,00 ao dia",
    unidade: "Por contêiner",
    periodo: "Diário",
    aplicavelA: ["importacao"],
    observacoes: [
      "Cobrança diária do 11º ao 29º dia",
      "Períodos cobrados cumulativamente"
    ],
    adicionais: [
      "Mercadorias perigosas: adicional de 150%",
      "Cargas OOG: adicional de 150%"
    ]
  },
  {
    id: "arm-imp-4",
    nome: "Armazenagem de Importação - 4º Período",
    codigo: "1.4",
    descricao: "Do 30º dia até a retirada - Contêineres de 20' ou 40'",
    categoria: "armazenagem",
    tipoCobranca: "percentual",
    valor: "0,473% sobre o valor CIF ao dia",
    valorMinimo: "R$ 479,00 ao dia",
    unidade: "Por contêiner",
    periodo: "Diário",
    aplicavelA: ["importacao"],
    observacoes: [
      "Cobrança diária a partir do 30º dia",
      "Períodos cobrados cumulativamente"
    ],
    adicionais: [
      "Mercadorias perigosas: adicional de 150%",
      "Cargas OOG: adicional de 150%"
    ]
  },

  // ARMAZENAGEM DE EXPORTAÇÃO E CABOTAGEM
  {
    id: "arm-exp-1",
    nome: "Armazenagem de Exportação - 1º Período",
    codigo: "2.1",
    descricao: "Da entrega ao 5º dia - Contêineres de 20' ou 40' - Franquia",
    categoria: "armazenagem",
    tipoCobranca: "fixo",
    valor: "Franquia",
    unidade: "Por contêiner",
    periodo: "5 dias",
    aplicavelA: ["exportacao", "cabotagem"],
    observacoes: [
      "Franquia aplicada somente nos primeiros 5 dias",
      "A partir do 6º dia a cobrança é retroativa"
    ]
  },
  {
    id: "arm-exp-2",
    nome: "Armazenagem de Exportação - 2º Período",
    codigo: "2.2",
    descricao: "Do 6º dia até o embarque - Contêineres de 20' ou 40'",
    categoria: "armazenagem",
    tipoCobranca: "fixo",
    valor: "R$ 77,00 ao dia",
    unidade: "Por contêiner",
    periodo: "Diário",
    aplicavelA: ["exportacao", "cabotagem"],
    observacoes: [
      "Cobrança retroativa a partir da data de recebimento",
      "Períodos cobrados cumulativamente"
    ]
  },
  {
    id: "arm-exp-3",
    nome: "Armazenagem Exportação - Cargas Químicas",
    codigo: "2.3",
    descricao: "Cargas Químicas, classificação IMO - Franquia",
    categoria: "armazenagem",
    tipoCobranca: "fixo",
    valor: "Franquia",
    unidade: "Por contêiner",
    periodo: "5 dias",
    aplicavelA: ["exportacao", "perigosa"],
    observacoes: [
      "Franquia de 5 dias para cargas IMO",
      "Cobrança retroativa após franquia"
    ]
  },
  {
    id: "arm-exp-4",
    nome: "Armazenagem Exportação - Cargas Químicas 2º Período",
    codigo: "2.4",
    descricao: "Do 6º dia até o embarque - Cargas Químicas IMO",
    categoria: "armazenagem",
    tipoCobranca: "fixo",
    valor: "R$ 193,00 ao dia",
    unidade: "Por contêiner",
    periodo: "Diário",
    aplicavelA: ["exportacao", "perigosa"],
    observacoes: [
      "Cobrança retroativa para cargas IMO",
      "A partir do 6º dia de armazenagem"
    ]
  },
  {
    id: "arm-exp-5",
    nome: "Armazenagem Exportação - OOG",
    codigo: "2.5",
    descricao: "Contêineres Open-Top, Flat Rack ou Platform com excesso - Franquia",
    categoria: "armazenagem",
    tipoCobranca: "fixo",
    valor: "R$ 149,00 ao dia + R$ 29,00 por tonelada",
    unidade: "Por contêiner",
    periodo: "Diário",
    aplicavelA: ["exportacao", "oog"],
    observacoes: [
      "Para dimensões até: altura 4,10m, largura 3,80m, peso 40 toneladas",
      "Dimensões superiores aplicar item 4.1"
    ]
  },
  {
    id: "arm-exp-6",
    nome: "Armazenagem Exportação - OOG 2º Período",
    codigo: "2.6",
    descricao: "Do 6º dia até embarque - Contêineres OOG",
    categoria: "armazenagem",
    tipoCobranca: "fixo",
    valor: "R$ 219,00 ao dia + R$ 29,00 por tonelada",
    unidade: "Por contêiner",
    periodo: "Diário",
    aplicavelA: ["exportacao", "oog"],
    observacoes: [
      "Cobrança para contêineres com excesso de dimensões",
      "Inclui inspeção não invasiva e recebimento"
    ]
  },

  // ARMAZENAGEM LCL
  {
    id: "arm-lcl-1",
    nome: "Armazenagem LCL - 1º Período",
    codigo: "3.1",
    descricao: "Da descarga ao 7º dia - Processo/HBL",
    categoria: "armazenagem",
    tipoCobranca: "percentual",
    valor: "1,176% sobre o valor CIF por período",
    valorMinimo: "R$ 1.020,00 por período",
    unidade: "Por processo/HBL",
    periodo: "7 dias",
    aplicavelA: ["importacao", "lcl"],
    observacoes: [
      "Contagem inicia na data da descarga",
      "Períodos cobrados cumulativamente"
    ],
    adicionais: [
      "Mercadorias perigosas: adicional de 150%"
    ]
  },
  {
    id: "arm-lcl-2",
    nome: "Armazenagem LCL - 2º Período",
    codigo: "3.2",
    descricao: "8º dia ao 21º dia - Processo/HBL",
    categoria: "armazenagem",
    tipoCobranca: "percentual",
    valor: "0,27% sobre o valor CIF ao dia",
    valorMinimo: "R$ 250,00 ao dia",
    unidade: "Por processo/HBL",
    periodo: "Diário",
    aplicavelA: ["importacao", "lcl"],
    observacoes: [
      "Cobrança diária do 8º ao 21º dia",
      "Períodos cobrados cumulativamente"
    ],
    adicionais: [
      "Mercadorias perigosas: adicional de 150%"
    ]
  },
  {
    id: "arm-lcl-3",
    nome: "Armazenagem LCL - 3º Período",
    codigo: "3.3",
    descricao: "22º dia até a retirada - Processo/HBL",
    categoria: "armazenagem",
    tipoCobranca: "percentual",
    valor: "0,401% sobre o valor CIF ao dia",
    valorMinimo: "R$ 504,00 ao dia",
    unidade: "Por processo/HBL",
    periodo: "Diário",
    aplicavelA: ["importacao", "lcl"],
    observacoes: [
      "Cobrança diária a partir do 22º dia",
      "Períodos cobrados cumulativamente"
    ],
    adicionais: [
      "Mercadorias perigosas: adicional de 150%"
    ]
  },

  // ARMAZENAGEM DE CARGAS PROJETO
  {
    id: "arm-projeto",
    nome: "Armazenagem de Cargas Projeto",
    codigo: "4.1",
    descricao: "Carga projeto/carga solta",
    categoria: "armazenagem",
    tipoCobranca: "consulta",
    valor: "Sob Consulta",
    unidade: "Por operação",
    aplicavelA: ["projeto"],
    observacoes: [
      "Valores negociados previamente com departamento comercial",
      "Cargas com dimensões superiores a: altura 4,10m, largura 3,80m ou peso superior a 40 toneladas",
      "Análise de viabilidade operacional obrigatória"
    ]
  },

  // ARMAZENAGEM DE CONTÊINER VAZIO
  {
    id: "arm-vazio",
    nome: "Armazenagem de Contêiner Vazio",
    codigo: "5.1",
    descricao: "Contêiner Vazio de propriedade do Importador, Exportador ou Cias. Leasing",
    categoria: "armazenagem",
    tipoCobranca: "fixo",
    valor: "R$ 165,00 ao dia",
    unidade: "Por contêiner",
    periodo: "Diário",
    aplicavelA: ["vazio"],
    observacoes: [
      "Considera-se vazio se a unidade estiver limpa/certificada",
      "Não aplicado adicional de 150% para unidades vazias (FR, OT e Platform)",
      "Resíduos perigosos: cobrança conforme itens 1 ou 2 com adicional de 150%"
    ]
  },

  // MOVIMENTAÇÃO DE CONTÊINER
  {
    id: "mov-retirada",
    nome: "Retirada de Contêiner",
    codigo: "6.1",
    descricao: "Movimentação do contêiner para saída do terminal",
    categoria: "movimentacao",
    tipoCobranca: "fixo",
    valor: "R$ 424,00",
    unidade: "Por contêiner",
    aplicavelA: ["importacao", "cabotagem", "vazio"],
    observacoes: [
      "Movimentação vertical da pilha/bloco para o caminhão",
      "Aplicável aos fluxos de importação e descarga de cabotagem"
    ],
    adicionais: [
      "Mercadorias perigosas: adicional de 150%",
      "Cargas OOG: adicional de 150%"
    ]
  },
  {
    id: "mov-recebimento",
    nome: "Recebimento de Contêiner",
    codigo: "6.2",
    descricao: "Movimentação de recebimento de contêiner no terminal",
    categoria: "movimentacao",
    tipoCobranca: "fixo",
    valor: "R$ 108,00",
    unidade: "Por contêiner",
    aplicavelA: ["exportacao", "cabotagem", "vazio"],
    observacoes: [
      "Movimentação vertical do caminhão para a pilha/bloco",
      "Aplicável aos fluxos de exportação e embarque de cabotagem"
    ],
    adicionais: [
      "Mercadorias perigosas: adicional de 150%",
      "Cargas OOG: adicional de 150%"
    ]
  },
  {
    id: "mov-dta-gate",
    nome: "Recebimento de DTA (Gate)",
    codigo: "6.3",
    descricao: "Movimentação do contêiner para recebimento de DTA (gate) para nacionalização",
    categoria: "movimentacao",
    tipoCobranca: "fixo",
    valor: "R$ 430,00",
    unidade: "Por contêiner",
    aplicavelA: ["importacao"],
    observacoes: [
      "Para nacionalização no terminal",
      "Inclui armazenagem de carga, retirada de contêiner e inspeção scanner"
    ]
  },
  {
    id: "mov-ger-dta",
    nome: "Gerenciamento de DTA",
    codigo: "6.4",
    descricao: "Gestão documental e física de cargas, e segregação em regime DTA",
    categoria: "movimentacao",
    tipoCobranca: "fixo",
    valor: "R$ 2.013,00",
    unidade: "Por contêiner",
    aplicavelA: ["importacao"],
    observacoes: [
      "Inclui estrutura, equipamentos, logística",
      "Conforme requisitos da autoridade aduaneira"
    ]
  },

  // MOVIMENTAÇÃO DE CARGAS PROJETO
  {
    id: "mov-projeto-ret",
    nome: "Retirada de Carga Projeto",
    codigo: "7.1",
    descricao: "Movimentação da Carga Projeto para saída do terminal",
    categoria: "movimentacao",
    tipoCobranca: "consulta",
    valor: "Sob Consulta",
    unidade: "Por operação",
    aplicavelA: ["projeto"],
    observacoes: [
      "Contempla movimentação de carga especial dentro do terminal",
      "Recebimento ou saída pelo gate lateral",
      "Posicionamento em área reservada"
    ]
  },
  {
    id: "mov-projeto-rec",
    nome: "Recebimento de Carga Projeto",
    codigo: "7.2",
    descricao: "Recebimento e movimentação da Carga Projeto",
    categoria: "movimentacao",
    tipoCobranca: "consulta",
    valor: "Sob Consulta",
    unidade: "Por operação",
    aplicavelA: ["projeto"],
    observacoes: [
      "Análise de viabilidade operacional obrigatória",
      "Não aplicado adicional de 150% para cargas OOG"
    ]
  },

  // OUTROS SERVIÇOS DE PÁTIO
  {
    id: "patio-pesagem",
    nome: "Pesagem",
    codigo: "8.1",
    descricao: "Por contêiner, incluindo carregamento do contêiner na carreta",
    categoria: "outros",
    tipoCobranca: "fixo",
    valor: "R$ 1.034,00",
    unidade: "Por contêiner",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Inclui carregamento na carreta",
      "Para contêineres com mercadorias perigosas: adicional de 150%"
    ]
  },
  {
    id: "patio-posicionamento",
    nome: "Posicionamento de Contêiner",
    codigo: "8.2",
    descricao: "Por contêiner cheio, incluindo carregamento na carreta para armazém e vistorias",
    categoria: "outros",
    tipoCobranca: "fixo",
    valor: "R$ 1.034,00",
    unidade: "Por contêiner",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Para armazém e vistorias",
      "Quando houver abertura de porta, retirada de lacre inclusa"
    ]
  },
  {
    id: "patio-remocao",
    nome: "Remoção de quadra",
    codigo: "8.3",
    descricao: "Por contêiner solicitado, mudança de categoria ou alteração de quadra",
    categoria: "outros",
    tipoCobranca: "fixo",
    valor: "R$ 1.034,00",
    unidade: "Por contêiner",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Inclui carregamento do contêiner na carreta",
      "Mudança de categoria ou alteração de quadra"
    ]
  },

  // SERVIÇOS DE INSPEÇÃO
  {
    id: "insp-contêiner",
    nome: "Inspeção de Contêiner",
    codigo: "9.1",
    descricao: "Desova total ou parcial do contêiner para vistoria, e sua posterior estufagem",
    categoria: "inspecao",
    tipoCobranca: "fixo",
    valor: "R$ 3.532,00",
    unidade: "Por contêiner",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Para execução será cobrado posicionamento de contêiner",
      "Movimentação necessária por solicitação do cliente ou órgãos"
    ],
    adicionais: [
      "Mercadorias perigosas: adicional de 150%",
      "Cargas OOG: adicional de 150%"
    ]
  },
  {
    id: "insp-amostras",
    nome: "Retirada/Movimentação de Amostras",
    codigo: "9.2",
    descricao: "Retirada/Movimentação de Amostras para Inspeção quando solicitado pela fiscalização",
    categoria: "inspecao",
    tipoCobranca: "fixo",
    valor: "R$ 607,00",
    unidade: "Por contêiner",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Limitada às cargas localizadas nas portas do contêiner",
      "Caso exija retirada de diversos pontos, cobrança de desova completa"
    ]
  },
  {
    id: "insp-scanner-imp",
    nome: "Inspeção não invasiva - Scanner Importação",
    codigo: "9.3",
    descricao: "Escaneamento de unidade de carga de importação",
    categoria: "inspecao",
    tipoCobranca: "fixo",
    valor: "R$ 714,00",
    unidade: "Por contêiner",
    aplicavelA: ["importacao"],
    observacoes: [
      "Por solicitação do importador ou autoridade",
      "Caso posicionamento seja na carreta do Porto, cobrança adicional"
    ]
  },
  {
    id: "insp-scanner-exp",
    nome: "Inspeção não invasiva - Scanner Exportação",
    codigo: "9.4",
    descricao: "Escaneamento de unidade de carga de exportação, cabotagem, embarcadas",
    categoria: "inspecao",
    tipoCobranca: "fixo",
    valor: "R$ 462,00",
    unidade: "Por contêiner",
    aplicavelA: ["exportacao", "cabotagem"],
    observacoes: [
      "Para exportação, cabotagem, embarcadas, baldeadas ou transbordadas",
      "Caso posicionamento seja na carreta do Porto, cobrança adicional"
    ]
  },

  // SERVIÇOS REEFER
  {
    id: "reefer-setpoint",
    nome: "Alteração de set point",
    codigo: "10.1",
    descricao: "Alteração de set point (não inclui posicionamento do contêiner)",
    categoria: "reefer",
    tipoCobranca: "fixo",
    valor: "R$ 69,00",
    unidade: "Por alteração",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Para cada evento de ajuste por unidade admitida no terminal",
      "Temperatura diferente da requerida por tempo superior a 8h"
    ],
    adicionais: [
      "Mercadorias perigosas: adicional de 150%",
      "Cargas OOG: adicional de 150%"
    ]
  },
  {
    id: "reefer-monitoramento",
    nome: "Monitoramento Reefer",
    codigo: "10.2",
    descricao: "Incluso 02 monitoramentos por contêiner ao dia",
    categoria: "reefer",
    tipoCobranca: "diario",
    valor: "R$ 281,00 ao dia",
    unidade: "Por contêiner",
    periodo: "Diário",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Unidade recebe plug in",
      "Após 2º monitoramento padrão, baixa performance gera cobrança adicional"
    ]
  },
  {
    id: "reefer-adicional",
    nome: "Monitoramento Reefer Adicional",
    codigo: "10.3",
    descricao: "Por monitoramento adicional solicitado pelo Cliente/Armador",
    categoria: "reefer",
    tipoCobranca: "diario",
    valor: "R$ 124,00 ao dia",
    unidade: "Por contêiner",
    periodo: "Diário",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Solicitado pelo Cliente/Armador",
      "Para atingir set point requerido"
    ]
  },

  // SERVIÇOS DE AGENDAMENTO
  {
    id: "agend-noshow",
    nome: "No Show ou Não comparecimento",
    codigo: "11.1",
    descricao: "Cobrança por não comparecimento / não cancelamento dos agendamentos",
    categoria: "agendamento",
    tipoCobranca: "fixo",
    valor: "R$ 355,00",
    unidade: "Por ocorrência",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Não comparecimento aos agendamentos de entrega",
      "Não retirada dos contêineres dentro dos prazos estabelecidos"
    ]
  },
  {
    id: "agend-antecipada",
    nome: "Entrega antecipada",
    codigo: "11.2",
    descricao: "Cobrança de horário extraordinário para recebimento de contêiner de exportação",
    categoria: "agendamento",
    tipoCobranca: "fixo",
    valor: "R$ 355,00",
    unidade: "Por contêiner",
    aplicavelA: ["exportacao"],
    observacoes: [
      "Horário extraordinário para recebimento",
      "Contêiner de exportação"
    ]
  },
  {
    id: "agend-especial",
    nome: "Agendamento Especial",
    codigo: "11.3",
    descricao: "Solicitação de alteração/ajuste de janela para retirada ou entrega",
    categoria: "agendamento",
    tipoCobranca: "fixo",
    valor: "R$ 633,00",
    unidade: "Por solicitação",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Mediante consulta e viabilidade operacional",
      "Alteração de janela para retirada de importação ou entrega de exportação"
    ]
  },

  // SERVIÇOS DE ARMAZÉM
  {
    id: "arm-crossdocking",
    nome: "Cross-Docking Mecanizado",
    codigo: "12.1",
    descricao: "Movimentação de carga entre contêiner e caminhão com equipamento de pequeno porte",
    categoria: "armazem",
    tipoCobranca: "fixo",
    valor: "R$ 3.949,00",
    unidade: "Por operação",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Operação realizada com empilhadeira de pequeno porte",
      "Coleta ou devolução do equipamento vazio é responsabilidade do cliente",
      "Quebra de lote: adicional de 50% + posicionamento"
    ]
  },
  {
    id: "arm-crossdocking-manual",
    nome: "Cross-Docking Manual ou Especial",
    codigo: "12.2",
    descricao: "Movimentação de carga entre contêiner e caminhão manual ou com equipamento especial",
    categoria: "armazem",
    tipoCobranca: "consulta",
    valor: "Sob Consulta",
    unidade: "Por operação",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Operação manual ou com equipamento especial",
      "Serviços mediante avaliação prévia de viabilidade operacional"
    ]
  },
  {
    id: "arm-transbordo-mec",
    nome: "Transbordo de carga mecanizada",
    codigo: "12.3",
    descricao: "Transbordo da carga de um contêiner para outro",
    categoria: "armazem",
    tipoCobranca: "fixo",
    valor: "R$ 8.789,00",
    unidade: "Por contêiner",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Despesas de armazenagem devem ser liquidadas antes da operação",
      "Responsabilidade do cliente: devolução e entrega do contêiner vazio"
    ]
  },

  // SERVIÇOS DE CARGA LCL
  {
    id: "lcl-administrativo",
    nome: "Serviço Administrativo LCL",
    codigo: "13.1",
    descricao: "Inclui movimentação de desova e separação/conferência de lote",
    categoria: "lcl",
    tipoCobranca: "fixo",
    valor: "R$ 1.182,00",
    unidade: "Por processo/HBL",
    aplicavelA: ["lcl"],
    observacoes: [
      "Inclui movimentação de desova",
      "Separação/conferência de lote"
    ],
    adicionais: [
      "Mercadorias perigosas: adicional de 150%"
    ]
  },
  {
    id: "lcl-advalorem",
    nome: "Ad Valorem LCL",
    codigo: "13.2",
    descricao: "Valor de seguro de carga",
    categoria: "lcl",
    tipoCobranca: "percentual",
    valor: "0.24% sobre o CIF",
    unidade: "Por processo/HBL",
    aplicavelA: ["lcl"],
    observacoes: [
      "Valor de seguro de carga",
      "Calculado sobre valor CIF"
    ]
  },
  {
    id: "lcl-carregamento",
    nome: "Carregamento/Levante Carga Solta",
    codigo: "13.3",
    descricao: "Carregamento da área segregada para caminhão do importador",
    categoria: "lcl",
    tipoCobranca: "fixo",
    valor: "R$ 799,00",
    unidade: "Por processo/HBL",
    aplicavelA: ["lcl"],
    observacoes: [
      "Da área segregada para caminhão do importador",
      "Processo/HBL"
    ]
  },

  // SERVIÇOS ADMINISTRATIVOS
  {
    id: "adm-documentos",
    nome: "Documentos em geral",
    codigo: "15.1",
    descricao: "Valor por emissões de certificados, documentos, pesagem e outros",
    categoria: "administrativo",
    tipoCobranca: "fixo",
    valor: "R$ 162,00",
    unidade: "Por documento",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Emissões de certificados",
      "Documentos diversos",
      "Pesagem e outros serviços"
    ]
  },
  {
    id: "adm-fotografia",
    nome: "Fotografia digital",
    codigo: "15.2",
    descricao: "Fotografia por contêiner ou lote fotografado, caso solicitado pelo cliente",
    categoria: "administrativo",
    tipoCobranca: "fixo",
    valor: "R$ 118,00",
    unidade: "Por contêiner/lote",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Limitada a 10 fotos por contêiner ou lote",
      "Carga no interior do armazém ou contêiner na área de conferência",
      "Movimentação necessária: cobrança adicional de posicionamento"
    ]
  },
  {
    id: "adm-servicos",
    nome: "Serviços administrativos",
    codigo: "15.3",
    descricao: "Correção/Ajuste de Nota Fiscal para desembaraço aduaneiro, emissão de crachás e outros",
    categoria: "administrativo",
    tipoCobranca: "fixo",
    valor: "R$ 146,00",
    unidade: "Por serviço",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Correção/Ajuste de Nota Fiscal",
      "Emissão de crachás",
      "Outros serviços não especificados"
    ]
  },
  {
    id: "adm-carbono-dry",
    nome: "Neutralização de Carbono DRY",
    codigo: "15.4",
    descricao: "Aquisição de créditos de carbono e emissão de certificado",
    categoria: "administrativo",
    tipoCobranca: "diario",
    valor: "R$ 7,00 ao dia",
    unidade: "Por contêiner",
    periodo: "Diário",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Compensação das emissões de CO2",
      "Durante atividades de movimentação de unidade dry",
      "Inclui emissão de certificado"
    ]
  },
  {
    id: "adm-carbono-reefer",
    nome: "Neutralização de Carbono REEFER",
    codigo: "15.5",
    descricao: "Aquisição de créditos de carbono e emissão de certificado",
    categoria: "administrativo",
    tipoCobranca: "diario",
    valor: "R$ 8,00 ao dia",
    unidade: "Por contêiner",
    periodo: "Diário",
    aplicavelA: ["importacao", "exportacao"],
    observacoes: [
      "Compensação das emissões de CO2",
      "Durante atividades de movimentação de unidade reefer",
      "Inclui emissão de certificado"
    ]
  }
]
export interface PortoData {
  porto: {
    nome: string
    endereco: string
    telefone: string
    email: string
    website: string
  }
  servicos_maritimos: ServicoMaritimo[]
  cargas_projeto: {
    servico: string
    contato: {
      email: string
      telefone: string
    }
  }
}

export interface ServicoMaritimo {
  id: string
  nome: string
  regiao: string
  cobertura: string
  armadores: string[]
  escala: string
  navios: {
    quantidade: number | null
    capacidade_min?: number | null
    capacidade_max?: number | null
    capacidade?: number | null
    unidade: string
  }
  rota: string
  portos?: PortoInfo[]
  portos_brasileiros?: string[]
  rotas?: string[]
  tipo?: string
}

export interface PortoInfo {
  nome: string
  importacao_dias: number | null
  exportacao_dias: number | null
}

export const portoData: PortoData = {
  porto: {
    nome: "Porto Itapoá",
    endereco: "Av. Beira Mar 5, 2900 • Figueira do Pontal • Itapoá/SC • Brasil",
    telefone: "+55 47 3443.8700",
    email: "atendimento@portoitapoa.com",
    website: "www.portoitapoa.com"
  },
  servicos_maritimos: [
    {
      id: "conosur",
      nome: "CONOSUR",
      regiao: "América do Sul",
      cobertura: "Costa Leste e Costa Oeste da América do Sul",
      armadores: ["Maersk", "Hapag Lloyd"],
      escala: "Semanal",
      navios: {
        quantidade: 7,
        capacidade_min: 3600,
        capacidade_max: 4844,
        unidade: "TEUs"
      },
      rota: "Rio de Janeiro » Santos » Rio Grande » San Antonio » Callao » Guayaquil » Arica » Antofagasta » San Antonio » San Vicente » Itapoá » Rio de Janeiro",
      portos: [
        {
          nome: "CALLAO",
          importacao_dias: 33,
          exportacao_dias: 21
        },
        {
          nome: "GUAYAQUIL",
          importacao_dias: 30,
          exportacao_dias: 24
        },
        {
          nome: "ARICA",
          importacao_dias: 25,
          exportacao_dias: 29
        },
        {
          nome: "ANTOFAGASTA",
          importacao_dias: 23,
          exportacao_dias: 30
        },
        {
          nome: "SAN ANTONIO",
          importacao_dias: 21,
          exportacao_dias: 16
        },
        {
          nome: "SAN VICENTE",
          importacao_dias: 19,
          exportacao_dias: 35
        }
      ],
      escalas_brasileiras: ["Rio de Janeiro", "Santos", "Itapoá", "Rio Grande"]
    },
    {
      id: "ucla_string1",
      nome: "UCLA / STRING 1",
      regiao: "Golfo do México",
      cobertura: "Costa Leste dos EUA e Golfo dos EUA, Costa Leste da América do Sul",
      armadores: ["Maersk", "MSC"],
      escala: "Semanal",
      navios: {
        quantidade: 8,
        capacidade_min: 4496,
        capacidade_max: 7849,
        unidade: "TEUs"
      },
      rota: "Vera Cruz » Altamira » Houston » Cartagena » Suape » Santos » Itapoá » Navegantes » Paranaguá » Santos » Rio de Janeiro » Salvador » Cartagena » Vera Cruz",
      portos: [
        {
          nome: "VERA CRUS",
          importacao_dias: 24,
          exportacao_dias: 23
        },
        {
          nome: "ALTAMIRA",
          importacao_dias: 23,
          exportacao_dias: 24
        },
        {
          nome: "HOUSTON",
          importacao_dias: 20,
          exportacao_dias: 27
        },
        {
          nome: "CARTAGENA",
          importacao_dias: 15,
          exportacao_dias: 17
        }
      ],
      escalas_brasileiras: ["Santos", "Paranaguá", "Suape", "Itapoá", "Rio de Janeiro", "Salvador", "Navegantes"]
    },
    {
      id: "tango_sec",
      nome: "TANGO / SEC",
      regiao: "América do Norte",
      cobertura: "Costa Leste da América do Sul e Costa Leste da América do Norte",
      armadores: ["Maersk", "Hapag Lloyd"],
      escala: "Semanal",
      navios: {
        quantidade: 7,
        capacidade: 5500,
        unidade: "TEUs"
      },
      rota: "New York » Philadelphia » Norfolk » Charleston » Jacksonville » Port Everglades » Santos » Buenos Aires » Rio Grande » Itapoá » Santos » Rio de Janeiro » Salvador » Pecem » New York",
      portos: [
        {
          nome: "NEW YORK",
          importacao_dias: 29,
          exportacao_dias: 18
        },
        {
          nome: "PHILADELPHIA",
          importacao_dias: 27,
          exportacao_dias: 20
        },
        {
          nome: "NORFOLK",
          importacao_dias: 25,
          exportacao_dias: 22
        },
        {
          nome: "CHARLESTON",
          importacao_dias: 23,
          exportacao_dias: 24
        },
        {
          nome: "JACKSONVILLE",
          importacao_dias: 22,
          exportacao_dias: 25
        },
        {
          nome: "PORT EVERGLADES",
          importacao_dias: 20,
          exportacao_dias: 27
        }
      ],
      escalas_brasileiras: ["Itapoá", "Rio Grande", "Santos", "Rio de Janeiro", "Salvador", "Pecem"]
    },
    {
      id: "zgt",
      nome: "ZGT",
      regiao: "Golfo do México",
      cobertura: "Costa Leste dos EUA e Golfo dos EUA, Costa Leste da América do Sul",
      armadores: ["ZIM"],
      escala: "Semanal",
      navios: {
        quantidade: 8,
        capacidade_min: 2797,
        capacidade_max: 4360,
        unidade: "TEUs"
      },
      rota: "Buenos Aires – Montevideo – Itapoa – Paranagua - Santos – Rio De Janeiro – Cartagena – Kingston – Veracruz – Altamira – Houston – Miami – Kingston– Cartagena –Santos – Buenos Aires",
      portos: [
        {
          nome: "MXVER",
          importacao_dias: 33,
          exportacao_dias: 2
        },
        {
          nome: "MXAIJ",
          importacao_dias: 32,
          exportacao_dias: 3
        },
        {
          nome: "USIAH",
          importacao_dias: 28,
          exportacao_dias: 7
        },
        {
          nome: "USMIA",
          importacao_dias: 25,
          exportacao_dias: 19
        },
        {
          nome: "JMKST",
          importacao_dias: 21,
          exportacao_dias: 21
        },
        {
          nome: "COCRT",
          importacao_dias: 19,
          exportacao_dias: 25
        },
        {
          nome: "BRSNT",
          importacao_dias: 7,
          exportacao_dias: 28
        },
        {
          nome: "ARBUE",
          importacao_dias: 3,
          exportacao_dias: 32
        },
        {
          nome: "UYMVD",
          importacao_dias: 2,
          exportacao_dias: 33
        }
      ],
      escalas_brasileiras: ["Santos", "Paranaguá", "Itapoá", "Rio de Janeiro"]
    },
    {
      id: "wmed_mse",
      nome: "WMED / MSE",
      regiao: "Mediterrâneo",
      cobertura: "Costa Leste da América do Sul e Mediterrâneo",
      armadores: ["MSC", "Hapag Lloyd"],
      escala: "Semanal",
      navios: {
        quantidade: 9,
        capacidade_min: 8800,
        capacidade_max: 10000,
        unidade: "TEUs"
      },
      rota: "Valencia » Barcelona » Leghorn » Genoa » Valencia » Suape » Salvador » Rio de Janeiro » Santos » Paranaguá » Itapoá » Navegantes » Santos » Rio de Janeiro » Las Palmas » Málaga » Valencia",
      portos: [
        {
          nome: "BARCELONA",
          importacao_dias: 28,
          exportacao_dias: 26
        },
        {
          nome: "LEGHORN",
          importacao_dias: 26,
          exportacao_dias: 28
        },
        {
          nome: "GENOA",
          importacao_dias: 24,
          exportacao_dias: 30
        },
        {
          nome: "MÁLAGA",
          importacao_dias: 22,
          exportacao_dias: 32
        },
        {
          nome: "VALENCIA",
          importacao_dias: 21,
          exportacao_dias: 34
        },
        {
          nome: "LAS PALMAS",
          importacao_dias: 17,
          exportacao_dias: 25
        }
      ],
      escalas_brasileiras: ["Santos", "Rio de Janeiro", "Suape", "Navegantes", "Itapoá", "Salvador", "Paranaguá"]
    },
    {
      id: "bossa_nova_sirius1",
      nome: "Bossa Nova / SIRIUS 1",
      regiao: "Mediterrâneo",
      cobertura: "Costa Leste da América do Sul e Mediterrâneo",
      armadores: ["Maersk", "CMA CGM"],
      escala: "Semanal",
      navios: {
        quantidade: 6,
        capacidade_min: 8000,
        capacidade_max: 10000,
        unidade: "TEUs"
      },
      rota: "Tangier » Algeciras » Tangier » Salvador » Santos » Itapoá » Paranagua » Santos » Itaguai",
      portos: [
        {
          nome: "CONSTANTA",
          importacao_dias: 40,
          exportacao_dias: 39
        },
        {
          nome: "LEIXOES",
          importacao_dias: 23,
          exportacao_dias: 29
        },
        {
          nome: "BARCELONA",
          importacao_dias: 29,
          exportacao_dias: 32
        },
        {
          nome: "VALENCIA",
          importacao_dias: 25,
          exportacao_dias: 24
        },
        {
          nome: "LIVORNO",
          importacao_dias: 33,
          exportacao_dias: 32
        },
        {
          nome: "GENOA",
          importacao_dias: 32,
          exportacao_dias: 33
        },
        {
          nome: "ALGECIRAS",
          importacao_dias: 17,
          exportacao_dias: 20
        },
        {
          nome: "TANGIER",
          importacao_dias: 16,
          exportacao_dias: 21
        }
      ],
      escalas_brasileiras: ["Salvador", "Santos", "Itapoá", "Paranaguá", "Itaguai"]
    },
    {
      id: "lux_ese2_eex",
      nome: "LUX / ESE2 / EEX",
      regiao: "Europa",
      cobertura: "Norte da Europa",
      armadores: ["Cosco", "OOCL", "ONE"],
      escala: "Semanal",
      navios: {
        quantidade: 8,
        capacidade_min: 4000,
        capacidade_max: 4920,
        unidade: "TEUs"
      },
      rota: "Roterdã – Felixtowe – Hamburgo – Antuérpia – Lisboa – Algeciras – Santos – Paranaguá – Montevidéu – Buenos Aires – Itapoá – Paranaguá – Santos – Rio de Janeiro – Algeciras – Roterdã",
      portos: [
        {
          nome: "ESALG",
          importacao_dias: 22,
          exportacao_dias: 16
        },
        {
          nome: "PTLIS",
          importacao_dias: 24,
          exportacao_dias: 20
        },
        {
          nome: "BEANR",
          importacao_dias: 28,
          exportacao_dias: 22
        },
        {
          nome: "DEHAM",
          importacao_dias: 31,
          exportacao_dias: 24
        },
        {
          nome: "GBLGP",
          importacao_dias: 34,
          exportacao_dias: 27
        },
        {
          nome: "NLRTM",
          importacao_dias: 35,
          exportacao_dias: 32
        }
      ],
      escalas_brasileiras: ["Santos", "Rio de Janeiro", "Itapoá", "Paranaguá"]
    },
    {
      id: "carioca",
      nome: "CARIOCA",
      regiao: "Ásia",
      cobertura: "Américas, Oriente Médio e Ásia",
      armadores: ["MSC"],
      escala: "Semanal",
      navios: {
        quantidade: 16,
        capacidade_min: 6492,
        capacidade_max: 12217,
        unidade: "TEUs"
      },
      rota: "Qingdao » Busan » Ningbo » Xangai » Shekou (Shenzhen) » Singapura » Vizhinjam » Rio de Janeiro » Santos » Paranaguá » Itapoá » Itajaí » Buenos Aires » Rio Grande » Itajaí » Navegantes » Paranaguá » Santos » Rio de Janeiro » Walvis Bay » Porto de Khalifa » Singapura » Qingdao",
      portos: [
        {
          nome: "QINGDAO",
          importacao_dias: 42,
          exportacao_dias: 53
        },
        {
          nome: "BUSAN",
          importacao_dias: 40,
          exportacao_dias: null
        },
        {
          nome: "NINGBO",
          importacao_dias: 38,
          exportacao_dias: null
        },
        {
          nome: "XANGAI",
          importacao_dias: 37,
          exportacao_dias: null
        },
        {
          nome: "SHEKOU",
          importacao_dias: 33,
          exportacao_dias: null
        },
        {
          nome: "SINGAPURA",
          importacao_dias: 29,
          exportacao_dias: 46
        },
        {
          nome: "VIZHINJAM",
          importacao_dias: 24,
          exportacao_dias: null
        },
        {
          nome: "WALVIS BAY",
          importacao_dias: null,
          exportacao_dias: 22
        },
        {
          nome: "PORTO DE KHALIFA",
          importacao_dias: null,
          exportacao_dias: 37
        }
      ],
      escalas_brasileiras: ["Santos", "Rio de Janeiro", "Buenos Aires", "Itapoá", "Itajaí", "Rio Grande", "Navegantes", "Paranaguá"]
    },
    {
      id: "neoasas_ase",
      nome: "NEOASAS / ASE",
      regiao: "Ásia",
      cobertura: "Costa Leste da América do Sul e Ásia",
      armadores: ["Maersk", "Hapag-Lloyd", "ZIM"],
      escala: "Semanal",
      navios: {
        quantidade: 13,
        capacidade_min: 8700,
        capacidade_max: 11700,
        unidade: "TEUs"
      },
      rota: "Busan » Qingdao » Shanghai » Ningbo » Yantian » Hong Kong » Singapore » Santos » Itapoa » Buenos Aires » Montevideo » Itapoa » Paranagua » Santos » Singapore » Hong Kong",
      portos: [
        {
          nome: "BUSAN",
          importacao_dias: 41,
          exportacao_dias: 38
        },
        {
          nome: "QINGDAO",
          importacao_dias: 40,
          exportacao_dias: 39
        },
        {
          nome: "SHANGHAI",
          importacao_dias: 39,
          exportacao_dias: 41
        },
        {
          nome: "NINGBO",
          importacao_dias: 37,
          exportacao_dias: 43
        },
        {
          nome: "YANTIAN",
          importacao_dias: 35,
          exportacao_dias: 36
        },
        {
          nome: "HONG KONG",
          importacao_dias: 34,
          exportacao_dias: 34
        },
        {
          nome: "SINGAPORE",
          importacao_dias: 28,
          exportacao_dias: 29
        }
      ],
      escalas_brasileiras: ["Santos", "Montevideo", "Buenos Aires", "Itapoá", "Paranaguá"]
    },
    {
      id: "seas2_esa2",
      nome: "SEAS2 / ESA2",
      regiao: "Ásia",
      cobertura: "Costa Leste da América do Sul e Ásia",
      armadores: ["PIL", "COSCO", "CMA CGM", "OOCL", "EVERGREEN", "YANGMING"],
      escala: "Semanal",
      navios: {
        quantidade: 13,
        capacidade_min: 6758,
        capacidade_max: 14000,
        unidade: "TEUs"
      },
      rota: "Tianjin » Qingdao » Shanghai » Ningbo » Shekou » Singapore » Rio de Janeiro » Santos » Paranaguá » Itapoá » Navegantes » Santos » Rio de Janeiro » Colombo » Singapore » Hong Kong » Qingdao",
      portos: [
        {
          nome: "TIANJIN",
          importacao_dias: 40,
          exportacao_dias: 46
        },
        {
          nome: "QINGDAO",
          importacao_dias: 39,
          exportacao_dias: 45
        },
        {
          nome: "SHANGHAI",
          importacao_dias: 37,
          exportacao_dias: 47
        },
        {
          nome: "NINGBO",
          importacao_dias: 35,
          exportacao_dias: 48
        },
        {
          nome: "SHEKOU",
          importacao_dias: 32,
          exportacao_dias: 42
        },
        {
          nome: "HONG KONG",
          importacao_dias: 30,
          exportacao_dias: 40
        },
        {
          nome: "SINGAPORE",
          importacao_dias: 28,
          exportacao_dias: 35
        },
        {
          nome: "COLOMBO",
          importacao_dias: null,
          exportacao_dias: 32
        }
      ],
      escalas_brasileiras: ["Santos", "Rio de Janeiro", "Itapoá", "Paranaguá", "Navegantes"]
    },
    {
      id: "fil2_sx2",
      nome: "FIL2 / SX2",
      regiao: "Ásia",
      cobertura: "Costa Leste da América do Sul e Ásia",
      armadores: ["HMM", "ONE"],
      escala: "Semanal",
      navios: {
        quantidade: 11,
        capacidade_min: 4520,
        capacidade_max: 5014,
        unidade: "TEUs"
      },
      rota: "Busan, Coreia do Sul > Chiwan, Shenzhen, China > Singapura > Rio Grande > Itapoá > Santos > Singapura > Hong Kong",
      portos: [
        {
          nome: "BUSAN",
          importacao_dias: 37,
          exportacao_dias: 38
        },
        {
          nome: "CHIWAN",
          importacao_dias: 32,
          exportacao_dias: 42
        },
        {
          nome: "SHENZHEN",
          importacao_dias: 31,
          exportacao_dias: 43
        },
        {
          nome: "SINGAPURA",
          importacao_dias: 28,
          exportacao_dias: 29
        },
        {
          nome: "HONG KONG",
          importacao_dias: null,
          exportacao_dias: 34
        }
      ],
      escalas_brasileiras: ["Santos", "Itapoá", "Rio Grande"]
    },
    {
      id: "alcat2",
      nome: "ALCAT2",
      regiao: "Cabotagem",
      cobertura: "Costa Brasileira",
      armadores: ["Aliança", "Maersk"],
      escala: "Semanal",
      navios: {
        quantidade: 3,
        capacidade_min: 4800,
        capacidade_max: 5400,
        unidade: "TEUs"
      },
      rota: "Pecém » Salvador » Santos » Itajaí » Rio Grande » Imbituba » Itapoá » Suape » Pecém",
      portos_brasileiros: ["Santos", "Itapoá", "Suape", "Pecem", "Salvador", "Rio Grande", "Imbituba", "Itajaí"]
    },
    {
      id: "alcat3",
      nome: "ALCAT3",
      regiao: "Cabotagem",
      cobertura: "Costa Leste da América do Sul",
      armadores: ["Maersk"],
      escala: "Semanal",
      navios: {
        quantidade: null,
        capacidade: null,
        unidade: "TEUs"
      },
      rota: "Santos » Itapoá » Rosário » Zarate » Santos",
      portos: ["Santos", "Itapoá", "Rosário", "Zarate"]
    },
    {
      id: "braco",
      nome: "BRACO",
      regiao: "Cabotagem",
      cobertura: "Costa Brasileira",
      armadores: ["Mercosul Line", "CMA CGM"],
      escala: "Semanal",
      navios: {
        quantidade: 4,
        capacidade_min: 2478,
        capacidade_max: 3426,
        unidade: "TEUs"
      },
      rotas: [
        "Santos » Itapoá » Rio de Janeiro » Suape » Pecém",
        "Manaus » Suape » Santos"
      ],
      portos_brasileiros: ["Santos", "Rio de Janeiro", "Suape", "Manaus", "Pecém", "Itapoá"]
    },
    {
      id: "marex",
      nome: "MAREX",
      regiao: "Outros Serviços",
      cobertura: "Europa e Costa Leste da América do Sul",
      armadores: ["Mercosul Line"],
      escala: "Mensal",
      tipo: "Cargas gerais"
    }
  ],
  cargas_projeto: {
    servico: "BBC Chartering",
    contato: {
      email: "renata.souza@portoitapoa.com",
      telefone: "(47) 9 9937-0182"
    }
  }
}


export interface Noticia {
  id: number
  slug: string
  titulo: string
  resumo: string
  conteudo: string
  categoria: string
  data: string
  dataPublicacao: Date
  autor: string
  imagem: string
  imagemDestaque?: string
  tags?: string[]
}

export const noticias: Noticia[] = [
  {
    id: 1,
    slug: "porto-itapoa-bate-recorde-movimentacao-2024",
    titulo: "Porto Itapoá Bate Recorde de Movimentação em 2024",
    resumo: "Terminal registra crescimento de 15% na movimentação de contêineres no primeiro semestre.",
    conteudo: `
      <p>O Porto Itapoá alcançou um marco histórico no primeiro semestre de 2024, registrando um crescimento de 15% na movimentação de contêineres em comparação ao mesmo período do ano anterior. Este resultado consolida o terminal como um dos mais eficientes e estratégicos da América Latina.</p>

      <p>De acordo com os dados operacionais, foram movimentados mais de 600 mil TEUs (Twenty-foot Equivalent Unit) entre janeiro e junho, superando todas as projeções iniciais. O desempenho excepcional é atribuído à combinação de investimentos em infraestrutura, tecnologia de ponta e processos otimizados.</p>

      <h3>Principais Fatores do Crescimento</h3>

      <p>O diretor-presidente do Porto Itapoá destacou que diversos fatores contribuíram para este resultado expressivo:</p>

      <ul>
        <li><strong>Modernização dos Equipamentos:</strong> A aquisição de novos portêineres e RTGs (Rubber Tyred Gantry) aumentou significativamente a capacidade operacional.</li>
        <li><strong>Expansão das Linhas de Serviço:</strong> Novas rotas conectando o Brasil aos principais mercados mundiais.</li>
        <li><strong>Eficiência Operacional:</strong> Redução no tempo médio de atracação e desatracação de navios.</li>
        <li><strong>Localização Estratégica:</strong> Proximidade com os principais centros de produção e consumo do Sul e Sudeste brasileiro.</li>
      </ul>

      <h3>Sustentabilidade e Inovação</h3>

      <p>Além do crescimento quantitativo, o Porto Itapoá mantém seu compromisso com a sustentabilidade. Todos os novos equipamentos adquiridos utilizam tecnologias de baixa emissão, e o terminal investe continuamente em energias renováveis e práticas ambientalmente responsáveis.</p>

      <p>"Nosso objetivo não é apenas crescer em volume, mas crescer de forma sustentável e responsável, contribuindo para o desenvolvimento econômico da região sem comprometer o meio ambiente", afirmou o diretor.</p>

      <h3>Perspectivas para o Futuro</h3>

      <p>Para o segundo semestre, as projeções são ainda mais otimistas. Com a entrada de novas linhas de navegação e a ampliação da capacidade de armazenamento, o Porto Itapoá espera consolidar sua posição como um dos principais hubs logísticos da América do Sul.</p>

      <p>Os investimentos previstos para os próximos anos somam mais de R$ 500 milhões, destinados à expansão da infraestrutura, aquisição de equipamentos e implementação de sistemas inteligentes de gestão portuária.</p>
    `,
    categoria: "Operações",
    data: "15 de Dezembro, 2024",
    dataPublicacao: new Date("2024-12-15"),
    autor: "Assessoria de Imprensa",
    imagem: "/downloads.jpg",
    imagemDestaque: "/downloads.jpg",
    tags: ["Recordes", "Operações", "Crescimento"],
  },
  {
    id: 2,
    slug: "nova-linha-servico-conecta-itapoa-asia",
    titulo: "Nova Linha de Serviço Conecta Itapoá à Ásia",
    resumo: "Parceria com grandes armadores amplia conectividade com mercados asiáticos.",
    conteudo: `
      <p>O Porto Itapoá anuncia o início de uma nova linha de serviço regular conectando o terminal aos principais portos asiáticos. A nova rota, operada em parceria com armadores de renome internacional, marca um passo importante na expansão da conectividade global do porto.</p>

      <h3>Detalhes da Nova Rota</h3>

      <p>A linha oferecerá serviços semanais com escalas em:</p>

      <ul>
        <li>Singapura - Principal hub de transbordo da Ásia</li>
        <li>Hong Kong - Gateway para o mercado chinês</li>
        <li>Xangai - Maior porto do mundo</li>
        <li>Busan - Principal porto da Coreia do Sul</li>
      </ul>

      <p>O tempo de trânsito estimado entre Itapoá e Singapura é de aproximadamente 28 dias, posicionando o terminal de forma competitiva no comércio Brasil-Ásia.</p>

      <h3>Impacto no Comércio Exterior</h3>

      <p>Esta nova linha representa uma oportunidade significativa para exportadores e importadores brasileiros, facilitando o acesso aos mercados asiáticos que respondem por uma parcela crescente do comércio exterior brasileiro.</p>

      <p>"A Ásia é um mercado estratégico para o Brasil, e esta nova linha coloca o Porto Itapoá como uma opção competitiva para empresas que buscam eficiência e confiabilidade em suas operações de comércio exterior", destacou o diretor comercial.</p>

      <h3>Armadores Parceiros</h3>

      <p>A operação conta com a participação de armadores líderes mundiais, incluindo Maersk, CMA CGM, COSCO e HMM, garantindo frequência e confiabilidade no serviço.</p>
    `,
    categoria: "Expansão",
    data: "10 de Dezembro, 2024",
    dataPublicacao: new Date("2024-12-10"),
    autor: "Departamento Comercial",
    imagem: "/210302-porto-de-los-angeles-1.jpg",
    tags: ["Expansão", "Ásia", "Linhas Marítimas"],
  },
  {
    id: 3,
    slug: "investimento-sustentabilidade-ambiental",
    titulo: "Investimento em Sustentabilidade Ambiental",
    resumo: "Porto Itapoá anuncia programa de redução de emissões e energia renovável.",
    conteudo: `
      <p>O Porto Itapoá reafirma seu compromisso com a sustentabilidade ambiental através do lançamento de um programa abrangente de redução de emissões e transição para energias renováveis. O investimento total previsto é de R$ 150 milhões nos próximos três anos.</p>

      <h3>Principais Iniciativas</h3>

      <p>O programa contempla diversas frentes de atuação:</p>

      <ul>
        <li><strong>Energia Solar:</strong> Instalação de 10.000 painéis solares que irão gerar 30% da energia consumida pelo terminal.</li>
        <li><strong>Eletrificação da Frota:</strong> Substituição gradual de equipamentos a diesel por versões elétricas.</li>
        <li><strong>Redução de Emissões:</strong> Meta de reduzir em 40% as emissões de CO2 até 2027.</li>
        <li><strong>Gestão de Resíduos:</strong> Implementação de programa de reciclagem e compostagem.</li>
        <li><strong>Preservação da Biodiversidade:</strong> Criação de área de preservação ambiental no entorno do porto.</li>
      </ul>

      <h3>Certificações Ambientais</h3>

      <p>O programa visa obter certificações internacionais de gestão ambiental, incluindo ISO 14001 e EcoPorts, consolidando o Porto Itapoá como referência em sustentabilidade no setor portuário brasileiro.</p>

      <p>"Sustentabilidade não é apenas uma responsabilidade, é uma necessidade estratégica. Clientes e parceiros cada vez mais valorizam operações ambientalmente responsáveis", afirmou a gerente ambiental.</p>

      <h3>Impacto Social</h3>

      <p>Além dos benefícios ambientais, o programa gerará empregos verdes e promoverá a educação ambiental na comunidade local através de parcerias com escolas e universidades da região.</p>
    `,
    categoria: "Sustentabilidade",
    data: "5 de Dezembro, 2024",
    dataPublicacao: new Date("2024-12-05"),
    autor: "Gerência Ambiental",
    imagem: "/foto-porto-patio-1024x721.webp",
    tags: ["Sustentabilidade", "Meio Ambiente", "ESG"],
  },
  {
    id: 4,
    slug: "modernizacao-infraestrutura-portuaria",
    titulo: "Modernização da Infraestrutura Portuária",
    resumo: "Novos equipamentos aumentam eficiência operacional e capacidade de atendimento.",
    conteudo: `
      <p>O Porto Itapoá investe R$ 200 milhões na modernização de sua infraestrutura, com foco na aquisição de equipamentos de última geração e ampliação da capacidade operacional. As obras já estão em andamento e devem ser concluídas no primeiro semestre de 2025.</p>

      <h3>Novos Equipamentos</h3>

      <p>Os principais investimentos incluem:</p>

      <ul>
        <li><strong>4 Super Post-Panamax Cranes:</strong> Portêineres capazes de operar navios de até 24 fileiras de contêineres.</li>
        <li><strong>12 RTGs Elétricos:</strong> Guindastes de pátio com tecnologia de baixa emissão.</li>
        <li><strong>20 Reach Stackers:</strong> Equipamentos para movimentação interna de contêineres.</li>
        <li><strong>Sistema de Automação:</strong> Software de gestão integrada para otimizar todas as operações.</li>
      </ul>

      <h3>Ampliação do Cais</h3>

      <p>Paralelamente à aquisição de equipamentos, o projeto contempla a ampliação do cais em 400 metros, permitindo a atracação simultânea de mais navios e reduzindo o tempo de espera.</p>

      <h3>Tecnologia e Inovação</h3>

      <p>Todos os novos equipamentos contam com sistemas de telemetria e monitoramento em tempo real, permitindo manutenção preditiva e máxima disponibilidade operacional.</p>

      <p>"Esta modernização posiciona o Porto Itapoá entre os terminais mais avançados tecnologicamente da América Latina, preparado para as demandas do comércio global do século XXI", destacou o diretor de operações.</p>
    `,
    categoria: "Infraestrutura",
    data: "28 de Novembro, 2024",
    dataPublicacao: new Date("2024-11-28"),
    autor: "Engenharia",
    imagem: "/48.jpg",
    tags: ["Infraestrutura", "Investimentos", "Modernização"],
  },
  {
    id: 5,
    slug: "certificacao-internacional-qualidade",
    titulo: "Certificação Internacional de Qualidade",
    resumo: "Porto Itapoá recebe certificação ISO 9001:2015 por excelência operacional.",
    conteudo: `
      <p>O Porto Itapoá alcançou mais um importante reconhecimento internacional ao receber a certificação ISO 9001:2015, atestando a excelência de seus processos de gestão da qualidade. A auditoria, conduzida por organismo certificador reconhecido internacionalmente, avaliou todos os aspectos da operação portuária.</p>

      <h3>O que é a ISO 9001:2015</h3>

      <p>A ISO 9001 é a norma internacional para sistemas de gestão da qualidade, sendo reconhecida mundialmente como referência em excelência operacional. A versão 2015 traz requisitos ainda mais rigorosos, com foco em:</p>

      <ul>
        <li>Gestão de riscos e oportunidades</li>
        <li>Foco no cliente e partes interessadas</li>
        <li>Liderança e comprometimento da alta direção</li>
        <li>Melhoria contínua dos processos</li>
        <li>Tomada de decisão baseada em evidências</li>
      </ul>

      <h3>Processo de Certificação</h3>

      <p>O processo de certificação durou seis meses e envolveu toda a equipe do Porto Itapoá. Foram avaliados mais de 100 processos operacionais, desde o planejamento até a execução e monitoramento das atividades.</p>

      <p>"Esta certificação é o resultado do trabalho dedicado de toda nossa equipe. Ela confirma que estamos no caminho certo em nossa busca pela excelência", afirmou o gerente de qualidade.</p>

      <h3>Benefícios para os Clientes</h3>

      <p>A certificação ISO 9001:2015 traz benefícios concretos para os clientes do Porto Itapoá:</p>

      <ul>
        <li>Maior previsibilidade e confiabilidade nas operações</li>
        <li>Redução de não conformidades e retrabalhos</li>
        <li>Melhor comunicação e transparência</li>
        <li>Processos padronizados e documentados</li>
        <li>Foco em melhoria contínua</li>
      </ul>

      <h3>Próximos Passos</h3>

      <p>Com a ISO 9001 conquistada, o Porto Itapoá já trabalha na obtenção de outras certificações importantes, incluindo ISO 14001 (Gestão Ambiental) e ISO 45001 (Saúde e Segurança Ocupacional), consolidando seu sistema integrado de gestão.</p>
    `,
    categoria: "Qualidade",
    data: "20 de Novembro, 2024",
    dataPublicacao: new Date("2024-11-20"),
    autor: "Qualidade e Processos",
    imagem: "/foto-porto-patio-1024x721.webp",
    tags: ["Qualidade", "Certificação", "ISO"],
  },
  {
    id: 6,
    slug: "programa-capacitacao-profissional",
    titulo: "Programa de Capacitação Profissional",
    resumo: "Iniciativa visa formar novos talentos para o setor portuário e logístico.",
    conteudo: `
      <p>O Porto Itapoá lança um programa abrangente de capacitação profissional em parceria com instituições de ensino da região. A iniciativa visa formar novos talentos e aprimorar as competências dos profissionais que já atuam no setor portuário e logístico.</p>

      <h3>Estrutura do Programa</h3>

      <p>O programa está dividido em três pilares principais:</p>

      <ul>
        <li><strong>Cursos Técnicos:</strong> Formação em operação portuária, logística e manutenção de equipamentos.</li>
        <li><strong>Capacitação Continuada:</strong> Atualização profissional para colaboradores atuais.</li>
        <li><strong>Programa de Estágio:</strong> Oportunidades para estudantes universitários.</li>
      </ul>

      <h3>Parcerias Educacionais</h3>

      <p>O programa conta com parcerias estratégicas com:</p>

      <ul>
        <li>SENAI - Cursos técnicos em logística e manutenção</li>
        <li>UFSC - Programa de estágio em engenharia e administração</li>
        <li>Universidades Regionais - Pesquisa e desenvolvimento</li>
        <li>Escolas Técnicas Locais - Formação básica</li>
      </ul>

      <h3>Impacto Social</h3>

      <p>Mais do que formar profissionais qualificados, o programa busca gerar oportunidades para a comunidade local, contribuindo para o desenvolvimento socioeconômico da região.</p>

      <p>"Investir em pessoas é investir no futuro. Queremos formar profissionais capacitados e comprometidos com a excelência operacional", destacou a gerente de recursos humanos.</p>

      <h3>Números do Programa</h3>

      <p>Na fase inicial, o programa oferecerá:</p>

      <ul>
        <li>200 vagas em cursos técnicos</li>
        <li>50 bolsas de estágio</li>
        <li>Capacitação de 500 colaboradores atuais</li>
        <li>Investimento total de R$ 5 milhões</li>
      </ul>
    `,
    categoria: "Educação",
    data: "15 de Novembro, 2024",
    dataPublicacao: new Date("2024-11-15"),
    autor: "Recursos Humanos",
    imagem: "/foto-porto-patio-1024x721.webp",
    tags: ["Educação", "Capacitação", "Desenvolvimento"],
  },
]

export function getNoticiaBySlug(slug: string): Noticia | undefined {
  return noticias.find((noticia) => noticia.slug === slug)
}

export function getNoticiasRecentes(limit: number = 3): Noticia[] {
  return noticias
    .sort((a, b) => b.dataPublicacao.getTime() - a.dataPublicacao.getTime())
    .slice(0, limit)
}

export function getNoticiasByCategoria(categoria: string): Noticia[] {
  if (categoria === "Todas") return noticias
  return noticias.filter((noticia) => noticia.categoria === categoria)
}


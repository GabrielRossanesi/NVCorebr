export type ProductId = "hub" | "med" | "lex";
export interface Product {
  id: ProductId;
  name: string;
  category: string;
  description: string;
  audience: string;
  contentStatus: "awaiting-product-details";
}
export const products: Product[] = [
  {
    id: "hub",
    name: "NV Hub",
    category: "Produto próprio",
    description: "Um produto que nasce no núcleo da NV Core.",
    audience:
      "Aplicação e público serão apresentados com a documentação do produto.",
    contentStatus: "awaiting-product-details",
  },
  {
    id: "med",
    name: "NV Med",
    category: "Tecnologia para saúde",
    description: "Produto próprio da NV Core voltado ao ecossistema de saúde.",
    audience:
      "Para o setor de saúde. Escopo e funcionalidades serão apresentados com a documentação do produto.",
    contentStatus: "awaiting-product-details",
  },
  {
    id: "lex",
    name: "NV Lex",
    category: "Tecnologia para o jurídico",
    description: "Produto próprio da NV Core voltado ao setor jurídico.",
    audience:
      "Para o setor jurídico. Escopo e funcionalidades serão apresentados com a documentação do produto.",
    contentStatus: "awaiting-product-details",
  },
];
export const capabilities = [
  {
    id: "software",
    title: "Software sob medida",
    label: "Sistemas web & SaaS",
    description:
      "Do problema de negócio à arquitetura do sistema. Desenvolvemos software a partir dos processos e das necessidades da sua operação.",
  },
  {
    id: "crm-erp",
    title: "CRM & ERP",
    label: "Gestão empresarial",
    description:
      "Sistemas de gestão adaptados à maneira como a empresa trabalha, conectando processos e informações.",
  },
  {
    id: "web",
    title: "Experiências web",
    label: "Sites & landing pages",
    description:
      "Presença digital com direção de design e engenharia. Sites institucionais e landing pages com clareza, identidade e performance.",
  },
  {
    id: "integrations",
    title: "APIs & integrações",
    label: "Sistemas conectados",
    description:
      "Conexões entre sistemas e plataformas para que dados e processos circulem com consistência.",
  },
  {
    id: "automation",
    title: "Automações",
    label: "Fluxos de trabalho",
    description:
      "Software aplicado a tarefas recorrentes e rotinas operacionais, de acordo com as regras do negócio.",
  },
  {
    id: "platforms",
    title: "Plataformas digitais",
    label: "Portais & ferramentas internas",
    description:
      "Portais, dashboards, produtos SaaS e ferramentas internas construídos para o contexto de cada empresa.",
  },
];
export const processSteps = [
  {
    title: "Discovery",
    description: "Entender o negócio, os usuários e o que precisa mudar.",
  },
  {
    title: "Arquitetura",
    description: "Definir como a solução funciona, se conecta e evolui.",
  },
  {
    title: "Design",
    description: "Traduzir a complexidade em uma experiência clara.",
  },
  {
    title: "Engenharia",
    description: "Transformar decisões em software consistente.",
  },
  {
    title: "Validação",
    description: "Testar fluxos, qualidade e aderência ao problema.",
  },
  {
    title: "Lançamento",
    description: "Preparar a solução para entrar em operação.",
  },
  {
    title: "Evolução",
    description: "Acompanhar o uso e orientar os próximos ciclos.",
  },
];
export interface CaseStudy {
  slug: string;
  title: string;
  client?: string;
  challenge: string;
  solution: string;
  technologies: string[];
  result: string;
  approved: boolean;
}
export const caseStudies: CaseStudy[] = []; // Publish only verified, approved content.

/**
 * ====================================================================
 * ARQUIVO DE CONFIGURAÇÃO · TEXTOS DE EXEMPLO
 * ====================================================================
 * Este arquivo serve para personalizar todos os textos e detalhes da experiência.
 * Os textos abaixo são exemplos genéricos e adaptáveis para qualquer ocasião
 * (homenagem, amizade, aniversário, celebração ou agradecimento).
 */

window.CONFIG = {
  // Nome do destinatário e do remetente (exemplos)
  recipientName: "Alguém Especial",
  senderName: "Seu Nome",

  // Metadados para compartilhamento
  meta: {
    title: "Para Alguém Especial · Modelo Interativo",
    description: "Um modelo elegante e interativo para homenagens e mensagens personalizadas.",
    badge: "Modelo de Demonstração"
  },

  // Data inicial de referência para o contador (pode ser simulada pelo visitante)
  conversationStartDate: "2026-01-01T12:00:00",

  // Configurações de Compartilhamento (Web Share API)
  share: {
    title: "Para Alguém Especial · Modelo Interativo",
    text: "Um modelo elegante e interativo para homenagens e mensagens especiais.",
    url: (typeof window !== "undefined" && window.location) ? window.location.href : ""
  },

  // Configuração do Áudio Ambiente
  audio: {
    title: "Chopin - Nocturne Op. 9 No. 2",
    subtitle: "Piano Solo · Exemplo de Faixa Ambiente",
    src: "https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg",
    fallbackSrc: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },

  // Textos da Tela Inicial (Envelope Digital)
  envelope: {
    eyebrow: "Modelo Interativo",
    title: "Para Alguém Especial.",
    subtitle: "Este é um exemplo de introdução interativa que pode ser personalizada para qualquer pessoa ou ocasião.",
    buttonLabel: "Abrir demonstração"
  },

  // Hero Principal (Cabeçalho da Página)
  hero: {
    tag: "Exemplo de Introdução",
    title: "Criando momentos que marcam.",
    description: "Este é um exemplo de texto de introdução. Aqui você pode escrever uma dedicatória sincera, relembrar momentos marcantes ou celebrar uma amizade, conquista ou homenagem especial."
  },

  // Os 5 Blocos da Bento Grid (Modelos de Exemplo)
  bentoCards: [
    {
      id: "card-impressao",
      gridSpan: "span-2",
      tag: "Exemplo 01",
      title: "Uma memória ou momento marcante",
      content: "Espaço reservado para descrever uma história memorável, uma recordação marcante ou uma mensagem especial sobre a importância dessa pessoa. Este texto serve como demonstração de layout editorial.",
      footerNote: "Exemplo de nota de rodapé"
    },
    {
      id: "card-detalhes",
      gridSpan: "span-1",
      tag: "Exemplo 02",
      title: "Pequenos detalhes e qualidades",
      details: [
        { label: "Qualidade 1", value: "Exemplo de qualidade, talento ou virtude marcante" },
        { label: "Memória 2", value: "Exemplo de piada interna, frase típica ou lembrança" },
        { label: "Preferência 3", value: "Exemplo de gosto musical, café ou assunto favorito" },
        { label: "Vibe 4", value: "Exemplo de impacto positivo no dia a dia das pessoas ao redor" }
      ]
    },
    {
      id: "card-musica",
      gridSpan: "span-1",
      tag: "Trilha Sonora",
      title: "Música Dedicada",
      description: "Exemplo de player de áudio para acompanhar a leitura com uma faixa instrumental ou significativa."
    },
    {
      id: "card-tempo",
      gridSpan: "span-2",
      tag: "Linha do Tempo",
      title: "Contador de tempo decorrido",
      leadText: "Exemplo de contador ao vivo calculando o tempo a partir de uma data especial:",
      footerNote: "Você pode simular qualquer data clicando no botão acima."
    },
    {
      id: "card-fechamento",
      gridSpan: "span-3",
      tag: "Exemplo Final",
      title: "Mensagem de encerramento",
      content: "Espaço reservado para o fechamento da homenagem: votos de felicidade, agradecimentos sinceros, votos de sucesso ou um convite para celebrar pessoalmente. Um espaço dedicado a palavras autênticas.",
      signoff: "Com carinho,",
      author: "Seu Nome"
    }
  ]
};

# Para Alguém Especial ✦

Um site editorial de presente interativo, desenhado com estética refinada no estilo **Apple Human Interface Guidelines**, **Utilitarian Minimalist UI** e **Editorial Typography**.

---

## ✨ Funcionalidades

* **Estética Apple & Editorial:** Tipografia com alto contraste (*Instrument Serif* e *Newsreader*), espaçamento calculado e paleta quente minimalista.
* **Tema Adaptativo:** Suporte a **Light Mode** (*Warm Bone Editorial*) e **Dark Mode** (*Apple Liquid Glass*) com detecção automática do sistema e alternador no topo.
* **Envelope Digital:** Tela de entrada sutil com micro-animação para criar suspense e preparar a experiência.
* **Bento Grid Interativa:**
  * Memória ou momento marcante em destaque editorial.
  * Cartão de qualidades e detalhes observados.
  * Mini player de áudio ambiente com visualizer de equalizador.
  * **Contador de tempo ao vivo com Simulador:** O visitante pode selecionar uma data personalizada e ver os dias/horas/segundos calcularem ao vivo.
  * Mensagem de encerramento e dedicatória.
* **Compartilhamento Nativo com Toast:** Aciona a *Web Share API* em dispositivos móveis ou copia o link com notificação flutuante no desktop.

---

## 📁 Estrutura de Arquivos

```text
├── index.html          # Estrutura HTML5 semântica e acessível
├── style.css           # Design system com variáveis CSS e temas
├── script.js           # Lógica do envelope, tema, áudio e simulador
├── config.js           # Central de personalização (textos, datas, áudio)
└── README.md           # Documentação
```

---

## ⚙️ Como Personalizar (`config.js`)

Abra o arquivo [`config.js`](config.js) para alterar:
* `recipientName`: Nome do destinatário.
* `senderName`: Seu nome/assinatura.
* `conversationStartDate`: Data inicial de referência para o contador.
* `bentoCards`: Textos, detalhes e títulos dos cartões.
* `audio`: Faixa de áudio ambiente (arquivo local ou link externo).

---

## 🚀 Como Publicar no Netlify

Como o projeto é construído em **Modern Vanilla Web** (sem build complexo), o deploy é imediato:

1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop).
2. Faça login e arraste a pasta do projeto diretamente para a tela.
3. Seu site estará no ar em instantes com um link público!

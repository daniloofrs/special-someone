/**
 * ====================================================================
 * SPECIAL SOMEONE · SCRIPT PRINCIPAL
 * ====================================================================
 * Orquestra o Envelope Digital, Gerenciamento de Tema (Apple Light/Dark),
 * Player de Áudio Ambiente, Contador em Tempo Real com Simulador Interativo,
 * e Compartilhamento com Toast estilo Apple.
 */

(function () {
  'use strict';

  // Obter configurações do config.js
  const cfg = window.CONFIG || {};

  // Elementos do DOM
  const elements = {
    // Envelope
    envelopeGate: document.getElementById('envelope-gate'),
    openEnvelopeBtn: document.getElementById('open-envelope-btn'),
    envBadge: document.getElementById('env-badge'),
    envTitle: document.getElementById('env-title'),
    envSubtitle: document.getElementById('env-subtitle'),
    envBtnLabel: document.getElementById('env-btn-label'),

    // Header & Tema
    headerBrand: document.getElementById('header-brand'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    sunIcon: document.querySelector('.sun-icon'),
    moonIcon: document.querySelector('.moon-icon'),

    // Hero
    heroTag: document.getElementById('hero-tag'),
    heroTitle: document.getElementById('hero-title'),
    heroDesc: document.getElementById('hero-desc'),

    // Bento Cards
    detailsListContainer: document.getElementById('details-list-container'),
    timeLeadText: document.getElementById('time-lead-text'),
    timeFooterNote: document.getElementById('time-footer-note'),
    countDays: document.getElementById('count-days'),
    countHours: document.getElementById('count-hours'),
    countMinutes: document.getElementById('count-minutes'),
    countSeconds: document.getElementById('count-seconds'),
    simulateDateBtn: document.getElementById('simulate-date-btn'),
    simulateDateInput: document.getElementById('simulate-date-input'),
    resetDateBtn: document.getElementById('reset-date-btn'),

    // Áudio
    audioElement: document.getElementById('ambient-audio'),
    audioCard: document.getElementById('card-musica'),
    audioPlayBtn: document.getElementById('audio-play-btn'),
    audioTitle: document.getElementById('audio-title'),
    audioSubtitle: document.getElementById('audio-subtitle'),
    audioStatusText: document.getElementById('audio-status-text'),
    playIcon: document.querySelector('.play-icon'),
    pauseIcon: document.querySelector('.pause-icon'),

    // Fechamento & Compartilhamento
    closingContent: document.getElementById('closing-content'),
    signatureAuthor: document.getElementById('signature-author'),
    shareActionBtn: document.getElementById('share-action-btn'),
    toastNotification: document.getElementById('toast-notification'),
    footerYear: document.getElementById('footer-year')
  };

  /**
   * 1. HIDRATAÇÃO DO CONTEÚDO COM BASE NO CONFIG.JS
   */
  function hydrateContent() {
    // Meta / Document Title
    if (cfg.meta && cfg.meta.title) {
      document.title = cfg.meta.title;
    }

    // Header Brand
    if (elements.headerBrand) {
      elements.headerBrand.textContent = cfg.recipientName || 'Para Alguém Especial';
    }

    // Envelope Gate
    if (cfg.envelope) {
      if (elements.envBadge && cfg.meta && cfg.meta.badge) elements.envBadge.textContent = cfg.meta.badge;
      if (elements.envTitle && cfg.envelope.title) elements.envTitle.textContent = cfg.envelope.title;
      if (elements.envSubtitle && cfg.envelope.subtitle) elements.envSubtitle.textContent = cfg.envelope.subtitle;
      if (elements.envBtnLabel && cfg.envelope.buttonLabel) elements.envBtnLabel.textContent = cfg.envelope.buttonLabel;
    }

    // Hero
    if (cfg.hero) {
      if (elements.heroTag && cfg.hero.tag) elements.heroTag.textContent = cfg.hero.tag;
      if (elements.heroTitle && cfg.hero.title) elements.heroTitle.textContent = cfg.hero.title;
      if (elements.heroDesc && cfg.hero.description) elements.heroDesc.textContent = cfg.hero.description;
    }

    // Card 1: Memória / Impressão
    const impressaoCard = (cfg.bentoCards || []).find(c => c.id === 'card-impressao');
    if (impressaoCard) {
      const cardEl = document.getElementById('card-impressao');
      if (cardEl) {
        const titleEl = cardEl.querySelector('.card-title');
        const bodyEl = cardEl.querySelector('.card-body');
        const tagEl = cardEl.querySelector('.card-tag');
        if (titleEl && impressaoCard.title) titleEl.textContent = impressaoCard.title;
        if (bodyEl && impressaoCard.content) bodyEl.textContent = impressaoCard.content;
        if (tagEl && impressaoCard.tag) tagEl.textContent = impressaoCard.tag;
      }
    }

    // Detalhes Observados (Card 2)
    const detalhesCard = (cfg.bentoCards || []).find(c => c.id === 'card-detalhes');
    if (detalhesCard && detalhesCard.details && elements.detailsListContainer) {
      const cardEl = document.getElementById('card-detalhes');
      if (cardEl) {
        const titleEl = cardEl.querySelector('.card-title');
        const tagEl = cardEl.querySelector('.card-tag');
        if (titleEl && detalhesCard.title) titleEl.textContent = detalhesCard.title;
        if (tagEl && detalhesCard.tag) tagEl.textContent = detalhesCard.tag;
      }
      elements.detailsListContainer.innerHTML = '';
      detalhesCard.details.forEach(item => {
        const li = document.createElement('li');
        li.className = 'detail-item';
        li.innerHTML = `
          <span class="detail-label">${escapeHtml(item.label)}</span>
          <span class="detail-value">${escapeHtml(item.value)}</span>
        `;
        elements.detailsListContainer.appendChild(li);
      });
    }

    // Áudio Info (Card 3)
    if (cfg.audio) {
      if (elements.audioTitle && cfg.audio.title) elements.audioTitle.textContent = cfg.audio.title;
      if (elements.audioSubtitle && cfg.audio.subtitle) elements.audioSubtitle.textContent = cfg.audio.subtitle;
      if (elements.audioElement && cfg.audio.src) {
        elements.audioElement.src = cfg.audio.src;
      }
    }

    // Card 4: Contador de Tempo
    const tempoCard = (cfg.bentoCards || []).find(c => c.id === 'card-tempo');
    if (tempoCard) {
      const cardEl = document.getElementById('card-tempo');
      if (cardEl) {
        const titleEl = cardEl.querySelector('.card-title');
        const tagEl = cardEl.querySelector('.card-tag');
        if (titleEl && tempoCard.title) titleEl.textContent = tempoCard.title;
        if (tagEl && tempoCard.tag) tagEl.textContent = tempoCard.tag;
      }
      if (elements.timeLeadText && tempoCard.leadText) elements.timeLeadText.textContent = tempoCard.leadText;
      if (elements.timeFooterNote && tempoCard.footerNote) elements.timeFooterNote.textContent = tempoCard.footerNote;
    }

    // Card 5: Fechamento
    const fechamentoCard = (cfg.bentoCards || []).find(c => c.id === 'card-fechamento');
    if (fechamentoCard) {
      const cardEl = document.getElementById('card-fechamento');
      if (cardEl) {
        const titleEl = cardEl.querySelector('.card-title');
        const tagEl = cardEl.querySelector('.card-tag');
        if (titleEl && fechamentoCard.title) titleEl.textContent = fechamentoCard.title;
        if (tagEl && fechamentoCard.tag) tagEl.textContent = fechamentoCard.tag;
      }
      if (elements.closingContent && fechamentoCard.content) {
        elements.closingContent.textContent = fechamentoCard.content;
      }
    }
    if (elements.signatureAuthor && cfg.senderName) {
      elements.signatureAuthor.textContent = cfg.senderName;
    }

    // Ano no rodapé
    if (elements.footerYear) {
      elements.footerYear.textContent = new Date().getFullYear();
    }
  }

  /**
   * 2. SISTEMA DE TEMA (APPLE LIGHT / DARK MODE)
   */
  const THEME_STORAGE_KEY = 'special_someone_theme';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });

    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.addEventListener('click', toggleTheme);
    }
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (elements.sunIcon) elements.sunIcon.style.display = 'block';
      if (elements.moonIcon) elements.moonIcon.style.display = 'none';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (elements.sunIcon) elements.sunIcon.style.display = 'none';
      if (elements.moonIcon) elements.moonIcon.style.display = 'block';
    }
  }

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    applyTheme(newTheme);
  }

  /**
   * 3. ABERTURA DO ENVELOPE DIGITAL
   */
  function initEnvelope() {
    if (!elements.openEnvelopeBtn || !elements.envelopeGate) return;

    elements.openEnvelopeBtn.addEventListener('click', () => {
      elements.envelopeGate.classList.add('is-opened');

      if (elements.audioElement) {
        elements.audioElement.load();
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * 4. PLAYER DE ÁUDIO AMBIENTE
   */
  function initAudioPlayer() {
    if (!elements.audioPlayBtn || !elements.audioElement) return;

    let isPlaying = false;

    elements.audioElement.addEventListener('error', () => {
      if (cfg.audio && cfg.audio.fallbackSrc && elements.audioElement.src !== cfg.audio.fallbackSrc) {
        console.warn('Áudio primário indisponível. Alternando para fallback...');
        elements.audioElement.src = cfg.audio.fallbackSrc;
        elements.audioElement.load();
      } else {
        if (elements.audioStatusText) {
          elements.audioStatusText.textContent = 'Áudio indisponível';
        }
      }
    });

    elements.audioPlayBtn.addEventListener('click', () => {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    });

    function playAudio() {
      elements.audioElement.play().then(() => {
        isPlaying = true;
        if (elements.audioCard) elements.audioCard.classList.add('is-playing');
        if (elements.playIcon) elements.playIcon.style.display = 'none';
        if (elements.pauseIcon) elements.pauseIcon.style.display = 'block';
        if (elements.audioStatusText) elements.audioStatusText.textContent = 'Reproduzindo agora';
      }).catch((err) => {
        console.warn('Reprodução bloqueada pelo navegador:', err);
        if (elements.audioStatusText) elements.audioStatusText.textContent = 'Toque novamente para iniciar';
      });
    }

    function pauseAudio() {
      elements.audioElement.pause();
      isPlaying = false;
      if (elements.audioCard) elements.audioCard.classList.remove('is-playing');
      if (elements.playIcon) elements.playIcon.style.display = 'block';
      if (elements.pauseIcon) elements.pauseIcon.style.display = 'none';
      if (elements.audioStatusText) elements.audioStatusText.textContent = 'Pausado';
    }

    elements.audioElement.addEventListener('ended', () => {
      pauseAudio();
    });
  }

  /**
   * 5. CONTADOR DE TEMPO MONOSPACE & SIMULADOR INTERATIVO
   */
  function initTimeCounter() {
    let activeStartDate = new Date(cfg.conversationStartDate || '2026-09-01T20:30:00');
    let timerId = null;

    function renderTime() {
      const now = new Date();
      const diffMs = now - activeStartDate;

      if (isNaN(activeStartDate.getTime()) || diffMs < 0) {
        if (elements.countDays) elements.countDays.textContent = '00';
        if (elements.countHours) elements.countHours.textContent = '00';
        if (elements.countMinutes) elements.countMinutes.textContent = '00';
        if (elements.countSeconds) elements.countSeconds.textContent = '00';
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      if (elements.countDays) elements.countDays.textContent = String(days).padStart(2, '0');
      if (elements.countHours) elements.countHours.textContent = String(hours).padStart(2, '0');
      if (elements.countMinutes) elements.countMinutes.textContent = String(minutes).padStart(2, '0');
      if (elements.countSeconds) elements.countSeconds.textContent = String(seconds).padStart(2, '0');
    }

    renderTime();
    timerId = setInterval(renderTime, 1000);

    // Micro-interação: Simulador de data personalizada
    if (elements.simulateDateBtn && elements.simulateDateInput) {
      elements.simulateDateBtn.addEventListener('click', () => {
        if (typeof elements.simulateDateInput.showPicker === 'function') {
          try {
            elements.simulateDateInput.showPicker();
          } catch (e) {
            elements.simulateDateInput.focus();
            elements.simulateDateInput.click();
          }
        } else {
          elements.simulateDateInput.focus();
          elements.simulateDateInput.click();
        }
      });

      elements.simulateDateInput.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val) {
          const selectedDate = new Date(val);
          if (!isNaN(selectedDate.getTime())) {
            activeStartDate = selectedDate;
            if (elements.timeLeadText) {
              elements.timeLeadText.textContent = 'Simulação ativa a partir da sua data escolhida:';
            }
            if (elements.resetDateBtn) {
              elements.resetDateBtn.style.display = 'inline-block';
            }
            renderTime();
          }
        }
      });
    }

    // Restaurar data original de demonstração
    if (elements.resetDateBtn) {
      elements.resetDateBtn.addEventListener('click', () => {
        activeStartDate = new Date(cfg.conversationStartDate || '2026-09-01T20:30:00');
        if (elements.simulateDateInput) elements.simulateDateInput.value = '';
        if (elements.timeLeadText) {
          const defaultLead = (cfg.bentoCards && cfg.bentoCards.find(c => c.id === 'card-tempo')?.leadText) || 'Exemplo de contador ao vivo calculando o tempo a partir de uma data especial:';
          elements.timeLeadText.textContent = defaultLead;
        }
        elements.resetDateBtn.style.display = 'none';
        renderTime();
      });
    }
  }

  /**
   * 6. COMPARTILHAMENTO & TOAST ESTILO APPLE
   */
  function initShare() {
    if (!elements.shareActionBtn) return;

    let toastTimeout = null;

    function triggerToast(message) {
      if (!elements.toastNotification) return;

      if (message) {
        const span = elements.toastNotification.querySelector('span');
        if (span) span.textContent = message;
      }

      elements.toastNotification.classList.add('is-visible');
      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        elements.toastNotification.classList.remove('is-visible');
      }, 3200);
    }

    function copyToClipboardFallback() {
      const shareUrl = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          triggerToast('Link copiado para a área de transferência!');
        }).catch(() => {
          fallbackExecCopy(shareUrl);
        });
      } else {
        fallbackExecCopy(shareUrl);
      }
    }

    function fallbackExecCopy(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        triggerToast('Link copiado para a área de transferência!');
      } catch (err) {
        triggerToast('Copie o endereço da barra do navegador.');
      }
      document.body.removeChild(textarea);
    }

    elements.shareActionBtn.addEventListener('click', () => {
      const shareData = {
        title: (cfg.share && cfg.share.title) || document.title,
        text: (cfg.share && cfg.share.text) || 'Um modelo elegante e interativo para homenagens e mensagens especiais.',
        url: window.location.href
      };

      if (navigator.share) {
        navigator.share(shareData).catch((err) => {
          // Se o usuário não cancelou explicitamente, copiar link como fallback
          if (err.name !== 'AbortError') {
            copyToClipboardFallback();
          }
        });
      } else {
        copyToClipboardFallback();
      }
    });
  }

  /**
   * Utilitário para escapar caracteres HTML em strings dinâmicas
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * INICIALIZAÇÃO GERAL
   */
  document.addEventListener('DOMContentLoaded', () => {
    hydrateContent();
    initTheme();
    initEnvelope();
    initAudioPlayer();
    initTimeCounter();
    initShare();
  });

})();

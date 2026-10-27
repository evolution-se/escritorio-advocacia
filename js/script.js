/* ============================================================
   Albuquerque & Menezes Advogados Associados — script.js
   ============================================================ */

const WHATSAPP_NUMBER = "5500900000000";
const PHONE_DISPLAY = "(00) 0000-0000";
const PHONE_TEL = "0000000000";
const EMAIL = "contato@exemplo-escritorio.com.br";

function whatsappLink(message) {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

const MSG = {
  default: "Olá! Gostaria de agendar uma consulta inicial.",
  area: (area) => "Olá! Gostaria de conversar sobre uma questão de " + area + ".",
  team: "Olá! Gostaria de falar com a equipe do escritório.",
  faq: "Olá! Tenho uma dúvida e gostaria de falar com o escritório.",
  ctaFinal: "Olá! Gostaria de receber orientação sobre minha situação.",
};

function initHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 60) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initActiveLink() {
  const links = document.querySelectorAll(".navbar .nav-link");
  const sections = [];
  links.forEach((l) => {
    const id = l.getAttribute("href");
    if (id && id.startsWith("#") && id.length > 1) {
      const el = document.querySelector(id);
      if (el) sections.push({ link: l, el });
    }
  });
  if (!sections.length) return;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const item = sections.find((s) => s.el === e.target);
        if (item && e.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          item.link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );
  sections.forEach((s) => obs.observe(s.el));
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach((e) => e.classList.add("is-visible"));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((e) => obs.observe(e));
}

function initMobileMenu() {
  const toggler = document.querySelector(".navbar-toggler");
  const collapse = document.querySelector(".navbar-collapse");
  document.querySelectorAll(".navbar .nav-link, .header-cta").forEach((a) => {
    a.addEventListener("click", () => {
      if (collapse && collapse.classList.contains("show")) {
        if (toggler) toggler.click();
      }
    });
  });
}
function initAreaFilters() {
  const chips = document.querySelectorAll(".filter-chip");
  const cards = document.querySelectorAll(".area-card-wrap");
  if (!chips.length) return;
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const filter = chip.getAttribute("data-filter");
      cards.forEach((card) => {
        const cats = (card.getAttribute("data-cats") || "").split(",");
        const show = filter === "all" || cats.indexOf(filter) !== -1;
        card.style.display = show ? "" : "none";
      });
    });
  });
}

function initAreaModals() {
  const modal = document.getElementById("areaModal");
  if (!modal) return;
  modal.addEventListener("show.bs.modal", (event) => {
    const btn = event.relatedTarget;
    if (!btn) return;
    const area = btn.getAttribute("data-area");
    const data = AREA_DATA[area];
    if (!data) return;
    modal.querySelector(".modal-title").textContent = data.title;
    modal.querySelector(".modal-body").innerHTML = data.body;
    const cta = modal.querySelector(".modal-whatsapp");
    if (cta) {
      cta.href = whatsappLink(MSG.area(data.areaName));
      cta.target = "_blank";
      cta.rel = "noopener noreferrer";
    }
  });
}


const AREA_DATA = {
  familia: { areaName: "Direito de Família e Sucessões", title: "Direito de Família e Sucessões", body: "<p>Atuamos em situações que envolvem relações familiares e sucessórias, com atenção à dimensão humana de cada caso.</p><h4>Situações atendidas</h4><ul><li>Divórcio consensual e litigioso</li><li>Guarda e regulamentação de convivência</li><li>Pensão alimentícia</li><li>Inventário e partilha de bens</li><li>Planejamento sucessório</li></ul><p>As possibilidades jurídicas são analisadas individualmente, conforme a situação apresentada.</p>" },
  civil: { areaName: "Direito Civil", title: "Direito Civil", body: "<p>Orientação em questões patrimoniais e contratuais, com foco na prevenção de conflitos e na segurança jurídica.</p><h4>Situações atendidas</h4><ul><li>Elaboração e revisão de contratos</li><li>Responsabilidade civil</li><li>Direitos reais e posse</li><li>Questões patrimoniais</li></ul><p>A análise considera o contexto e os objetivos de cada cliente.</p>" },
  consumidor: { areaName: "Direito do Consumidor", title: "Direito do Consumidor", body: "<p>Assessoria em relações de consumo, com orientação sobre direitos e formas adequadas de reclamação.</p><h4>Situações atendidas</h4><ul><li>Cobranças indevidas</li><li>Vícios de produtos e serviços</li><li>Cancelamentos e renegociações</li><li>Reclamações formais junto a fornecedores</li></ul><p>Buscamos soluções adequadas a cada situação, sem promessa de resultado.</p>" },
  trabalhista: { areaName: "Direito Trabalhista", title: "Direito Trabalhista", body: "<p>Atuação em relações de trabalho, tanto para trabalhadores quanto para empregadores, de forma preventiva e contenciosa.</p><h4>Situações atendidas</h4><ul><li>Rescisão e verbas trabalhistas</li><li>Assédio e condições de trabalho</li><li>Assessoria preventiva a empresas</li><li>Acordos e mediações</li></ul><p>Cada caso é analisado conforme suas particularidades.</p>" },
  previdenciario: { areaName: "Direito Previdenciário", title: "Direito Previdenciário", body: "<p>Orientação sobre benefícios previdenciários e revisões junto ao INSS.</p><h4>Situações atendidas</h4><ul><li>Aposentadorias</li><li>Benefícios por incapacidade</li><li>Pensão por morte</li><li>Revisões de benefícios</li></ul><p>As possibilidades são avaliadas conforme a situação individual.</p>" },
  empresarial: { areaName: "Direito Empresarial", title: "Direito Empresarial", body: "<p>Assessoria jurídica para empresas, com foco na prevenção de riscos e na segurança das operações.</p><h4>Situações atendidas</h4><ul><li>Constituição e alteração de empresas</li><li>Contratos comerciais</li><li>Consultoria preventiva</li><li>Reorganizações societárias</li></ul><p>O atendimento é adaptado à realidade de cada negócio.</p>" },
  imobiliario: { areaName: "Direito Imobiliário", title: "Direito Imobiliário", body: "<p>Orientação em transações e questões imobiliárias, com atenção aos detalhes contratuais.</p><h4>Situações atendidas</h4><ul><li>Compra e venda de imóveis</li><li>Locação e despejo</li><li>Regularização de imóveis</li><li>Contratos imobiliários</li></ul><p>A análise considera os riscos e as particularidades de cada operação.</p>" },
  tributario: { areaName: "Direito Tributário", title: "Direito Tributário", body: "<p>Consultoria e planejamento tributário para pessoas físicas e jurídicas.</p><h4>Situações atendidas</h4><ul><li>Planejamento tributário</li><li>Consultoria fiscal</li><li>Contestação de lançamentos</li><li>Orientação sobre obrigações acessórias</li></ul><p>As soluções são avaliadas conforme a legislação aplicável e a situação do cliente.</p>" },
};

function initArticleModals() {
  const modal = document.getElementById("articleModal");
  if (!modal) return;
  modal.addEventListener("show.bs.modal", (event) => {
    const btn = event.relatedTarget;
    if (!btn) return;
    const key = btn.getAttribute("data-article");
    const data = ARTICLE_DATA[key];
    if (!data) return;
    modal.querySelector(".modal-title").textContent = data.title;
    modal.querySelector(".modal-body").innerHTML = data.body;
  });
}


const ARTICLE_DATA = {
  consulta: { title: "O que levar à primeira consulta com um advogado de família", body: "<p>A primeira consulta é um momento de esclarecimento. Levar documentos e informações organizadas ajuda a tornar a análise mais precisa.</p><p>É útil reunir documentos pessoais, certidões, comprovantes de renda, documentos dos filhos e qualquer documento relacionado à situação, como contratos ou notificações.</p><p>Também é importante anotar dúvidas e objetivos antes do atendimento, para que a conversa seja produtiva.</p><p>Esse conteúdo é informativo e não substitui a análise individualizada do caso por um profissional.</p>" },
  aluguel: { title: "Contrato de aluguel: pontos de atenção antes de assinar", body: "<p>Um contrato de locação bem elaborado reduz riscos para ambas as partes. Antes de assinar, é importante verificar cláusulas sobre prazo, reajuste, multa, garantias e responsabilidades.</p><p>Atenção especial deve ser dada às condições de rescisão antecipada e aos encargos que cabem a cada parte.</p><p>A análise de um contrato específico deve ser feita por um profissional, considerando o contexto e a legislação aplicável.</p><p>Este texto tem caráter informativo e não constitui consultoria jurídica.</p>" },
  consumidor: { title: "Direitos do consumidor: como registrar uma reclamação formalmente", body: "<p>Quando um problema de consumo não é resolvido diretamente com o fornecedor, é possível registrar reclamação formal junto a canais institucionais, mantendo registros e prazos.</p><p>Guardar protocolos, e-mails e comprovantes fortalece a posição do consumidor e facilita a análise do caso.</p><p>Cada situação possui particularidades, e a orientação adequada depende da análise individual.</p><p>Conteúdo informativo, sem caráter de consultoria jurídica individual.</p>" },
};


function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const feedback = document.getElementById("formFeedback");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    const name = form.querySelector("#cName");
    const phone = form.querySelector("#cPhone");
    const area = form.querySelector("#cArea");
    const msg = form.querySelector("#cMessage");
    const consent = form.querySelector("#cConsent");
    [name, phone, area, msg].forEach((f) => {
      if (!f.value.trim()) { f.classList.add("is-invalid"); valid = false; }
      else f.classList.remove("is-invalid");
    });
    if (!consent.checked) { consent.classList.add("is-invalid"); valid = false; }
    else consent.classList.remove("is-invalid");
    if (!valid) {
      if (feedback) {
        feedback.textContent = "Por favor, preencha os campos obrigatórios e aceite o consentimento.";
        feedback.classList.remove("d-none");
      }
      return;
    }
    if (feedback) feedback.classList.add("d-none");
    const text =
      "Olá! Preenchi o formulário de contato do site.\n" +
      "Nome: " + name.value.trim() + "\n" +
      "Telefone: " + phone.value.trim() + "\n" +
      "Área de interesse: " + area.value + "\n" +
      "Mensagem: " + msg.value.trim();
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  });
}

function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;
  const onScroll = () => {
    if (window.scrollY > 400) btn.classList.add("is-visible");
    else btn.classList.remove("is-visible");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  onScroll();
}

function initFabWhatsapp() {
  const fab = document.querySelector(".fab-whatsapp");
  if (!fab) return;
  const onScroll = () => {
    if (window.scrollY > 200) fab.classList.add("is-visible");
    else fab.classList.remove("is-visible");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initActiveLink();
  initReveal();
  initMobileMenu();
  initAreaFilters();
  initAreaModals();
  initArticleModals();
  initContactForm();
  initBackToTop();
  initFabWhatsapp();
  initYear();

  const setWA = (sel, msg) => {
    document.querySelectorAll(sel).forEach((a) => {
      a.href = whatsappLink(msg);
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });
  };
  setWA("[data-wa='default']", MSG.default);
  setWA("[data-wa='team']", MSG.team);
  setWA("[data-wa='faq']", MSG.faq);
  setWA("[data-wa='ctaFinal']", MSG.ctaFinal);
});


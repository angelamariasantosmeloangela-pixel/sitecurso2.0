import React, { useMemo, useState } from "react";
import {
  Search,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
  Filter,
  Star,
  Moon,
  Sun,
  Heart,
  X,
  Cpu,
  BadgeCheck,
} from "lucide-react";

const providers = [
  {
    id: 1,
    nome: "Fundação Bradesco - Escola Virtual",
    tipo: "Gratuito",
    certificado: "Certificado gratuito com validação",
    certificadoTipo: "gratuito",
    confianca: "Instituição reconhecida",
    area: ["Tecnologia", "Administração", "Produtividade", "Educação"],
    destaque: "Cursos livres online com emissão de certificado e validação digital.",
    link: "https://www.ev.org.br/",
    cursos: ["Excel", "Lógica de Programação", "Educação Financeira", "Administração"],
    nota: 4.9,
    descricaoLonga:
      "Ótima plataforma para começar sem pagar nada. Tem cursos bem conhecidos e certificados valorizados para currículo e horas complementares.",
  },
  {
    id: 2,
    nome: "Sebrae",
    tipo: "Gratuito e pago",
    certificado: "Certificado disponível em diversos cursos",
    certificadoTipo: "misto",
    confianca: "Referência em empreendedorismo",
    area: ["Negócios", "Marketing", "Gestão", "Empreendedorismo"],
    destaque: "Ótimo pra quem quer aprender a empreender e fortalecer o currículo.",
    link: "https://sebrae.com.br/",
    cursos: ["Empreendedorismo", "Marketing Digital", "Gestão Financeira", "Vendas"],
    nota: 4.8,
    descricaoLonga:
      "Muito forte para quem quer aprender sobre negócios, vendas, marketing e gestão com linguagem prática e direta.",
  },
  {
    id: 3,
    nome: "SENAI Play",
    tipo: "Baixo custo e gratuitos em alguns casos",
    certificado: "Certificado em cursos elegíveis",
    certificadoTipo: "misto",
    confianca: "Muito forte na área técnica",
    area: ["Indústria", "Automação", "Mecânica", "TI"],
    destaque: "Perfeito pra quem curte cursos técnicos e áreas industriais.",
    link: "https://play.senai.br/",
    cursos: ["Automação", "Qualidade", "Desenho Mecânico", "Segurança do Trabalho"],
    nota: 4.7,
    descricaoLonga:
      "Excelente para quem gosta de área técnica, indústria, robótica, automação e cursos com pegada mais profissionalizante.",
  },
  {
    id: 4,
    nome: "Coursera",
    tipo: "Gratuito para estudar / certificado geralmente pago",
    certificado: "Professional Certificates e certificados por curso",
    certificadoTipo: "pago",
    confianca: "Universidades e empresas grandes",
    area: ["Tecnologia", "Dados", "IA", "Marketing", "Carreira"],
    destaque: "Tem cursos de empresas como Google, IBM e Meta.",
    link: "https://www.coursera.org/",
    cursos: ["Google Cybersecurity", "Marketing Digital", "Data Analytics", "Python"],
    nota: 4.9,
    descricaoLonga:
      "Ideal para quem quer conteúdo internacional, trilhas profissionais e cursos com empresas grandes e universidades famosas.",
  },
  {
    id: 5,
    nome: "Kultivi",
    tipo: "Gratuito",
    certificado: "Certificado em cursos selecionados",
    certificadoTipo: "gratuito",
    confianca: "Popular entre estudantes brasileiros",
    area: ["Idiomas", "ENEM", "Direito", "Carreira"],
    destaque: "Muito bom pra quem quer estudar idiomas e reforçar matérias.",
    link: "https://kultivi.com/",
    cursos: ["Inglês", "Espanhol", "ENEM", "Oratória"],
    nota: 4.6,
    descricaoLonga:
      "Boa pedida pra estudantes que querem treinar idiomas, reforçar matérias e melhorar comunicação sem gastar.",
  },
  {
    id: 6,
    nome: "FGV Educação Executiva",
    tipo: "Gratuito",
    certificado: "Certificado em cursos gratuitos elegíveis",
    certificadoTipo: "gratuito",
    confianca: "Instituição muito respeitada",
    area: ["Gestão", "Economia", "Direito", "Marketing"],
    destaque: "Ideal pra quem quer peso de instituição forte no currículo.",
    link: "https://educacao-executiva.fgv.br/cursos/gratuitos",
    cursos: ["Gestão", "Marketing", "Finanças", "Direito"],
    nota: 4.8,
    descricaoLonga:
      "Boa opção para currículo mais forte, com nome conhecido e cursos voltados para gestão, negócios e carreira.",
  },
];

const areas = [
  "Todas",
  "Tecnologia",
  "Negócios",
  "Indústria",
  "IA",
  "Carreira",
  "Educação",
  "Marketing",
  "Idiomas",
  "Direito",
];

const certificadoTipos = ["Todos", "gratuito", "misto", "pago"];

function Badge({ children, variant = "default", darkMode = true }) {
  const palette = darkMode
    ? {
        default: "border-white/10 bg-white/5 text-slate-200",
        cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
        green: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
        yellow: "border-amber-400/30 bg-amber-400/10 text-amber-300",
        pink: "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300",
      }
    : {
        default: "border-slate-200 bg-slate-100 text-slate-700",
        cyan: "border-cyan-200 bg-cyan-50 text-cyan-700",
        green: "border-emerald-200 bg-emerald-50 text-emerald-700",
        yellow: "border-amber-200 bg-amber-50 text-amber-700",
        pink: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700",
      };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${palette[variant]}`}
    >
      {children}
    </span>
  );
}

function DetailsModal({ provider, onClose, darkMode, favorite, onToggleFavorite }) {
  if (!provider) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-2xl rounded-[28px] border p-6 shadow-2xl ${
          darkMode ? "border-white/10 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-900"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute right-4 top-4 rounded-full p-2 transition ${
            darkMode ? "bg-white/5 text-white hover:bg-white/10" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pr-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="cyan" darkMode={darkMode}>
              {provider.tipo}
            </Badge>
            <Badge darkMode={darkMode}>
              <Star className="mr-1 h-3.5 w-3.5" /> {provider.nota}
            </Badge>
          </div>

          <h3 className="mt-4 text-3xl font-black">{provider.nome}</h3>
          <p className={`mt-3 leading-7 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
            {provider.descricaoLonga}
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className={`rounded-2xl p-4 ${darkMode ? "bg-white/5" : "bg-slate-50"}`}>
            <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Certificação</p>
            <p className="mt-1 font-semibold">{provider.certificado}</p>
          </div>
          <div className={`rounded-2xl p-4 ${darkMode ? "bg-white/5" : "bg-slate-50"}`}>
            <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Confiabilidade</p>
            <p className="mt-1 font-semibold">{provider.confianca}</p>
          </div>
        </div>

        <div className={`mt-4 rounded-2xl p-4 ${darkMode ? "bg-white/5" : "bg-slate-50"}`}>
          <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Áreas mais fortes</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {provider.area.map((item) => (
              <Badge key={item} darkMode={darkMode}>
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
            Exemplos de cursos
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {provider.cursos.map((curso) => (
              <span
                key={curso}
                className={`rounded-full border px-3 py-1 text-sm ${
                  darkMode ? "border-white/10 bg-white/5 text-slate-200" : "border-slate-200 bg-slate-100 text-slate-700"
                }`}
              >
                {curso}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={provider.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:scale-[1.02]"
          >
            <ExternalLink className="h-4 w-4" />
            Acessar site oficial
          </a>

          <button
            onClick={() => onToggleFavorite(provider.id)}
            className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3 font-semibold transition ${
              favorite
                ? "border-pink-400/30 bg-pink-400/10 text-pink-300"
                : darkMode
                ? "border-white/15 text-white hover:bg-white/5"
                : "border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />
            {favorite ? "Favoritado" : "Salvar favorito"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [busca, setBusca] = useState("");
  const [areaAtiva, setAreaAtiva] = useState("Todas");
  const [certificadoAtivo, setCertificadoAtivo] = useState("Todos");
  const [darkMode, setDarkMode] = useState(true);
  const [favoritos, setFavoritos] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const filtrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();

    return providers.filter((provider) => {
      const bateBusca =
        provider.nome.toLowerCase().includes(termo) ||
        provider.tipo.toLowerCase().includes(termo) ||
        provider.certificado.toLowerCase().includes(termo) ||
        provider.confianca.toLowerCase().includes(termo) ||
        provider.destaque.toLowerCase().includes(termo) ||
        provider.descricaoLonga.toLowerCase().includes(termo) ||
        provider.area.some((item) => item.toLowerCase().includes(termo)) ||
        provider.cursos.some((curso) => curso.toLowerCase().includes(termo));

      const bateArea = areaAtiva === "Todas" || provider.area.includes(areaAtiva);
      const bateCertificado = certificadoAtivo === "Todos" || provider.certificadoTipo === certificadoAtivo;

      return bateBusca && bateArea && bateCertificado;
    });
  }, [busca, areaAtiva, certificadoAtivo]);

  const favoritosLista = providers.filter((provider) => favoritos.includes(provider.id));

  function toggleFavorite(id) {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  const theme = darkMode
    ? {
        page: "bg-slate-950 text-white",
        header: "border-white/10 bg-[radial-gradient(circle_at_top,#164e63_0%,#0f172a_35%,#020617_100%)]",
        glass: "border-white/10 bg-white/5",
        panel: "border-white/10 bg-slate-950/60",
        card: "border-white/10 bg-gradient-to-b from-slate-900 to-slate-950",
        textSoft: "text-slate-300",
        textMuted: "text-slate-400",
        footer: "border-white/10 bg-slate-950",
      }
    : {
        page: "bg-slate-50 text-slate-900",
        header: "border-slate-200 bg-[radial-gradient(circle_at_top,#cffafe_0%,#f8fafc_50%,#eef2ff_100%)]",
        glass: "border-slate-200 bg-white/80",
        panel: "border-slate-200 bg-white/90",
        card: "border-slate-200 bg-gradient-to-b from-white to-slate-50",
        textSoft: "text-slate-600",
        textMuted: "text-slate-500",
        footer: "border-slate-200 bg-white",
      };

  return (
    <div className={`min-h-screen transition-colors ${theme.page}`}>
      <header className={`border-b ${theme.header}`}>
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              <Sparkles className="h-4 w-4" />
              Site hacker supremo de cursos confiáveis
            </div>

            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 font-semibold transition ${theme.glass}`}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {darkMode ? "Modo claro" : "Modo escuro"}
            </button>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Encontre cursos online confiáveis com certificado sem cair em cilada
              </h1>
              <p className={`mt-5 max-w-2xl text-lg leading-8 ${theme.textSoft}`}>
                Um catálogo moderno, estiloso e direto pra reunir plataformas conhecidas,
                destacar certificado, área de estudo, confiança e jogar direto pro link oficial.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#plataformas"
                  className="rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
                >
                  Explorar plataformas
                </a>
                <a
                  href="#favoritos"
                  className={`rounded-2xl border px-6 py-3 font-semibold transition ${theme.glass}`}
                >
                  Ver favoritos
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className={`rounded-3xl border p-6 shadow-2xl backdrop-blur ${theme.glass}`}>
                <ShieldCheck className="h-8 w-8 text-cyan-300" />
                <h3 className="mt-4 text-xl font-bold">Mais confiança</h3>
                <p className={`mt-2 ${theme.textSoft}`}>Foco em instituições conhecidas e links oficiais.</p>
              </div>
              <div className={`rounded-3xl border p-6 shadow-2xl backdrop-blur ${theme.glass}`}>
                <Award className="h-8 w-8 text-emerald-300" />
                <h3 className="mt-4 text-xl font-bold">Certificado em destaque</h3>
                <p className={`mt-2 ${theme.textSoft}`}>Bate o olho e já vê como funciona a certificação.</p>
              </div>
              <div className={`rounded-3xl border p-6 shadow-2xl backdrop-blur sm:col-span-2 ${theme.glass}`}>
                <Cpu className="h-8 w-8 text-fuchsia-300" />
                <h3 className="mt-4 text-xl font-bold">Visual hacker supremo</h3>
                <p className={`mt-2 ${theme.textSoft}`}>
                  Busca inteligente, favoritos, modal de detalhes e visual forte pra parecer produto real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="filtros" className="mx-auto max-w-7xl px-6 py-12">
          <div className={`rounded-[28px] border p-5 shadow-2xl backdrop-blur ${theme.glass}`}>
            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
              <div className={`rounded-2xl border px-4 py-3 ${theme.panel}`}>
                <div className={`flex items-center gap-3 ${theme.textSoft}`}>
                  <Search className="h-5 w-5" />
                  <input
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Buscar por curso, área, plataforma ou certificado..."
                    className={`w-full bg-transparent outline-none ${
                      darkMode ? "placeholder:text-slate-500" : "placeholder:text-slate-400"
                    }`}
                  />
                </div>
              </div>

              <div className={`rounded-2xl border px-4 py-3 ${theme.panel}`}>
                <div className={`mb-2 flex items-center gap-2 text-sm ${theme.textMuted}`}>
                  <Filter className="h-4 w-4" /> Área
                </div>
                <select
                  value={areaAtiva}
                  onChange={(e) => setAreaAtiva(e.target.value)}
                  className="w-full bg-transparent outline-none"
                >
                  {areas.map((area) => (
                    <option key={area} value={area} className={darkMode ? "bg-slate-900" : "bg-white"}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`rounded-2xl border px-4 py-3 ${theme.panel}`}>
                <div className={`mb-2 flex items-center gap-2 text-sm ${theme.textMuted}`}>
                  <Award className="h-4 w-4" /> Certificado
                </div>
                <select
                  value={certificadoAtivo}
                  onChange={(e) => setCertificadoAtivo(e.target.value)}
                  className="w-full bg-transparent outline-none"
                >
                  {certificadoTipos.map((tipo) => (
                    <option key={tipo} value={tipo} className={darkMode ? "bg-slate-900" : "bg-white"}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        <section id="favoritos" className="mx-auto max-w-7xl px-6 pb-6">
          <div className={`rounded-[28px] border p-6 shadow-xl ${theme.glass}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
                  Favoritos
                </p>
                <h2 className="mt-2 text-2xl font-black">Plataformas salvas por você</h2>
              </div>
              <Badge variant="pink" darkMode={darkMode}>
                {favoritosLista.length} favorito(s)
              </Badge>
            </div>

            {favoritosLista.length === 0 ? (
              <p className={`mt-4 ${theme.textSoft}`}>
                Tu ainda não salvou nenhum favorito. Clica no coração pra guardar as plataformas mais massa.
              </p>
            ) : (
              <div className="mt-4 flex flex-wrap gap-2">
                {favoritosLista.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => setSelectedProvider(provider)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${theme.panel}`}
                  >
                    {provider.nome}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="plataformas" className="mx-auto max-w-7xl px-6 pb-20">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Plataformas recomendadas
              </p>
              <h2 className="mt-3 text-3xl font-black">As melhores opções pra começar</h2>
              <p className={`mt-3 ${theme.textMuted}`}>Mostrando {filtrados.length} plataforma(s) filtrada(s)</p>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
              ✅ Curadoria focada em confiança e link oficial
            </div>
          </div>

          {filtrados.length === 0 ? (
            <div className={`rounded-[28px] border p-8 text-center shadow-2xl ${theme.card}`}>
              <h3 className="text-2xl font-bold">Nenhum resultado encontrado</h3>
              <p className={`mt-3 ${theme.textSoft}`}>
                Tenta buscar por tecnologia, certificado gratuito, marketing, negócios ou automação.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {filtrados.map((provider) => {
                const isFavorite = favoritos.includes(provider.id);

                return (
                  <article
                    key={provider.id}
                    className={`group rounded-[28px] border p-6 shadow-2xl transition hover:-translate-y-1 ${theme.card} ${
                      darkMode ? "hover:border-cyan-400/30" : "hover:border-cyan-300"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-black">{provider.nome}</h3>
                        <p className={`mt-2 max-w-2xl ${theme.textSoft}`}>{provider.destaque}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="cyan" darkMode={darkMode}>
                          {provider.tipo}
                        </Badge>
                        <button
                          onClick={() => toggleFavorite(provider.id)}
                          className={`rounded-full border p-2 transition ${
                            isFavorite
                              ? "border-pink-400/30 bg-pink-400/10 text-pink-300"
                              : theme.glass
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {provider.certificadoTipo === "gratuito" && (
                        <Badge variant="green" darkMode={darkMode}>
                          Certificado gratuito
                        </Badge>
                      )}
                      {provider.certificadoTipo === "misto" && (
                        <Badge variant="yellow" darkMode={darkMode}>
                          Certificado misto
                        </Badge>
                      )}
                      {provider.certificadoTipo === "pago" && (
                        <Badge variant="pink" darkMode={darkMode}>
                          Certificado pago
                        </Badge>
                      )}
                      <Badge darkMode={darkMode}>
                        <Star className="mr-1 h-3.5 w-3.5" /> {provider.nota}
                      </Badge>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className={`rounded-2xl p-4 ${darkMode ? "bg-white/5" : "bg-slate-100"}`}>
                        <p className={`text-sm ${theme.textMuted}`}>Certificação</p>
                        <p className="mt-1 font-semibold">{provider.certificado}</p>
                      </div>
                      <div className={`rounded-2xl p-4 ${darkMode ? "bg-white/5" : "bg-slate-100"}`}>
                        <p className={`text-sm ${theme.textMuted}`}>Confiabilidade</p>
                        <p className="mt-1 font-semibold">{provider.confianca}</p>
                      </div>
                    </div>

                    <div className={`mt-4 rounded-2xl p-4 ${darkMode ? "bg-white/5" : "bg-slate-100"}`}>
                      <p className={`text-sm ${theme.textMuted}`}>Áreas mais fortes</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {provider.area.map((item) => (
                          <Badge key={item} darkMode={darkMode}>
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className={`text-sm font-semibold ${theme.textSoft}`}>Exemplos de cursos:</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {provider.cursos.map((curso) => (
                          <span
                            key={curso}
                            className={`rounded-full border px-3 py-1 text-sm ${
                              darkMode
                                ? "border-white/10 bg-white/5 text-slate-200"
                                : "border-slate-200 bg-slate-100 text-slate-700"
                            }`}
                          >
                            {curso}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={provider.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition group-hover:scale-[1.02]"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Acessar site oficial
                      </a>
                      <button
                        onClick={() => setSelectedProvider(provider)}
                        className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3 font-semibold transition ${theme.glass}`}
                      >
                        <BadgeCheck className="h-4 w-4" />
                        Ver detalhes
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <footer className={`border-t ${theme.footer}`}>
        <div className={`mx-auto max-w-7xl px-6 py-8 text-center ${theme.textMuted}`}>
          <p className="text-sm">
            Desenvolvido por{" "}
            <span className={darkMode ? "font-semibold text-white" : "font-semibold text-slate-900"}>
              Alexsandro Souza Melo
            </span>
          </p>
          <p className="mt-2 text-sm">
            Projeto feito pra encontrar cursos confiáveis com certificado, link oficial e visual supremo.
          </p>
        </div>
      </footer>

      <DetailsModal
        provider={selectedProvider}
        onClose={() => setSelectedProvider(null)}
        darkMode={darkMode}
        favorite={selectedProvider ? favoritos.includes(selectedProvider.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
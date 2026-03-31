import React, { useMemo, useState } from "react";

const plataformas = [
  {
    id: 1,
    nome: "Fundação Bradesco - Escola Virtual",
    area: "Tecnologia",
    tipo: "Gratuito",
    certificado: "Sim",
    confianca: "Instituição reconhecida",
    link: "https://www.ev.org.br/",
    descricao:
      "Cursos gratuitos com certificado em tecnologia, produtividade, administração e educação.",
    cursos: ["Excel", "Lógica de Programação", "Administração", "Educação Financeira"],
  },
  {
    id: 2,
    nome: "Sebrae",
    area: "Negócios",
    tipo: "Gratuito e pago",
    certificado: "Sim",
    confianca: "Referência em empreendedorismo",
    link: "https://sebrae.com.br/",
    descricao:
      "Plataforma forte em empreendedorismo, marketing, vendas, gestão e carreira.",
    cursos: ["Empreendedorismo", "Marketing Digital", "Vendas", "Gestão Financeira"],
  },
  {
    id: 3,
    nome: "SENAI Play",
    area: "Indústria",
    tipo: "Misto",
    certificado: "Sim",
    confianca: "Muito forte em cursos técnicos",
    link: "https://play.senai.br/",
    descricao:
      "Cursos técnicos e profissionalizantes voltados para indústria, mecânica e automação.",
    cursos: ["Automação", "Mecânica", "Segurança do Trabalho", "Qualidade"],
  },
  {
    id: 4,
    nome: "Coursera",
    area: "Tecnologia",
    tipo: "Misto",
    certificado: "Em muitos cursos",
    confianca: "Universidades e empresas grandes",
    link: "https://www.coursera.org/",
    descricao:
      "Cursos de universidades e empresas conhecidas, com foco em tecnologia, dados e carreira.",
    cursos: ["Python", "Data Analytics", "Marketing", "Cybersecurity"],
  },
  {
    id: 5,
    nome: "Kultivi",
    area: "Idiomas",
    tipo: "Gratuito",
    certificado: "Em cursos selecionados",
    confianca: "Popular entre estudantes brasileiros",
    link: "https://kultivi.com/",
    descricao:
      "Boa opção para estudar idiomas, ENEM, comunicação e desenvolvimento pessoal.",
    cursos: ["Inglês", "Espanhol", "ENEM", "Oratória"],
  },
  {
    id: 6,
    nome: "FGV Educação Executiva",
    area: "Gestão",
    tipo: "Gratuito",
    certificado: "Sim",
    confianca: "Instituição muito respeitada",
    link: "https://educacao-executiva.fgv.br/cursos/gratuitos",
    descricao:
      "Cursos gratuitos com peso de instituição forte no currículo, focados em gestão e carreira.",
    cursos: ["Gestão", "Marketing", "Economia", "Direito"],
  },
];

const areas = ["Todas", ...new Set(plataformas.map((p) => p.area))];

function Badge({ children, color = "#22d3ee", bg = "rgba(34,211,238,0.10)" }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "8px 12px",
        borderRadius: "999px",
        border: `1px solid ${color}55`,
        background: bg,
        color,
        fontSize: "12px",
        fontWeight: "bold",
      }}
    >
      {children}
    </span>
  );
}

export default function App() {
  const [busca, setBusca] = useState("");
  const [filtroArea, setFiltroArea] = useState("Todas");

  const resultados = useMemo(() => {
    const termo = busca.toLowerCase().trim();

    return plataformas.filter((p) => {
      const bateBusca =
        p.nome.toLowerCase().includes(termo) ||
        p.area.toLowerCase().includes(termo) ||
        p.tipo.toLowerCase().includes(termo) ||
        p.certificado.toLowerCase().includes(termo) ||
        p.confianca.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo) ||
        p.cursos.some((curso) => curso.toLowerCase().includes(termo));

      const bateArea = filtroArea === "Todas" || p.area === filtroArea;

      return bateBusca && bateArea;
    });
  }, [busca, filtroArea]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(34,211,238,0.14), transparent 25%), linear-gradient(180deg, #020617 0%, #0f172a 55%, #111827 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          padding: "48px 24px 28px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(34,211,238,0.25)",
              background: "rgba(34,211,238,0.10)",
              color: "#67e8f9",
              fontSize: "13px",
              fontWeight: "bold",
              letterSpacing: "0.5px",
            }}
          >
            ⚡ HACKER MASTER EDITION
          </div>

          <h1
            style={{
              fontSize: "clamp(34px, 5vw, 60px)",
              lineHeight: 1.05,
              marginTop: "18px",
              marginBottom: "14px",
              fontWeight: 900,
            }}
          >
            Site de Cursos Confiáveis
          </h1>

          <p
            style={{
              maxWidth: "820px",
              color: "#cbd5e1",
              fontSize: "18px",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Encontre plataformas confiáveis, veja se têm certificado, filtre por área
            e acesse o site oficial com um visual mais insano.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: "1150px", margin: "0 auto", padding: "28px 24px 40px" }}>
        <section
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: "20px",
            boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
            marginBottom: "26px",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: "14px",
              gridTemplateColumns: "1.5fr 0.7fr",
            }}
          >
            <input
              type="text"
              placeholder="Buscar por nome, área, tipo, certificado ou curso..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                outline: "none",
                fontSize: "16px",
              }}
            />

            <select
              value={filtroArea}
              onChange={(e) => setFiltroArea(e.target.value)}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "#0f172a",
                color: "white",
                outline: "none",
                fontSize: "16px",
              }}
            >
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: "28px" }}>Plataformas recomendadas</h2>
              <p style={{ marginTop: "8px", color: "#94a3b8" }}>
                Mostrando {resultados.length} resultado(s)
              </p>
            </div>

            <Badge color="#4ade80" bg="rgba(74,222,128,0.10)">
              ✅ Links oficiais e confiáveis
            </Badge>
          </div>
        </section>

        {resultados.length === 0 ? (
          <div
            style={{
              padding: "26px",
              borderRadius: "22px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#cbd5e1",
            }}
          >
            Nenhuma plataforma encontrada. Tenta pesquisar por tecnologia, gestão,
            idiomas, marketing ou certificado.
          </div>
        ) : (
          <section
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            }}
          >
            {resultados.map((p) => (
              <article
                key={p.id}
                style={{
                  background: "linear-gradient(180deg, #111827, #0b1220)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "26px",
                  padding: "22px",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.22)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    gap: "12px",
                  }}
                >
                  <div>
                    <h3 style={{ margin: 0, fontSize: "24px", lineHeight: 1.2 }}>
                      {p.nome}
                    </h3>
                    <p
                      style={{
                        marginTop: "12px",
                        color: "#cbd5e1",
                        lineHeight: 1.6,
                      }}
                    >
                      {p.descricao}
                    </p>
                  </div>

                  <Badge>{p.tipo}</Badge>
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: "12px",
                    gridTemplateColumns: "1fr 1fr",
                    marginTop: "18px",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "16px",
                      padding: "14px",
                    }}
                  >
                    <small style={{ color: "#94a3b8" }}>Área</small>
                    <div style={{ marginTop: "6px", fontWeight: "bold" }}>{p.area}</div>
                  </div>

                  <div
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "16px",
                      padding: "14px",
                    }}
                  >
                    <small style={{ color: "#94a3b8" }}>Certificado</small>
                    <div style={{ marginTop: "6px", fontWeight: "bold" }}>
                      {p.certificado}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "14px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "16px",
                    padding: "14px",
                  }}
                >
                  <small style={{ color: "#94a3b8" }}>Confiabilidade</small>
                  <div style={{ marginTop: "6px", fontWeight: "bold" }}>{p.confianca}</div>
                </div>

                <div style={{ marginTop: "16px" }}>
                  <small style={{ color: "#94a3b8" }}>Cursos em destaque</small>
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    {p.cursos.map((curso) => (
                      <span
                        key={curso}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "999px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#e2e8f0",
                          fontSize: "13px",
                        }}
                      >
                        {curso}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "20px",
                    background: "#22d3ee",
                    color: "#0f172a",
                    textDecoration: "none",
                    fontWeight: "bold",
                    padding: "12px 18px",
                    borderRadius: "14px",
                  }}
                >
                  Acessar site oficial
                </a>
              </article>
            ))}
          </section>
        )}
      </main>

      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "24px",
          textAlign: "center",
          color: "#94a3b8",
        }}
      >
        <p style={{ margin: 0 }}>
          Desenvolvido por{" "}
          <strong style={{ color: "white" }}>Alexsandro Souza Melo</strong>
        </p>
      </footer>
    </div>
  );
}
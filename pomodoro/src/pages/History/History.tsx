import type { CSSProperties } from "react";
import { Status } from "./Status";

export function History() {
  const thStyle: CSSProperties = {
    backgroundColor: "var(--gray-600)",
    padding: "1rem",
    textAlign: "left",
    color: "var(--gray-100)",
    fontSize: "0.875rem",
    lineHeight: "1.6",
  };

  const tdStyle: CSSProperties = {
    backgroundColor: "var(--gray-700)",
    borderTop: "4px solid var(--gray-800)",
    padding: "1rem",
    lineHeight: "1.6",
    fontSize: "0.875rem",
  };

  return (
    <div
      style={{
        flex: 1,
        padding: "3.5 rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", color: "var(--gray-100)" }}>
        Meu Histórico
      </h1>
      <div style={{ flex: 1, overflow: "auto", marginTop: "2rem" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "600px",
          }}
        >
          <thead>
            <tr>
              <th style={{ ...thStyle, width: "50%" }}>Tarefa</th>
              <th style={thStyle}>Duração</th>
              <th style={thStyle}>Início</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>Tarefa</td>
              <td style={tdStyle}>20 minutos</td>
              <td style={tdStyle}>Há 2 meses</td>
              <td style={tdStyle}>
                <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>Tarefa</td>
              <td style={tdStyle}>20 minutos</td>
              <td style={tdStyle}>Há 2 meses</td>
              <td style={tdStyle}>
                <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>Tarefa</td>
              <td style={tdStyle}>20 minutos</td>
              <td style={tdStyle}>Há 2 meses</td>
              <td style={tdStyle}>
                <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>Tarefa</td>
              <td style={tdStyle}>20 minutos</td>
              <td style={tdStyle}>Há 2 meses</td>
              <td style={tdStyle}>
                <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>Tarefa</td>
              <td style={tdStyle}>20 minutos</td>
              <td style={tdStyle}>Há 2 meses</td>
              <td style={tdStyle}>
                <Status statusColor="red">Interrompido</Status>
              </td>
            </tr>
            <tr>
              <td style={tdStyle}>Tarefa</td>
              <td style={tdStyle}>20 minutos</td>
              <td style={tdStyle}>Há 2 meses</td>
              <td style={tdStyle}>
                <Status statusColor="yellow">Em andamento</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

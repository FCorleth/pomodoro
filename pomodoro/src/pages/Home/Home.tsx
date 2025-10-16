import { Play } from "phosphor-react";
import type { CSSProperties } from "react";

const spanStyle: CSSProperties = {
  backgroundColor: "var(--gray-700)",
  borderRadius: "8px",
  padding: "2rem 1rem",
  fontFamily: "Roboto Mono, monospace",
};

const divStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
};

const formStyle: CSSProperties = {
  width: "39.7rem",
  display: "flex",
  flexDirection: "column",
  gap: "3.5rem",
  alignItems: "center",
};

const divLabelStyle: CSSProperties = {
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  width: "100%",
  color: "var(--gray-100)",
  fontSize: "1.125rem",
  fontWeight: "bold",
  flexWrap: "wrap",
};

const buttonStyle: CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: "8px",
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  backgroundColor: "var(--green-500)",
  color: "var(--white)",
  fontWeight: "bold",
  cursor: "pointer",
};

const inputStyle: CSSProperties = {
  backgroundColor: "transparent",
  border: "none",
  height: "2.5rem",
  borderBottom: "2px solid var(--gray-500)",
  padding: "0 0.5rem",
  fontSize: "1.125rem",
  fontWeight: "bold",
  color: "var(--gray-100)",
};

const taskInputStyle: CSSProperties = {
  ...inputStyle,
  padding: "0 0.5rem",
  flex: 1,
};

const minutesAmountInputStyle: CSSProperties = {
  ...inputStyle,
  width: "4rem",
};

export function Home() {
  return (
    <div style={divStyle}>
      <form style={formStyle}>
        <div style={divLabelStyle}>
          <label htmlFor="task">Vou trabalhar em</label>
          <input
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            style={taskInputStyle}
            list="taskSuggestions"
          />
          <datalist id="taskSuggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
            <option value="Projeto 5" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <input
            type="number"
            id="minutesAmount"
            placeholder="00"
            min={0}
            max={60}
            step={5}
            style={minutesAmountInputStyle}
          />
          <span>minutos.</span>
        </div>
        <div
          style={{
            fontSize: "10rem",
            lineHeight: "8rem",
            color: "var(--gray-100)",
            display: "flex",
            gap: "1rem",
          }}
        >
          <span style={spanStyle}>0</span>
          <span style={spanStyle}>0</span>
          <span>:</span>
          <span style={spanStyle}>0</span>
          <span style={spanStyle}>0</span>
        </div>
        <button type="submit" style={buttonStyle}>
          <Play size={24} />
          Começar
        </button>
      </form>
    </div>
  );
}

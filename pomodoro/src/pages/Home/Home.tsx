import { HandPalm, Play } from "phosphor-react";
import type { CSSProperties } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

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

const cancelButtonStyle: CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: "8px",
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  backgroundColor: "var(--red-500)",
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

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo precisa ser de no mínimo 1 minuto.")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycle] = useState<string | null>("");
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  function onSubmit(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
      interruptedDate: new Date(),
      finishedDate: new Date(),
    };

    setCycles((cycles) => [...cycles, newCycle]);
    setActiveCycle(newCycle.id);
    setAmountSecondsPassed(0);

    reset();
  }

  function handleCancelCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycle(null);
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            })
          );
          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  const { errors } = formState;

  console.log(errors);

  return (
    <div style={divStyle}>
      <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
        <div style={divLabelStyle}>
          <label htmlFor="task">Vou trabalhar em</label>
          <input
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            style={taskInputStyle}
            list="taskSuggestions"
            disabled={!!activeCycle}
            {...register("task")}
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
            disabled={!!activeCycle}
            style={minutesAmountInputStyle}
            {...register("minutesAmount", { valueAsNumber: true })}
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
          <span style={spanStyle}>{minutes[0]}</span>
          <span style={spanStyle}>{minutes[1]}</span>
          <span>:</span>
          <span style={spanStyle}>{seconds[0]}</span>
          <span style={spanStyle}>{seconds[1]}</span>
        </div>
        {activeCycle ? (
          <button style={cancelButtonStyle} onClick={handleCancelCycle}>
            <HandPalm size={24} />
            Interromper
          </button>
        ) : (
          <button type="submit" style={buttonStyle}>
            <Play size={24} />
            Começar
          </button>
        )}
      </form>
    </div>
  );
}

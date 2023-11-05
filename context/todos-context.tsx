import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchAllTodos, createTodo, deleteTodo } from "../api/todos";

interface Todo {
  id: string;
  body: string;
}

type TodosContextType = {
  items: Todo[];
  addGoal: (goal: string) => void;
  deleteGoal: (id: string) => void;
};

export const TodosContext = createContext<TodosContextType>({
  items: [],
  addGoal: (goal: string) => {},
  deleteGoal: (id: string) => {},
});

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<Todo[]>([]);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const { data } = await fetchAllTodos();
      setGoals(data);
    } catch (error) {
      console.error("Error loading todos data:", error);
    }
  };

  const addGoal = async (goal: string) => {
    const { data } = await createTodo(goal);
    setGoals((prevGoals) => [...prevGoals, data]);
  };

  const deleteGoal = async (id: string) => {
    try {
      setGoals((prevGoals) => {
        return prevGoals.filter((prevGoal) => prevGoal.id !== id);
      });
      const { data } = await deleteTodo(id);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    items: goals,
    addGoal: addGoal,
    deleteGoal,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
}

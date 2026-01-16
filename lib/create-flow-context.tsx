'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { 
  CreateFlowState, 
  PersonaData, 
  TopicData, 
  FormatData, 
  HookData, 
  ContentResult 
} from './create-flow-types';

interface CreateFlowContextType {
  state: CreateFlowState;
  setStep: (step: number) => void;
  setPersona: (persona: PersonaData) => void;
  setTopic: (topic: TopicData) => void;
  setFormat: (format: FormatData) => void;
  setHook: (hook: HookData) => void;
  setResult: (result: ContentResult) => void;
  reset: () => void;
}

const initialState: CreateFlowState = {
  step: 1,
  persona: null,
  topic: null,
  format: null,
  hook: null,
  result: null,
};

const CreateFlowContext = createContext<CreateFlowContextType | undefined>(undefined);

export function CreateFlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CreateFlowState>(initialState);

  const setStep = (step: number) => setState(prev => ({ ...prev, step }));
  const setPersona = (persona: PersonaData) => setState(prev => ({ ...prev, persona, step: 2 }));
  const setTopic = (topic: TopicData) => setState(prev => ({ ...prev, topic, step: 3 }));
  const setFormat = (format: FormatData) => setState(prev => ({ ...prev, format, step: 4 }));
  const setHook = (hook: HookData) => setState(prev => ({ ...prev, hook, step: 5 }));
  const setResult = (result: ContentResult) => setState(prev => ({ ...prev, result, step: 6 }));
  const reset = () => setState(initialState);

  return (
    <CreateFlowContext.Provider value={{
      state,
      setStep,
      setPersona,
      setTopic,
      setFormat,
      setHook,
      setResult,
      reset,
    }}>
      {children}
    </CreateFlowContext.Provider>
  );
}

export function useCreateFlow() {
  const context = useContext(CreateFlowContext);
  if (!context) {
    throw new Error('useCreateFlow must be used within CreateFlowProvider');
  }
  return context;
}

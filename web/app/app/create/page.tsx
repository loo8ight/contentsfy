'use client';

import { useCreateFlow } from '@/lib/create-flow-context';
import Step1Persona from './steps/Step1Persona';
import Step2Topic from './steps/Step2Topic';
import Step3Format from './steps/Step3Format';
import Step4Hook from './steps/Step4Hook';
import Step5Generate from './steps/Step5Generate';
import Step6Result from './steps/Step6Result';
import { Check } from 'lucide-react';

const steps = [
  { num: 1, name: '페르소나' },
  { num: 2, name: '주제' },
  { num: 3, name: '포맷' },
  { num: 4, name: '후킹' },
  { num: 5, name: '생성' },
  { num: 6, name: '결과' },
];

export default function CreatePage() {
  const { state, setStep } = useCreateFlow();
  const currentStep = state.step;

  const canGoToStep = (stepNum: number) => {
    if (stepNum === 1) return true;
    if (stepNum === 2) return state.persona !== null;
    if (stepNum === 3) return state.topic !== null;
    if (stepNum === 4) return state.format !== null;
    if (stepNum === 5) return state.hook !== null;
    if (stepNum === 6) return state.result !== null;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Progress Bar */}
      <div className="sticky top-14 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.num} className="flex items-center">
                <button
                  onClick={() => canGoToStep(step.num) && setStep(step.num)}
                  disabled={!canGoToStep(step.num)}
                  className={`flex items-center gap-2 transition-all ${
                    canGoToStep(step.num) ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      currentStep === step.num
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                        : currentStep > step.num || (step.num < currentStep)
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > step.num ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      step.num
                    )}
                  </div>
                  <span
                    className={`hidden sm:block text-sm font-medium ${
                      currentStep === step.num
                        ? 'text-primary-600'
                        : currentStep > step.num
                        ? 'text-gray-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.name}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 sm:w-16 h-0.5 mx-2 ${
                      currentStep > step.num ? 'bg-primary-300' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {currentStep === 1 && <Step1Persona />}
        {currentStep === 2 && <Step2Topic />}
        {currentStep === 3 && <Step3Format />}
        {currentStep === 4 && <Step4Hook />}
        {currentStep === 5 && <Step5Generate />}
        {currentStep === 6 && <Step6Result />}
      </div>
    </div>
  );
}

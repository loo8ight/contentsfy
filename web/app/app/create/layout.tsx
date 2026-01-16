'use client';

import { CreateFlowProvider } from '@/lib/create-flow-context';

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CreateFlowProvider>
      {children}
    </CreateFlowProvider>
  );
}

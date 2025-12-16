import React from 'react';

type FormFieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

export const FormField = ({ label, error, children }: FormFieldProps) => (
  <div className="space-y-2">
    <span className="text-sm font-medium text-muted-foreground">{label}</span>
    {children}
    {error ? <p className="text-xs text-destructive">{error}</p> : null}
  </div>
);





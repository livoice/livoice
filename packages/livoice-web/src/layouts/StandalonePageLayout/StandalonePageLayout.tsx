interface StandalonePageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function StandalonePageLayout({ children, className }: StandalonePageLayoutProps) {
  return <div className={`flex min-h-screen bg-background ${className ?? ''}`}>{children}</div>;
}

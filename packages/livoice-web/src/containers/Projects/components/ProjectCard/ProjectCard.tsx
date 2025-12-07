import { Card, CardContent } from '@/ui';

export interface ProjectCardProps {
  name: string;
  description?: string | null;
  orgName?: string | null;
}

export default function ProjectCard({ name, description, orgName }: ProjectCardProps) {
  return (
    <Card className="border-white/60 bg-white/70 shadow-sm">
      <CardContent className="space-y-3 p-5">
        <div className="space-y-1">
          <p className="text-lg font-semibold text-foreground">{name}</p>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Organization: {orgName || '—'}</p>
      </CardContent>
    </Card>
  );
}

import { CompletionDashboard } from '../components/Reports/CompletionDashboard';
import { AchievementReport } from '../components/Reports/AchievementReport';

export function ReportsPage() {
  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold">Reports</h1>
      <CompletionDashboard />
      <AchievementReport />
    </section>
  );
}

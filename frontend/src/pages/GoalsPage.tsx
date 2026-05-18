import { useEffect } from 'react';
import { GoalForm } from '../components/Goals/GoalForm';
import { GoalList } from '../components/Goals/GoalList';
import { useGoals } from '../hooks/useGoals';
import { useAuth } from '../hooks/useAuth';
import { ManagerDashboard } from '../components/Dashboard/ManagerDashboard';

export function GoalsPage() {
  const { isManager, isAdmin } = useAuth();
  const { goals, loading, loadGoals } = useGoals();

  useEffect(() => {
    if (!isManager && !isAdmin) loadGoals();
  }, [isManager, isAdmin, loadGoals]);

  if (isManager || isAdmin) return <ManagerDashboard />;

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Goals</h1>
      <GoalForm onSuccess={loadGoals} />
      <GoalList goals={goals} loading={loading} />
    </section>
  );
}

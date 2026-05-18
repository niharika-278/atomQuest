import { useEffect } from 'react';
import { AchievementForm } from '../components/Achievements/AchievementForm';
import { ProgressScore } from '../components/Achievements/ProgressScore';
import { CheckinPanel } from '../components/Achievements/CheckinPanel';
import { useGoals } from '../hooks/useGoals';
import { achievementsService } from '../services/achievements.service';
import { useState } from 'react';
import { Goal } from '../types';

export function AchievementsPage() {
  const { goals, loadGoals } = useGoals();
  const [quarterly, setQuarterly] = useState<Goal[]>([]);

  useEffect(() => {
    loadGoals();
    achievementsService.getQuarterlyAchievements('Q4_2024').then(setQuarterly).catch(console.error);
  }, [loadGoals]);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Achievements</h1>
      <AchievementForm goals={goals} onSuccess={() => achievementsService.getQuarterlyAchievements('Q4_2024').then(setQuarterly)} />
      <CheckinPanel />
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-bold">Q4 2024 Progress</h2>
        {quarterly.map((goal) => {
          const ach = goal.achievements?.[0];
          return (
            <div key={goal.id} className="border-b pb-4">
              <p className="font-medium">{goal.title}</p>
              <ProgressScore score={ach?.progress_score} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

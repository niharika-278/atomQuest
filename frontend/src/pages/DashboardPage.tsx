import { useAuth } from '../hooks/useAuth';
import { EmployeeDashboard } from '../components/Dashboard/EmployeeDashboard';
import { ManagerDashboard } from '../components/Dashboard/ManagerDashboard';
import { AdminDashboard } from '../components/Dashboard/AdminDashboard';

export function DashboardPage() {
  const { isAdmin, isManager } = useAuth();
  if (isAdmin) return <AdminDashboard />;
  if (isManager) return <ManagerDashboard />;
  return <EmployeeDashboard />;
}

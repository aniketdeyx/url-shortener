import { redirect } from '@tanstack/react-router';
import { getCurrentUser } from '../api/user.api';

export const checkAuth = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) return redirect({ to: '/auth' });
    return true;
  } catch {
    return redirect({ to: '/auth' });
  }
};

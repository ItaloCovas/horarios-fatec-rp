import { api } from '../api';
import { Schedules } from './updateSchedules';

interface Spreadsheet {
  succeeded: boolean;
  errors: string | null;
  data: Schedules[];
}

export async function loadSpreedsheat() {
  const { data } = await api.get<Spreadsheet>('/schedules/get');

  if (data.succeeded) {
    return data.data;
  }
}

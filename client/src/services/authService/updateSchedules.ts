import { api } from '../api';

export interface UpdateSchedulesParams {
  schedules: Schedules[];
}

export interface Schedules {
  course: string;
  semester: string;
  lessonName: string;
  weekDay: string;
  lessonTime: string;
  teacherName: string;
  classroom: string;
  floor: string;
  tag?: string;
  classroomLink?: string;
}

export async function updateSchedules({ schedules }: UpdateSchedulesParams) {
  const schedulesData = {
    schedules: schedules,
  };

  await api.put('/schedules/update', schedulesData);
}

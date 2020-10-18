export class Task {
  private static nums:number = 0;
  constructor(){
      this.id = Task.nums;
      Task.nums++;
  }
  id: number;
  ch1: boolean;
  ch2: boolean;
  ch3: boolean;
  ch4: boolean;
  ch5: boolean;
  ch6: boolean;
  ch7: boolean;
  subject: string;
  task_name: string;
  description: string;
  grade: number;
  level: number;
  task_attempts: number;
  task_author: string;
  task_minutes: number;
  task_license :string;
  task_notes_checker: string;
  task_notes_student: string;
  task_notes_teacher: string;
  task_outsource: string;
  task_tags: string;
  task_type: string;
  task_visibility: string;
  moderation: {
    expertsUserIds: number[]
  };
}

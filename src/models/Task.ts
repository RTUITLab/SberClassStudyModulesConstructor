export class Task {
  private static nums:number = 0;
  constructor(){
      this.id = Task.nums;
      Task.nums++;
  }
  id: number;
  subject: string;
  task_name: string;
  description: string;
  grade: number;
  level: string;
  task_minutes: number;
}

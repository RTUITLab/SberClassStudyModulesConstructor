export class Notify {
    private static nums:number = 0;
    constructor(){
        this.id = Notify.nums;
        Notify.nums++;
    }
  id: number;
  userId: number;
  userRole: string;
  message: string;
}

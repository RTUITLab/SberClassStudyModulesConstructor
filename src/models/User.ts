export class User{
    private static nums:number = 0;
    constructor(){
        this.id = User.nums;
        User.nums++;
    }
    id: number;
    name: string;
    role: string;
    roleLocalized: string;
}
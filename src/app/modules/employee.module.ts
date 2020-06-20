export class Employeemodule {
    public employeeId: number;
    public firstName: string;
    public lastName: string;
    public employeeName: string;
    public doj: string;
    public dob: string;
    public age:string;
    public profilePic:string;
    constructor(employeeId:number,firstName: string,
        lastName:string,employeeName:string,doj:string,dob:string,profilePic:string) {
      this.employeeId = employeeId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.employeeName = employeeName;
      this.doj = doj;
      this.dob = dob;
      this.profilePic =profilePic;
    }
}
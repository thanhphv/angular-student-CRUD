import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../models/Student';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  public students: Student[] = [];
  public id: any;

  public addStudentForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    code: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
    dob: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    address: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
  })

  public editStudentForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    code: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
    dob: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    address: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
  })

  get name(){
    return this.addStudentForm.get('name')
  }

  get code(){
    return this.addStudentForm.get('code')
  }

  get gender(){
    return this.addStudentForm.get('gender')
  }

  get dob(){
    return this.addStudentForm.get('dob')
  }

  get email(){
    return this.addStudentForm.get('email')
  }

  get address(){
    return this.addStudentForm.get('address')
  }

  get phone(){
    return this.addStudentForm.get('phone')
  }

  get nameEdit(){
    return this.editStudentForm.get('name')
  }

  get codeEdit(){
    return this.editStudentForm.get('code')
  }

  get genderEdit(){
    return this.editStudentForm.get('gender')
  }

  get dobEdit(){
    return this.editStudentForm.get('dob')
  }

  get emailEdit(){
    return this.editStudentForm.get('email')
  }

  get addressEdit(){
    return this.editStudentForm.get('address')
  }

  get phoneEdit(){
    return this.editStudentForm.get('phone')
  }

  constructor(private serverHttp: ServerHttpService) { }

  ngOnInit(): void {
    this.loadData()
  }

  private loadData(){
    this.serverHttp.getStudents().subscribe((data)=>{
      this.students = data;
    })
  }

  // create student

  public handleAddStudent() {
    let newStudent : any = {};
    for (const controlName in this.addStudentForm.controls) {
      if (controlName) {
        newStudent[controlName] = this.addStudentForm.controls[controlName].value;
      }
    }
    this.serverHttp.addStudent(newStudent).subscribe((data) => {
      this.students.push(data)
    })
    alert("Thêm thành công sinh viên")

    this.addStudentForm.reset()
  }


  // edit student

  public openEditForm(studentId: any){
    this.id = studentId
    this.serverHttp.getStudent(this.id).subscribe((data) =>{
      console.log(data)
      for (const controlName in this.editStudentForm.controls) {
        if (controlName) {
          this.editStudentForm.controls[controlName].setValue(data[controlName]);
        }
      }
    })
  }

  public handleEditStudent(){
    this.serverHttp.modifyStudent(this.id, this.createNewData()).subscribe((data) =>{
      alert("Cập nhật thành công")
      window.location.reload();
    })
  }

  private createNewData() {
    const newStudent: any = {};
    for (const controlName in this.editStudentForm.controls) {
      if (controlName) {
        newStudent[controlName] = this.editStudentForm.controls[controlName].value;
      }
    }
    return newStudent as Student;
  }

// delete student

  public handleDeleteStudent(studentId: any){
    this.serverHttp.deleteStudent(studentId).subscribe((data) =>{
      this.loadData()
    })
  }



}

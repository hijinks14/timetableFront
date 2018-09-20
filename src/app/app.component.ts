import {HttpHeaders} from '@angular/common/http';
import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  timetable: any;
  timerow: any;
  private fieldArray: Array<any> = [];
  private newAttribute: any = null;
  sub: Subscription;
  bodyText: any;
  modalOpen: boolean = false;
  doneDate: any = null;
  doneTime: any = null;
  doneCode: string = null;
  doneDesc: string = null;
  postHeaders: any;

  constructor(private http: HttpClient) {
    this.timetable = [{
      id: 0,
      code: 'NULL',
      description: 'NULL'
    }];
    this.postHeaders = {        
        "Host": "localhost:8090",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"   
      };
    this.postGetAllCallReg('registrationGetAll', null);
    this.postGetAllCallProj('projectGetAll', null);
    this.init();
    this.bodyText = 'This text can be updated in modal 1';
  }
  title = 'timetable-dashboard';
  configUrl = 'http://localhost:8090/';

  // Retrieve the data from the DB
  postGetAllCallReg(method, PostData) {
      this.http.post(this.configUrl+method,PostData, this.postHeaders).subscribe(
      data => {
        console.log(data);
        this.timerow = data;
      },
      error => {
        alert("Unable to load data from server");
        console.log(JSON.stringify(error.json()));
      }
      )
  }
  postGetAllCallProj(method, PostData) {
      this.http.post(this.configUrl+method,PostData, this.postHeaders).subscribe(
      data => {
        console.log(data);
        this.timetable = data;
      },
      error => {
        alert("Unable to load data from server");
        console.log(JSON.stringify(error.json()));
      }
      )
  }
    postCall(method, PostData) {
      let postHeaders = {        
        "Host": "localhost:8090",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"   
      };
      this.http.post(this.configUrl+method,PostData, this.postHeaders).subscribe(
      data => {
        console.log(data);
        console.log("OK");
          this.postGetAllCallReg('registrationGetAll', null);
          this.modalOpen = !this.modalOpen;
      },
      error => {
        alert("Unable to send data. "+error.error.message);
        console.log(error);          
      }
      )
  }
  procesData(JSONdata) {
    JSON.stringify(JSONdata);
  }
  // Table functions
  addFieldValue() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  logTime() {
    this.modalOpen = !this.modalOpen;
    this.postGetAllCallReg('registrationGetAll', null);
  }

  add() {
    if(this.newAttribute.n == null){ this.newAttribute.n = ""; }
    let data = {
        "note":this.newAttribute.n,
        "logDate": this.newAttribute.d,
        "projectCode":this.newAttribute.c,
        "typingCode": "NORM",
        "hours":this.newAttribute.h
    }; 
    this.postCall('registrationPost', data);
    this.newAttribute.n=null;
    this.newAttribute.d=null;
    this.newAttribute.c=null;
    this.newAttribute.h=null; 
  }
    
  cancel() {
    this.init();
    this.logTime();
  }
  init() {      
    this.newAttribute = {
      c: null,
      d: null,
      n: null,
      h: null
    };
  }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year, month, day].join('-');
}

}



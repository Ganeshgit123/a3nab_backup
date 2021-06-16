import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
declare var $:any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [DatePipe,NgbRatingConfig]
})
export class CustomerComponent implements OnInit {
  datePickerConfig:Partial<BsDatepickerConfig>;
  userList:any;
  pages: number;
  page =1;
  bsValue = null;
  trustUserForm : FormGroup;

  walletAmount: number;
  amount: number;
  orders: number;
  lastOrdertime: string;
  lastOrder: string;

  signupDateTime: string;
  signupDate: string;
  gender: string;
  DOB: string;
  os: string;
  mobileNumber: number;
  countryCode: number;
  addressPinDetails: string;
  email: string;
  lastName: string;
  firstName: string;
  userPoints : any;
  customerID: string;
  cancellation: any;

  userOrderList:any;
  showMap = false;
  limitValue = 0
  singnupdate = null;
  cusID = null;
  usercsvOptions:any;
  zoom: number = 5;
  userViewId : number;
  Avgrating:any;
  // initial center position for the map
  lat: number = 24.774265;
  lng: number = 46.738586;

  markers: marker[] = []
  previous;
  valueFrom = ''
  valueTo = ''
  id : number;
  showExport = 'true';
showAccept = 'true';

  constructor(
    private apiCall: ApiCallService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private config: NgbRatingConfig
  ) { config.max = 5;}

  ngOnInit(): void {
    this.route.params.subscribe(params => this.cusID = params.id);
    // console.log("???",this.cusID)
    if(this.cusID){
      this.viewUserListData(this.cusID)
    } else {
      const object = { pageNumber: 1, limit: this.limitValue, signupDate: this.singnupdate }
      this.getUserList(object)
    }

    this.trustUserForm = this.formBuilder.group({
      trustUser: [false,  [Validators.required, Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      packageValue: [0,  [Validators.required, Validators.pattern("[+-]?([0-9]*[.])?[0-9]+")]],
      id: ['',  [Validators.required, Validators.pattern("[+-]?([0-9]*[.])?[0-9]+")]],
    })
    // this.viewUser({id: this.id,fromDate: this.valueFrom, toDate: this.valueTo})
    this.callRolePermission();
  }

  callRolePermission(){
    if(sessionStorage.getItem('adminRole') !== 'superadmin'){
      let orderpermission = JSON.parse(sessionStorage.getItem('permission'))
      this.showAccept = orderpermission[3].writeOpt
      this.showExport = orderpermission[3].exportOpt

    }
  }

  dateValue(event: any) {
    // console.log('date')
    this.singnupdate = this.datePipe.transform(event, 'yyyy-MM-dd');
    const object = { pageNumber: 1, limit: this.limitValue, signupDate: this.singnupdate }
    this.getUserList(object)
  }

  nextPage(page){
    const object = { pageNumber: page, limit: this.limitValue, signupDate: this.singnupdate }
    this.getUserList(object)
  }

  onChangeLimit(value){
    this.limitValue = value
    this.pages = 0
    this.page = 0
    const object = { pageNumber: 1, limit: this.limitValue, signupDate: this.singnupdate }
    this.getUserList(object)
  }

  pageReload(){
    this,this.ngOnInit();
    window.location.reload();
    this.bsValue = null;
  }

  clickedMarker(infowindow){
    if (this.previous) {
      this.previous.close();
      }
      this.previous = infowindow;
  }
  onchangeMap(values:any){
    this.showMap = values.currentTarget.checked;
  }

  ChangeUserStatus(status, id){

    // var update
    if(status === false){
      var update = 'inactive';
    } else {
      var update = 'active';
    }

    const object = { userStatus: update, id: id }
    var params = {
      url: 'admin/updateUserActive',
      data: object
    }
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
          this.ngOnInit();
          // Success
          this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
        } else {
          // Query Error
          this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
        }
      },
      (error) => {
        this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
        console.log('Error', error)
      }
    )
  }
  

  getUserList(object){
    var params = {
      url: 'admin/userList',
      data: object
    }

    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
          this.pages = response.body.pages * 10;
          // Success
          if(this.cusID == undefined){
          this.userList = response.body.data.users
          this.markers = response.body.data.users

          // console.log("user",this.OveruserList)

          }
          // console.log(this.userList)
        } else {
          // Query Error
          this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
        }
      },
      (error) => {
        this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
        console.log('Error', error)
      }
    )
  }

  exportList(event : any){
    const object = { pageNumber: this.page, limit: this.limitValue, signupDate: this.singnupdate }
    var params = {
      url: 'admin/userList',
      data: object
    }

    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
          this.pages = response.body.pages * 10;
          // Success
          if(this.cusID == undefined){
          this.userList = response.body.data.users
          }
          // console.log(this.userList)
          if(response.body.data.users.length > 0){
            this.exportUserData(response.body.data.users)
          }

        } else {
          // Query Error
          this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
        }
      },
      (error) => {
        this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
        console.log('Error', error)
      }
    )
  }

  exportUserData(data) {
    if(data.length > 0){
      var userArray = []
      data.forEach(element => {
        var obj = {}
        obj['customerID'] = element.customerID
        obj['firstName'] = element.firstName
        obj['lastName'] = element.lastName
        obj['email'] = element.email
        obj['countryCode'] = element.countryCode
        obj['mobileNumber'] = element.mobileNumber
        obj['os'] = element.os
        obj['DOB'] = element.DOB
        obj['gender'] = element.gender
        obj['signupDate'] = element.signupDate
        obj['signupDateTime'] = element.signupDateTime
        obj['lastOrder'] = element.lastOrder
        obj['walletAmount'] = element.walletAmount
        obj['packageValue'] = element.packageValue
        obj['addressPinDetails'] = element.addressPinDetails
        userArray.push(obj)
      })
      this.usercsvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'User Report',
        useBom: true,
        noDownload: false,
        headers: ["Customer ID", "First Name", "Last Name", "Email", "Country Code", "Mobile Number", "Os", "DOB", "Gender", "Signup Date", "Signup Time", "Last Order", "Wallet Amount", "Package Amount", "Address pin Details"]
      };
      new  AngularCsv(userArray, "Customer Report", this.usercsvOptions);
    }
  }

  logExportList(event : any){
    const object = {id : this.userViewId,fromDate: this.valueFrom, toDate: this.valueTo}
    var params = {
      url: 'admin/viewUser',
      data: object
    }

    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
         // Success
          if(this.cusID == undefined){
           
            this.userOrderList = response.body.data.orderList
          }
          // console.log(this.userList)
          if(response.body.data.orderList.length > 0){
            this.logexportUserData(response.body.data.orderList)
          }

        } else {
          // Query Error
          this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
        }
      },
      (error) => {
        this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
        console.log('Error', error)
      }
    )
  }

  logexportUserData(data) {
    if(data.length > 0){
      var userArray = []
      data.forEach(element => {
        var obj = {}
        obj['orderOn'] = element.orderOn
        obj['orderIDs'] = element.orderIDs
        obj['grandTotal'] = element.grandTotal
        obj['paytype'] = element.paytype
        userArray.push(obj)
      })
      this.usercsvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'User Report',
        useBom: true,
        noDownload: false,
        headers: ["Entry", "Order", "Price", "PayType"]
      };
      new  AngularCsv(userArray, "Customer Report", this.usercsvOptions);
    }
  }

  onSubmit(){
    var params = {
      url: 'admin/trustUserActive',
      data: this.trustUserForm.value
    }

    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        // console.log(response.body)
        if (response.body.error === 'false') {

          $('#cust_btn').modal('hide');
          this.ngOnInit();
          // Success
          this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
        } else {
          // Query Error
          this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
        }
      },
      (error) => {
        this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
        console.log('Error', error)
      }
    )
  }

  searchUser(value : any ) {
    const object = { pageNumber: 1, text:value,  limit: this.limitValue, signupDate: this.singnupdate }
    this.getUserList(object)
  }

  viewUserListData(id){
    var params = {
      url: 'admin/viewUser',
      data: {id : id}
    }
    
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
          // console.log(response.body.data.userList)
          this.userList = response.body.data.userList

          // console.log(this.userList)
        } else {
          // Query Error
          this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
        }
      },
      (error) => {
        this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
        console.log('Error', error)
      }
    )
  }

  rangevalueFrom(event: any){
    this.valueFrom= this.datePipe.transform(event, 'yyyy-MM-dd');
    this.viewUser(this.userViewId,this.valueFrom,this.valueTo)
  }

  rangevalueTo(event: any){
    this.valueTo = this.datePipe.transform(event, 'yyyy-MM-dd');
    this.viewUser(this.userViewId,this.valueFrom,this.valueTo)
  }

viewUser(id,valueFrom,valueTo){
     this.userViewId = id;
     this.valueFrom = valueFrom;
     this.valueTo = valueTo;
  var params = {
    url: 'admin/viewUser',
    data: {id : this.userViewId,fromDate: this.valueFrom, toDate: this.valueTo}
  }

    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
          // console.log(response.body)
          var status = true
          if(response.body.data.users.trustUser == 'false'){
            var status = false
          }

          this.trustUserForm = this.formBuilder.group({
            trustUser: [status,  [Validators.required, Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
            packageValue: [response.body.data.users.packageValue,  [Validators.required, Validators.pattern("[+-]?([0-9]*[.])?[0-9]+")]],
            id: [response.body.data.users.id,  [Validators.required, Validators.pattern("[+-]?([0-9]*[.])?[0-9]+")]],
          })

          
          this.trustUserForm.get('id').setValue(response.body.data.users.id)
          this.customerID = response.body.data.users.customerID
          this.firstName = response.body.data.users.firstName
          this.lastName = response.body.data.users.lastName
          this.email = response.body.data.users.email
          this.addressPinDetails = response.body.data.users.addressPinDetails
          this.countryCode = response.body.data.users.countryCode

          this.mobileNumber = response.body.data.users.mobileNumber
          this.os = response.body.data.users.os
          this.DOB = response.body.data.users.DOB
          this.gender = response.body.data.users.gender

          this.signupDate = response.body.data.users.signupDate

          this.lastOrder = response.body.data.users.lastOrder
          this.lastOrdertime = response.body.data.users.lastOrdertime
          this.orders = response.body.data.users.orders
          this.amount = response.body.data.users.amount
          this.walletAmount = response.body.data.users.walletAmount
          this.userPoints = response.body.data.users.userPoints
          this.cancellation = response.body.data.users.cancellation
          
          
          this.userOrderList = response.body.data.orderList


          // console.log(response.body.data.orderList)
        } else {
          // Query Error
          this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
        }
      },
      (error) => {
        this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
        console.log('Error', error)
      }
    )
  }

}


// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

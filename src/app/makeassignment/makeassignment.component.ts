import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-makeassignment',
  templateUrl: './makeassignment.component.html',
  styleUrls: ['./makeassignment.component.css']
})
export class MakeassignmentComponent implements OnInit {

  orderList: any;
  selection = [];
  orderIds :string [] = [];
  driverList: any;

  isShowDriver = false;
  isShowStore = false;

  driverName: string;
  driverID: string;
  driverImage: string;
  driverOrders:any;
  longitude:any;
  latitude: any;
  dID: number;
  storeList: any;
  distance: any;
  originalArray: any;
  drop: any;
  pickup: any;
  total: any;
  driverhtml = false;

  lat: number = 24.774265;
  lng: number = 46.738586;

  markers: marker[] = []
  markers1 : marker[] = []
  markerDriver : marker[] = []
  zoom: number = 5;
  public StoreiconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
  public DrivericonUrl = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
  public UsericonUrl = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
  showAccept = 'true';

  previous;
  previous1;
  previous2;
  constructor(
    private apiCall: ApiCallService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.assignOrderList()
    this.getDriverList()
    this.callRolePermission()
  }

  callRolePermission(){
    if(sessionStorage.getItem('adminRole') !== 'superadmin'){
      let orderpermission = JSON.parse(sessionStorage.getItem('permission'))
      // console.log(orderpermission[0].readOpt)
      this.showAccept = orderpermission[1].writeOpt
      // console.log(">>>", this.showAccept)
    }
  }

  getSelection(item) {
    return this.selection.findIndex(s => s.id === item.id) !== -1;
  }

  getDriverList(){
    const object  = { driverActive: 1, isComplete: 1 }

    var params = {
      url: 'admin/getDriverList',
      data: object
    }

    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        // console.log(response.body)
        if (response.body.error === 'false') {
          // Success
          // console.log(response.body)
          this.driverList = response.body.data.driver
          // this.markerDriver = response.body.data.driver
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

  clickedMarker(infowindow){
    if (this.previous) {
      this.previous.close();
      }
      this.previous = infowindow;
  }

  clickedMarker1(infowindow1){
    if (this.previous1) {
      this.previous1.close();
      }
      this.previous1 = infowindow1;
  }

  clickedMarker2(infowindow2){
    if (this.previous2) {
      this.previous2.close();
      }
      this.previous2 = infowindow2;
  }

  changeHandler(item: any, event: KeyboardEvent) {
    const id = item.id;

    const index = this.selection.findIndex(u => u.id === id);
    if (index === -1) {
      // ADD TO SELECTION
      // this.selection.push(item);
      this.selection = [...this.selection, item];
    } else {
      // REMOVE FROM SELECTION
      this.selection = this.selection.filter(user => user.id !== item.id)
      // this.markers = this.selection
      // this.selection.splice(index, 1)
    }
    
    
    if(this.selection.length > 0){
      this.isShowDriver = true
      const object = { latitude: this.latitude, longitude: this.longitude, driverId: this.dID, orderId: JSON.stringify(this.selection) }

      this.changeOrder(object)
    } else {
      this.distance = []
      this.storeList = []
      this.latitude = null
      this.longitude = null
      this.dID = null
      this.isShowDriver = false
    }
    // console.log(this.selection)
  }

  listOrderChanged(data){
    // console.log(data)
    this.distance = data
  }

  searchOrders(value){
    this.orderList
    // console.log(this.orderList)
    // console.log(value)
    var orderIDs = '#Ord'+value

    var sortOrder = this.originalArray.filter(function(item) {
      return item.orderIDs.toLowerCase().indexOf(orderIDs.toLowerCase()) >= 0
     })
     this.orderList = sortOrder
    //  console.log(this.selection)
  }

  searchDrivers(value){

  }

  changeOrder(object){
    var params = {
      url: 'admin/findDriverAssignOrder',
      data: object
    }
    if(this.latitude && this.longitude && this.dID) {
      this.apiCall.commonPostService(params).subscribe(
        (response: any) => {
          // console.log(response.body)
          if (response.body.error === 'false') {
            // Success
            // console.log(response.body)
            this.storeList = response.body.data.store
            this.drop = response.body.drop
            this.pickup = response.body.pickup
            this.total = response.body.total
            this.distance = response.body.data.distance
      
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
  
  driverAssign(){
    // console.log(this.distance)
    if(this.distance.length > 0 && this.latitude && this.longitude && this.dID){
      console.log(this.distance)

      const object = {}
      object['driverId'] = this.dID
      object['longitude'] = this.longitude
      object['latitude'] = this.latitude

      object['pickup'] = this.pickup
      object['drop'] = this.drop
      object['total'] = this.total
      object['route'] = JSON.stringify(this.distance)
      console.log("???",object)

      // return;

      var params = {
        url: 'admin/assignOrder',
        data: object
      }

      this.apiCall.commonPostService(params).subscribe(
        (response: any) => {
          // console.log(response.body)
          if (response.body.error === 'false') {
            // Success
            this.ngOnInit();
            this.router.navigateByUrl('/assignment');
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

    } else {
      
    }
  }

  selectDriver(values:any,data){

 
    this.driverName = data.firstName
    this.driverID = data.drId
    this.driverImage = data.profilePic
    this.driverOrders = data.totalOrderDelivered
    this.latitude = data.latitude
    this.longitude = data.longitude
    this.dID = data.id
    // console.log(data)
    if(values.currentTarget.checked === true){

      this.driverhtml = true;
      this.isShowStore = true;

    if(this.latitude && this.longitude && this.dID) {
    const object = { latitude: this.latitude, longitude: this.longitude, driverId: this.dID, orderId: JSON.stringify(this.selection) }

    var params = {
      url: 'admin/findDriverAssignOrder',
      data: object
    }
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        console.log(">>>",response.body)
        if (response.body.error === 'false') {
          // Success
          // console.log(response.body)
          this.storeList = response.body.data.store
          this.drop = response.body.data.drop
          this.pickup = response.body.data.pickup
          this.total = response.body.data.total
          this.distance = response.body.data.distance
          this.markers1 = response.body.data.distance
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
    }  else {
      this.driverhtml = false;
      this.isShowStore = false;
      
     }
 

  }

  assignOrderList(){
   var params = {
      url: 'admin/unAssignOrderList',
      data: {}
    }

    this.apiCall.commonGetService(params).subscribe(
      (response: any) => {
        // console.log(response.body)
        if (response.body.error === 'false') {
          // Success
          // console.log(response.body)
          this.orderList = response.body.data.orders
          this.originalArray = response.body.data.orders
          this.markers = response.body.data.orders
          // console.log(this.timeList)
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
  pageReload() {
    this.ngOnInit();
    window.location.reload();
  }

}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-makeassignment',
  templateUrl: './makeassignment.component.html',
  styleUrls: ['./makeassignment.component.css']
})
export class MakeassignmentComponent implements OnInit {

  as_driver_id : any;
  orderList: any;
  orderedList: any;
  or_edit: any;
  selection = [];
  orderIds :string [] = [];
  driverList: any;

  merged_order: any;

  isShowDriver = false;
  isShowStore = false;

  driverName: string;
  driverID: string;
  driverImage: string;
  driverOrders:any;
  longitude:any;
  latitude: any;
  dID: number;
  storeList = [];
  storeedList: any;
  distance: any;
  new_check: any;
  originalArray: any;
  drop: any;
  pickup: any;
  total: any;
  driverhtml = false;
  isEdit =  false;
  isDriverSelect = false;
  orderRouteId: any;
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
  previousDriver;
  searchord;
  mergeOrder;
  searchDriv;
  searchStore;
  constructor(
    private apiCall: ApiCallService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.getDriverList();
    this.assignOrderList();
    this.callRolePermission();
   
  }


  assignedOrderList(){
    var params = {
       url: 'admin/editUnAssignOrderList',
       data: {orderRoute: this.orderRouteId}
     }
     this.apiCall.commonPostService(params).subscribe(
       (response: any) => {
        if (response.body.error === 'false') {
          this.orderedList = response.body.data.orders
          this.merged_order = this.orderList.concat(this.orderedList);
          this.orderedList.filter((val) =>{
              this.as_driver_id = val.as_driverId
              delete val.as_driverId
          });
          this.editDriverList(this.as_driver_id);
            // this.orderedList = response.body.data.orders[0]
            // this.storeedList = response.body.data.storeList
            // response.body.data.orders[0].storeList = response.body.data.storeList
            // this.or_edit = response.body.data.orders[0]
            // let dr_id = this.orderedList?.as_driverId
            
         } else {
           this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
         }
       },
       (error) => {
         this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
       }
     )
   }

    checkorder(item){
      return this.orderedList.includes(item)
    }

    checkdriver(item){
      if(this.isEdit){
        return true
      }
    }

  assignOrderList(){
    var params = {
       url: 'admin/unAssignOrderList',
       data: {}
     }
 
     this.apiCall.commonGetService(params).subscribe(
       (response: any) => {
         if (response.body.error === 'false') {
           this.orderList = response.body.data.orders
           this.originalArray = response.body.data.orders
           this.markers = response.body.data.orders
           this.route.params.subscribe(params => {
            this.orderRouteId = params['id']
            if(this.orderRouteId){
              this.isEdit = true;
              this.assignedOrderList();
            } 
          });
         } else {
           this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
         }
       },
       (error) => {
         this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
         //console.log('Error', error)
       }
     )
   }
 
   editDriverList(dr_id){

    this.selection = this.orderedList;
    if(this.driverList){
      let dr_da = this.driverList?.filter((value)=>{
       if(value.id == dr_id){
        return value
       }
      });
    
    this.driverName = dr_da[0].firstName
    this.driverID = dr_da[0].drId
    this.driverImage = dr_da[0].profilePic
    this.driverOrders = dr_da[0].totalOrderDelivered
    this.latitude = dr_da[0].latitude
    this.longitude = dr_da[0].longitude
    this.dID = dr_da[0].id
    const object = { latitude: this.latitude, longitude: this.longitude, driverId: this.dID, orderId: JSON.stringify(this.selection), edit:true }
    this.changeOrder(object)
    this.driverhtml = true;
    }
   }


  getDriverList(){
    const object  = { driverActive: 1, isComplete: 1 }

    var params = {
      url: 'admin/getDriverList',
      data: object
    }
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error === 'false') {
          this.driverList = response.body.data.driver
          console.log("driver",this.driverList)
        } else {
          this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
        }
      },
      (error) => {
        this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
        console.log('Error', error)
      }
    )
  }


  callRolePermission(){
    if(sessionStorage.getItem('adminRole') !== 'superadmin'){
      let orderpermission = JSON.parse(sessionStorage.getItem('permission'))
      this.showAccept = orderpermission[1].writeOpt
    }
  }

  getSelection(item) {
    return this.selection.findIndex(s => s.id === item.id) !== -1;
  }

  changeHandler(item: any, event: KeyboardEvent) {
    const id = item.id;

    const index = this.selection.findIndex(u => u.id === id);
    if (index === -1) {
      item.isnew = true
      this.selection = [...this.selection, item];
      this.getDriverList();
    } else {
      item.isnew = false
      this.selection = this.selection.filter(user => user.id !== item.id)
    }
    
    
    if(this.selection.length > 0){
      this.isShowDriver = true
      this.selection = this.selection.filter((item)=>{
        return item.isnew
      })
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
  }


  changeOrder(object){
    if(this.isEdit){
      object.edit = true
    }
    var params = {
      url: 'admin/findDriverAssignOrder',
      data: object
    }
    
    if(this.latitude && this.longitude && this.dID) {
      this.apiCall.commonPostService(params).subscribe(
        (response: any) => {
          if (response.body.error === 'false') {
            // console.log("0th---->", response.body.data);
            this.storeList = response.body.data.store
            this.drop = response.body.data.drop
            this.pickup = response.body.data.pickup
            this.total = response.body.data.total
            this.distance = response.body.data.distance  
                 
          } else {
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
  


  selectDriver(values:any,data){ 
    console.log("select")
    this.isDriverSelect = true;
    this.driverName = data.firstName
    this.driverID = data.drId
    this.driverImage = data.profilePic
    this.driverOrders = data.totalOrderDelivered
    this.latitude = data.latitude
    this.longitude = data.longitude
    this.dID = data.id
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
        if (response.body.error === 'false') {
          this.storeList = response.body.data.store
          this.drop = response.body.data.drop
          this.pickup = response.body.data.pickup
          this.total = response.body.data.total
          this.distance = response.body.data.distance
          this.markers1 = response.body.data.store
        } else {
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

  clickedDriverMark(infowindowDiver){
    if (this.previousDriver) {
      this.previousDriver.close();
      }
      this.previousDriver = infowindowDiver;
  }

 


  listOrderChanged(data){
    this.distance = data
  }

  searchOrders(value){
    this.orderList
    var orderIDs = '#Ord'+value

    var sortOrder = this.originalArray.filter(function(item) {
      return item.orderIDs.toLowerCase().indexOf(orderIDs.toLowerCase()) >= 0
     })
     this.orderList = sortOrder
  }

  searchDrivers(value){
  }


  driverAssign(){
    if(this.distance.length > 0 && this.latitude && this.longitude && this.dID){
      const object = {}
      if(this.isEdit){
        object['id'] = this.orderRouteId
        object['driverId'] = this.dID
        object['longitude'] = this.longitude
        object['latitude'] = this.latitude
        object['pickup'] = this.pickup
        object['drop'] = this.drop
        object['total'] = this.total
        object['route'] = JSON.stringify(this.distance)
        var params = {
          url: 'admin/editassignOrder',
          data: object
        }
      }else{
        object['driverId'] = this.dID
        object['longitude'] = this.longitude
        object['latitude'] = this.latitude
        object['pickup'] = this.pickup
        object['drop'] = this.drop
        object['total'] = this.total
        object['route'] = JSON.stringify(this.distance)
        var params = {
          url: 'admin/assignOrder',
          data: object
        }
      }

      this.apiCall.commonPostService(params).subscribe(
        (response: any) => {
          if (response.body.error === 'false') {
            this.ngOnInit();
            this.router.navigateByUrl('/assignment');
            this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
          } else {
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
interface MarkerLabel {
  color: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  text: string;
}

import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiCallService } from '../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import {} from '@agm/core/services/google-maps-types';
import { MapsAPILoader } from '@agm/core';


declare var $:any;
declare var google: any;



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [NgbRatingConfig,DatePipe],
})

export class DashboardComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;

  datePickerConfig:Partial<BsDatepickerConfig>;
  bsValue: Date = new Date();
  customer: any = [];
  driver: any = [];
  store: any = [];
  product: any =[];
  maps: any =[];
  heatcoords: any =[];
  pr_name: any = [];
  pr_qty: any =[];
  data_lat_lan: any=[];
  statCount: any;
  storesList: any[];
  driversList: any[];
  dashOrdersList:any[];
  feedback:any[];
  appFeedback:any[];
  notification:any[];
  pages: any;
  page : Number =1;
  selected = 0;
  hovered = 0;
  doughnutChart:any[];
  genderChart:any[];
  orderChart:any[];
  ageChart:any[];
  cclabel:any = [];
  genderlabel:any = [];
  agelabel:any = [];
  agelabe2:any = [];
  ordlabel:any = [];
  ordlabel1:any = [];
  revlabel:any = [];
  revdata:any = [];
  delivered:any;
  assigned:any;
  cancelled:any;
  pending:any;
  totalOrders:any;
  totalProducts:any;
  totalOffers:any;
  orderId : number;
  graphFrom = ''
  graphTo = ''

  heatFrom = ''
  heatTo = ''

  notibtn: any;
  showAccept = 'true';
  searchDriver;
  searchStore;

  title = 'My first AGM project';
  lat:number;
  lng: number;
  hlat:any = [];
  hlng:any = [];
  heatlat :any = [];
  heatlng :any = [];
  hhhcoords = [];

  map: google.maps.Map;
  heatmapping: google.maps.visualization.HeatmapLayer;

  // private map: google.maps.Map = null;
  // private heatmapping: google.maps.visualization.HeatmapLayer = null;

  constructor(private formBuilder:FormBuilder,
    private apiCall: ApiCallService,private route: ActivatedRoute,
    private config: NgbRatingConfig,
    private datePipe: DatePipe,
    private mapsApiLoader: MapsAPILoader,
    ) {config.max = 5;}
  

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Orders' },
  ];
  public lineChartLabels: Label[] = this.ordlabel1;
  public lineChartOptions = {
    responsive: true,
  };

  public revenueChartData: ChartDataSets[] = [
    { data: [], label: 'Amount' },
  ];
  public revenueChartLabels: Label[] = this.ordlabel1;

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  public ChartType = 'bar';


  public genderChartLabels: string[] = ['male','female'];
  public genderChartData: number[] = this.genderlabel;

  public ageChartLabels: string[] = this.agelabe2;
  // public ageChartData: number[] = this.agelabel;

  public ageChartData: ChartDataSets[] = [
    { data: [], label: 'Users' },
    
  ];

  chartOptions = {
    responsive: true
  };
  
  
  public barChartOptions = 
  {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public barChartLabels = this.pr_name;
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartData = [
    {data: this.pr_qty, label: 'Series A'}
  ];

  ngOnInit(): void {

    const activeMenu = document.getElementById('orders');
    activeMenu.classList.remove('active');

    var params = {
      url: 'admin/topStats',
      data: ""
    }
    this.apiCall.commonPostService(params).subscribe((result:any)=>{
      if(result.body.error == "false")
      {
          
          this.customer = result.body.data.customer;
          this.driver = result.body.data.driver;
          this.store = result.body.data.store;
      }
    });
    

    let cu_yr = new Date().getFullYear();
    let statuscount = {
      url: "admin/dashboard",
      data: {"year": cu_yr}
    }
  
    this.apiCall.commonPostService(statuscount).subscribe((result:any)=>{
      let resu = result.body;
 
      if(resu.error == "false")
      {
           this.statCount = resu.data.orderStatusCount;
           this.delivered = resu.data.orderStatusCount.delivered;
           this.assigned = resu.data.orderStatusCount.assigned;
           this.cancelled = resu.data.orderStatusCount.cancelled;
           this.pending = resu.data.orderStatusCount.pending;
           this.totalOrders = resu.data.orderStatusCount.totalOrders;
           this.totalProducts = resu.data.orderStatusCount.totalProducts;
           this.totalOffers = resu.data.orderStatusCount.totalOffers;
           this.storesList = resu.data.stores;
           this.driversList = resu.data.driver;
           this.feedback = resu.data.feedback;
           this.appFeedback = resu.data.appFeedback;
           this.notification = resu.data.notification;
           
           this.orderChart = resu.data.ordersAndRevenueGraph;

           for(let ord of this.orderChart){
            this.ordlabel1.push(ord.month);
            this.ordlabel.push(ord.orders);
           }
           this.lineChartData[0].data = this.ordlabel;

           for(let reven of this.orderChart){
            this.revlabel.push(reven.month);
            this.revdata.push(reven.amount);
           }
           this.revenueChartData[0].data = this.revdata;
 
           this.genderChart = resu.data.genderGraph;

           for(let gcc of this.genderChart){
            this.genderlabel.push(gcc.users);
           }

           this.ageChart = resu.data.ageGraph;

           for(let agess of this.ageChart){
            this.agelabe2.push(agess.age);
            this.agelabel.push(agess.users);
           }
           this.ageChartData[0].data = this.agelabel;


      }else{
        this.apiCall.showToast(resu.message, 'Error', 'errorToastr')
      }
    },(error)=>{
       console.error(error);
    });
    // this.route.params.subscribe(params => this.page = parseInt(params['total']));
    const object = { pageNumber: this.page}
    this.getOrderList(object)

    this.topselling({fromDate: this.graphFrom, toDate: this.graphTo})
    this.heatmap({fromDate: this.heatFrom, toDate: this.heatTo})
    this.callRolePermission()

    this.mapsApiLoader.load().then(() => {
      this.initMap();
    });
  }

  callRolePermission(){
    if(sessionStorage.getItem('adminRole') !== 'superadmin'){
      let orderpermission = JSON.parse(sessionStorage.getItem('permission'))
      // console.log(orderpermission[0].read)
      this.showAccept = orderpermission[0].writeOpt
    }
  }

  
  
  updateOrderStatus(id,status){
    var params = {
      url: 'admin/calcelledOrder',
      data: { orderId: id, status: status }
    }
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error === 'false') {
          // Success
          this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
          this.ngOnInit();
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

  topselling(object){
    var params = {
      url: 'admin/topSellingItems',
      data: object
    }


    this.apiCall.commonPostService(params).subscribe((result:any)=>{
      
      if(result.body.error == "false")
      {   
           this.product = result.body.data.product;
           for(let abc of this.product )
           {
              this.pr_name.push(abc.productName);
              this.pr_qty.push(abc.qty);
           }
      }
    });
  }

  heatmap(object){
    var params = {
      url: 'admin/heatMap',
      data: object
    }

    this.apiCall.commonPostService(params).subscribe((result:any)=>{
      
      if(result.body.error == "false")
      {   
           this.maps = result.body.data.map;
      }

      
    });
  }

    initMap() {
    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      zoom: 4,
      center: new google.maps.LatLng(24.774265, 46.738586),
      // mapTypeId: google.maps.MapTypeId.SATELLITE,
      zoomControl: true,
      streetViewControl: false,
      disableDefaultUI: true,
    });

    this.heatmapping = new google.maps.visualization.HeatmapLayer({
      data: this.getPoints(),
      map: this.map,
    });
  }

  getPoints() {
    // create points
    var params = {
      url: 'admin/heatMap',
      data: ({fromDate:"",toDate:""})
    }

    this.apiCall.commonPostService(params).subscribe((result:any)=>{
      
      if(result.body.error == "false")
      {   
           this.heatcoords = result.body.data.map;
           
          //  console.log("jijij",this.heatcoords)
        var hhhcoords = [];

          for(var i=0; i<this.heatcoords.length; i++){

           hhhcoords[i] = {"lat": this.heatcoords[i].latitude, "lng": this.heatcoords[i].longitude}
       console.log("mmmm", hhhcoords)

          }
          // console.log("cccc",this.hhhcoords)
      }
  
      // this.heatlat.push(coords.latitude);
      // this.heatlng.push(coords.longitude);

      //  let markers: marker[] = hhhcoords;
  
   
    
    });

    let markers: marker[] = [
      { "lat": -23, "lng": -46 }, { "lat": -24, "lng": -53 }, { "lat": -23, "lng": -46 }
    ];
      console.log("koko",markers)

  // transforming points
  return markers.map(point =>
    new google.maps.LatLng(point.lat, point.lng));
    
  }


  salesvalueFrom(event: any){
    this.graphFrom= this.datePipe.transform(event, 'yyyy-MM-dd');
    this.topselling({fromDate: this.graphFrom, toDate: this.graphTo})
  }

  salesvalueTo(event: any){
    this.graphTo = this.datePipe.transform(event, 'yyyy-MM-dd');
    this.topselling({fromDate: this.graphFrom, toDate: this.graphTo})
  }

  heatvalueFrom(event: any){
    this.heatFrom= this.datePipe.transform(event, 'yyyy-MM-dd');
    this.heatmap({fromDate: this.heatFrom, toDate: this.heatTo})
  }

  heatvalueTo(event: any){
    this.heatTo = this.datePipe.transform(event, 'yyyy-MM-dd');
    this.heatmap({fromDate: this.heatFrom, toDate: this.heatTo})
  }


  nextPage(page){
    const object = { pageNumber: page}
    this.getOrderList(object)
  }


  
  getOrderList(object){
    let dashOrders = {
      url: "admin/dashboardOrder",
      data: object
    }

    this.apiCall.commonPostService(dashOrders).subscribe((result:any)=>{
      let resu = result.body;
     
      if(resu.error == "false")
      {
        // console.log("resssss", resu);
        this.pages = resu.data.total * 10;
           this.dashOrdersList = resu.data.orders;
      // console.log("pages",this.pages);
      }else{
        this.apiCall.showToast(resu.message, 'Error', 'errorToastr')
      }
    },(error)=>{  
       console.error(error);
    });
  }

  // searchDrivers(value){
  //   this.driversList
  //   // console.log("li",this.driversList)
  //   console.log("val",value)
  //   var driverIDs = value
  //   console.log("->>>>>>>>>",driverIDs)

  //   var sortOrder = this.driversList.filter(function(item) {
  //     return item.firstName.toLowerCase().indexOf(driverIDs.toLowerCase()) >= 0
  //    })
  //    console.log("ss",sortOrder)
  //    this.driversList = sortOrder
    
  // }
  // searchStores(value){
  //   this.storesList
  //   // console.log(this.storesList)
  //   // console.log("val",value)
  //   var storeIDs = value

  //   var sortOrder = this.storesList.filter(function(item) {
  //     return item.storeName.toLowerCase().indexOf(storeIDs.toLowerCase()) >= 0
  //    })
  //    this.storesList = sortOrder
  //   //  console.log(this.selection)
  // }

  notify(driverid,type,id){
    let notificat = {
      url: "admin/dashboardPush",
      data: {driverIds : driverid,type:type,id:id}
    }
// console.log(notificat)
    this.apiCall.commonPostService(notificat).subscribe((result:any)=>{
      let resu = result.body;
     
      if(resu.error == "false")
      {
        this.apiCall.showToast(resu.message, 'Success', 'successToastr')
        this.notibtn = resu.error;
        this.ngOnInit();
      }else{
        this.apiCall.showToast(resu.message, 'Error', 'errorToastr')
      }
    },(error)=>{  
       console.error(error);
    });
  }

}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  // draggable: boolean;
}
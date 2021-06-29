
export interface ChartType {
    chart?: any;
    plotOptions?: any;
    colors?: any;
    series?: any;
    stroke?: any;
    fill?: any;
    labels?: any;
    markers?: any;
    legend?: any;
    xaxis?: any;
    yaxis?: any;
    tooltip?: any;
    grid?: any;
    datasets?: any;
    options?: any;
    toolbar?: any;
    type?: any;
    height?: any;
    dataLabels?: any;
    sparkline?: any;
    responsive?: any;
    states?: any;
    title?: any;
    subtitle?: any;
  }
  

const columnlabelChart: ChartType = {
    chart: {
        height: 350,
        type: 'bar',
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            dataLabels: {
                position: 'top',  // top, center, bottom
            },
        }
    },
    stroke: {
        show: true,
        width: 4,
        colors: ['transparent']
    },
    dataLabels: {
        enabled: true,
        formatter: (val) => {
            return val + '%';
        },
        offsetY: -20,
        style: {
            fontSize: '12px',
            colors: ['#304758']
        }
    },
    colors: ['#C4CBCE', '#62CA55'],
    series: [{
        name: 'Last',
        data: [2.5, 3.2, 5.0, 10.1, 4.2]
    },
    {
        name: 'Current',
        data: [2.5, 3.2, -5.0, 20, -4.2]
    }],
    
    xaxis: {
        categories: ['Orders', 'Customers', 'Downloads', 'Gross R.', 'Net R.'],
        position: 'bottom',
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        crosshairs: {
            fill: {
                type: 'gradient',
                gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                }
            }
        },
        tooltip: {
            enabled: false,
            offsetY: -35,
        }
    },
    fill: {
        gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
        },
    },
    yaxis: {
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: true,
            formatter: (val) => {
                return val + '%';
            }
        }
    },
    title: {
        // text: 'Monthly Inflation in Argentina, 2002',
        // floating: true,
        offsetY: 320,
        align: 'center',
        style: {
            color: '#444'
        }
    },
    legend: {
        offsetY: 7
    }
};

const OrdersGraph: ChartType = {
    chart: {
        height: 380,
        type: 'line',
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false,
        }
    },
    colors: ['#2196F3', '#F14948'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [3, 4],
        curve: 'straight',
        dashArray: [8, 8]
    },
    series: [{
        name: 'Total Orders',
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
    },
    {
        name: 'Cancelled Orders',
        data: [36, 42, 60, 42, 13, 18, 29, 37, 36, 51, 32, 35]
    }
    ],
    // title: {
    //     text: 'Page Statistics',
    //     align: 'left'
    // },
    markers: {
        size: 0,

        hover: {
            sizeOffset: 6
        }
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct',
            'Nov', 'Dec',
        ],
    },
    tooltip: {
        y: [{
            title: {
                formatter: (val) => {
                    return val;
                }
            }
        }, {
            title: {
                formatter: (val) => {
                    return val;
                }
            }
        }, {
            title: {
                formatter: (val) => {
                    return val;
                }
            }
        }]
    },
    grid: {
        borderColor: '#f1f1f1',
    }
};

const genderDonutChart: ChartType = {
    labels: [
        'Male', 'Female'
    ],
    datasets: [
        {
            data: [300, 210],
            backgroundColor: [
                '#F14948', '#F38DA3'
            ],
            hoverBackgroundColor: ['#F14948', '#F38DA3'],
            hoverBorderColor: '#fff',
        }],
    options: {
        cutoutPercentage: 30,
        maintainAspectRatio: false,
        legend: {
            position: 'top',
        }
    }
};

const ageDonutChart: ChartType = {
    labels: [
        '12-18', '41+','26-40','19-25'
    ],
    datasets: [
        {
            data: [40,50,60,70],
            backgroundColor: [
                '#2196F3', '#E4F2FE','#C8E5FC','#90CBF9'
            ],
            hoverBackgroundColor: ['#2196F3', '#E4F2FE','#C8E5FC','#90CBF9'],
            hoverBorderColor: '#fff',
        }],
    options: {
        cutoutPercentage: 30,
        maintainAspectRatio: false,
        legend: {
            position: 'top',
        }
    }
};

const payDonutChart: ChartType = {
    labels: [
        'COD', 'CASH'
    ],
    datasets: [
        {
            data: [40,50],
            backgroundColor: [
                '#62CA55', '#80E4A9'
            ],
            hoverBackgroundColor: ['#62CA55', '#80E4A9'],
            hoverBorderColor: '#fff',
        }],
    options: {
        cutoutPercentage: 30,
        maintainAspectRatio: false,
        legend: {
            position: 'top',
        }
    }
};

const grossRevGraph: ChartType = {
    chart: {
        height: 380,
        type: 'line',
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false,
        }
    },
    colors: ['#2196F3', '#F14948','#FFFF00','#800080','#62CA55'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [2, 2, 2, 2, 2],
        curve: 'straight',
        dashArray: [0,0,0,0,0]
    },
    series: [{
        name: 'Store A',
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
    },
    {
        name: 'Store B',
        data: [36, 42, 60, 42, 13, 18, 29, 37, 36, 51, 32, 35]
    },
    {
        name: 'Store C',
        data: [0,10,20,50,90,45,67,89,90,10,11,25]
    },
    {
        name: 'Delivery',
        data: [10,20,30,40,50,65,77,89,90,60,81,95]
    },
    {
        name: 'Total',
        data: [20,30,40,60,70,0,7,9,26,15,10,45]
    }
    ],
    markers: {
        size: 0,

        hover: {
            sizeOffset: 6
        }
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct',
            'Nov', 'Dec',
        ],
    },
    tooltip: {
        y: [{
            title: {
                formatter: (val) => {
                    return val;
                }
            }
        }, {
            title: {
                formatter: (val) => {
                    return val;
                }
            }
        }, {
            title: {
                formatter: (val) => {
                    return val;
                }
            }
        }]
    },
    grid: {
        borderColor: '#f1f1f1',
    }
};

const netRevGraph: ChartType = {
    chart: {
        height: 380,
        type: 'line',
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false,
        }
    },
    colors: ['#2196F3', '#F14948','#62CA55'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [3, 3, 3],
        curve: 'straight',
        dashArray: [8,8,8]
    },
    series: [{
        name: 'Delivery',
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
    },
    {
        name: 'Stores',
        data: [36, 42, 60, 42, 13, 18, 29, 37, 36, 51, 32, 35]
    },
    {
        name: 'Total',
        data: [10,20,30,40,50,65,77,89,90,60,81,95]
    }
    ],
    markers: {
        size: 0,

        hover: {
            sizeOffset: 6
        }
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct',
            'Nov', 'Dec',
        ],
    },
    tooltip: {
        y: [{
            title: {
                formatter: (val) => {
                    return val;
                }
            }
        }, {
            title: {
                formatter: (val) => {
                    return val;
                }
            }
        }, {
            title: {
                formatter: (val) => {
                    return val;
                }
            }
        }]
    },
    grid: {
        borderColor: '#f1f1f1',
    }
};

const registerUsers: ChartType = {
    chart: {
        height: 380,
        type: 'line',
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false,
        }
    },
    colors: ['#2196F3', '#F14948','#62CA55'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [2, 2, 2],
        curve: 'straight',
        dashArray: [0,0,0]
    },
    series: [{
        name: 'iOS',
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
    },
    {
        name: 'Android',
        data: [36, 42, 60, 42, 13, 18, 29, 37, 36, 51, 32, 35]
    },
    {
        name: 'Driver Android',
        data: [10,20,30,40,50,65,77,89,90,60,81,95]
    }
    ],
    markers: {
        size: 0,

        hover: {
            sizeOffset: 6
        }
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct',
            'Nov', 'Dec',
        ],
    },
    tooltip: {
        y: [{
            title: {
                formatter: (val) => {
                    return val;
                }
            }
        }, {
            title: {
                formatter: (val) => {
                    return val;
                }
            }
        }, {
            title: {
                formatter: (val) => {
                    return val;
                }
            }
        }]
    },
    grid: {
        borderColor: '#f1f1f1',
    }
};
export {columnlabelChart,OrdersGraph,genderDonutChart,ageDonutChart,payDonutChart,
    grossRevGraph,netRevGraph,registerUsers};

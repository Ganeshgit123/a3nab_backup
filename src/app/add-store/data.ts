
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

  const storeOrderGraph: ChartType = {
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
    colors: ['#F14948'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [3],
        curve: 'straight',
        dashArray: [0]
    },
    series: [{
        name:'Orders',
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
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

const revenueGraph: ChartType = {
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
    colors: ['#F14948'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [3],
        curve: 'straight',
        dashArray: [0]
    },
    series: [{
        name:'Revenue',
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
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

const netRevenueGraph: ChartType = {
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
    colors: ['#F14948'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [3],
        curve: 'straight',
        dashArray: [0]
    },
    series: [{
        name:'Net Revenue',
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
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

const growthChart: ChartType = {
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
    colors: ['#62CA55'],
    series: [{
        name: 'Last',
        data: [2.5, 3.2, -5.0, 10.1]
    }
],
    
    xaxis: {
        categories: ['Orders', 'Customers', 'Revenue', 'Net Revenue'],
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

export {storeOrderGraph,revenueGraph,netRevenueGraph,growthChart};
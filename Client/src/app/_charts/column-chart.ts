export const columnChartOption: any = {
    chart: {
        type: "column"
    },
    title: {
        text: "Inventory Values"
    },
    subtitle: {
        text: "Monthwise Business (in millions)"
    },
    xAxis: {
        categories: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
    },
    yAxis: { 
        title: { text: "Business (millions)" }
    },
    series: [{
        name: 'Revenue',
        data: [49.2 ,61.3, 56.8, 46.2, 62.9, 70.4, 68.5, 74.6, 73.5, 74.6, 65.2, 71.5]
    }],
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    }
}
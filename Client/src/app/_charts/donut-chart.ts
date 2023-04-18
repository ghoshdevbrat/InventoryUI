export const donutChartOption: any = {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    title: {
        text: 'Utility wise Transactions'
    },
    subtitle: {
        text: 'Amount in Millions'
    },
    plotOptions: {
        pie: {
            innerSize: 100,
            depth: 45
        }
    },
    series: [{
        name: 'Delivered amount',
        data: [
            ['AC', 1000],
            ['ATM', 500],
            ['NVR', 500],
            ['CCTV', 1000],
            ['PMS', 500]           
        ]
    }]
}
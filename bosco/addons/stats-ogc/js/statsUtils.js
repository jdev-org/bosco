import Request from "./request.js";

export const requestStats = (params, uuidContainer, parcelleId) => {
    const nameRequest = uuidContainer;
    const service = "https://api.geosas.fr/stats-ogc/processes/sta-aggregate/execution";
    const postParams = {
        "aggregation": "mean",
        "echelle": "year",
        "format": "json",
        "url_sensorthings": `https://frost.geosas.fr/bosco/v1.0/Datastreams(3)`,
        "year_etude": 2022,
        ...params
      };
    const req = new Request(nameRequest, null, service, postParams);
    const onReq = ({response}) => {
        const series = [
            {data: response.mediane, name: "Médiane"},
            {data: response.mediane_annee_cible, name: "Médiane année"},
            {data: response.quartile_25, name: "Quartile 25"},
            {data: response.quartile_75, name: "Quartile 75"}
        ];

        createChart(series, uuidContainer, {
            title: {
                // text: `Soil Moisture climatology (${postParams.year_etude})`
                text: "Soil Moisture climatology 2017-2022"
            }
        })
    }
    req.setProcess(onReq);
    req.requestJson();
}



export const createChart = (series, container, additionalConfig) => {    
    if(!container) return;
    const defaultConfig = {
        title: {
            text: 'Soil Moisture climatology 2017-2022',
            align: 'left'
        },
        chart: {
            type: 'line'
        },
        legend: {
            align: 'center',
            verticalAlign: 'top',
        },
        xAxis : {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
             
        },
        yAxis: {
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }],
            title: {
                text: "Surface Soil Moisture %"
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            valueDecimals: 2,
            split: true
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 200
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    }
                }
            }]
        }
    }
    Highcharts.chart(container, {
        ...defaultConfig,
        ...additionalConfig,
        series
    });
    return;
}
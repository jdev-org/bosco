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
        // Create range area with q25 & q75
        let dataArea = [] ;
        let arrLength = response.quartile_25.length;
        for(let i = 0; i < arrLength; i++){
            dataArea.push([response.quartile_25[i],response.quartile_75[i]]);
        }
        const series = [
            {data: response.mediane,type: 'line', name: "Normale de saison (2017-2022)",color:'#4cbbe0',zIndex: 1},
            {data: response.mediane_annee_cible,type: 'line', name: "Année sélectionnée",color:'#204f9c',zIndex: 2,
            marker: {
                fillColor: 'white',
                lineWidth: 2,
                lineColor: '#204f9c'
            }},
            {data: dataArea, name: "Minimale - Maximale",type: 'arearange',lineWidth: 0,linkedTo: ':previous',color:'#4cbbe038',fillOpacity: 0.3,zIndex: 0,
            marker: {
                enabled: false
            }}
        ];

        createChart(series, uuidContainer, {
            title: {
                // text: `Soil Moisture climatology (${postParams.year_etude})`
                text: ""
            },
            yAxis: {
                title: {
                    text: "Teneur en eau de surface (%)"
                }
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
            type: 'line',
            style: {
                fontFamily: "Montserrat"
            }
        },
        legend: {
            align: 'center',
            verticalAlign: 'top',
        },
        xAxis : {
            categories: ['Jan', 'Fév', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
             
        },
        yAxis: {
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }],
            title: {
                text: "Teneur en eau de surface (%)"
            }
        },
        tooltip: {
            //pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            //shared: true,
            valueSuffix: '%',
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
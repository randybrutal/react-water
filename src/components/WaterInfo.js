import WaterCharts from './WaterCharts.js';
import React, { Component } from 'react';
import '../style/waterInfo.css';

    class WaterInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            cityName: {},
            zoneStationList: {},
            stationInfo: {},
            zone: [
                {
                    field: '北部',
                    code: ['65', '10017', '68', '10004', '10018', '10005']
                },
                {
                    field: '中部',
                    code: ['66', '10008', '10007', '10009', '10010', '10020']
                },
                {
                    field: '南部',
                    code: ['67', '64', '10013']
                },
                {
                    field: '東部',
                    code: ['10002', '10015', '10014']
                },
                {
                    field: '離島',
                    code: ['10016', '09020', '09007']
                }
            ]
        }
        // this.handleClick=this.handleClick.bind(this);
    }

    componentDidMount() {
        this.getCity();
        this.getReservoirRealTime();
    }

    getCity() {
        fetch('https://fhy.wra.gov.tw/WraApi/v1/Basic/City',{method:"GET"})
        .then(res => res.json())
        .then(data => {
            /*接到request data後要做的事情*/
            const cityName = {};
            data.forEach(item => {
                cityName[item.CityCode] = item.CityName_Ch;
            });
            this.setState({cityName: cityName});
            this.getReservoirStation();
        })
        .catch(e => {
            /*發生錯誤時要做的事情*/
            console.log(e);
        })
    }

    getReservoirStation() {
        fetch( 'https://fhy.wra.gov.tw/WraApi/v1/Reservoir/Station',{method: 'GET'})
        .then(res => res.json())
        .then(data => {
            /*接到request data後要做的事情*/
            const zoneStationList = {};
            data.forEach(item => {
                if (!zoneStationList[item.CityCode]) {
                    zoneStationList[item.CityCode] = [];
                }
                zoneStationList[item.CityCode].push({
                    name: item.StationName,
                    stationNo: item.StationNo
                });
            });
            this.setState({zoneStationList});
        })
        .catch(e => {
            /*發生錯誤時要做的事情*/
            console.log(e);
        })
    }

    getReservoirRealTime() {
        fetch( 'https://fhy.wra.gov.tw/WraApi/v1/Reservoir/RealTimeInfo',{method: 'GET'})
        .then(res => res.json())
        .then(data => {
            /*接到request data後要做的事情*/
            const stationInfo = {};
            data.forEach(item => {
                let date2 = new Date(item.Time);
                let localeString = date2.toLocaleString();
                stationInfo[item.StationNo] = {
                    effectiveStorage: item.EffectiveStorage,
                    percentageOfStorage: item.PercentageOfStorage,
                    waterHeight: item.WaterHeight,
                    time: localeString,
                    accumulatedRainfall: item.AccumulatedRainfall
                };
            });
            this.setState({stationInfo});
        })
        .catch(e => {
            /*發生錯誤時要做的事情*/
            console.log(e);
        })
    }

    render() {
        const stationList = this.state.zoneStationList;
        const stationInfo = this.state.stationInfo;

        let FieldList = this.state.zone.map(item => {
            let countryList = item.code.map(cell => {
                let station = <div></div>;

                if (stationList[cell]) {
                    // 水庫的組件
                    station = stationList[cell].map(station => {
                        if (stationInfo[station.stationNo] && stationInfo[station.stationNo].percentageOfStorage) {
                            const stationRealTime = stationInfo[station.stationNo] ? stationInfo[station.stationNo] : {};
                            return (
                                <div className="single-water" key={station.stationNo}>
                                    <div>{station.name}</div>
                                    <WaterCharts stationInfo={stationRealTime}/>
                                </div>
                            )
                        }
                        return false;
                    });
                }
                // 各縣市的組件
                console.log('station', station);
                return(
                    <div className="country-block" key={cell}>
                        <div>{this.state.cityName[cell]}</div>
                        <div className="line"></div>
                        {station}
                    </div>
                );
            });
            // 地區的組件
            if (countryList.length > 1) {
                return(
                    <div className="field-block" key={item.field}>
                        <div>{item.field}</div>
                        {countryList}
                    </div>
                )
            }
            return false;
        });

        return(
            <div className="water-info">
                {FieldList}
            </div>
        );
    }
}

export default WaterInfo;

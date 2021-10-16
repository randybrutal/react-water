import React, { Component } from 'react';
import { Liquid } from '@ant-design/charts';
import '../style/waterInfo.css';

class WaterCharts extends Component {
  constructor(props) {
    super(props);
    this.state={
      repoName: null,
      config: {}
    }
    // this.handleClick=this.handleClick.bind(this);
  }

  componentDidMount() {
    const config = {
        percent: this.props.stationInfo.percentageOfStorage / 100,
        outline: {
          border: 4,
          distance: 8,
        },
        wave: { length: 128 },
    }
    this.setState({config});

  }
  // componentWillMount() {
  //   fetch( 'https://fhy.wra.gov.tw/WraApi/v1/Basic/City',{method:"GET"})
  //   .then(res => res.json())
  //   .then(data => {
  //         /*接到request data後要做的事情*/
  //         this.setState({repoName: data[0]['CityName_Ch']});
  //   })
  //   .catch(e => {
  //       /*發生錯誤時要做的事情*/
  //       console.log(e);
  //   })
  // }
  // handleClick(){
  //   fetch( 'https://fhy.wra.gov.tw/WraApi/v1/Basic/City',{method:"GET"})
  //   .then(res => res.json())
  //   .then(data => {
  //         /*接到request data後要做的事情*/
  //         this.setState({repoName: data[0]['CityName_Ch']});
  //   })
  //   .catch(e => {
  //       /*發生錯誤時要做的事情*/
  //       console.log(e);
  //   })
  // }
  
  render() {
    return (
      <div className="water-chart">
        <Liquid {...this.state.config} />
        <div className="data-display">
          <div className="detail-text">更新時間: {this.props.stationInfo.time ? this.props.stationInfo.time : '---' }</div>
          <div className="detail-text">本日集水區累積降雨量: {this.props.stationInfo.accumulatedRainfall ? this.props.stationInfo.accumulatedRainfall : '---' } mm</div>
          <div className="detail-text">有效蓄水量: {this.props.stationInfo.effectiveStorage ? this.props.stationInfo.effectiveStorage : '---'} 萬立方公尺</div>
          <div className="detail-text">水位高度: {this.props.stationInfo.waterHeight ? this.props.stationInfo.waterHeight : '---'} 公尺</div>
        </div>
    	</div>
    )
  }
};

export default WaterCharts
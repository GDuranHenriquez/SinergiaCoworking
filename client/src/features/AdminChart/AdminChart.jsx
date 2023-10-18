import React, { Component } from "react";
import Chart from "react-apexcharts";
import styles from './chart.module.css';

class AdminChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: props.categories
        }
      },
      series: props.series
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart containerChart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              /* width={100} */
              height={'auto'}
              className={styles.chart}
              /* style={{width:'300px'}} */
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AdminChart;
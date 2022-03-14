import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import numeral from "numeral";
import "./LineGraph.css"
// // const buildChartData = (data, casesType = "cases") => {

// //   let Obj = {}
// //   let caseType, cases  =["cases","deaths","recovered"]
// //   for(let i = 0 ; i < 3 ; ++i ){
// //     caseType  = cases[i] ; 
// //     const chartData = [];
// //     let lastDataPoint = 0;
// //     console.log(caseType)

// //     for(let date in data.cases){
// //       if (lastDataPoint) {
// //         const newDataPoint = {
// //           x: date,
// //           y: data[caseType][date] - lastDataPoint,
// //         };
// //         chartData.push(newDataPoint);
// //       }
// //       lastDataPoint = data[casesType][date];
// //     };
// //     Obj[caseType]  = chartData 
// //   }
// //   return Obj;
// // };

// const buildChartData = (data, casesType) => {
//   let chartData = [];
//   let lastDataPoint;
//   for (let date in data.cases) {
//     if (lastDataPoint) {
//       let newDataPoint = {
//         x: date,
//         y: data[casesType][date] - lastDataPoint,
//       };
//       chartData.push(newDataPoint);
//     }
//     lastDataPoint = data[casesType][date];
//   }
//   return chartData;
// };

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  responsive: true,
  // maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

// function LineGraph({casesType = "cases"}) {
//   const [data, setData] = useState({}); 
//   console.log("LineDATA " ,data)
//   // 'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
//   useEffect(() => {

//     const FetchData = async ()=>{
//       await axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
//       .then(({data}) => {
//           console.log("graph data", data)
//           const chartData  = buildChartData(data) 
//           console.log("chart DAta" ,chartData)
//           setData(chartData)
//         })
//       .then(err=>console.error("Error is ",err))
//     }

//     FetchData();

//   },[]);
//   console.log("CAsetype ",casesType)
//   // return <div style="height:100px"> 
//   return <div>
//       {data?.length > 0 && (<Line
//           data={{
//             datasets: [
//               {
//                 backgroundColor: "rgba(204, 16, 52, 0.5)",
//                 borderColor: "#CC1034",
//                 data: data,
//               },
//             ],
//           }}
//           options={options}
//         />
//       )}
//         </div>;
// }

// export default LineGraph;



// const options = {
//   legend: {
//     display: false,
//   },
//   elements: {
//     point: {
//       radius: 0,
//     },
//   },
 
//   tooltips: {
//     mode: "index",
//     intersect: false,
//     callbacks: {
//       label: function (tooltipItem, data) {
//         return numeral(tooltipItem.value).format("+0,0");
//       },
//     },
//   },
//   scales: {
//     xAxes: [
//       {
//         type: "time",
//         time: {
//           format: "MM/DD/YY",
//           tooltipFormat: "ll",
//         },
//       },
//     ],
//     yAxes: [
//       {
//         gridLines: {
//           display: false,
//         },
//         ticks: {
//           // Include a dollar sign in the ticks
//           callback: function (value, index, values) {
//             return numeral(value).format("0a");
//           },
//         },
//       },
//     ],
//   },
// };

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("Graph DATA" ,data)
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
import React,{useState,useEffect} from 'react';
import './Dashboardpage.scss'

import {database,firebase} from "../../firebaseConfig"
import { Chart ,registerables} from 'chart.js';

Chart.register(...registerables);

const Dashboardpage = () => {

    const [product, setProducts] = useState([]);
    const [price, setPrice] = useState(0);
    const [report, setReport] = useState(0);
    const [user, seUser] = useState(0);

    const [chart1, setChart1] = useState(false);

    function drawChart(dataArr){
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['December' ,'January'  , 'February' , 'March' , 'April'],
                datasets: [{
                    data: dataArr,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                     
                    ],
                    borderWidth: 1,
                    barThickness: 15,
                }]
            },
            options: {
                plugins:{
                    legend:{
                        display: false,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        setChart1(true);
    }

    function drawDoghnutChart(dataArr){
        console.log(dataArr);
        var ctx = document.getElementById('myChart1');
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    'OnSale',
                    'Saled',
                    'Not'
                  ],
                datasets: [{
                    label: 'My First Dataset',
                    data: dataArr,
                    backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                  }]
            },
            options: {  
                
            }
        });
        setChart1(true);
    }

    async function getData() {
        var query = firebase.database().ref('Products');
        await query.orderByChild("Timestamp").once('value', function (snapshot){
            var arr = [];
            var countPrice = 0;
            var countPriceMonth = [0,0,0,0,0];
            if (snapshot){
                snapshot.forEach(function (childSnapshot,index) {
                    var childData = childSnapshot.val();                   
                    countPrice += childData.Price;
                    arr.push(childData);
                    if ((Date.now() - childData.Timestamp) < 1000 * 60 * 60 * 24 * 30){
                        countPriceMonth[2] += childData.Price;
                    }else if ((Date.now() - childData.Timestamp) < 1000 * 60 * 60 * 24 * 60){
                        countPriceMonth[3] += childData.Price;
                    }else if ((Date.now() - childData.Timestamp) < 1000 * 60 * 60 * 24 * 90){
                        countPriceMonth[4] += childData.Price;
                    }
                });
                const arrSale = arr.filter(ele => ele.Status == 1);
                const arrSaled = arr.filter(ele => ele.Status == 0);
                setProducts(arr);
                setPrice(countPrice.toLocaleString('en-US',{
                    style: 'currency',
                    currency: "VND",
                }));
                drawChart(countPriceMonth);
                drawDoghnutChart([arrSale.length,arrSaled.length,0]);
            }
        })

        var query2 = firebase.database().ref('Report');
        await query2.once('value', function (snapshot){
            var arr = [];
            var countPrice = 0;
            if (snapshot){
                let i = 0;
                snapshot.forEach(function (childSnapshot,index) {
                    i = i+1;
                });
                setReport(i);
            }
        })
        var query3 = firebase.database().ref('Users');
        await query3.once('value', function (snapshot){
            var arr = [];
            var countPrice = 0;
            if (snapshot){
                let i = 0;
                snapshot.forEach(function (childSnapshot,index) {
                    i = i+1;
                });
                seUser(i);
            }
        })

        return 1;
    }

    function changeTime(unixTimestamp){
        var date = new Date(unixTimestamp);
        return ""+date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()+
        ":"+date.getSeconds();
    }
    useEffect(() => {
        getData();
    },[])
    return (
        <div className="Dashboard">
            <div className="Dashboard__title">
                <h3>Good Morning, ALEXADRAVANTO</h3>
                <p>Dashboard</p>
            </div>
            <div className="Dashboard__statistic">
                <div className="Dashboard__statistic__item">
                    <h2>{product ? product.length : "N/A"}</h2>
                    <p>New Products / Months</p>
                </div>
                <div className="Dashboard__statistic__item">
                    <h2>{price ? price : 0}</h2>
                    <p>Total money</p>
                </div>
                <div className="Dashboard__statistic__item">
                    <h2>{report}</h2>
                    <p>Total Report</p>
                </div>
                <div className="Dashboard__statistic__item">
                    <h2>{user}</h2>
                    <p>Total user</p>
                </div>
            </div>
            <div className="Dashboard__chart">
                <div className="Dashboard__chart__1">
                    <h3>Total Income</h3>
                    <canvas id="myChart"></canvas>
                </div>  
                <div className="Dashboard__chart__2">
                    <h3>Total Transaction</h3>
                    <canvas id="myChart1"></canvas>
                    <div>
                        <ul>
                            <li><i></i> Already Saled</li>
                            <li>{product.filter(ele => ele.Status == 0).length}</li>
                        </ul>
                        <ul>
                            <li><i></i> On Sales</li>
                            <li>{product.filter(ele => ele.Status == 1).length}</li>
                        </ul>
                        <ul>
                            <li><i></i> Not Sales</li>
                            <li>0</li>
                        </ul>
                    </div>
                </div> 
            </div>
            <div className="Dashboard__table">
                <h2>Recent Products</h2>
                <div className="Dashboard__table__rcproduct">
                    {product.length == 0 ? "" :
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">ProductID</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.map((ele,index) => {
                              
                                    return (
                                        <tr key={index}>
                                            <th>{ele.Name}</th>
                                            <th>{ele.Price.toLocaleString('en-US',{
                                                style: 'currency',
                                                currency: "VND",
                                            })}</th>
                                            <th>{ele.ProID}</th>
                                            <th>{ele.Status == 1 ? "Onsale" : "Saled"}</th>
                                            <th>{changeTime(ele.Timestamp)}</th>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>

        </div>
    )

}

export default Dashboardpage;

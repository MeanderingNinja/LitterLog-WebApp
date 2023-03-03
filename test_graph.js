const CanvasRenderService = require('chartjs-node-canvas');

// create a new canvas render service
const canvasRenderService = new CanvasRenderService(800, 600);

// define chart configuration options
const chartConfig = {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            label: 'Sales',
            data: [100, 200, 300, 400, 500]
        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false
    }
};

// create a new chart
const chart = new Chart(canvasRenderService, chartConfig);

// render the chart as an image
const image = chart.renderToBuffer();
console.log(image)

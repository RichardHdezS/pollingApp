const DATA_COUNT = 5;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

const data = {
    labels: ['PREGUNTA 1', 'PREGUNTA 2', 'PREGUNTA 3', 'PREGUNTA 4', 'PREGUNTA 5'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [12, 19, 3, 5, 5],
            backgroundColor: [
                'rgba(241, 18, 18, .8)',
                'rgba(241, 130, 18, .8)',
                'rgba(241, 241, 18, .8)',
                'rgba(18, 241, 41, .8)',
                'rgba(41, 18, 241, .8)'
            ],
        }
    ]
};

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
        responsive: true,
        plugins: {
        legend: {
            position: 'center',
        },
        title: {
            display: true,
            text: 'Seguimiento de egresados'
        }
        }
    },
});

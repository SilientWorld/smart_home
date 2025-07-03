const MAX_DATA_POINTS = 30; // 定义图表最大显示数据点数量

// 创建基础图表配置对象
function createBaseChartConfig(label, color) {
    return {
        type: 'line', // 图表类型为折线图
        data: { // 初始数据结构
            labels: [], // 时间标签数组
            datasets: [{ // 数据集数组
                label: label, // 数据集标签
                data: [], // 数据值数组
                borderColor: color, // 线条颜色
                tension: 0.1, // 线条弯曲度
                pointRadius: 0, // 数据点半径
                borderWidth: 5 // 边框宽度
            }]
        },
        options: { // 图表选项配置
            responsive: true, // 响应式布局
            animation: false, // 禁用动画
            scales: { // 坐标轴配置
                y: { // Y轴配置
                    beginAtZero: false, // 不从零开始
                    ticks: { // 刻度标签配置
                        callback: function (val) { // 标签格式化函数
                            return val.toFixed(0); // 显示整数
                        }
                    }
                }
            },
            plugins: { // 插件配置
                legend: { display: false } // 隐藏图例
            }
        }
    };
}

// 初始化所有图表实例
const charts = {
    temp: new Chart(document.getElementById('tempChart'), createBaseChartConfig('温度 (℃)', 'rgb(255, 99, 132)')),
    humi: new Chart(document.getElementById('humiChart'), createBaseChartConfig('湿度 (%)', 'rgb(54, 162, 235)')),
    lux: new Chart(document.getElementById('luxChart'), createBaseChartConfig('光照强度 (lux)', 'rgb(255, 206, 86)')),
    co2: new Chart(document.getElementById('co2Chart'), createBaseChartConfig('CO₂ (ppm)', 'rgb(75, 192, 192)')),
    pm2_5: new Chart(document.getElementById('pm25Chart'), createBaseChartConfig('PM2.5 (μg/m³)', 'rgb(153, 102, 255)'))
};

// 控制图表显示的容器元素
const containers = {
    temp: document.getElementById('tempChart'),
    humi: document.getElementById('humiChart'),
    lux: document.getElementById('luxChart'),
    co2: document.getElementById('co2Chart'),
    pm2_5: document.getElementById('pm25Chart')
};

// 默认隐藏所有图表，只显示温度图表
Object.values(containers).forEach(chart => chart.style.display = 'none');
document.getElementById('tempChart').style.display = 'block';

// 全局更新图表函数
window.updateChart = function (key, value) {
    const now = new Date();
    const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    const chart = charts[key];

    if (chart.data.labels.length >= MAX_DATA_POINTS) {
        chart.data.labels.shift(); // 移除最早的时间标签
        chart.data.datasets[0].data.shift(); // 移除最早的数据值
    }

    chart.data.labels.push(timeLabel); // 添加新的时间标签
    chart.data.datasets[0].data.push(value); // 添加新的数据值

    // 动态调整 Y 轴范围
    const values = [...chart.data.datasets[0].data];
    const min = Math.min(...values);
    const max = Math.max(...values);

    const padding = (max - min) * 0.1; // 加入 10% 的上下留白

    chart.options.scales.y.min = min - padding;
    chart.options.scales.y.max = max + padding;

    chart.options.scales.y.ticks = {
        stepSize: Math.ceil((max - min + padding * 2) / 5), // 设置刻度步长
        callback: function (val) {
            return val.toFixed(0); // 只显示整数
        }
    };

    chart.update(); // 更新图表
};

// 切换图表显示
document.getElementById('chartSelect').addEventListener('change', e => {
    const selected = e.target.value;
    Object.entries(containers).forEach(([key, canvas]) => {
        canvas.style.display = key === selected ? 'block' : 'none';
    });
});
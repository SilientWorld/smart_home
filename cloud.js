// MQTT连接配置
const options = {
    connectTimeout: 4000, // 连接超时时间
    hostname: '2bf48bb4b30c487faffebbfd8260e850.s1.eu.hivemq.cloud', // MQTT服务器地址
    port: 8884, // MQTT服务器端口
    protocol: 'wss', // 使用WebSocket Secure协议
    username: 'hyhyhy', // 认证用户名
    password: 'Hy123123', // 认证密码
    clientId: 'webclient_' + Math.random().toString(16).substr(2, 8) // 随机客户端ID
};

const topic = 'smart_home/data/esp32_device_id'; // 订阅的主题
const client = mqtt.connect(`wss://${options.hostname}:${options.port}/mqtt`, options); // 建立MQTT连接

const buzzerSound = document.getElementById('buzzerSound'); // 获取蜂鸣器音频元素
let isPlaying = false; // 蜂鸣器播放状态

// 页面状态提示
client.on('connect', () => {
    document.getElementById('status').innerText = '连接成功，等待数据...'; // 连接成功提示
    client.subscribe(topic, err => { // 订阅主题
        if (err) {
            document.getElementById('status').innerText = '订阅失败: ' + err.message; // 订阅失败提示
        }
    });
});

client.on('reconnect', () => {
    document.getElementById('status').innerText = '正在重连...'; // 重连提示
});

client.on('error', err => {
    document.getElementById('status').innerText = '连接出错: ' + err.message; // 错误提示
});

client.on('message', (topic, message) => {
    document.getElementById('status').innerText = '数据已更新'; // 数据更新提示
    try {
        const data = JSON.parse(message.toString()); // 解析接收到的数据

        console.log("接收到的数据:", data); // 打印接收到的数据到控制台

        // 页面显示更新
        document.getElementById('temp').innerText = data['温度'] ?? '--'; // 更新温度显示
        document.getElementById('humi').innerText = data['湿度'] ?? '--'; // 更新湿度显示
        document.getElementById('lux').innerText = data['光照强度'] ?? '--'; // 更新光照强度显示
        document.getElementById('co2').innerText = data['CO2'] ?? '--'; // 更新CO2浓度显示
        document.getElementById('pm2_5').innerText = data['pm2.5'] ?? '--'; // 更新PM2.5显示

        const buzzerStatus = data['蜂鸣器状态']; // 获取蜂鸣器状态
        document.getElementById('ts').innerText = buzzerStatus ?? '--'; // 更新蜂鸣器状态显示

        if (buzzerStatus === '响') { // 如果蜂鸣器应该响起
            if (!isPlaying) { // 如果当前没有播放
                buzzerSound.currentTime = 0; // 重置音频位置到开头
                buzzerSound.play().catch(e => console.warn('播放音频失败:', e)); // 播放音频
                isPlaying = true; // 更新播放状态
            }
        } else { // 如果蜂鸣器应该关闭
            if (isPlaying) { // 如果当前正在播放
                buzzerSound.pause(); // 暂停音频
                buzzerSound.currentTime = 0; // 重置音频位置到开头
                isPlaying = false; // 更新播放状态
            }
        }

        // 字段映射 + 数据校验
        const fieldMap = {
            temp: { field: '温度', min: 0, max: 1000 }, // 温度字段配置
            humi: { field: '湿度', min: 0, max: 1000 }, // 湿度字段配置
            lux: { field: '光照强度', min: 0, max: 1000 }, // 光照强度字段配置
            co2: { field: 'CO2', min: 400, max: 2000 }, // CO2浓度字段配置
            pm2_5: { field: 'pm2.5', min: 0, max: 1500 } // PM2.5字段配置
        };

        for (let key in fieldMap) {
            const info = fieldMap[key];
            const rawValue = data?.[info.field]; // 获取原始数据值

            if (rawValue === undefined || rawValue === null || isNaN(parseFloat(rawValue))) {
                console.warn(`[无效数据] ${info.field}:`, rawValue); // 无效数据警告
                continue;
            }

            const value = parseFloat(rawValue); // 转换为浮点数
            window.updateChart(key, value); // 更新对应的图表
        }

    } catch (e) {
        document.getElementById('status').innerText = '数据解析失败'; // 数据解析失败提示
        console.error("JSON 解析失败", e); // 打印错误信息到控制台
    }
});
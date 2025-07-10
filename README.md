# 智能家居环境监测系统

## 项目简介

本项目是一个基于物联网技术的智能家居环境监测系统，能够实时采集家居环境的温度、光照强度、PM2.5浓度和CO2浓度等数据，并通过HiveMQ Cloud物联网平台进行数据传输和展示。系统采用Wokwi平台进行传感器数据采集的模拟，利用MQTT协议实现设备与云端的数据通信，并通过HTML和Qt开发的前端页面实现数据的可视化展示和预警分析。

## 功能特性

- **传感器数据采集**：通过Wokwi平台模拟温度、光照强度、PM2.5浓度和CO2浓度传感器，实时采集环境数据。
- **数据上传与发布**：基于MQTT协议，将采集到的数据上传并发布至HiveMQ Cloud物联网平台。
- **数据接收与订阅**：通过订阅HiveMQ Cloud平台上的Topic，接收设备数据。
- **数据可视化展示**：利用HTML和Qt开发的前端页面，连接服务器并展示实时数据。
- **预警分析**：对重要数据进行分析，通过智能家居平台为用户提供实时提示，改善家居环境。

## 技术架构

### 底层硬件部分

- **传感器数据采集模块**：
  - 温度传感器
  - 光照强度传感器
  - PM2.5浓度传感器
  - CO2浓度传感器
- **发送设备模块**：负责将采集到的数据通过MQTT协议上传至HiveMQ Cloud平台。

### 上层应用程序部分

- **数据订阅模块**：订阅HiveMQ Cloud平台上的Topic，接收设备数据。
- **数据可视化展示模块**：通过HTML和Qt开发的前端页面，展示实时数据。
- **预警分析模块**：对采集到的数据进行分析，提供实时预警提示。

## 平台与工具

- **Wokwi**：在线模拟平台，用于模拟传感器数据采集。
- **HiveMQ Cloud**：基于云的物联网消息平台，提供高效、安全的MQTT服务。
- **MQTT协议**：用于设备与云端的数据通信。
- **HTML & Qt**：用于开发前端页面，实现数据的可视化展示。

## 快速开始

1. **环境准备**：
   - 注册并登录 [Wokwi](https://wokwi.com/) 平台。
   - 注册并登录 [HiveMQ Cloud](https://www.hivemq.com/mqtt-cloud-broker/) 平台。

2. **模拟传感器数据采集**：
   - 在Wokwi平台上创建虚拟硬件电路，模拟温度、光照强度、PM2.5浓度和CO2浓度传感器。
   - 编写代码，实现传感器数据的采集和上传。

3. **配置HiveMQ Cloud**：
   - 在HiveMQ Cloud平台上创建MQTT Broker实例。
   - 配置Topic，用于设备数据的发布和订阅。

4. **开发前端页面**：
   - 使用HTML和Qt开发前端页面，连接HiveMQ Cloud服务器。
   - 实现数据的实时展示和预警分析功能。

5. **运行与测试**：
   - 启动Wokwi模拟环境，开始数据采集。
   - 启动前端页面，查看实时数据和预警信息。

##结果展示

![image](https://github.com/user-attachments/assets/8c83037f-d709-454a-8e0c-0f35876e4883)

![image](https://github.com/user-attachments/assets/01716465-5f06-4f84-be98-f8cb58e2e0b1)

![image](https://github.com/user-attachments/assets/e283c412-267c-4f23-96a0-138f86802c3d)

![image](https://github.com/user-attachments/assets/85d2922b-60c8-4e21-9cf2-f68bb64d384f)








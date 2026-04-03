"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aws_iot_device_sdk_v2_1 = require("aws-iot-device-sdk-v2");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.post('/publish', (req, res) => {
    const { topic, payload } = req.body;
    console.log(req.body);
    const certPath = path_1.default.join(__dirname, '../../certificates/client.pem.crt');
    const keyPath = path_1.default.join(__dirname, '../../certificates/private.pem.key');
    let builder = aws_iot_device_sdk_v2_1.iot.AwsIotMqtt5ClientConfigBuilder.newDirectMqttBuilderWithMtlsFromPath(process.env.IOT_CORE_ENDPOINT, certPath, keyPath)
        .withConnectProperties({
        clientId: 'erp',
        keepAliveIntervalSeconds: 1200
    });
    const config = builder.build();
    const client = new aws_iot_device_sdk_v2_1.mqtt5.Mqtt5Client(config);
    const payloadBuffer = Buffer.from(JSON.stringify(req.body), 'utf-8');
    console.log(payloadBuffer);
    client.on('connectionSuccess', () => {
        client.publish({
            topicName: 'production-orders',
            qos: aws_iot_device_sdk_v2_1.mqtt5.QoS.AtLeastOnce,
            payload: payloadBuffer,
        }).then(() => {
            console.log('Message published!');
            client.stop();
            res.json({ success: true });
        }).catch((err) => {
            console.error('Publish error:', err);
            client.stop();
            res.status(500).json({ error: err.message });
        });
    });
    client.on('connectionFailure', (event) => {
        console.error('Connection failed:', event);
        res.status(500).json({ error: 'Connection failed', detail: event });
    });
    client.on('error', (err) => {
        console.error('MQTT error:', err);
        client.stop();
        res.status(500).json({ error: err });
    });
    client.start();
});
exports.default = router;

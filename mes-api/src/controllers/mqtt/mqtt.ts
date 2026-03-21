import { Router, Request, Response } from 'express';
import { mqtt5, iot } from "aws-iot-device-sdk-v2";
import path from 'path';

const router = Router();

router.post('/publish', (req: Request, res: Response) => {
    const { topic, payload } = req.body;

    console.log(req.body)

    const certPath = path.join(__dirname, '../../certificates/client.pem.crt');
    const keyPath  = path.join(__dirname, '../../certificates/private.pem.key');

    let builder = iot.AwsIotMqtt5ClientConfigBuilder.newDirectMqttBuilderWithMtlsFromPath(
        process.env.IOT_CORE_ENDPOINT!,
        certPath,
        keyPath
    )
    .withConnectProperties({
        clientId: 'erp',
        keepAliveIntervalSeconds: 1200
    });

    const config = builder.build();
    const client = new mqtt5.Mqtt5Client(config);
    const payloadBuffer = Buffer.from(JSON.stringify(req.body), 'utf-8');
    console.log(payloadBuffer)

    client.on('connectionSuccess', () => {
        client.publish({
            topicName: 'production-orders',
            qos: mqtt5.QoS.AtLeastOnce,
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

export default router;
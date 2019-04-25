import IDevice from "../IDevice";
import parse from "../Port1111Parser";

test("Empty info string", () => {
    const device: IDevice = parse("", "192.168.2.144");
    expect(device.ip).toBe("192.168.2.144");
});

test("UMG 96RM-E test", () => {
    const device: IDevice = parse(
        "Janitza electronics,UMG96rm,Release = 3.5,0,17023107,100,UMG96RM-E-RCM-1702-3107",
        "192.168.7.106",
    );
    expect(device.ip).toBe("192.168.7.106");
    expect(device.serialNumber).toBe("1702:3107");
    expect(device.deviceType).toBe("UMG96rm");
    expect(device.manufacturer).toBe("Janitza electronics");
    expect(device.firmwareVersion).toBe("3.5");
    expect(device.deviceName).toBe("UMG96RM-E-RCM-1702-3107");
});

test("UMG 604 test", () => {
    const device: IDevice = parse("Janitza electronics,UMG604,Release = 5.008,0,70010731,100,UMG604", "192.168.7.111");
    expect(device.ip).toBe("192.168.7.111");
    expect(device.serialNumber).toBe("7001:0731");
    expect(device.deviceType).toBe("UMG604");
    expect(device.manufacturer).toBe("Janitza electronics");
    expect(device.firmwareVersion).toBe("5.008");
    expect(device.deviceName).toBe("UMG604");
});

test("UMG 510 test", () => {
    const device: IDevice = parse(
        "Janitza electronics,UMG510,5,000005C0,51001443,001037,Sep 16 2009 14:33:16",
        "192.168.7.111",
    );
    expect(device.ip).toBe("192.168.7.111");
    expect(device.serialNumber).toBe("5100:1443");
    expect(device.deviceType).toBe("UMG510");
    expect(device.manufacturer).toBe("Janitza electronics");
    expect(device.firmwareVersion).toBe("5");
});

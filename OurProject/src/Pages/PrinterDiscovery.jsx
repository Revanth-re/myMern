

import React from "react";

const PrinterDiscovery = () => {
  const printHello = async () => {
    try {
      // Request printer via Bluetooth
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["000018f0-0000-1000-8000-00805f9b34fb"] // your printer service UUID
      });

      console.log("✅ Connected to:", device.name);

      const server = await device.gatt.connect();

      // Get the printer service
      const service = await server.getPrimaryService("000018f0-0000-1000-8000-00805f9b34fb");

      // Get the write characteristic
      const characteristic = await service.getCharacteristic(
        "00002af1-0000-1000-8000-00805f9b34fb"
      );

      // ESC/POS Reset
      const reset = new Uint8Array([0x1B, 0x40]); // ESC @ (reset printer)
      await characteristic.writeValue(reset);

      // Print text
      const textEncoder = new TextEncoder();
      const hello = textEncoder.encode("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium sint explicabo, labore, tempore quidem cumque maiores eaque aut ad voluptatem et asperiores exercitationem blanditiis eum autem ratione nostrum! Cum, quaerat!!\n\n");
      await characteristic.writeValue(hello);

      console.log("🖨️ Printed: Hello Printer!");

    } catch (error) {
      console.error("❌ Print error:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">🖨️ Bluetooth Printer</h2>
      <button
        onClick={printHello}
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
      >
     print
      </button>
    </div>
  );
};

export default PrinterDiscovery;

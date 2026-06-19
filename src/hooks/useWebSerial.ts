"use client";
import { useState, useCallback, useRef } from "react";

export function useWebSerial() {
  const [isConnected, setIsConnected] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const portRef = useRef<any>(null);
  const writerRef = useRef<any>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const connect = useCallback(async () => {
    if (!("serial" in navigator)) {
      addLog("ERROR: WebSerial API no está soportada en este navegador (Usa Chrome o Edge).");
      return;
    }

    try {
      // Pedir permisos al usuario
      const port = await (navigator as any).serial.requestPort();
      await port.open({ baudRate: 115200 }); // Velocidad estándar para microcontroladores
      
      portRef.current = port;
      writerRef.current = port.writable.getWriter();
      
      setIsConnected(true);
      addLog("Conexión USB/Serial establecida exitosamente.");
    } catch (err: any) {
      addLog(`ERROR de Conexión: ${err.message}`);
      console.error(err);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      if (writerRef.current) {
        writerRef.current.releaseLock();
      }
      if (portRef.current) {
        await portRef.current.close();
      }
      setIsConnected(false);
      addLog("Puerto Serial desconectado.");
    } catch (err: any) {
      addLog(`ERROR al desconectar: ${err.message}`);
    }
  }, []);

  const sendScript = useCallback(async (script: string) => {
    if (!writerRef.current || !isConnected) {
      addLog("No hay dispositivo conectado.");
      return;
    }

    try {
      addLog("Iniciando flasheo del script...");
      const lines = script.split('\\n');
      const encoder = new TextEncoder();

      for (let i = 0; i < lines.length; i++) {
        // Enviar línea por línea simulando una terminal interactiva (REPL)
        const data = encoder.encode(lines[i] + "\\r\\n");
        await writerRef.current.write(data);
        
        // Pequeño delay de buffer para hardware barato
        await new Promise(r => setTimeout(r, 50));
      }
      
      addLog("✅ Script transmitido con éxito al microcontrolador.");
    } catch (err: any) {
      addLog(`ERROR en transmisión: ${err.message}`);
    }
  }, [isConnected]);

  return { isConnected, logs, connect, disconnect, sendScript };
}

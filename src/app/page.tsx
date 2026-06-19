"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Terminal, Usb, Cpu, Play, AlertTriangle } from "lucide-react";
import { useWebSerial } from "@/hooks/useWebSerial";

export default function DuckyFlow() {
  const { isConnected, logs, connect, disconnect, sendScript } = useWebSerial();
  const [script, setScript] = useState<string>(
    "REM DuckyScript Example Payload\\nDELAY 1000\\nGUI r\\nDELAY 500\\nSTRING cmd\\nENTER\\nDELAY 500\\nSTRING echo 'Hacked by DuckyFlow!'\\nENTER"
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="cyber-panel p-4 flex items-center justify-between z-10 rounded-none border-t-0 border-l-0 border-r-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[var(--cyber-green)]/10 text-[var(--cyber-green)] rounded shadow-[0_0_10px_var(--cyber-green)]">
            <Cpu size={24} />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-widest uppercase text-white">Ducky<span className="text-[var(--cyber-green)]">Flow</span></h1>
            <p className="text-xs text-[var(--cyber-green)]/60 font-mono">WebSerial Flasher v1.0</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={\`flex items-center gap-2 font-mono text-sm px-3 py-1 rounded border \${isConnected ? 'border-[var(--cyber-green)] text-[var(--cyber-green)]' : 'border-red-500/50 text-red-500'}\`}>
            <div className={\`w-2 h-2 rounded-full \${isConnected ? 'bg-[var(--cyber-green)] animate-pulse shadow-[0_0_5px_var(--cyber-green)]' : 'bg-red-500'}\`}></div>
            {isConnected ? 'HW: CONNECTED' : 'HW: DISCONNECTED'}
          </div>

          {!isConnected ? (
            <button onClick={connect} className="cyber-button flex items-center gap-2">
              <Usb size={16} /> Enlazar Puerto
            </button>
          ) : (
            <button onClick={disconnect} className="cyber-button flex items-center gap-2 border-red-500/50 text-red-500 hover:bg-red-500 hover:shadow-[0_0_10px_red]">
              <AlertTriangle size={16} /> Desconectar
            </button>
          )}
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Editor Pane */}
        <section className="flex-1 flex flex-col relative border-r border-[var(--cyber-border)]">
          <div className="p-2 border-b border-[var(--cyber-border)] bg-[#050505] flex items-center gap-2 font-mono text-xs text-[var(--cyber-green)]/70">
            <span>payload.txt</span>
            <span className="text-gray-600">|</span>
            <span>DuckyScript Syntax</span>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="plaintext"
              theme="vs-dark"
              value={script}
              onChange={(val) => setScript(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'monospace',
                padding: { top: 16 },
                cursorBlinking: "smooth",
                cursorWidth: 3,
              }}
            />
          </div>
          
          {/* Action Bar */}
          <div className="p-4 cyber-panel border-b-0 border-l-0 border-r-0 flex justify-end gap-4 rounded-none z-10">
            <button 
              onClick={() => sendScript(script)}
              disabled={!isConnected}
              className="cyber-button bg-[var(--cyber-green)] text-black hover:bg-white hover:border-white hover:shadow-[0_0_15px_white] flex items-center gap-2"
            >
              <Play size={18} /> FLASH PAYLOAD
            </button>
          </div>
        </section>

        {/* Terminal Pane */}
        <section className="w-1/3 flex flex-col bg-[#050505]">
          <div className="p-2 border-b border-[var(--cyber-border)] flex items-center gap-2 font-mono text-xs text-[var(--cyber-green)]/70">
            <Terminal size={14} />
            <span>SERIAL COM_LOG</span>
          </div>
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-1">
            <div className="text-[var(--cyber-green)]/40 mb-4">
              DuckyFlow Console Init...\\nWaiting for WebSerial permissions...
            </div>
            {logs.map((log, idx) => (
              <div key={idx} className={log.includes("ERROR") ? "text-red-400" : log.includes("✅") ? "text-[var(--cyber-green)]" : "text-gray-300"}>
                {log}
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

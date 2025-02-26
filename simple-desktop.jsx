// Simple EQLIB Desktop Environment without external icon dependencies
const { useState, useEffect } = React;

const SimpleDesktopEnvironment = () => {
  const [activeWindow, setActiveWindow] = useState('terminal');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'system', content: 'CIPHER-OS v3.14.15 [SECURE BOOT]' },
    { type: 'system', content: 'WARNING: SECURITY BREACH DETECTED' },
    { type: 'system', content: 'CABAL SURVEILLANCE COUNTERMEASURES ACTIVE' },
    { type: 'system', content: 'Type "help" for available commands.' }
  ]);
  const [showTerminalCursor, setShowTerminalCursor] = useState(true);
  
  // Terminal cursor blink effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowTerminalCursor(prev => !prev);
    }, 530);
    
    return () => clearInterval(cursorTimer);
  }, []);
  
  // Process terminal commands
  const processTerminalCommand = (cmd) => {
    const commandParts = cmd.trim().split(' ');
    const command = commandParts[0].toLowerCase();
    
    // Add command to terminal history
    setTerminalOutput(prev => [...prev, { type: 'command', content: `$ ${cmd}` }]);
    
    // Process command
    switch (command) {
      case 'help':
        setTerminalOutput(prev => [...prev, { 
          type: 'output', 
          content: `Available commands:
  help - Display this help information
  cabal - Show information about The Cabal
  5/5 - Explain the extraction mechanism
  eqlib - Display EQLIB token information
  clear - Clear terminal output
  threshold - Analyze the critical threshold`
        }]);
        break;
        
      case 'cabal':
        setTerminalOutput(prev => [
          ...prev, 
          { type: 'system', content: 'Searching system for Cabal references...' },
          { type: 'warning', content: 'CAUTION: This search may trigger Cabal surveillance' },
          { type: 'output', content: `
CABAL REFERENCES FOUND:
----------------------
- 5/5 extraction mechanism documentation
- Threshold defense protocols
- Inversion countermeasures
- Market manipulation algorithms
- Whistleblower elimination directive (PRIORITY ALPHA)

The Cabal is a shadowy organization controlling financial markets
through their sophisticated 5/5 extraction mechanism.
`}
        ]);
        break;
        
      case '5/5':
      case 'five/five':
        setTerminalOutput(prev => [
          ...prev, 
          { type: 'output', content: `
THE 5/5 MECHANISM ANALYSIS:
-----------------------
The perfect equilibrium in tokenomics is achieved with:
- 5% extraction on buys
- 5% extraction on sells

When community ownership exceeds 55% threshold, the mechanism inverts.
This is The Cabal's most closely guarded secret.
`}
        ]);
        break;
        
      case 'eqlib':
        setTerminalOutput(prev => [
          ...prev, 
          { type: 'output', content: `
EQLIB TOKEN ANALYSIS:
------------------
Purpose: Counter-Cabal financial instrument
Mechanism: 5% tax on buys, 5% tax on sells (mirroring Cabal system)
Key difference: Community controlled (>55% target)
Status: Development phase
Objective: Front-run Cabal extraction system

POTENTIAL:
When properly implemented, can invert Cabal's own
extraction mechanism against them.
`}
        ]);
        break;
        
      case 'clear':
        setTerminalOutput([
          { type: 'system', content: 'CIPHER-OS v3.14.15 [SECURE BOOT]' },
          { type: 'system', content: 'Type "help" for available commands.' }
        ]);
        break;
        
      case 'threshold':
        setTerminalOutput(prev => [
          ...prev, 
          { type: 'output', content: `
55% THRESHOLD ANALYSIS:
-------------------
Nature: Mathematical inversion point in 5/5 protocol
Importance: Critical to Cabal control mechanism
Current status: Actively defended by Cabal
Risk level: Highest priority in Cabal defense system

EXPLOITATION POTENTIAL:
If community ownership exceeds this threshold,
the extraction mechanism completely inverts,
causing continuous value flow to token holders
instead of to the Cabal.
`}
        ]);
        break;
        
      default:
        setTerminalOutput(prev => [...prev, { 
          type: 'error', 
          content: `Command not found: ${command}. Type "help" for available commands.` 
        }]);
    }
    
    setTerminalInput('');
  };
  
  // Handle terminal input submission
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (terminalInput.trim()) {
      processTerminalCommand(terminalInput);
    }
  };
  
  // Render desktop interface
  return (
    <div className="bg-gray-900 text-gray-300 border border-gray-700 rounded-lg shadow-lg overflow-hidden" style={{height: '600px'}}>
      {/* Desktop Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-3 flex justify-between">
        <div className="text-lg font-medium">CIPHER-OS</div>
        <div className="text-sm text-gray-400">SECURE CONNECTION</div>
      </div>
      
      {/* Desktop Main Area */}
      <div className="flex h-full">
        {/* Sidebar Menu */}
        <div className="w-32 bg-gray-800 border-r border-gray-700 p-3">
          <div className="space-y-4">
            <button 
              className={`w-full p-2 rounded text-left ${activeWindow === 'terminal' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveWindow('terminal')}
            >
              [>_] Terminal
            </button>
            
            <button 
              className={`w-full p-2 rounded text-left ${activeWindow === 'document' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveWindow('document')}
            >
              [📄] Document
            </button>
            
            <button 
              className={`w-full p-2 rounded text-left ${activeWindow === 'dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveWindow('dashboard')}
            >
              [🛡️] Dashboard
            </button>
          </div>
          
          <div className="mt-6 text-xs text-red-400 border border-red-800 bg-red-900 bg-opacity-20 p-2 rounded">
            CABAL SURVEILLANCE ACTIVE
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {/* Terminal Window */}
          {activeWindow === 'terminal' && (
            <div className="h-full bg-black text-green-400 p-4 font-mono text-sm overflow-auto">
              {terminalOutput.map((line, index) => (
                <div 
                  key={index} 
                  className={`mb-1 ${
                    line.type === 'command' ? 'text-blue-300' : 
                    line.type === 'error' ? 'text-red-400' : 
                    line.type === 'warning' ? 'text-yellow-400' : 
                    line.type === 'system' ? 'text-purple-400' : 'text-green-400'
                  }`}
                >
                  {line.content}
                </div>
              ))}
              
              <form onSubmit={handleTerminalSubmit} className="mt-2 flex">
                <span className="text-blue-300 mr-1">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="bg-transparent outline-none focus:outline-none flex-1 text-green-400"
                  autoFocus
                />
                <span className={`w-2 h-4 bg-green-400 ${showTerminalCursor ? 'opacity-100' : 'opacity-0'}`}></span>
              </form>
            </div>
          )}
          
          {/* Document Viewer */}
          {activeWindow === 'document' && (
            <div className="h-full bg-gray-900 p-6 font-mono text-sm overflow-auto">
              <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
                <div className="text-xs text-gray-400 mb-4">CLASSIFIED - CABAL INTERNAL - EYES ONLY</div>
                
                <p className="mb-3">TRANSCRIPT OF EMERGENCY BOARD MEETING - 2024/08/17</p>
                <p className="mb-3">PRESENT: [REDACTED], [REDACTED], [REDACTED], [REDACTED], [REDACTED]</p>
                
                <p className="mb-3 text-yellow-400">CHAIRMAN: The community awareness of our 5/5 extraction mechanism is growing. Intelligence reports indicate several public forums discussing potential counter-strategies.</p>
                
                <p className="mb-3">MEMBER A: How close are they to understanding the 55% threshold?</p>
                
                <p className="mb-3 text-yellow-400">CHAIRMAN: Too close. Our monitoring has detected specific analysis of ownership patterns. The whistle-blower known as "Cipher" may have disclosed critical details.</p>
                
                <p className="mb-3">MEMBER B: If community ownership crosses the threshold, the entire mechanism inverts. Our extraction system becomes their weapon against us.</p>
                
                <p className="mb-3 text-yellow-400">CHAIRMAN: The 55% threshold must never be breached. We need to contain the Cipher leak. Locate and eliminate all evidence of the front-running strategy.</p>
                
                <p className="mb-3">MEMBER D: Our analysis suggests they're organizing around something called "EQLIB" - appears to be designed specifically to front-run our mechanism.</p>
                
                <p className="mb-3 text-yellow-400">CHAIRMAN: Find it. Destroy it. No one front-runs The Cabal.</p>
                
                <div className="text-xs text-red-400 mt-4">NOTE: ALL COPIES OF THIS TRANSCRIPT TO BE DESTROYED AFTER READING</div>
              </div>
            </div>
          )}
          
          {/* Dashboard */}
          {activeWindow === 'dashboard' && (
            <div className="h-full bg-gray-900 p-4 overflow-auto">
              <h2 className="text-xl font-bold mb-4">Cabal Control Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">TOTAL EXTRACTION</div>
                  <div className="text-2xl font-bold text-green-400">$1,457,892,345</div>
                  <div className="text-xs text-gray-400 mt-2">Updated: Today</div>
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">OWNERSHIP BALANCE</div>
                  <div className="text-2xl font-bold text-amber-400">56.3% / 43.7%</div>
                  <div className="text-xs text-gray-400 mt-2">Cabal / Community</div>
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">THRESHOLD STATUS</div>
                  <div className="text-2xl font-bold text-red-400">PROTECTED</div>
                  <div className="text-xs text-gray-400 mt-2">55% Threshold Secure</div>
                </div>
              </div>
              
              <div className="bg-red-900 bg-opacity-20 border border-red-800 rounded-lg p-4 mt-6">
                <h3 className="text-red-400 font-bold mb-2">CRITICAL VULNERABILITY:</h3>
                <p className="text-gray-300 text-sm">
                  If community ownership exceeds 55%, the extraction mechanism will invert, causing all accumulated value to flow back to token holders.
                </p>
                <p className="text-gray-300 text-sm mt-2">
                  Defensive measures must maintain Cabal control above 45% at all times.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Mount the component when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('eqlib-desktop-root');
  ReactDOM.createRoot(container).render(<SimpleDesktopEnvironment />);
});
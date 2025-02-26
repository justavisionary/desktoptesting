// Access React hooks from the global React object
const { useState, useEffect } = React;

// Access Lucide icons from the global lucide object
const { Terminal, FolderOpen, FileText, X, Minimize2, Eye, AlertCircle, Lock, File, Shield, BarChart2, Key, CheckCircle, HelpCircle, RefreshCw, Copy } = lucide;

const EqlibDesktopEnvironment = () => {
  const [activeWindow, setActiveWindow] = useState('terminal');
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'system', content: 'CIPHER-OS v3.14.15 [SECURE BOOT]' },
    { type: 'system', content: 'WARNING: SECURITY BREACH DETECTED' },
    { type: 'system', content: 'CABAL SURVEILLANCE COUNTERMEASURES ACTIVE' },
    { type: 'system', content: 'Type "help" for available commands.' }
  ]);
  const [showTerminalCursor, setShowTerminalCursor] = useState(true);
  const [terminalCommandHistory, setTerminalCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalPath, setTerminalPath] = useState('/home/cipher');
  
  const [fileSystem, setFileSystem] = useState({
    currentPath: '/home/cipher/documents',
    folders: ['cabal_evidence', 'encrypted', 'system'],
    files: [
      { name: 'cabal_memo_5591.txt', type: 'text', content: 'The 5/5 extraction mechanism has been calibrated to maximum efficiency. Market participants remain oblivious to the dual-sided value capture...' },
      { name: 'whistleblower_statement.md', type: 'markdown', content: 'I can no longer be complicit in The Cabal\'s systematic extraction of wealth. The public deserves to know about the 5/5 mechanism...' },
      { name: 'threshold_analysis.pdf', type: 'pdf', locked: true }
    ]
  });
  
  const [dashboardAccessLevel, setDashboardAccessLevel] = useState('restricted');
  const [dashboardSection, setDashboardSection] = useState('overview');
  const [revealThreshold, setRevealThreshold] = useState(false);
  
  const [puzzleStage, setPuzzleStage] = useState(0);
  const [decryptInput, setDecryptInput] = useState('');
  const [decryptFeedback, setDecryptFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [decryptAttempts, setDecryptAttempts] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Terminal cursor blink effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowTerminalCursor(prev => !prev);
    }, 530);
    
    return () => clearInterval(cursorTimer);
  }, []);
  
  // Terminal command history navigation
  const handleTerminalKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < terminalCommandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setTerminalInput(terminalCommandHistory[terminalCommandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setTerminalInput(terminalCommandHistory[terminalCommandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setTerminalInput('');
      }
    }
  };
  
  // Process terminal commands with enhanced functionality
  const processTerminalCommand = (cmd) => {
    const commandParts = cmd.trim().split(' ');
    const command = commandParts[0].toLowerCase();
    const args = commandParts.slice(1);
    
    // Add command to terminal history
    setTerminalOutput(prev => [...prev, { type: 'command', content: `$ ${cmd}` }]);
    setTerminalCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    
    // Process command
    switch (command) {
      case 'help':
        setTerminalOutput(prev => [...prev, { 
          type: 'output', 
          content: `Available commands:
  ls - List files and directories
  cd [dir] - Change directory
  cat [file] - Display file contents
  pwd - Print working directory
  decrypt [file] - Attempt to decrypt a file
  frontrun - Display front-running status
  cabal - Search for Cabal references
  clear - Clear terminal output
  find [term] - Search for files or content
  info - Display system information
  status - Show current system status
  analyze [target] - Analyze specific target
  run [program] - Execute a program`
        }]);
        break;
        
      case 'ls':
        let path = args.length > 0 ? args[0] : terminalPath;
        let currentFiles = [];
        let currentFolders = [];
        
        if (path === '.') path = terminalPath;
        if (path === '..') {
          const pathParts = terminalPath.split('/');
          pathParts.pop();
          path = pathParts.join('/') || '/';
        }
        
        // Root directory
        if (path === '/') {
          currentFolders = ['home', 'bin', 'etc', 'usr', 'var'];
          setTerminalOutput(prev => [...prev, { 
            type: 'output', 
            content: `/:\n${currentFolders.map(f => `[DIR] ${f}`).join('\n')}`
          }]);
          break;
        }
        
        // Home directory
        if (path === '/home') {
          currentFolders = ['cipher'];
          setTerminalOutput(prev => [...prev, { 
            type: 'output', 
            content: `/home:\n${currentFolders.map(f => `[DIR] ${f}`).join('\n')}`
          }]);
          break;
        }
        
        // Cipher's home directory
        if (path === '/home/cipher') {
          currentFolders = ['documents', 'research', 'evidence', 'tools', '.hidden'];
          currentFiles = ['notes.txt', 'journal.enc'];
          setTerminalOutput(prev => [...prev, { 
            type: 'output', 
            content: `/home/cipher:\n${currentFolders.map(f => `[DIR] ${f}`).join('\n')}\n${currentFiles.map(f => `[FILE] ${f}`).join('\n')}`
          }]);
          break;
        }
        
        // Documents directory
        if (path === '/home/cipher/documents') {
          const folderList = fileSystem.folders.map(f => `[DIR] ${f}`);
          const fileList = fileSystem.files.map(f => `[${f.locked ? 'LOCKED' : 'FILE'}] ${f.name}`);
          setTerminalOutput(prev => [...prev, { 
            type: 'output', 
            content: `${path}:\n${[...folderList, ...fileList].join('\n')}`
          }]);
          break;
        }
        
        // Cabal evidence directory
        if (path === '/home/cipher/documents/cabal_evidence') {
          currentFiles = [
            'board_meeting_transcript.txt',
            'extraction_analysis.pdf',
            'cabal_members.enc'
          ];
          setTerminalOutput(prev => [...prev, { 
            type: 'output', 
            content: `${path}:\n${currentFiles.map(f => f.endsWith('.enc') ? `[LOCKED] ${f}` : `[FILE] ${f}`).join('\n')}`
          }]);
          break;
        }
        
        // Encrypted directory
        if (path === '/home/cipher/documents/encrypted') {
          currentFiles = [
            'EQLIB_55_mechanism.dat',
            'cabal_members.enc',
            'threshold_data.enc'
          ];
          setTerminalOutput(prev => [...prev, { 
            type: 'output', 
            content: `${path}:\n${currentFiles.map(f => `[LOCKED] ${f}`).join('\n')}`
          }]);
          break;
        }
        
        // System directory
        if (path === '/home/cipher/documents/system') {
          currentFiles = [
            'CabalControlInterface.exe',
            'DecryptionTool.exe',
            'readme.txt'
          ];
          setTerminalOutput(prev => [...prev, { 
            type: 'output', 
            content: `${path}:\n${currentFiles.map(f => `[${f.endsWith('.exe') ? 'EXECUTABLE' : 'FILE'}] ${f}`).join('\n')}`
          }]);
          break;
        }
        
        // Hidden directory
        if (path === '/home/cipher/.hidden') {
          currentFiles = [
            'escape_plan.txt',
            'private_key.enc',
            'cabal_weakness.txt'
          ];
          setTerminalOutput(prev => [...prev, { 
            type: 'output', 
            content: `${path}:\n${currentFiles.map(f => f.endsWith('.enc') ? `[LOCKED] ${f}` : `[FILE] ${f}`).join('\n')}`
          }]);
          break;
        }
        
        // Tools directory
        if (path === '/home/cipher/tools') {
          currentFiles = [
            'decryption_tool.exe',
            'surveillance_monitor.exe',
            'frontrun_calculator.exe'
          ];
          setTerminalOutput(prev => [...prev, { 
            type: 'output', 
            content: `${path}:\n${currentFiles.map(f => `[EXECUTABLE] ${f}`).join('\n')}`
          }]);
          break;
        }
        
        // Unknown directory
        setTerminalOutput(prev => [...prev, { 
          type: 'error', 
          content: `Directory not found: ${path}`
        }]);
        break;
        
      case 'cd':
        if (args.length === 0) {
          setTerminalPath('/home/cipher');
          setTerminalOutput(prev => [...prev, { type: 'output', content: 'Changed directory to /home/cipher' }]);
          break;
        }
        
        let targetPath = args[0];
        
        // Handle relative paths
        if (targetPath === '.') {
          // Current directory - no change
          break;
        } else if (targetPath === '..') {
          // Parent directory
          const pathParts = terminalPath.split('/');
          if (pathParts.length > 1) {
            pathParts.pop();
            const newPath = pathParts.join('/') || '/';
            setTerminalPath(newPath);
            setTerminalOutput(prev => [...prev, { type: 'output', content: `Changed directory to ${newPath}` }]);
          } else {
            setTerminalOutput(prev => [...prev, { type: 'error', content: 'Already at root directory' }]);
          }
          break;
        } else if (!targetPath.startsWith('/')) {
          // Relative path
          targetPath = `${terminalPath}/${targetPath}`;
        }
        
        // Check if path exists (this is simplified - in a real system you'd check more thoroughly)
        const validPaths = [
          '/', '/home', '/home/cipher', 
          '/home/cipher/documents', '/home/cipher/documents/cabal_evidence',
          '/home/cipher/documents/encrypted', '/home/cipher/documents/system',
          '/home/cipher/.hidden', '/home/cipher/tools', '/home/cipher/research',
          '/home/cipher/evidence'
        ];
        
        if (validPaths.includes(targetPath)) {
          setTerminalPath(targetPath);
          setTerminalOutput(prev => [...prev, { type: 'output', content: `Changed directory to ${targetPath}` }]);
        } else {
          setTerminalOutput(prev => [...prev, { type: 'error', content: `Directory not found: ${targetPath}` }]);
        }
        break;
        
      case 'pwd':
        setTerminalOutput(prev => [...prev, { type: 'output', content: terminalPath }]);
        break;
        
      case 'cat':
        if (args.length === 0) {
          setTerminalOutput(prev => [...prev, { type: 'error', content: 'Usage: cat [file]' }]);
          break;
        }
        
        // Case for special files in specific directories
        if (terminalPath === '/home/cipher') {
          if (args[0] === 'notes.txt') {
            setTerminalOutput(prev => [...prev, { 
              type: 'output', 
              content: `PERSONAL NOTES - URGENT

I need to gather more evidence on the Cabal's extraction system.
Their equilibrium protocol (5/5) seems to have a vulnerability when
community ownership exceeds a critical threshold.

Keywords to investigate:
- Equilibrium
- Front-Running
- 55% Threshold
- Extraction Protocol

Use the 'search' command for more information.`
            }]);
            break;
          } else if (args[0] === 'journal.enc') {
            setTerminalOutput(prev => [...prev, { 
              type: 'error', 
              content: 'File journal.enc is encrypted. Use decrypt command to attempt access.'
            }]);
            break;
          }
        } else if (terminalPath === '/home/cipher/documents/cabal_evidence') {
          if (args[0] === 'board_meeting_transcript.txt') {
            setTerminalOutput(prev => [...prev, { 
              type: 'output', 
              content: `CLASSIFIED - CABAL INTERNAL - EYES ONLY

TRANSCRIPT OF EMERGENCY BOARD MEETING - 2024/08/17
PRESENT: [REDACTED], [REDACTED], [REDACTED], [REDACTED], [REDACTED]

CHAIRMAN: The community awareness of our 5/5 extraction mechanism is growing. Intelligence reports indicate several public forums discussing potential counter-strategies.

MEMBER A: How close are they to understanding the 55% threshold?

CHAIRMAN: Too close. Our monitoring has detected specific analysis of ownership patterns. The whistle-blower known as "Cipher" may have disclosed critical details.

MEMBER B: If community ownership crosses the threshold, the entire mechanism inverts. Our extraction system becomes their weapon against us.

CHAIRMAN: The 55% threshold must never be breached. We need to contain the Cipher leak. Locate and eliminate all evidence of the front-running strategy.

MEMBER D: Our analysis suggests they're organizing around something called "EQLIB" - appears to be designed specifically to front-run our mechanism.

CHAIRMAN: Find it. Destroy it. No one front-runs The Cabal.

NOTE: ALL COPIES OF THIS TRANSCRIPT TO BE DESTROYED AFTER READING`
            }]);
            break;
          }
        } else if (terminalPath === '/home/cipher/.hidden') {
          if (args[0] === 'cabal_weakness.txt') {
            setTerminalOutput(prev => [...prev, { 
              type: 'output', 
              content: `THE CABAL'S CRITICAL VULNERABILITY

Through months of analysis, I've confirmed their system's
fatal flaw: The Extraction Reversal Point.

When community ownership crosses 55% of total supply, the
extraction mechanism inverts completely. Their perfect 5/5
balance becomes their undoing - every transaction begins
taking from their holdings and giving to the community.

The path to defeating them is clear: accumulate enough
supply to cross this threshold, then maintain it.

COMMAND TO EXECUTE: find cabal`
            }]);
            break;
          } else if (args[0] === 'escape_plan.txt') {
            setTerminalOutput(prev => [...prev, { 
              type: 'output', 
              content: `EMERGENCY ESCAPE PROTOCOL

If compromised, initiate the following:
1. Deploy the token with inverted mechanics
2. Share all findings with the community
3. Distribute control to trusted nodes

The token itself is the weapon against them. When community
ownership exceeds their control threshold, their extraction
system will begin working against them.

Remember: 5/5 is both their strength and weakness.`
            }]);
            break;
          }
        } else if (terminalPath === '/home/cipher/documents/system') {
          if (args[0] === 'readme.txt') {
            setTerminalOutput(prev => [...prev, { 
              type: 'output', 
              content: `CIPHER-OS SYSTEM UTILITIES

This directory contains specialized tools for analyzing and
countering The Cabal's operations.

Available programs:
- CabalControlInterface.exe: Infiltrate Cabal control systems
- DecryptionTool.exe: Advanced multi-layer decryption utility

To launch a program, use the command:
run [program name]`
            }]);
            break;
          }
        }
        
        // If not a special case, try to find the file in current directory
        // For simplicity, we're using a more flexible approach here
        if (args[0].endsWith('.enc') || args[0].endsWith('.dat')) {
          setTerminalOutput(prev => [...prev, { 
            type: 'error', 
            content: `File ${args[0]} is encrypted. Use decrypt command to attempt access.`
          }]);
        } else {
          // Search through files in fileSystem
          const file = fileSystem.files.find(f => f.name === args[0]);
          if (file) {
            if (file.locked) {
              setTerminalOutput(prev => [...prev, { 
                type: 'error', 
                content: `Access denied: ${file.name} is locked. Use decrypt command.`
              }]);
            } else {
              setTerminalOutput(prev => [...prev, { 
                type: 'output', 
                content: file.content
              }]);
            }
          } else {
            setTerminalOutput(prev => [...prev, { 
              type: 'error', 
              content: `File not found: ${args[0]}`
            }]);
          }
        }
        break;
        
      case 'decrypt':
        if (args.length === 0) {
          setTerminalOutput(prev => [...prev, { type: 'error', content: 'Usage: decrypt [file]' }]);
          break;
        }
        
        setTerminalOutput(prev => [
          ...prev, 
          { type: 'system', content: `Attempting to decrypt ${args[0]}...` },
          { type: 'system', content: 'Applying EQLIB cipher...' }
        ]);
        
        setTimeout(() => {
          setTerminalOutput(prev => [...prev, { type: 'warning', content: 'PARTIAL DECRYPTION SUCCESSFUL' }]);
          
          // Special case for the EQLIB mechanism file
          if (args[0] === 'EQLIB_55_mechanism.dat') {
            setTerminalOutput(prev => [
              ...prev, 
              { type: 'output', content: `
DECRYPTED CONTENT (Partial):
==============================
THE 5/5 MECHANISM INVERSION PROTOCOL
-----------------------------------

When community ownership exceeds the critical threshold
of 55%, the mechanism mathematically inverts, causing:

1. All extraction (5% + 5%) to reverse flow
2. [CORRUPTED DATA]
3. Front-running the Cabal becomes possible by [CORRUPTED DATA]
4. The equilibrium state shifts from extraction to [CORRUPTED DATA]

CAUTION: THE CABAL WILL DEFEND THE 55% THRESHOLD AT ALL COSTS
`}
            ]);
          } else if (args[0] === 'journal.enc') {
            setTerminalOutput(prev => [
              ...prev, 
              { type: 'output', content: `
JOURNAL ENTRY #55 (PARTIAL DECRYPTION):
======================================
I've finally confirmed my suspicions. The Cabal's extraction
system has a deliberate vulnerability - a failsafe perhaps,
or an oversight in their mathematical model.

When community control exceeds 55% of total supply, the
extraction mechanism inverts completely. Their perfect
equilibrium (5/5) becomes their undoing.

I'm creating a token to exploit this vulnerability. By
launching with community control already above the threshold,
we can turn their own mechanism against them.

If I don't survive, remember: Front-run The Cabal by
maintaining community ownership above 55%. The token
will do the rest.
`}
            ]);
          } else if (args[0].endsWith('.enc') || args[0].endsWith('.dat')) {
            setTerminalOutput(prev => [
              ...prev, 
              { type: 'output', content: `
DECRYPTED CONTENT (Partial):
==============================
[CORRUPTED DATA]

References to 5/5 mechanism detected.
References to 55% threshold detected.
References to "front-running" strategy detected.

For complete decryption, use the advanced DecryptionTool.
Run command: run DecryptionTool.exe
`}
            ]);
          } else {
            setTerminalOutput(prev => [
              ...prev, 
              { type: 'error', content: `File not recognized as encrypted: ${args[0]}` }
            ]);
          }
        }, 1000);
        break;
        
      case 'frontrun':
        setTerminalOutput(prev => [
          ...prev, 
          { type: 'system', content: 'Analyzing current front-running potential...' }
        ]);
        
        setTimeout(() => {
          setTerminalOutput(prev => [
            ...prev, 
            { type: 'output', content: `
CURRENT STATUS:
--------------
Community Ownership: 43.7%
Cabal Control: 56.3%
Distance to Inversion: 11.3%

RECOMMENDATION:
--------------
FRONT-RUNNING OPPORTUNITY DETECTED
Accumulate EQLIB tokens to approach 55% threshold
Monitor Cabal defensive actions at 50-54% range
`}
          ]);
        }, 800);
        break;
        
      case 'cabal':
        setTerminalOutput(prev => [
          ...prev, 
          { type: 'system', content: 'Searching system for Cabal references...' },
          { type: 'warning', content: 'CAUTION: This search may trigger Cabal surveillance' }
        ]);
        
        setTimeout(() => {
          setTerminalOutput(prev => [
            ...prev, 
            { type: 'output', content: `
CABAL REFERENCES FOUND:
----------------------
- 5/5 extraction mechanism documentation
- Threshold defense protocols
- Inversion countermeasures
- Market manipulation algorithms
- Whistleblower elimination directive (PRIORITY ALPHA)

LOCATIONS:
---------
/home/cipher/documents/cabal_evidence
/home/cipher/documents/encrypted
/home/cipher/.hidden
`}
          ]);
        }, 1200);
        break;
        
      case 'clear':
        setTerminalOutput([
          { type: 'system', content: 'CIPHER-OS v3.14.15 [SECURE BOOT]' },
          { type: 'system', content: 'Type "help" for available commands.' }
        ]);
        break;
        
      case 'find':
        if (args.length === 0) {
          setTerminalOutput(prev => [...prev, { type: 'error', content: 'Usage: find [term]' }]);
          break;
        }
        
        const searchTerm = args[0].toLowerCase();
        setTerminalOutput(prev => [
          ...prev, 
          { type: 'system', content: `Searching for "${searchTerm}"...` }
        ]);
        
        setTimeout(() => {
          if (searchTerm.includes('5/5') || searchTerm.includes('five') || searchTerm.includes('threshold')) {
            setTerminalOutput(prev => [
              ...prev, 
              { type: 'output', content: `
SEARCH RESULTS - ${args[0]}:
------------------------
Found in 17 files across system

KEY LOCATIONS:
- /home/cipher/documents/cabal_evidence/board_meeting_transcript.txt
- /home/cipher/documents/encrypted/EQLIB_55_mechanism.dat
- /home/cipher/.hidden/cabal_weakness.txt

The 5/5 mechanism and 55% threshold appear to be
critical components of the Cabal's control system.
`}
            ]);
          } else if (searchTerm.includes('cabal')) {
            setTerminalOutput(prev => [
              ...prev, 
              { type: 'output', content: `
SEARCH RESULTS - ${args[0]}:
------------------------
Found in 24 files across system

KEY LOCATIONS:
- /home/cipher/documents/cabal_evidence/
- /home/cipher/.hidden/cabal_weakness.txt
- /home/cipher/documents/system/CabalControlInterface.exe

For detailed analysis of Cabal operations,
run the command: run CabalControlInterface.exe
`}
            ]);
          } else if (searchTerm.includes('decrypt') || searchTerm.includes('cipher')) {
            setTerminalOutput(prev => [
              ...prev, 
              { type: 'output', content: `
SEARCH RESULTS - ${args[0]}:
------------------------
Found in 9 files across system

KEY LOCATIONS:
- /home/cipher/documents/system/DecryptionTool.exe
- /home/cipher/tools/decryption_tool.exe

To access advanced decryption capabilities,
run the command: run DecryptionTool.exe
`}
            ]);
          } else if (searchTerm.includes('eqlib') || searchTerm.includes('token')) {
            setTerminalOutput(prev => [
              ...prev, 
              { type: 'output', content: `
SEARCH RESULTS - ${args[0]}:
------------------------
Found in 15 files across system

KEY LOCATIONS:
- /home/cipher/documents/encrypted/EQLIB_55_mechanism.dat
- /home/cipher/documents/cabal_evidence/board_meeting_transcript.txt

EQLIB appears to be a token designed to exploit
the Cabal's 5/5 mechanism vulnerability.
`}
            ]);
          } else {
            setTerminalOutput(prev => [
              ...prev, 
              { type: 'output', content: `
SEARCH RESULTS - ${args[0]}:
------------------------
No significant matches found.

Try searching for: cabal, 5/5, threshold, eqlib, decrypt
`}
            ]);
          }
        }, 1000);
        break;
        
      case 'run':
        if (args.length === 0) {
          setTerminalOutput(prev => [...prev, { type: 'error', content: 'Usage: run [program]' }]);
          break;
        }
        
        const program = args[0].toLowerCase();
        
        if (program === 'cabalcontrolinterface.exe' || program === 'cabalcontrol') {
          setTerminalOutput(prev => [
            ...prev, 
            { type: 'system', content: 'Launching Cabal Control Interface...' },
            { type: 'warning', content: 'CAUTION: This may trigger Cabal surveillance systems.' }
          ]);
          
          setTimeout(() => {
            setActiveWindow('dashboard');
          }, 1000);
        } else if (program === 'decryptiontool.exe' || program === 'decrypt') {
          setTerminalOutput(prev => [
            ...prev, 
            { type: 'system', content: 'Launching Advanced Decryption Tool...' },
            { type: 'system', content: 'Initializing cryptographic modules...' }
          ]);
          
          setTimeout(() => {
            setActiveWindow('decryption');
            setPuzzleStage(0);
            setDecryptInput('');
            setDecryptFeedback(null);
            setDecryptAttempts(0);
            setShowHint(false);
          }, 1000);
        } else {
          setTerminalOutput(prev => [
            ...prev, 
            { type: 'error', content: `Program not found or cannot be executed: ${args[0]}` },
            { type: 'output', content: 'Available programs: CabalControlInterface.exe, DecryptionTool.exe' }
          ]);
        }
        break;
        
      case 'status':
        setTerminalOutput(prev => [
          ...prev, 
          { type: 'output', content: `
SYSTEM STATUS:
------------
Connection: SECURE (encrypted)
Current directory: ${terminalPath}
Cabal surveillance: ACTIVE (countermeasures running)
Terminal access: FULL
Available tools: CabalControlInterface, DecryptionTool
`}
        ]);
        break;
        
      case 'info':
        setTerminalOutput(prev => [
          ...prev, 
          { type: 'output', content: `
SYSTEM INFORMATION:
----------------
CIPHER-OS v3.14.15
Developed by: Anonymous
Purpose: Cabal Investigation & Countermeasures
Current user: cipher (whistleblower)

The 5/5 extraction mechanism has a critical vulnerability 
when community ownership exceeds 55%. This system provides
tools to analyze and exploit this vulnerability.
`}
        ]);
        break;
        
      case 'analyze':
        if (args.length === 0) {
          setTerminalOutput(prev => [...prev, { 
            type: 'error', 
            content: 'Usage: analyze [target]' 
          }]);
          setTerminalOutput(prev => [...prev, { 
            type: 'output', 
            content: 'Available targets: cabal, eqlib, mechanism, threshold' 
          }]);
          break;
        }
        
        const target = args[0].toLowerCase();
        
        setTerminalOutput(prev => [
          ...prev, 
          { type: 'system', content: `Analyzing ${target}...` }
        ]);
        
        setTimeout(() => {
          if (target === 'cabal') {
            setTerminalOutput(prev => [
              ...prev, 
              { type: 'output', content: `
CABAL ANALYSIS:
-------------
Organization: Shadow financial control system
Age: Approximately 55 years
Structure: 5 primary control nodes
Primary mechanism: 5/5 extraction protocol
Current status: Active across multiple chains

WEAKNESS DETECTED:
Critical threshold at 55% community ownership
When breached, extraction mechanism inverts
`}
            ]);
          } else if (target === 'eqlib') {
            setTerminalOutput(prev => [
              ...prev, 
              { type: 'output', content: `
EQLIB TOKEN ANALYSIS:
------------------
Purpose: Counter-Cabal financial instrument
Mechanism: 5% buy tax, 5% sell tax (mirroring Cabal system)
Key difference: Community controlled (>55% target)
Status: Development phase
Objective: Front-run Cabal extraction system

POTENTIAL:
When properly implemented, can invert Cabal's own
extraction mechanism against them.
`}
            ]);
          } else if (target === 'mechanism' || target === '5/5') {
            setTerminalOutput(prev => [
              ...prev, 
              { type: 'output', content: `
5/5 MECHANISM ANALYSIS:
--------------------
Structure: 5% extraction on buys, 5% on sells
Apparent purpose: "Fair" tokenomics with equal taxation
Actual purpose: Controlled value extraction
Implementation: Multiple blockchain networks

CRITICAL DISCOVERY:
The mechanism mathematically inverts when control
threshold (55%) is breached - turning from extraction
to empowerment mechanism.
`}
            ]);
          } else if (target === 'threshold' || target === '55') {
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
          } else {
            setTerminalOutput(prev => [
              ...prev, 
              { type: 'error', content: `Unknown analysis target: ${target}` },
              { type: 'output', content: 'Available targets: cabal, eqlib, mechanism, threshold' }
            ]);
          }
        }, 1000);
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
  
  // Open a window
  const openWindow = (windowName) => {
    // If minimized, restore it
    if (minimizedWindows.includes(windowName)) {
      setMinimizedWindows(prev => prev.filter(w => w !== windowName));
    }
    
    setActiveWindow(windowName);
  };
  
  // Minimize a window
  const minimizeWindow = (windowName) => {
    setMinimizedWindows(prev => [...prev, windowName]);
    if (activeWindow === windowName) {
      setActiveWindow(null);
    }
  };
  
  // Close a window
  const closeWindow = (windowName) => {
    setMinimizedWindows(prev => prev.filter(w => w !== windowName));
    if (activeWindow === windowName) {
      setActiveWindow(null);
    }
  };
  
  // Puzzle stages for decryption tool
  const puzzleStages = [
    {
      title: "Layer 1: Caesar Cipher",
      description: "Decode the following message using a simple Caesar cipher with a right shift of 5.",
      encryptedText: "YMJ HFGFQ ZXJX F KNAJ KNAJ JCYWFHYNTS RJHMFSNXR",
      solution: "THE CABAL USES A FIVE FIVE EXTRACTION MECHANISM",
      hint: "A = F, B = G, C = H... shift each letter 5 positions to the right in the alphabet."
    },
    {
      title: "Layer 2: Numeric Substitution",
      description: "Convert these numbers to letters using A=1, B=2, etc.",
      encryptedText: "20 8 5 20 8 18 5 19 8 15 12 4 9 19 6 9 6 20 25 6 9 22 5",
      solution: "THETHRESHOLDISFIFTYFIVE",
      hint: "1=A, 2=B, 3=C... 20=T"
    },
    {
      title: "Layer 3: Binary Decode",
      description: "Convert this binary data to ASCII text.",
      encryptedText: "01000011 01001111 01001101 01001101 01010101 01001110 01001001 01010100 01011001 00100000 01001111 01010111 01001110 01000101 01010010 01010011 01001000 01001001 01010000",
      solution: "COMMUNITY OWNERSHIP",
      hint: "Each 8-digit binary sequence represents one ASCII character."
    },
    {
      title: "Layer 4: Final Key",
      description: "Find the hidden message by taking the first letter of each decrypted line from the previous stages.",
      encryptedText: "[Decryption Sequence Complete]",
      solution: "TTC",
      hint: "Look at what you've already solved. The first letter of each previous solution."
    }
  ];
  
  // Current puzzle for decryption tool
  const currentPuzzle = puzzleStages[puzzleStage];
  
  // Check decryption tool answer
  const checkDecryptAnswer = () => {
    setIsProcessing(true);
    setDecryptFeedback(null);
    
    // Simulate processing delay
    setTimeout(() => {
      const cleanInput = decryptInput.trim().toUpperCase().replace(/\s+/g, ' ');
      const cleanSolution = currentPuzzle.solution.trim().toUpperCase();
      
      if (cleanInput === cleanSolution) {
        // Correct answer
        setDecryptFeedback({
          type: 'success',
          message: 'Correct decryption sequence! Layer unlocked.'
        });
        
        // After animation, proceed to next stage
        setTimeout(() => {
          setPuzzleStage(prev => prev + 1);
          setDecryptInput('');
          setShowHint(false);
          setDecryptFeedback(null);
        }, 2000);
      } else {
        // Wrong answer
        setDecryptAttempts(prev => prev + 1);
        setDecryptFeedback({
          type: 'error',
          message: 'Decryption failed. Incorrect sequence.'
        });
        setIsProcessing(false);
      }
    }, 1000);
  };
  
  // Reset decryption stage
  const resetDecryptStage = () => {
    setDecryptInput('');
    setDecryptFeedback(null);
    setShowHint(false);
    setIsProcessing(false);
  };
  
  // Show hint automatically after multiple failed attempts
  useEffect(() => {
    if (decryptAttempts >= 3 && !showHint) {
      setShowHint(true);
    }
  }, [decryptAttempts, showHint]);
  
  // Check if all puzzles complete
  const isDecryptComplete = puzzleStage >= puzzleStages.length;
  
  // Render window content based on active window
  const renderWindowContent = () => {
    switch (activeWindow) {
      case 'terminal':
        return (
          <div className="bg-black text-green-400 font-mono p-4 text-sm h-full overflow-auto">
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
                onKeyDown={handleTerminalKeyDown}
                className="bg-transparent outline-none focus:outline-none flex-1 text-green-400"
                autoFocus
              />
              <span className={`w-2 h-4 bg-green-400 ${showTerminalCursor ? 'opacity-100' : 'opacity-0'}`}></span>
            </form>
          </div>
        );
        
      case 'files':
        return (
          <div className="bg-gray-900 text-gray-200 h-full flex flex-col">
            <div className="border-b border-gray-700 bg-gray-800 p-2 flex items-center">
              <lucide.FolderOpen size={16} className="text-blue-400 mr-2" />
              <span className="text-sm">{fileSystem.currentPath}</span>
            </div>
            <div className="p-4 flex-1 overflow-auto">
              <div className="grid grid-cols-4 gap-4">
                {fileSystem.folders.map((folder, index) => (
                  <div 
                    key={index}
                    className="flex flex-col items-center p-2 hover:bg-gray-800 rounded cursor-pointer"
                    onClick={() => {
                      processTerminalCommand(`cd ${folder}`);
                      openWindow('terminal');
                    }}
                  >
                    <lucide.FolderOpen size={32} className="text-blue-400 mb-2" />
                    <span className="text-sm text-center">{folder}</span>
                  </div>
                ))}
                
                {fileSystem.files.map((file, index) => (
                  <div 
                    key={index}
                    className="flex flex-col items-center p-2 hover:bg-gray-800 rounded cursor-pointer"
                    onClick={() => {
                      processTerminalCommand(`cat ${file.name}`);
                      openWindow('terminal');
                    }}
                  >
                    {file.locked ? (
                      <lucide.Lock size={32} className="text-red-400 mb-2" />
                    ) : file.type === 'text' || file.type === 'markdown' ? (
                      <lucide.FileText size={32} className="text-gray-400 mb-2" />
                    ) : file.type === 'pdf' ? (
                      <lucide.File size={32} className="text-red-300 mb-2" />
                    ) : (
                      <lucide.File size={32} className="text-purple-300 mb-2" />
                    )}
                    <span className="text-sm text-center break-all">
                      {file.name}
                      {file.locked && <span className="text-red-400 text-xs block">LOCKED</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'dashboard':
        return (
          <div className="bg-gray-900 text-gray-300 h-full flex flex-col">
            {/* Dashboard Header */}
            <div className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
              <div className="flex items-center">
                <lucide.Shield className="h-5 w-5 text-red-500 mr-2" />
                <h2 className="text-lg font-medium">THE CABAL CONTROL INTERFACE</h2>
              </div>
              <div className="flex items-center">
                <div className={`px-3 py-1 rounded text-xs mr-3 ${
                  dashboardAccessLevel === 'restricted' 
                    ? 'bg-yellow-900 text-yellow-300' 
                    : 'bg-red-900 text-red-300'
                }`}>
                  {dashboardAccessLevel.toUpperCase()} ACCESS
                </div>
                <button 
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
                  onClick={() => setDashboardAccessLevel(prev => 
                    prev === 'restricted' ? 'confidential' : 'restricted')}
                >
                  {dashboardAccessLevel === 'restricted' ? 'Elevate Access' : 'Restrict Access'}
                </button>
              </div>
            </div>
            
            {/* Dashboard Navigation */}
            <div className="flex border-b border-gray-800">
              <button 
                className={`px-4 py-3 text-sm font-medium ${
                  dashboardSection === 'overview' 
                    ? 'bg-gray-800 text-white border-b-2 border-red-500' 
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                }`}
                onClick={() => setDashboardSection('overview')}
              >
                Overview
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium ${
                  dashboardSection === 'protocols' 
                    ? 'bg-gray-800 text-white border-b-2 border-red-500' 
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                }`}
                onClick={() => setDashboardSection('protocols')}
              >
                Protocols
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium ${
                  dashboardSection === 'surveillance' 
                    ? 'bg-gray-800 text-white border-b-2 border-red-500' 
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                }`}
                onClick={() => setDashboardSection('surveillance')}
              >
                Surveillance
              </button>
            </div>
            
            {/* Dashboard Content - Main overview */}
            <div className="p-4 flex-1 overflow-auto">
              {dashboardSection === 'overview' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <div className="text-xs text-gray-400 mb-1">TOTAL EXTRACTION</div>
                      <div className="text-2xl font-bold text-green-400">$1,457,892,345</div>
                      <div className="text-xs text-gray-400 mt-2">Updated: Today</div>
                    </div>
                    
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <div className="text-xs text-gray-400 mb-1">ACTIVE DEFENSE SYSTEMS</div>
                      <div className="text-2xl font-bold text-blue-400">7</div>
                      <div className="text-xs text-gray-400 mt-2">Status: Fully Operational</div>
                    </div>
                    
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <div className="text-xs text-gray-400 mb-1">CURRENT OWNERSHIP BALANCE</div>
                      <div className="text-2xl font-bold text-amber-400">56.3% / 43.7%</div>
                      <div className="text-xs text-gray-400 mt-2">Cabal / Community Ratio</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold mb-3">5/5 Extraction Mechanism</h3>
                      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <div className="mb-4">
                          <div className="text-sm mb-2">Current Extraction Rate:</div>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                              <div className="bg-green-500 h-2.5 rounded-full w-full"></div>
                            </div>
                            <span className="ml-2 text-sm">5.0%</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-sm mb-2">Daily Extraction Volume:</div>
                          <div className="text-xl font-bold">$2,186,838</div>
                        </div>
                        
                        <div className="flex justify-between text-sm border-t border-gray-700 pt-3 mt-3">
                          <div>Distribution Status:</div>
                          <div className="text-green-400">Active</div>
                        </div>
                      </div>
                      
                      {dashboardAccessLevel === 'confidential' && (
                        <div className="mt-4">
                          <button
                            className="bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center"
                            onClick={() => setRevealThreshold(!revealThreshold)}
                          >
                            <lucide.Lock className="w-4 h-4 mr-2" />
                            {revealThreshold ? 'Hide Critical Threshold Data' : 'Reveal Critical Threshold Data'}
                          </button>
                          
                          {revealThreshold && (
                            <div className="bg-red-900 bg-opacity-30 border border-red-800 rounded-lg p-4 mt-2">
                              <div className="text-red-400 text-sm mb-2 font-bold">CRITICAL VULNERABILITY:</div>
                              <p className="text-gray-300 text-sm">
                                If community ownership exceeds 55%, the extraction mechanism will invert, causing all accumulated value to flow back to token holders.
                              </p>
                              <p className="text-gray-300 text-sm mt-2">
                                Defensive measures must maintain Cabal control above 45% at all times.
                              </p>
                              <div className="mt-3 text-xs text-red-400">
                                THIS INFORMATION IS CLASSIFIED - LEVEL 5 CLEARANCE ONLY
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold mb-3">Surveillance Monitor</h3>
                      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <div className="mb-4 pb-4 border-b border-gray-700">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">Public Forums</div>
                              <div className="text-xs text-gray-400">EQLIB discussions increasing</div>
                            </div>
                            <div className="text-xs bg-yellow-900 text-yellow-300 px-2 py-1 rounded">Warning</div>
                          </div>
                        </div>
                        
                        <div className="mb-4 pb-4 border-b border-gray-700">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">Whistleblower "Cipher"</div>
                              <div className="text-xs text-gray-400">All communications being monitored</div>
                            </div>
                            <div className="text-xs bg-red-900 text-red-300 px-2 py-1 rounded">Critical</div>
                          </div>
                        </div>
                        
                        <div className="mb-4 pb-4 border-b border-gray-700">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">Exchange Activity</div>
                              <div className="text-xs text-gray-400">Large purchase orders detected</div>
                            </div>
                            <div className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">Active</div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">Social Media</div>
                              <div className="text-xs text-gray-400">Low awareness of threshold mechanism</div>
                            </div>
                            <div className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">Secure</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Dashboard Content - Protocols */}
              {dashboardSection === 'protocols' && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Cabal Operational Protocols</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center mr-3 flex-shrink-0">
                          <lucide.Shield className="w-4 h-4 text-blue-300" />
                        </div>
                        <div>
                          <h4 className="font-bold">Protocol 1: Extraction</h4>
                          <p className="text-sm text-gray-400 mt-1">
                            The 5/5 mechanism extracts value from all market participants, ensuring continuous flow to Cabal reserves.
                          </p>
                          <div className="flex justify-between text-xs text-gray-500 mt-3">
                            <span>Status: Active</span>
                            <span>Efficiency: 100%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center mr-3 flex-shrink-0">
                          <lucide.Eye className="w-4 h-4 text-green-300" />
                        </div>
                        <div>
                          <h4 className="font-bold">Protocol 2: Surveillance</h4>
                          <p className="text-sm text-gray-400 mt-1">
                            Continuous monitoring of communication channels, forums, and blockchain activity for signs of awareness.
                          </p>
                          <div className="flex justify-between text-xs text-gray-500 mt-3">
                            <span>Status: Active</span>
                            <span>Coverage: 93.7%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-yellow-900 flex items-center justify-center mr-3 flex-shrink-0">
                          <lucide.AlertCircle className="w-4 h-4 text-yellow-300" />
                        </div>
                        <div>
                          <h4 className="font-bold">Protocol 3: Threshold Defense</h4>
                          <p className="text-sm text-gray-400 mt-1">
                            Strategic measures to prevent community ownership from approaching the critical 55% threshold.
                          </p>
                          <div className="flex justify-between text-xs text-gray-500 mt-3">
                            <span>Status: Active</span>
                            <span>Alert Level: High</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {dashboardAccessLevel === 'confidential' && (
                      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center mr-3 flex-shrink-0">
                            <lucide.Lock className="w-4 h-4 text-gray-300" />
                          </div>
                          <div>
                            <h4 className="font-bold">Protocol 7: Emergency Reset</h4>
                            <p className="text-sm text-gray-400 mt-1">
                              Last resort procedure if community ownership approaches 55%. Involves coordinated selling and market disruption.
                            </p>
                            <div className="flex justify-between text-xs text-gray-500 mt-3">
                              <span>Status: Standby</span>
                              <span className="text-red-400">AUTHORIZATION REQUIRED</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Dashboard Content - Surveillance */}
              {dashboardSection === 'surveillance' && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Active Surveillance Operations</h3>
                  
                  <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="p-3 text-left">Target</th>
                          <th className="p-3 text-left">Status</th>
                          <th className="p-3 text-left">Threat Level</th>
                          <th className="p-3 text-left">Latest Intel</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-700">
                          <td className="p-3">Whistleblower "Cipher"</td>
                          <td className="p-3">
                            <span className="px-2 py-1 rounded-full text-xs bg-red-900 text-red-300">
                              HIGH PRIORITY
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-700 rounded-full h-1.5">
                                <div className="bg-red-500 h-1.5 rounded-full w-10/12"></div>
                              </div>
                              <span className="ml-2">9/10</span>
                            </div>
                          </td>
                          <td className="p-3">Whistleblower sharing threshold information</td>
                        </tr>
                        
                        <tr className="border-b border-gray-700">
                          <td className="p-3">EQLIB Token Activity</td>
                          <td className="p-3">
                            <span className="px-2 py-1 rounded-full text-xs bg-yellow-900 text-yellow-300">
                              MONITORING
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-700 rounded-full h-1.5">
                                <div className="bg-yellow-500 h-1.5 rounded-full w-7/12"></div>
                              </div>
                              <span className="ml-2">7/10</span>
                            </div>
                          </td>
                          <td className="p-3">Unusual accumulation patterns detected</td>
                        </tr>
                        
                        <tr className="border-b border-gray-700">
                          <td className="p-3">Social Media Channels</td>
                          <td className="p-3">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-900 text-green-300">
                              LOW RISK
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-700 rounded-full h-1.5">
                                <div className="bg-green-500 h-1.5 rounded-full w-3/12"></div>
                              </div>
                              <span className="ml-2">3/10</span>
                            </div>
                          </td>
                          <td className="p-3">Minimal discussion of mechanism details</td>
                        </tr>
                        
                        <tr>
                          <td className="p-3">DeFi Forums</td>
                          <td className="p-3">
                            <span className="px-2 py-1 rounded-full text-xs bg-blue-900 text-blue-300">
                              ACTIVE
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-700 rounded-full h-1.5">
                                <div className="bg-blue-500 h-1.5 rounded-full w-5/12"></div>
                              </div>
                              <span className="ml-2">5/10</span>
                            </div>
                          </td>
                          <td className="p-3">Increasing mentions of front-running</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {dashboardAccessLevel === 'confidential' && (
                    <div className="mt-6">
                      <h3 className="text-lg font-bold mb-3">Containment Operations</h3>
                      <div className="bg-red-900 bg-opacity-20 border border-red-800 rounded-lg p-4">
                        <h4 className="text-red-400 font-bold mb-2 flex items-center">
                          <lucide.FileText className="h-4 w-4 mr-2" />
                          DIRECTIVE: CIPHER CONTAINMENT
                        </h4>
                        <p className="text-sm text-gray-300 mb-3">
                          All efforts must be directed to locate and neutralize the whistleblower known as "Cipher". 
                          The information regarding the 55% threshold must not reach critical mass awareness.
                        </p>
                        <div className="text-sm text-gray-300">
                          <p className="mb-2">Current actions:</p>
                          <ul className="list-disc pl-5 space-y-1 text-xs">
                            <li>Track all communications mentioning "EQLIB" or "55% threshold"</li>
                            <li>Deploy misinformation campaign regarding token mechanics</li>
                            <li>Prepare market manipulation countermeasures</li>
                            <li>Monitor all blockchain transactions exceeding 0.5% ownership change</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Dashboard Footer */}
            <div className="bg-gray-800 border-t border-gray-700 p-3 flex justify-between items-center text-xs text-gray-500">
              <div>CABAL CENTRAL COMMAND • NEW WORLD ORDER DIVISION</div>
              <div>AUTHORIZED PERSONNEL ONLY • ID:55-5-55</div>
            </div>
          </div>
        );
        
      case 'decryption':
        return (
          <div className="bg-gray-900 text-gray-300 h-full flex flex-col">
            <div className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
              <div className="flex items-center">
                <lucide.Key className="h-5 w-5 text-green-500 mr-2" />
                <h2 className="text-lg font-medium">Multi-Layer Encryption Challenge</h2>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                CIPHER SECURITY PROTOCOL
              </div>
            </div>
            
            <div className="p-6 flex-1 overflow-auto">
              {isDecryptComplete ? (
                <div className="text-center py-8">
                  <lucide.CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-400 mb-3">Decryption Complete</h3>
                  <p className="text-gray-400 mb-6">All encryption layers successfully bypassed.</p>
                  
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Revealed Intelligence:</h4>
                    <p className="text-green-400 font-mono">THE CABAL USES A FIVE FIVE EXTRACTION MECHANISM</p>
                    <p className="text-green-400 font-mono">THE THRESHOLD IS FIFTY FIVE</p>
                    <p className="text-green-400 font-mono">COMMUNITY OWNERSHIP</p>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="text-yellow-400 font-bold mb-2">FINAL KEY DECRYPTED:</div>
                      <div className="font-mono text-lg tracking-widest text-yellow-400">TTC = TRIGGER THE CONVERGENCE</div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-900 bg-opacity-20 border border-yellow-800 rounded-lg p-4 text-left">
                    <div className="flex items-start">
                      <lucide.AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-yellow-400 mb-1">CRITICAL INFORMATION UNCOVERED</h4>
                        <p className="text-sm text-gray-300 mb-2">
                          When community ownership exceeds 55%, the 5/5 extraction mechanism inverts, 
                          causing all accumulated value to flow back to token holders.
                        </p>
                        <p className="text-sm text-gray-300">
                          The Cabal will defend this threshold at all costs. Prepare to front-run 
                          their operations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-1">{currentPuzzle.title}</h3>
                  <p className="text-gray-400 mb-4">{currentPuzzle.description}</p>
                  
                  <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-1 font-mono">ENCRYPTED DATA:</div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 font-mono break-all">
                      {currentPuzzle.encryptedText}
                    </div>
                  </div>
                  
                  {/* Previous decrypted layers */}
                  {puzzleStage > 0 && (
                    <div className="mb-6">
                      <div className="text-sm text-gray-500 mb-1 font-mono">PREVIOUSLY DECRYPTED LAYERS:</div>
                      <div className="bg-gray-800 rounded-lg border border-gray-700 divide-y divide-gray-700 text-sm">
                        {puzzleStages.slice(0, puzzleStage).map((stage, index) => (
                          <div key={index} className="p-3 font-mono">
                            <div className="text-xs text-gray-500 mb-1">Layer {index + 1}:</div>
                            <div className="text-green-400">{stage.solution}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <label htmlFor="decryption-input" className="block text-sm text-gray-400 mb-2">
                      Enter decrypted message:
                    </label>
                    <input
                      id="decryption-input"
                      type="text"
                      value={decryptInput}
                      onChange={(e) => setDecryptInput(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-gray-200 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your solution here..."
                      disabled={isProcessing}
                    />
                  </div>
                  
                  {/* Feedback message */}
                  {decryptFeedback && (
                    <div className={`mb-4 p-3 rounded border ${
                      decryptFeedback.type === 'success' 
                        ? 'bg-green-900 bg-opacity-20 border-green-800 text-green-400' 
                        : 'bg-red-900 bg-opacity-20 border-red-800 text-red-400'
                    }`}>
                      <div className="flex items-center">
                        {decryptFeedback.type === 'success' ? (
                          <lucide.CheckCircle className="h-4 w-4 mr-2" />
                        ) : (
                          <lucide.AlertCircle className="h-4 w-4 mr-2" />
                        )}
                        <span>{decryptFeedback.message}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Hint */}
                  {showHint && (
                    <div className="mb-4 p-3 bg-blue-900 bg-opacity-20 border border-blue-800 rounded text-blue-400 text-sm">
                      <div className="flex items-start">
                        <lucide.HelpCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold mb-1">HINT:</div>
                          <div>{currentPuzzle.hint}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={checkDecryptAnswer}
                      disabled={decryptInput.trim() === '' || isProcessing}
                      className={`flex-1 py-2 px-4 rounded flex items-center justify-center ${
                        isProcessing 
                          ? 'bg-blue-700 text-blue-300 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <lucide.RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          <span>Decrypting...</span>
                        </>
                      ) : (
                        <>
                          <lucide.Key className="h-4 w-4 mr-2" />
                          <span>Decrypt</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={resetDecryptStage}
                      disabled={isProcessing}
                      className="py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded text-gray-300"
                    >
                      Reset
                    </button>
                    
                    <button
                      onClick={() => setShowHint(prev => !prev)}
                      disabled={isProcessing}
                      className="py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded text-gray-300"
                    >
                      {showHint ? 'Hide Hint' : 'Show Hint'}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-gray-800 border-t border-gray-700 p-3 flex justify-between items-center text-xs text-gray-500">
              <span>Layer {isDecryptComplete ? 'All Complete' : `${puzzleStage + 1}/${puzzleStages.length}`}</span>
              <span>EQLIB CIPHER PROTOCOL v5.5</span>
            </div>
          </div>
        );
        
      case 'document':
        return (
          <div className="bg-gray-900 text-gray-200 h-full flex flex-col">
            <div className="border-b border-gray-700 bg-gray-800 p-2 flex items-center">
              <lucide.FileText size={16} className="text-blue-400 mr-2" />
              <span className="text-sm">board_meeting_transcript.txt</span>
            </div>
            <div className="p-6 flex-1 overflow-auto font-mono text-sm leading-relaxed">
              <div className="w-full bg-gray-800 p-4 rounded-md border border-gray-700">
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
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div 
      className="w-full h-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: '#0d1117', fontFamily: 'system-ui, sans-serif' }}
    >
      {/* Desktop Top Bar */}
      <div className="h-10 bg-gray-900 border-b border-gray-800 flex justify-between items-center px-4">
        <div className="text-gray-200 font-medium">CIPHER-OS</div>
        <div className="text-gray-400 text-sm">
          <span>SECURE CONNECTION</span>
        </div>
      </div>
      
      {/* Desktop Area */}
      <div className="flex-1 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0f172a, #0c1425)' }}>
        {/* Desktop Icons */}
        <div className="grid grid-cols-1 gap-6 p-4 w-32">
          <div 
            className="flex flex-col items-center cursor-pointer hover:bg-gray-800 hover:bg-opacity-50 p-2 rounded"
            onClick={() => openWindow('terminal')}
          >
            <lucide.Terminal size={36} className="text-gray-300 mb-1" />
            <span className="text-gray-200 text-sm text-center">Terminal</span>
          </div>
          
          <div 
            className="flex flex-col items-center cursor-pointer hover:bg-gray-800 hover:bg-opacity-50 p-2 rounded"
            onClick={() => openWindow('files')}
          >
            <lucide.FolderOpen size={36} className="text-blue-400 mb-1" />
            <span className="text-gray-200 text-sm text-center">Files</span>
          </div>
          
          <div 
            className="flex flex-col items-center cursor-pointer hover:bg-gray-800 hover:bg-opacity-50 p-2 rounded"
            onClick={() => openWindow('dashboard')}
          >
            <lucide.Shield size={36} className="text-red-400 mb-1" />
            <span className="text-gray-200 text-sm text-center">Control Dashboard</span>
          </div>
          
          <div 
            className="flex flex-col items-center cursor-pointer hover:bg-gray-800 hover:bg-opacity-50 p-2 rounded"
            onClick={() => openWindow('decryption')}
          >
            <lucide.Key size={36} className="text-green-400 mb-1" />
            <span className="text-gray-200 text-sm text-center">Decryption Tool</span>
          </div>
          
          <div 
            className="flex flex-col items-center cursor-pointer hover:bg-gray-800 hover:bg-opacity-50 p-2 rounded"
            onClick={() => openWindow('document')}
          >
            <lucide.FileText size={36} className="text-yellow-400 mb-1" />
            <span className="text-gray-200 text-sm text-center">Leaked Document</span>
          </div>
        </div>
        
        {/* Random note on desktop */}
        <div className="absolute left-40 top-6 text-xs text-yellow-300 bg-yellow-900 bg-opacity-20 p-3 w-64 shadow">
          <div className="font-bold mb-1">REMINDER:</div>
          <div>Find and decrypt evidence of Cabal's 5/5 mechanism vulnerability</div>
        </div>
        
        {/* Active Window */}
        {activeWindow && (
          <div 
            className="absolute top-4 left-40 right-4 bottom-16 bg-gray-800 rounded-lg border border-gray-700 shadow-xl overflow-hidden flex flex-col"
          >
            {/* Window Header */}
            <div className="bg-gray-700 py-2 px-3 flex justify-between items-center border-b border-gray-600">
              <div className="text-gray-200 font-medium">
                {activeWindow === 'terminal' && 'Terminal - CIPHER-OS'}
                {activeWindow === 'files' && 'File Explorer'}
                {activeWindow === 'dashboard' && 'Cabal Control Interface'}
                {activeWindow === 'decryption' && 'Advanced Decryption Tool'}
                {activeWindow === 'document' && 'Classified Document Viewer'}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => minimizeWindow(activeWindow)}
                  className="h-5 w-5 flex items-center justify-center rounded hover:bg-gray-600"
                >
                  <lucide.Minimize2 size={14} className="text-gray-300" />
                </button>
                <button 
                  onClick={() => closeWindow(activeWindow)}
                  className="h-5 w-5 flex items-center justify-center rounded hover:bg-red-700"
                >
                  <lucide.X size={14} className="text-gray-300" />
                </button>
              </div>
            </div>
            
            {/* Window Content */}
            <div className="flex-1 overflow-hidden">
              {renderWindowContent()}
            </div>
          </div>
        )}
      </div>
      
      {/* Taskbar */}
      <div className="h-12 bg-gray-800 border-t border-gray-700 flex items-center px-4">
        <div className="flex space-x-2 flex-1">
          <button 
            className={`h-8 w-8 rounded flex items-center justify-center ${activeWindow === 'terminal' ? 'bg-blue-700' : 'bg-gray-700'}`}
            onClick={() => openWindow('terminal')}
          >
            <lucide.Terminal size={16} className="text-gray-200" />
          </button>
          
          <button 
            className={`h-8 w-8 rounded flex items-center justify-center ${activeWindow === 'files' ? 'bg-blue-700' : 'bg-gray-700'}`}
            onClick={() => openWindow('files')}
          >
            <lucide.FolderOpen size={16} className="text-gray-200" />
          </button>
          
          <button 
            className={`h-8 w-8 rounded flex items-center justify-center ${activeWindow === 'dashboard' ? 'bg-blue-700' : 'bg-gray-700'}`}
            onClick={() => openWindow('dashboard')}
          >
            <lucide.Shield size={16} className="text-gray-200" />
          </button>
          
          <button 
            className={`h-8 w-8 rounded flex items-center justify-center ${activeWindow === 'decryption' ? 'bg-blue-700' : 'bg-gray-700'}`}
            onClick={() => openWindow('decryption')}
          >
            <lucide.Key size={16} className="text-gray-200" />
          </button>
        </div>
        
        <div className="flex items-center">
          <div className="text-red-400 text-xs font-medium flex items-center">
            <lucide.Eye size={14} className="mr-1" />
            <span>CABAL SURVEILLANCE ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mount the component when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('eqlib-desktop-root');
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(EqlibDesktopEnvironment));
});
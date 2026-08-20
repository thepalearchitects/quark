import { FileNode } from "../types";

export function buildSrcDoc(files: FileNode[]): string {
  const fileMap = new Map<string, string>();

  function collectFiles(nodes: FileNode[], prefix = "") {
    for (const node of nodes) {
      const fullPath = prefix ? `${prefix}/${node.name}` : node.name;
      if (node.type === "file" && node.content !== undefined) {
        fileMap.set(fullPath, node.content);
        fileMap.set(node.name, node.content); // Also map simple basename
      } else if (node.type === "folder" && node.children) {
        collectFiles(node.children, fullPath);
      }
    }
  }

  collectFiles(files);

  const htmlContent = fileMap.get("index.html") || `<!DOCTYPE html><html><body><h1>No index.html found</h1></body></html>`;
  const cssContent = fileMap.get("styles.css") || fileMap.get("style.css") || "";
  const jsContent = fileMap.get("script.js") || fileMap.get("main.js") || fileMap.get("app.js") || "";

  // Console & Error Interceptor script injected into preview iframe
  const bridgeScript = `
<script>
(function() {
  function sendMessage(type, args) {
    try {
      const serialized = args.map(arg => {
        if (typeof arg === 'object') {
          try { return JSON.stringify(arg); } catch(e) { return String(arg); }
        }
        return String(arg);
      });
      window.parent.postMessage({
        source: 'QUARK_PREVIEW',
        type: type,
        args: serialized
      }, '*');
    } catch(e) {}
  }

  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalInfo = console.info;

  console.log = function(...args) {
    originalLog.apply(console, args);
    sendMessage('log', args);
  };
  console.warn = function(...args) {
    originalWarn.apply(console, args);
    sendMessage('warn', args);
  };
  console.error = function(...args) {
    originalError.apply(console, args);
    sendMessage('error', args);
  };
  console.info = function(...args) {
    originalInfo.apply(console, args);
    sendMessage('info', args);
  };

  window.onerror = function(msg, url, line, col, error) {
    sendMessage('error', [\`Runtime Error: \${msg} (\${line}:\${col})\`]);
    return false;
  };

  window.addEventListener('unhandledrejection', function(event) {
    sendMessage('error', [\`Unhandled Promise Rejection: \${event.reason}\`]);
  });
})();
</script>
`;

  // Inject Bridge Script and Styles into HTML
  let compiledHtml = htmlContent;

  if (compiledHtml.includes("</head>")) {
    compiledHtml = compiledHtml.replace(
      "</head>",
      `${bridgeScript}\n<style>${cssContent}</style>\n</head>`
    );
  } else {
    compiledHtml = `${bridgeScript}\n<style>${cssContent}</style>\n${compiledHtml}`;
  }

  if (compiledHtml.includes("</body>")) {
    compiledHtml = compiledHtml.replace(
      "</body>",
      `<script>${jsContent}</script>\n</body>`
    );
  } else {
    compiledHtml = `${compiledHtml}\n<script>${jsContent}</script>`;
  }

  return compiledHtml;
}

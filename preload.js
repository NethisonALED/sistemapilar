// preload.js: A ponte segura entre o front-end e o back-end (main.js)
const { contextBridge, ipcRenderer } = require('electron');

// Expõe uma API segura para a janela de renderização (seu index.html)
contextBridge.exposeInMainWorld('electronAPI', {
  // A função que o seu front-end vai chamar
  salvarDados: (dados) => ipcRenderer.send('salvar-dados', dados)
});

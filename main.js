// Importa os módulos necessários do Electron
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs'); // Módulo File System do Node.js

// Função para criar a janela principal do aplicativo
function createWindow() {
const mainWindow = new BrowserWindow({
width: 800,
height: 600,
webPreferences: {
// Anexa o script de pré-carregamento à janela
preload: path.join(__dirname, 'preload.js')
}
});

// Carrega o arquivo index.html na janela
mainWindow.loadFile('index.html');

// Opcional: Abre as ferramentas de desenvolvedor (como no Chrome)
// mainWindow.webContents.openDevTools();
}

// Evento que é disparado quando o Electron termina a inicialização
app.whenReady().then(() => {
createWindow();

// Garante que o app inicie corretamente em macOS
app.on('activate', function () {
if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
});

// Evento para fechar o aplicativo quando todas as janelas forem fechadas
app.on('window-all-closed', function () {
if (process.platform !== 'darwin') app.quit();
});

// --- AQUI A MÁGICA ACONTECE: Comunicação com o Front-End ---

// Ouve o evento 'salvar-dados' vindo do front-end
ipcMain.on('salvar-dados', (event, dados) => {
// Define o caminho do arquivo onde os dados serão salvos
const caminhoArquivo = path.join(app.getPath('userData'), 'dados.json');

// Usa o módulo 'fs' para escrever os dados no arquivo
fs.writeFile(caminhoArquivo, JSON.stringify(dados, null, 2), (err) => {
if (err) {
console.error('Falha ao salvar os dados:', err);
return;
}
console.log('Dados salvos com sucesso em:', caminhoArquivo);
});
});
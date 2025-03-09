module.exports = {
    content: ["src/ui/**/*.{ts,tsx}"],
    theme: {
      extend: {
        colors: {
          'vscode-bg': '#1e1e1e', // VS Code dark theme background
          'vscode-fg': '#d4d4d4', // VS Code foreground text
          'vscode-accent': '#0ea5e9', // VS Code blue accent
        }
      }
    },
    plugins: []
  };
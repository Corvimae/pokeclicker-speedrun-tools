(function() {
  const b = typeof browser !== 'undefined' ? browser : chrome;
  const tools = [
    'autoClicker',
    'deleteGenericSave',
  ];

  // Add each of our tools to the page
  tools.forEach(tool => {
    const script = document.createElement('script');
    script.src = b.runtime.getURL(`scripts/tools/${tool}.js`);
    document.documentElement.appendChild(script);
  })
})();

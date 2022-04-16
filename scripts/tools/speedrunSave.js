function addDeleteGenericsButton() {
  if (!document.querySelector('.delete-generic-runs')) {
    const button = document.createElement('label');
    button.classList.add('btn', 'btn-success', 'col-md-4', 'col-xs-12', 'mx-1', 'delete-generic-runs');
    button.textContent = 'New Speedrun';
    button.onclick = () => {
      Save.key = '_speedrun';

      // Delete our previous save
      localStorage.removeItem(`player${Save.key}`);
      localStorage.removeItem(`save${Save.key}`);
      localStorage.removeItem(`settings${Save.key}`);

      // Start the game
      document.querySelector('#saveSelector').remove();
      App.start();

      // Wait for the game to load, then set our default profile options
      waitForLoad = setInterval(() => {
        // Game not loaded yet
        if (!App.game) return;

        clearInterval(waitForLoad);
        App.game.profile.fromJSON({
          name: 'Speedrun%20Save',
          trainer: 38,
          background: 8,
          textColor: '#f5f5f5',
        });
      }, 100);
    };

    document.querySelector('.new-import-buttons').prepend(button);
  }
}

(() => {
  console.info('%c[Pokeclicker Speedrun Tools]', 'color: #9b59b6', 'Speedrun save loaded');
  addDeleteGenericsButton();
})();

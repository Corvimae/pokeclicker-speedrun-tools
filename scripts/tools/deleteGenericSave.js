function addDeleteGenericsButton() {
  if (!document.querySelector('.delete-generic-runs')) {
    const button = document.createElement('button');

    button.classList.add('btn', 'btn-success', 'col-md-4', 'col-xs-12', 'delete-generic-runs');
    button.textContent = 'Delete "Trainer" Saves';
    button.onclick = () => {
      const saveKeys = Object.keys(localStorage).filter(name => name.startsWith('save'));

      saveKeys.forEach(key => {
        try {
          const saveData = JSON.parse(localStorage.getItem(key));

          const username = saveData.profile?.name ?? 'Trainer';
          const badgeCount = saveData.badgeCase?.filter(x => x).length ?? 0;

          if (username === 'Trainer' && badgeCount < 14) {
            localStorage.removeItem(key);
          }
        } catch (e) {
          console.error(`Corrupted save data ${key}, skipping...`);
          console.error(e);
        }
      });

      document.querySelector('#saveSelector .save-container').innerHTML = '';
      SaveSelector.loadSaves();
    };

    document.querySelector('.new-import-buttons').appendChild(button);
  }
}

(() => {
  console.info('%c[Pokeclicker Speedrun Tools]', 'color: #9b59b6', 'Generic save deletor loaded');
  addDeleteGenericsButton();
})();

function enableAutoclicker() {
  const AUTOCLICKER_INTERVAL_MS = 100;

  const existingStatusElem = document.querySelector('.autoclicker-status');

  if (existingStatusElem) existingStatusElem.remove();

  const autoclickerIntervalId = { current: null };

  const autoclickerStatusElem = document.createElement('div');

  function startAutoclicker() {
    autoclickerIntervalId.current = setInterval(() => {
      // Wait until the starter pokemon has been caught
      if (App.game.party.caughtPokemon.length === 0) {
        autoclickerStatusElem.textContent = `Auto-clicker enabled, awaiting first catch...`;

        return;
      }

      // Pause while modals and tutorial popups are open
      if (document.querySelector('.modal.show, .introjs-overlay')) {
        autoclickerStatusElem.textContent = `Auto-clicker paused, modal open...`;

        return;
      }
      
      // Route
      if (App.game.gameState == GameConstants.GameState.fighting && Battle.enemyPokemon() && Battle.enemyPokemon().health() > 0) {
        Battle.clickAttack();
      }

      // Gym
      if (App.game.gameState == GameConstants.GameState.gym && GymBattle.enemyPokemon() && GymBattle.enemyPokemon().health() > 0) {
        GymBattle.clickAttack();
      }

      // Dungeon
      if (App.game.gameState == GameConstants.GameState.dungeon && DungeonBattle.enemyPokemon() && DungeonBattle.enemyPokemon().health() > 0) {
        DungeonBattle.clickAttack();
      }

      autoclickerStatusElem.textContent = `Auto-clicker enabled at ${AUTOCLICKER_INTERVAL_MS}ms.`;
    }, AUTOCLICKER_INTERVAL_MS);
  }

  function stopAutoclicker() {
    if (autoclickerIntervalId.current) clearInterval(autoclickerIntervalId.current);
    autoclickerIntervalId.current = null;

    autoclickerStatusElem.textContent = 'Auto-clicker disabled. Click here to enable.';
  }

  autoclickerStatusElem.classList.add('autoclicker-status');
  
  autoclickerStatusElem.onclick = () => {
    if (autoclickerIntervalId.current === null) {
      startAutoclicker();
    } else {
      stopAutoclicker();
    }
  };

  document.body.appendChild(autoclickerStatusElem);

  stopAutoclicker();
}

(() => {
  console.info('%c[Pokeclicker Speedrun Tools]', 'color: #9b59b6', 'Auto clicker loaded');
  enableAutoclicker();
})();

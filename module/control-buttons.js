export function initControlButtons() {

  CONFIG.Canvas.layers.devastra = { layerClass: ControlsLayer, group: "primary" };

  Hooks.on("getSceneControlButtons", (btns) => {
    let menu = [];

    if (game.user.isGM) {
      menu.push({
        name: "gm-manager",
        title: game.i18n.localize("DEVASTRA.GMManager.Title"),
        icon: "fa fa-crosshairs-simple",
        button: true,
        onClick: () => { game.devastra.macros.launchGMManager(); }
      });

      menu.push({
        name: "players-manager",
        title: game.i18n.localize("DEVASTRA.PlayersManager.Title"),
        icon: "fa-solid fa-users",
        button: true,
        onClick: () => { game.devastra.macros.launchPlayersManager(); }
      });


      btns.push({
        name: "devastra",
        title: "Devâstra",
        icon: "fas fa-trillium",
        layer: "devastra",
        tools: menu
      });
    }
  });
}

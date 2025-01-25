import { DEVASTRAActor } from "./actor/actor.js";
import { DEVASTRAItem } from "./item/item.js";

import { DEVASTRACharacterSheet } from "./actor/character-sheet.js";
import { DEVASTRAPNJSheet } from "./actor/npc-sheet.js";
import { DEVASTRAMonsterSheet } from "./actor/monster-sheet.js";

import { DEVASTRAItemSheet } from "./item/item-sheet.js";
import { DEVASTRAEnseignementSheet } from "./item/enseignement-sheet.js";
import { DEVASTRADevastraSheet } from "./item/devastra-sheet.js";
import { DEVASTRAPouvoirSheet } from "./item/pouvoir-sheet.js";
import { DEVASTRAMagieSheet } from "./item/magie-sheet.js";
import { DEVASTRADharmaSheet } from "./item/dharma-sheet.js";
import { DEVASTRAKarmaSheet } from "./item/karma-sheet.js";
import { DEVASTRANoteSheet } from "./item/note-sheet.js";
import { DEVASTRABlessureOuStatutSheet } from "./item/blessureoustatut-sheet.js";

import { DEVASTRA } from "./config.js";
import { preloadHandlebarsTemplates } from "./templates.js";
import { registerHandlebarsHelpers } from "./helpers.js";


import { GMManager } from "./applications/gm/gm-manager.js";
import { PlayersManager } from "./applications/gm/players-manager.js";
import { Macros } from "./macros.js";
import { initControlButtons } from "./control-buttons.js";

import { ModifiedDialog } from "./modified-dialog.js";

globalThis.SYSTEM = DEVASTRA;

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

/**
 * Init hook.
 */
Hooks.once("init", async function () {
  console.log(`DEVASTRA System | Initializing`);

  game.system.CONST = SYSTEM;
  
  game.devastra = {
    config: DEVASTRA,
    macros: Macros,
  };

  // Define socket
  /*
  game.socket.on("system.devastra", (data) => {
    DevastraUtils.performSocketMesssage(data);
  });
  */

  // CONFIG.DEVASTRA = DEVASTRA;

  /*
  // Define custom Entity classes
  CONFIG.Actor.documentClass = documents.CtHackActor;
  CONFIG.Actor.dataModels = {
    character: models.CtHackCharacter,
    opponent: models.CtHackOpponent
  }

  CONFIG.Item.documentClass = documents.CtHackItem;
  CONFIG.Item.dataModels = {
    ability: models.CtHackAbility,
    archetype: models.CtHackArchetype,
    attack: models.CtHackAttack,
    definition: models.CtHackDefinition,
    item: models.CtHackItem,
    magic: models.CtHackMagic,
    weapon: models.CtHackWeapon,
    opponentAbility: models.CtHackOpponentAbility
  };
  */

  // Game Settings
  function delayedReload() {window.setTimeout(() => location.reload(), 500)}
/*
  game.settings.register("devastra", "autoWoundsNPC", {
    name: game.i18n.localize("DEVASTRA.Tenir automatiquement le décompte des blessures"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option auto"),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
    onChange: delayedReload
  });

  */


  game.settings.register("devastra", "viseur0", {
    name: game.i18n.localize("DEVASTRA.Mandala 0 sélectionné"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option activera le rang d'action 0"),
    scope: "world",
    config: false,
    default: true,
    type: Boolean,
  });
  game.settings.register("devastra", "viseur1", {
    name: game.i18n.localize("DEVASTRA.Mandala 1 sélectionné"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option activera le rang d'action 1"),
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });
  game.settings.register("devastra", "viseur2", {
    name: game.i18n.localize("DEVASTRA.Mandala 2 sélectionné"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option activera le rang d'action 2"),
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });
  game.settings.register("devastra", "viseur3", {
    name: game.i18n.localize("DEVASTRA.Mandala 3 sélectionné"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option activera le rang d'action 3"),
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });
  game.settings.register("devastra", "viseur4", {
    name: game.i18n.localize("DEVASTRA.Mandala 4 sélectionné"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option activera le rang d'action 4"),
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });
  game.settings.register("devastra", "viseur5", {
    name: game.i18n.localize("DEVASTRA.Mandala 5 sélectionné"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option activera le rang d'action 5"),
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });
  game.settings.register("devastra", "viseur6", {
    name: game.i18n.localize("DEVASTRA.Mandala 6 sélectionné"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option activera le rang d'action 6"),
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });
  game.settings.register("devastra", "viseur7", {
    name: game.i18n.localize("DEVASTRA.Mandala 7 sélectionné"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option activera le rang d'action 7"),
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });



  game.settings.register("devastra", "sonorizedMandalaInterface", {
    name: game.i18n.localize("DEVASTRA.Sonoriser l'interface du Mandala"),
    hint: game.i18n.localize("DEVASTRA.Décocher cette option rendra l'interface silencieuse"),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
    onChange: delayedReload
  });
  


  game.settings.register("devastra", "playersEditItems", {
    name: game.i18n.localize("DEVASTRA.Autoriser les joueuses à modifer les items"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option autorisera les joueuses"),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: delayedReload
  });


   /**
	 * Set an initiative formula for the system
	 * @type {String}
	 */
  /*
	CONFIG.Combat.initiative = {
        formula: "@initiative",
        decimals: 0
      };
*/
  
  // Define custom Document classes
  CONFIG.Actor.documentClass = DEVASTRAActor;
  CONFIG.Item.documentClass = DEVASTRAItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("devastra", DEVASTRACharacterSheet, { types: ["character"], makeDefault: true }); // ligne modifiée selon directives de LeRatierBretonnien
  Actors.registerSheet("devastra", DEVASTRAPNJSheet, { types: ["npc"], makeDefault: true });
  Actors.registerSheet("devastra", DEVASTRAMonsterSheet, { types: ["monster"], makeDefault: true });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("devastra", DEVASTRAItemSheet, { types: ["item"], makeDefault: true });
  Items.registerSheet("devastra", DEVASTRAEnseignementSheet, { types: ["enseignement"], makeDefault: true });
  Items.registerSheet("devastra", DEVASTRADevastraSheet, { types: ["devastra"], makeDefault: true });
  Items.registerSheet("devastra", DEVASTRAPouvoirSheet, { types: ["pouvoir"], makeDefault: true });
  Items.registerSheet("devastra", DEVASTRAMagieSheet, { types: ["magie"], makeDefault: true });
  Items.registerSheet("devastra", DEVASTRADharmaSheet, { types: ["dharma"], makeDefault: true });
  Items.registerSheet("devastra", DEVASTRAKarmaSheet, { types: ["karma"], makeDefault: true });
  Items.registerSheet("note", DEVASTRANoteSheet, { types: ["note"], makeDefault: true });
  Items.registerSheet("blessureoustatut", DEVASTRABlessureOuStatutSheet, { types: ["blessureoustatut"], makeDefault: true });








  // Init new buttons for the system
  initControlButtons();
  






  // Preload template partials
  await preloadHandlebarsTemplates();

  // Register Handlebars Helpers
  registerHandlebarsHelpers();

  // Modify Runtime configuration settings / Added by MMFO  Items.registerSheet("devastra", DEVASTRAMagieSheet, { types: ["attribute"], makeDefault: true });

  await modifyConfigurationSettings();

  
  // Game Manager
  game.devastra.gmManager = new GMManager();

  game.devastra.playersManager = new PlayersManager();


  console.log(`DEVASTRA System | Initialized`);
});


async function modifyConfigurationSettings() {
  /**
   * Runtime configuration settings for Foundry VTT which exposes a large number of variables which determine how
   * aspects of the software behaves.
   *
   * Unlike the CONST analog which is frozen and immutable, the CONFIG object may be updated during the course of a
   * session or modified by system and module developers to adjust how the application behaves.
   *
   **/

  /**
   * Configuration for the Actor document
   */
  CONFIG.Actor.compendiumBanner = "/systems/devastra/images/banners/actor-banner.webp";

  /**
   * Configuration for the Adventure document
   */
  CONFIG.Adventure.compendiumBanner = "/systems/devastra/images/banners/adventure-banner.webp";

  /**
   * Configuration for the Cards primary Document type
   */
  CONFIG.Cards.compendiumBanner = "ui/banners/cards-banner.webp";

  /**
   * Configuration for Item document
   */
  CONFIG.Item.compendiumBanner = "/systems/devastra/images/banners/item-banner.webp";

  /**
   * Configuration for the JournalEntry document
   */
  CONFIG.JournalEntry.compendiumBanner = "/systems/devastra/images/banners/journalentry-banner.webp";

  /**
   * Configuration for the Macro document
   */
  CONFIG.Macro.compendiumBanner = "ui/banners/macro-banner.webp";

  /**
   * Configuration for the Playlist document
   */
  CONFIG.Playlist.compendiumBanner = "ui/banners/playlist-banner.webp";

  /**
   * Configuration for RollTable random draws
   */
  CONFIG.RollTable.compendiumBanner = "ui/banners/rolltable-banner.webp";

  /**
   * Configuration for the Scene document
   */
  CONFIG.Scene.compendiumBanner = "/systems/devastra/images/banners/scene-banner.webp";
}

Hooks.once("i18nInit", function () {
  // Prélocalisation des objets de configuration
  preLocalizeConfig();
});

function preLocalizeConfig() {
  const localizeConfigObject = (obj, keys) => {
    for (let o of Object.values(obj)) {
      for (let k of keys) {
        o[k] = game.i18n.localize(o[k]);
      }
    }
  };

  localizeConfigObject(DEVASTRA.ITEMSUBTYPES, ["label"]);
  localizeConfigObject(DEVASTRA.MAGIESUBTYPES, ["label"]);
}


/* -------------------------------------------- */
/*  Chat Message Hooks                          */
/* -------------------------------------------- */
// Hooks for Blue Buttons in Chat

Hooks.on("renderChatMessage", (app, html, data,) => {

  const defencecalculateButton = html[0].querySelector("[class='smart-blue-button defence-calculate-click']");
  const woundscalculateButton1 = html[0].querySelector("[class='smart-blue-button wounds-calculate-click']");
  const woundscalculateButton2 = html[0].querySelector("[class='smart-blue-button wounds-auto-calculate-click']");
  const woundscalculateButton3 = html[0].querySelector("[class='smart-blue-button wounds-off-auto-calculate-click']");
  const woundsapplyButton = html[0].querySelector("[class='smart-blue-button wounds-apply-click']");
  const shakticalculateButton = html[0].querySelector("[class='smart-blue-button shakti-defence-calculate-click']");


  if (shakticalculateButton != undefined && shakticalculateButton != null) {
    shakticalculateButton.addEventListener('click', () => {

      console.log("On est bien dans shakticalculatebutton");

      // La joueuse ou le PNJ utilise de la shakti depuis le Tchat pour sa défense contre une attaque


      // On récupère les datas de l'attaquant dans le Tchat
      const nd = html[0].querySelector("span[class='nd']").textContent;
      const total = html[0].querySelector("span[class='total']").textContent;
      const attaquantficheId = html[0].querySelector("span[class='attaquantficheId']").textContent;
      const opposantficheId = html[0].querySelector("span[class='opposantficheId']").textContent;
      const consideropponentprotection = html[0].querySelector("span[class='consideropponentprotection']").textContent;
      const isinventory = html[0].querySelector("span[class='isinventory']").textContent;
      const selectedinventory = html[0].querySelector("span[class='selectedinventory']").textContent;
      const selectedinventorydevastra = html[0].querySelector("span[class='selectedinventorydevastra']").textContent;
      const selectedinventorypower = html[0].querySelector("span[class='selectedinventorypower']").textContent;
      const selectedinventorymagic = html[0].querySelector("span[class='selectedinventorymagic']").textContent;
      const damage = html[0].querySelector("span[class='damage']").textContent;
      const damagetype = html[0].querySelector("span[class='damagetype']").textContent;

      const defence = html[0].querySelector("span[class='defence']").textContent;
      const defencetype = html[0].querySelector("span[class='defencetype']").textContent;

      

      // Ici on fait remplir les paramètres de shakti por le défenseur

      let myActorId = "";
      if (opposantficheId != "") {
        myActorId = opposantficheId;
      } else {
        myActorId = attaquantficheId;
      };

      let myActor = game.actors.get(myActorId);

      /*
      if (myActor == undefined) {
        ui.notifications.warn(game.i18n.localize("DEVASTRA.Error7"));
        return;
      };
      */

      // On vérifie d'abord que c'est la bonne joueuse ou PNJ, sinon on ne fait rien
      let myUserId = game.user.id;
      let isOwner = (myActor.ownership[myUserId] == CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER);


      if (game.user.isGM) {
        isOwner = true;
      }


      if (!(isOwner)) {
        ui.notifications.warn(game.i18n.localize("DEVASTRA.Error3"));
        return;
      };

      let myTitle = game.i18n.localize("DEVASTRA.Shakti de défense");
      let myDialogOptions = {
        classes: ["devastra", "sheet"]
      };
      let template = "";


      _treatShaktiDialog (
        myActor, template, myTitle, myDialogOptions, nd, total, attaquantficheId, opposantficheId,
        consideropponentprotection, isinventory, selectedinventory, selectedinventorydevastra, selectedinventorypower,
        selectedinventorymagic, damage, damagetype, defence, defencetype
      );

  
    })
  };




  if (defencecalculateButton != undefined && defencecalculateButton != null) {
    defencecalculateButton.addEventListener('click', () => {

      // La joueuse ou le PNJ calcule depuis le Tchat sa défense contre une attaque


      // On récupère les datas de l'attaquant dans le Tchat
      const nd = html[0].querySelector("span[class='nd']").textContent;
      const total = html[0].querySelector("span[class='total']").textContent;
      const attaquantficheId = html[0].querySelector("span[class='attaquantficheId']").textContent;
      const opposantficheId = html[0].querySelector("span[class='opposantficheId']").textContent;
      const consideropponentprotection = html[0].querySelector("span[class='consideropponentprotection']").textContent;
      const isinventory = html[0].querySelector("span[class='isinventory']").textContent;
      const selectedinventory = html[0].querySelector("span[class='selectedinventory']").textContent;
      const selectedinventorydevastra = html[0].querySelector("span[class='selectedinventorydevastra']").textContent;
      const selectedinventorypower = html[0].querySelector("span[class='selectedinventorypower']").textContent;
      const selectedinventorymagic = html[0].querySelector("span[class='selectedinventorymagic']").textContent;
      const damage = html[0].querySelector("span[class='damage']").textContent;
      const damagetype = html[0].querySelector("span[class='damagetype']").textContent;

      const defence = html[0].querySelector("span[class='defence']").textContent;
      const defencetype = html[0].querySelector("span[class='defencetype']").textContent;




      /*
      Ici on fait remplir les paramètres de lancer de dés pour le défenseur
      */
      const myActorId = opposantficheId;
      let myActor = game.actors.get(myActorId);

      if (myActor == undefined) {
        ui.notifications.warn(game.i18n.localize("DEVASTRA.Error7"));
        return;
      };

      // On vérifie d'abord que c'est la bonne joueuse ou PNJ, sinon on ne fait rien
      let myUserId = game.user.id;
      let isOwner = (myActor.ownership[myUserId] == CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER);

      if (game.user.isGM) {
        isOwner = true;
      }

      if (!(isOwner)) {
        ui.notifications.warn(game.i18n.localize("DEVASTRA.Error3"));
        return;
      };

      let myTitle = game.i18n.localize("DEVASTRA.Jet de défense titre").replace("^0", myActor.name);
      let myDialogOptions = {
        classes: ["devastra", "sheet"]
      };
      let template = "";

      if (myActor.type == 'npc' || myActor.type == 'monster') {

        _treatSkillDiceRollDefenceNPCDialog(
          myActor, template, myTitle, myDialogOptions, nd, total, attaquantficheId, opposantficheId,
          consideropponentprotection, isinventory, selectedinventory, selectedinventorydevastra, selectedinventorypower,
          selectedinventorymagic, damage, damagetype
        );

      } else {

        _treatSkillDiceRollDefenceDialog(
          myActor, template, myTitle, myDialogOptions, nd, total, attaquantficheId, opposantficheId,
          consideropponentprotection, isinventory, selectedinventory, selectedinventorydevastra, selectedinventorypower,
          selectedinventorymagic, damage, damagetype
        );

      }








    
    })
  
  }




  if (woundsapplyButton != undefined && woundsapplyButton != null) {
    woundsapplyButton.addEventListener('click', () => {

      // La joueuse applique depuis le Tchat les blessures infligées à son P(N)J par le P(N)J attaquant
      // On vérifie d'abord que c'est la bonne joueuse, sinon on ne fait rien


      console.log("La joueuse applique depuis le Tchat les blessures infligées à son P(N)J par le P(N)J attaquant");
      /*
      const typeofthrow = html[0].querySelector("div[class='typeofthrow']").textContent;

      const youwin = html[0].querySelector("div[class='youwin']").textContent;
      const yourplayerid = html[0].querySelector("div[class='yourplayerid']").textContent;
      const youractorid = html[0].querySelector("div[class='youractorid']").textContent;
      const yourdamage = html[0].querySelector("div[class='yourdamage']").textContent;
      const yourprotection = html[0].querySelector("div[class='yourprotection']").textContent;
      const youropponent = html[0].querySelector("div[class='youropponent']").textContent;
      const youropponentid = html[0].querySelector("div[class='youropponentid']").textContent;
      const youropponentdamage = html[0].querySelector("div[class='youropponentdamage']").textContent;
      const youropponentprotection = html[0].querySelector("div[class='youropponentprotection']").textContent;

      const myUser = game.user;
      console.log("game.user.id = ", game.user.id);
      console.log("yourplayerid = ", yourplayerid);
      if (!(game.user.id == yourplayerid)) {console.log("TADAM !") ;return;}; // Pas le bon utilisateur !

      const myActor = game.actors.get(youractorid);

      let wounds = 0;
      if (myActor != null) {
        wounds = 1 + parseInt(youropponentdamage) - parseInt(yourprotection);
        if (wounds < 0) {
          wounds = 0;
        };
        _updateActorSheetWoundsJauge (myActor, wounds);

        let typeOfThrow = parseInt(typeofthrow);

        let smartTemplate = 'systems/devastra/templates/form/dice-result-apply-wounds.html';

        let smartData = {};

        _showCalculateWoundsInChat (myActor, typeOfThrow, smartTemplate, smartData);
      };
      */

    })

  }


  /*
  if (woundsapplytoNPCButton != undefined && woundsapplytoNPCButton != null) {
    woundsapplytoNPCButton.addEventListener('click', () => {

      // Le MJ applique depuis le Tchat les blessures infligées à son PNJ par le PJ
      // On vérifie d'abord que c'est bien le MJ, sinon on ne fait rien

      console.log('Je suis dans woundsapplytoNPCButton')

      const typeofthrow = html[0].querySelector("div[class='typeofthrow']").textContent;

      const youwin = html[0].querySelector("div[class='youwin']").textContent;
      const yourdamage = html[0].querySelector("div[class='yourdamage']").textContent;
      const yourprotection = html[0].querySelector("div[class='yourprotection']").textContent;
      const youropponent = html[0].querySelector("div[class='youropponent']").textContent;
      const youropponentid = html[0].querySelector("div[class='youropponentid']").textContent;
      const youropponentdamage = html[0].querySelector("div[class='youropponentdamage']").textContent;
      const youropponentprotection = html[0].querySelector("div[class='youropponentprotection']").textContent;

      if (!(game.user.isGM)) {console.log("TADAM !") ;return}; // Pas le bon utilisateur !


      const myActor = game.actors.get(youropponentid);

      let wounds = 0;
      if (myActor != null) {
        wounds = 1 + parseInt(yourdamage) - parseInt(youropponentprotection);
        if (wounds < 0) {
          wounds = 0;
        };
        _updateActorSheetWoundsJauge (myActor, wounds);

        let typeOfThrow = 3; // juste pour le MJ utilisateur

        let smartTemplate = 'systems/devastra/templates/form/dice-result-apply-wounds.html'

        let smartData = {};

        _showCalculateWoundsInChat (myActor, typeOfThrow, smartTemplate, smartData);

      };

    })

  }
  */
  if (woundscalculateButton3 != undefined && woundscalculateButton3 != null) {
    woundscalculateButton3.addEventListener('click', () => {
      // La joueuse effectue depuis le Tchat le calcul des blessures qu'elle a évitées
      // On vérifie d'abord que c'est la bonne joueuse, sinon on ne fait rien

      console.log("La joueuse effectue depuis le Tchat le calcul des blessures qu'elle a évitées");
    });
  }

  if (woundscalculateButton2 != undefined && woundscalculateButton2 != null) {
    woundscalculateButton2.addEventListener('click', () => {
      // La joueuse effectue depuis le Tchat le calcul des blessures qu'elle a reçues
      // On vérifie d'abord que c'est la bonne joueuse, sinon on ne fait rien

      console.log("La joueuse effectue depuis le Tchat le calcul des blessures qu'elle a reçues");

    });
  }

  if (woundscalculateButton1 != undefined && woundscalculateButton1 != null) {
    woundscalculateButton1.addEventListener('click', () => {

      // La joueuse effectue depuis le Tchat le calcul des blessures qu'elle a infligées
      // On vérifie d'abord que c'est la bonne joueuse, sinon on ne fait rien

      console.log("La joueuse effectue depuis le Tchat le calcul des blessures qu'elle a infligées");

      // On récupère les datas de l'attaquant dans le Tchat
      // const defencetype = html[0].querySelector("span[class='defencetype']").textContent;
      // const defence = html[0].querySelector("span[class='defence']").textContent;
      const nd = html[0].querySelector("span[class='nd']").textContent;
      const total = html[0].querySelector("span[class='total']").textContent;
      const attaquantficheId = html[0].querySelector("span[class='attaquantficheId']").textContent;
      const opposantficheId = html[0].querySelector("span[class='opposantficheId']").textContent;
      const consideropponentprotection = html[0].querySelector("span[class='consideropponentprotection']").textContent;
      const isinventory = html[0].querySelector("span[class='isinventory']").textContent;
      const selectedinventory = html[0].querySelector("span[class='selectedinventory']").textContent;
      const selectedinventorydevastra = html[0].querySelector("span[class='selectedinventorydevastra']").textContent;
      const selectedinventorypower = html[0].querySelector("span[class='selectedinventorypower']").textContent;
      const selectedinventorymagic = html[0].querySelector("span[class='selectedinventorymagic']").textContent;
      const damage = html[0].querySelector("span[class='damage']").textContent;
      const damagetype = html[0].querySelector("span[class='damagetype']").textContent;

      const defence = html[0].querySelector("span[class='defence']").textContent;
      const defencetype = html[0].querySelector("span[class='defencetype']").textContent;


      /*
      Ici on calcule les blessures infligées
      */
      let myActorId = "";
      if (opposantficheId != "") {
        myActorId = opposantficheId;
      } else {
        myActorId = attaquantficheId;
      };

      let myActor = game.actors.get(myActorId);

      /*
      if (myActor == undefined) {
        ui.notifications.warn(game.i18n.localize("DEVASTRA.Error7"));
        return;
      };
      */

      // On vérifie d'abord que c'est la bonne joueuse ou PNJ, sinon on ne fait rien
      let myUserId = game.user.id;
      let isOwner = (myActor.ownership[myUserId] == CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER);

      if (game.user.isGM) {
        isOwner = true;
      }

      if (!(isOwner)) {
        ui.notifications.warn(game.i18n.localize("DEVASTRA.Error3"));
        return;
      };

      let myTitle = game.i18n.localize("DEVASTRA.Jet de défense titre").replace("^0", myActor.name);
      let myDialogOptions = {
        classes: ["devastra", "sheet"]
      };
      let template = "";


      _showCalculateWoundsInChat(
        myActor, template, myTitle, myDialogOptions, nd, total, attaquantficheId, opposantficheId,
        consideropponentprotection, isinventory, selectedinventory, selectedinventorydevastra, selectedinventorypower,
        selectedinventorymagic, damage, damagetype, defence, defencetype
      );

    })

  }

})



/* -------------------------------------------- */

async function _showCalculateWoundsInChat (
  myActor, template, myTitle, myDialogOptions, nd, total, attaquantficheId, opposantficheId,
        consideropponentprotection, isinventory, selectedinventory, selectedinventorydevastra, selectedinventorypower,
        selectedinventorymagic, damage, damagetype, defence, defencetype
  ) {
  
  const smartTemplate = 'systems/devastra/templates/form/dice-result-wounds.html';
  const smartData = {
    nd: nd,

    // total: rModif._total,

    attaquantficheId: attaquantficheId,
    opposantficheId: opposantficheId,
    consideropponentprotection: consideropponentprotection,

    isinventory: isinventory,
    selectedinventory: selectedinventory,
    selectedinventorydevastra: selectedinventorydevastra,
    selectedinventorypower: selectedinventorypower,
    selectedinventorymagic: selectedinventorymagic,
    damage: damage,
    damagetype: damagetype,
    
    defence: defence,
    defencetype: defencetype,
    /*
    succes: d_successes,
    d1: n.d6_1,
    d2: n.d6_2,
    d3: n.d6_3,
    d4: n.d6_4,
    d5: n.d6_5,
    d6: n.d6_6,
    dA: mySuccesAutoSupplem
    */
  }
  console.log("smartData avant retour func = ", smartData);
  const smartHtml = await renderTemplate(smartTemplate, smartData);

  const myTypeOfThrow = game.settings.get("core", "rollMode"); // Type de Lancer
  
  ChatMessage.create({
    user: game.user.id,
    // speaker: ChatMessage.getSpeaker({ token: this.actor }),
    speaker: ChatMessage.getSpeaker({ actor: myActor }),
    content: smartHtml,
    rollMode: myTypeOfThrow
  });


}







/* -------------------------------------------- */

async function _showMessagesInChat (myActor, myTypeOfThrow, r, mySmartRTemplate, mySmartRData, mySmartTemplate, mySmartData) {

  let msg = "";

  const typeOfThrow = myTypeOfThrow;

  switch ( typeOfThrow ) {
    case 0: msg = await r.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: myActor }),
      rollMode: 'roll'                      // Public Roll
      });
    break;
    case 1: msg = await r.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: myActor }),
      rollMode: 'gmroll'                    // Private Roll
      });
    break;
    case 2: msg = await r.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: myActor }),
      rollMode: 'blindroll'                 // Blind GM Roll
    });
    break;
    case 3: msg = await r.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: myActor }),
      rollMode: 'selfroll'                      // Self Roll
    });
    break;
    default: console.log("C'est bizarre !");


    if (game.modules.get("dice-so-nice")?.active) {
      await game.dice3d.waitFor3DAnimationByMessageID(msg.id);
    };

  }

  // Smart Message
  const smartTemplate = mySmartTemplate;
  const smartData = mySmartData;
  const smartHtml = await renderTemplate(smartTemplate, smartData);

  switch ( typeOfThrow ) {
    case 0:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartHtml,
        rollMode: 'roll'                          // Public Roll
      });

    break;
    case 1:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartHtml,
        rollMode: 'gmroll'                        // Private Roll
      });

    break;
    case 2:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartHtml,
        rollMode: 'blindroll'                       // Blind GM Roll
      });

    break;
    case 3:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartHtml,
        rollMode: 'selfroll'                        // Self Roll
      });

    break;
    default: console.log("C'est bizarre !");
  };

  // SmartR Message
  const smartRTemplate = mySmartRTemplate;
  const smartRData = mySmartRData;
  const smartRHtml = await renderTemplate(smartRTemplate, smartRData);
 
  switch ( typeOfThrow ) {
    case 0:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartRHtml,
        rollMode: 'roll'                          // Public Roll
      });

    break;
    case 1:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartRHtml,
        rollMode: 'gmroll'                        // Private Roll
      });

    break;
    case 2:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartRHtml,
        rollMode: 'blindroll'                       // Blind GM Roll
      })

    break;
    case 3:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartRHtml,
        rollMode: 'selfroll'                        // Self Roll
      });

    break;
    default: console.log("C'est bizarre !");
  };

}

/* -------------------------------------------- */

async function _updateActorSheetWoundsJauge (myActor, wounds) {

  const oldLevelBlessures = await myActor.system.blessures.lvl;

  console.log("oldLevelBlessures = ", oldLevelBlessures);

  let newLevelBlessures = oldLevelBlessures + wounds;

  if (newLevelBlessures > 8) {
    newLevelBlessures = 8;
  };

  console.log("newLevelBlessures = ", newLevelBlessures);

  if (oldLevelBlessures < 1 && newLevelBlessures >= 1) {
    myActor.update({ "system.blessures.blessure_1.check": true });
  };
  if (oldLevelBlessures < 2 && newLevelBlessures >= 2) {
    myActor.update({ "system.blessures.blessure_2.check": true });
  };
  if (oldLevelBlessures < 3 && newLevelBlessures >= 3) {
    myActor.update({ "system.blessures.blessure_3.check": true });
  };
  if (oldLevelBlessures < 4 && newLevelBlessures >= 4) {
    myActor.update({ "system.blessures.blessure_4.check": true });
  };
  if (oldLevelBlessures < 5 && newLevelBlessures >= 5) {
    myActor.update({ "system.blessures.blessure_5.check": true });
  };
  if (oldLevelBlessures < 6 && newLevelBlessures >= 6) {
    myActor.update({ "system.blessures.blessure_6.check": true });
  };
  if (oldLevelBlessures < 7 && newLevelBlessures >= 7) {
    myActor.update({ "system.blessures.blessure_7.check": true });
  };
  if (oldLevelBlessures < 8 && newLevelBlessures >= 8) {
    myActor.update({ "system.blessures.blessure_8.check": true });
  };


  myActor.update({ "system.blessures.lvl": newLevelBlessures });

}



async function _treatShaktiDialog(
  myActor, template, myTitle, myDialogOptions, nd, total, attaquantficheId, opposantficheId,
  consideropponentprotection, isinventory, selectedinventory, selectedinventorydevastra, selectedinventorypower,
  selectedinventorymagic, damage, damagetype, defence, defencetype
) {
  let myResultDialog = await _shaktiDialog(
    myActor, template, myTitle, myDialogOptions, nd, total, attaquantficheId, opposantficheId,
    consideropponentprotection, isinventory, selectedinventory, selectedinventorydevastra, selectedinventorypower,
    selectedinventorymagic, damage, damagetype, defence, defencetype
  );





  //////////////////////////////////////////////////////////////////
  if (!(myResultDialog)) {
    ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
    return;
  };
  //////////////////////////////////////////////////////////////////


}

async function _shaktiDialog(
  myActor, template, myTitle, myDialogOptions, myND, myTotal, myAttaquantficheId, myOpposantficheId,
  myConsideropponentprotection, myIsinventory, mySelectedinventory, mySelectedinventorydevastra, mySelectedinventorypower,
  mySelectedinventorymagic, myDamage, myDamagetype, myDefence, myDefenceType
  ) {

  // Render modal dialog

  template = template || 'systems/devastra/templates/form/skill-dice-prompt-shakti.html';
  const myActorID = myActor;
  const title = myTitle;
  const dialogOptions = myDialogOptions;

  const nd = myND;
  const total = myTotal;
  const attaquantficheId = myAttaquantficheId;
  const opposantficheId = myOpposantficheId;
  const consideropponentprotection = myConsideropponentprotection;
  const isinventory = myIsinventory;
  const selectedinventory = mySelectedinventory;
  const selectedinventorydevastra = mySelectedinventorydevastra;
  const selectedinventorypower = mySelectedinventorypower;
  const selectedinventorymagic = mySelectedinventorymagic;
  const damage =  myDamage;
  const damagetype = myDamagetype;

  const defence =  myDefence;
  const defencetype = myDefenceType;


  var dialogData = {
    nd: nd,

    // total: rModif._total,

    attaquantficheId: attaquantficheId,
    opposantficheId: opposantficheId,

    consideropponentprotection: consideropponentprotection,
    isinventory: isinventory,
    selectedinventory: selectedinventory,
    selectedinventorydevastra: selectedinventorydevastra,
    selectedinventorypower: selectedinventorypower,
    selectedinventorymagic: selectedinventorymagic,
    damage: damage,
    damagetype: damagetype,

    defence: defence,
    defencetype: defencetype

  }

  const html = await renderTemplate(template, dialogData);
  // Create the Dialog window
  let prompt = await new Promise((resolve) => {
    new Dialog(
      {
        title: title,
        content: html,
        buttons: {
          validateBtn: {
            icon: `<div class="tooltip"><i class="fas fa-check"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Validate')}</span></div>`,
            callback: (html) => resolve( dialogData = _computeResult(myActorID, dialogData, html) )
          },
          cancelBtn: {
            icon: `<div class="tooltip"><i class="fas fa-cancel"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Cancel')}</span></div>`,
            callback: (html) => resolve( null )
          }
        },
        default: 'validateBtn',
        close: () => resolve( null )
    },
    dialogOptions
    ).render(true, {
      width: 300,
      height: "auto"
    });
  });

  if (prompt == null) {
    dialogData = null;
  };

  return dialogData;

  //////////////////////////////////////////////////////////////
  async function _computeResult(myActor, myDialogData, myHtml) {
    const editedData = {
      defenseshakti: myHtml.find("select[name='defenseshakti']").val(),
    };
    return editedData;
  }



}


/* -------------------------------------------- */
/*  Dialogue de lancer de défense               */
/* -------------------------------------------- */
async function _treatSkillDiceRollDefenceDialog(
  myActor, template, myTitle, myDialogOptions, myND, myTotal, myAttaquantficheId, myOpposantficheId,
  myConsideropponentprotection, myIsinventory, mySelectedinventory, mySelectedinventorydevastra, mySelectedinventorypower,
  mySelectedinventorymagic, myDamage, myDamagetype
) {
  console.log("Il s'agit d'un PJ")
  let myResultDialog =  await _skillDiceRollDefenceDialog(
    myActor, template, myTitle, myDialogOptions, myND, myTotal, myAttaquantficheId, myOpposantficheId,
    myConsideropponentprotection, myIsinventory, mySelectedinventory, mySelectedinventorydevastra, mySelectedinventorypower,
    mySelectedinventorymagic, myDamage, myDamagetype
  );

  //////////////////////////////////////////////////////////////////
  if (!(myResultDialog)) {
    ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
    return;
  };
  //////////////////////////////////////////////////////////////////

  let myVersionDebloqueeFlag = (myResultDialog.versiondebloquee == 1);
  if (myVersionDebloqueeFlag) {


    myResultDialog = await _skillDiceRollDefenceDialogDeblocked (
      myActor, template, myTitle, myDialogOptions, myND, myTotal, myAttaquantficheId, myOpposantficheId,
      myConsideropponentprotection, myIsinventory, mySelectedinventory, mySelectedinventorydevastra, mySelectedinventorypower,
      mySelectedinventorymagic, myDamage, myDamagetype
    );
 

    //////////////////////////////////////////////////////////////////
    if (!(myResultDialog)) {
      ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
      return;
      };
    //////////////////////////////////////////////////////////////////


    var nd = myND;
    var total = myTotal;
    var attaquantficheId = myAttaquantficheId;
    var opposantficheId = myOpposantficheId;
    var consideropponentprotection = myConsideropponentprotection;
    var isinventory = myIsinventory;
    var selectedinventory = mySelectedinventory;
    var selectedinventorydevastra = mySelectedinventorydevastra;
    var selectedinventorypower = mySelectedinventorypower;
    var selectedinventorymagic = mySelectedinventorymagic;
    var damage =  myDamage;
    var damagetype = myDamagetype;

    var domains = myResultDialog.domains;
    var jet = "defnc";
    var ouijet = myResultDialog.ouijet;
    var defencend = myResultDialog.defencend;
    var ouishaktidefense = myResultDialog.ouishaktidefense;
    var bonusdomaineflag = myResultDialog.bonusdomainecheck;
    var specialiteflag = myResultDialog.specialitecheck;
    var malusblessureflag = myResultDialog.malusblessurecheck;
    var malusstatutflag = myResultDialog.malusstatutcheck;
    var nbrdedomainedph = myResultDialog.nbrdedomainedph;
    var nbrdedomainedma = myResultDialog.nbrdedomainedma;
    var nbrdedomainedin = myResultDialog.nbrdedomainedin;
    var nbrdedomainedso = myResultDialog.nbrdedomainedso;
    var nbrdedomainedmy = myResultDialog.nbrdedomainedmy;
    var nbrdebonusdomainedph = myResultDialog.nbrdebonusdomainedph;
    var nbrdebonusdomainedma = myResultDialog.nbrdebonusdomainedma;
    var nbrdebonusdomainedin = myResultDialog.nbrdebonusdomainedin;
    var nbrdebonusdomainedso = myResultDialog.nbrdebonusdomainedso;
    var nbrdebonusdomainedmy = myResultDialog.nbrdebonusdomainedmy;
    var nbrdemalusstatutdph = myResultDialog.nbrdemalusstatutdph;
    var nbrdemalusstatutdma = myResultDialog.nbrdemalusstatutdma;
    var nbrdemalusstatutdin = myResultDialog.nbrdemalusstatutdin;
    var nbrdemalusstatutdso = myResultDialog.nbrdemalusstatutdso;
    var nbrdemalusstatutdmy = myResultDialog.nbrdemalusstatutdmy;
    var nbrdebonusspecialite = myResultDialog.nbrdebonusspecialite;

    var defencend = myResultDialog.defencend;
    var malusblessureflag = false;
    var malusstatutflag = false;
    var bonusdomaineflag = myResultDialog.bonusdomainecheck;
    var bonusapplique = myResultDialog.bonusapplique;
    var plusdeuxdesdattaque = myResultDialog.plusdeuxdesdattaque; // en fait, uniquement nbre jetons Shakti à enlever
    var malususapplique = myResultDialog.malususapplique;
    var ignoremalus = myResultDialog.ignoremalus;
    var malusAignorer = 0;
    var succesauto = myResultDialog.succesauto;
    var plusunsuccesauto = myResultDialog.plusunsuccesauto; // en fait, uniquement nbre jetons Conviction à enlever
    var desnonexplo = 0;
    var sixexploflag = myResultDialog.sixexplo;
    var cinqexploflag = myResultDialog.cinqexplo;

    var defencetype = domains;

    // console.log("myPlusDeuxDesDAttaque", myPlusDeuxDesDAttaque);
    // console.log("myIgnoreMalus", myIgnoreMalus);
    // console.log("myPlusUnSuccesAuto", myPlusUnSuccesAuto);
    // console.log("myActor.system.conviction.piledejetons", myActor.system.conviction.piledejetons);

    var shaktisuffisanteFlag = (plusdeuxdesdattaque <= myActor.system.shakti.piledejetons); // s'il reste assez de jetons de Shakti
    var convictionsuffisanteflag = ((ignoremalus + plusunsuccesauto) <= myActor.system.conviction.piledejetons); // s'il reste assez de jetons de Conviction

  } else {

    var nd = myND;
    var total = myTotal;
    var attaquantficheId = myAttaquantficheId;
    var opposantficheId = myOpposantficheId;
    var consideropponentprotection = myConsideropponentprotection;
    var isinventory = myIsinventory;
    var selectedinventory = mySelectedinventory;
    var selectedinventorydevastra = mySelectedinventorydevastra;
    var selectedinventorypower = mySelectedinventorypower;
    var selectedinventorymagic = mySelectedinventorymagic;
    var damage =  myDamage;
    var damagetype = myDamagetype;

    var domains = myResultDialog.domains;
    var jet = "defnc";
    var ouijet = myResultDialog.ouijet;
    var defencend = myResultDialog.defencend;
    var ouishaktidefense = myResultDialog.ouishaktidefense;
    var bonusdomaineflag = myResultDialog.bonusdomainecheck;
    var specialiteflag = myResultDialog.specialitecheck;
    var malusblessureflag = myResultDialog.malusblessurecheck;
    var malusstatutflag = myResultDialog.malusstatutcheck;
    var nbrdedomainedph = myResultDialog.nbrdedomainedph;
    var nbrdedomainedma = myResultDialog.nbrdedomainedma;
    var nbrdedomainedin = myResultDialog.nbrdedomainedin;
    var nbrdedomainedso = myResultDialog.nbrdedomainedso;
    var nbrdedomainedmy = myResultDialog.nbrdedomainedmy;
    var nbrdebonusdomainedph = myResultDialog.nbrdebonusdomainedph;
    var nbrdebonusdomainedma = myResultDialog.nbrdebonusdomainedma;
    var nbrdebonusdomainedin = myResultDialog.nbrdebonusdomainedin;
    var nbrdebonusdomainedso = myResultDialog.nbrdebonusdomainedso;
    var nbrdebonusdomainedmy = myResultDialog.nbrdebonusdomainedmy;
    var nbrdemalusstatutdph = myResultDialog.nbrdemalusstatutdph;
    var nbrdemalusstatutdma = myResultDialog.nbrdemalusstatutdma;
    var nbrdemalusstatutdin = myResultDialog.nbrdemalusstatutdin;
    var nbrdemalusstatutdso = myResultDialog.nbrdemalusstatutdso;
    var nbrdemalusstatutdmy = myResultDialog.nbrdemalusstatutdmy;
    var nbrdebonusspecialite = myResultDialog.nbrdebonusspecialite;

    var defencend = myResultDialog.defencend;
    var malusblessureflag = myResultDialog.malusblessurecheck;
    var malusstatutflag = myResultDialog.malusstatutcheck;
    var bonusdomaineflag = myResultDialog.bonusdomainecheck;
    var specialiteflag = myResultDialog.specialitecheck;
    var nbrdebonusspecialite = myResultDialog.nbrdebonusspecialite;
    var bonusapplique = myResultDialog.bonusapplique;
    var plusdeuxdesdattaque = myResultDialog.plusdeuxdesdattaque;
    var malususapplique = myResultDialog.malususapplique;
    var ignoremalus = myResultDialog.ignoremalus;
    var malususaignorer = myResultDialog.malususaignorer;
    var succesauto = myResultDialog.succesauto;
    var plusunsuccesauto = myResultDialog.plusunsuccesauto;
    var desnonexplo = myResultDialog.desnonexplo;
    var sixexplo = myResultDialog.sixexplo;
    var cinqexplo = myResultDialog.cinqexplo;

    var defencetype = domains;

    // console.log("myPlusDeuxDesDAttaque", myPlusDeuxDesDAttaque);
    // console.log("myIgnoreMalus", myIgnoreMalus);
    // console.log("myPlusUnSuccesAuto", myPlusUnSuccesAuto);
    // console.log("myActor.system.conviction.piledejetons", myActor.system.conviction.piledejetons);

    var shaktisuffisanteflag = (plusdeuxdesdattaque <= myActor.system.shakti.piledejetons); // s'il reste assez de jetons de Shakti
    var convictionsuffisanteflag = ((ignoremalus + plusunsuccesauto) <= myActor.system.conviction.piledejetons); // s'il reste assez de jetons de Conviction
  

    let myNbrDeDomaine = 0;
    let myNbrDeBonusDomaine = 0;
    switch (domains) {
      case "dph":
        myNbrDeDomaine = parseInt(nbrdedomainedph);
        myNbrDeBonusDomaine = parseInt(nbrdebonusdomainedph);

      break;
      case "dma":
        myNbrDeDomaine = parseInt(nbrdedomainedma);
        myNbrDeBonusDomaine = parseInt(nbrdebonusdomainedma);

      break;
      case "din":
        myNbrDeDomaine = parseInt(nbrdedomainedin);
        myNbrDeBonusDomaine = parseInt(nbrdebonusdomainedin);

      break;
      case "dso":
        myNbrDeDomaine = parseInt(nbrdedomainedso);
        myNbrDeBonusDomaine = parseInt(nbrdebonusdomainedso);

      break;
      case "dmy":
        myNbrDeDomaine = parseInt(nbrdedomainedmy);
        myNbrDeBonusDomaine = parseInt(nbrdebonusdomainedmy);

      break;
      default: console.log("C'est bizarre !");
    }
    if (!(parseInt(bonusdomaineflag))) {
      myNbrDeBonusDomaine = 0;
    }
    let myNbrDeBonusSpecialite = 0;
    if (parseInt(specialiteflag)) {
      myNbrDeBonusSpecialite = parseInt(nbrdebonusspecialite);
    }
    let myBonusApplique = parseInt(bonusapplique);
    let myMalusApplique = parseInt(malususapplique);
    let myMalusAIgnorer = parseInt(malususaignorer);
    let mySuccesAuto = parseInt(succesauto);
    let myShaktiSuffisanteFlag = parseInt(shaktisuffisanteflag);
    let jetLibel = jet;
    let myPlusDeuxDesDAttaque = parseInt(plusdeuxdesdattaque);
    let myconvictionSuffisanteFlag = parseInt(convictionsuffisanteflag);
    let myIgnoreMalus = parseInt(ignoremalus);
    let myPlusUnSuccesAuto = parseInt(plusunsuccesauto);
    let myCinqExploFlag = parseInt(cinqexplo);
    let mySixExploFlag = parseInt(sixexplo);
    let myMalusBlessureCheck = parseInt(malusblessureflag);
    let myMalusStatutCheck = parseInt(malusstatutflag);
    let myDesNonExplo = parseInt(desnonexplo);

    /***********************************************************************************
    * 
    * {N} : nombre de dés lancés
    * {S} : seuil à atteindre (Niveau de Difficulté)
    * {A} : nombre de réussites automatiques
    * 
    * /r {N}d6cs>={S} : roll N d6, count successes (>=S), no dice results are explosive
    * /r {N}d6x=6cs>={S} : roll N d6, count successes (>=S), only 6 are explosive
    * /r {N}d6x>=5cs>={S} : roll N d6, count successes (>=S), 5 and 6 are explosive
    * 
    * nombre de 1 = ?
    * nombre de 2 = ?
    * nombre de 3 = ?
    * nombre de 4 = ?
    * nombre de 5 = ?
    * nombre de 6 = ?
    * nombre de réussites automatiques = {A}
    * defence nombre de réussites = roll.result+{A}
    * 
    ************************************************************************************/


    let d6_1 = 0;
    let d6_2 = 0;
    let d6_3 = 0;
    let d6_4 = 0;
    let d6_5 = 0;
    let d6_6 = 0;
    let d6_A = 0;

    let suite = "[";

    let defence = parseInt(myNbrDeDomaine);

    // console.log("myNbrDeBonusDomaine", myNbrDeBonusDomaine);
    if (bonusdomaineflag) {
      defence += parseInt(myNbrDeBonusDomaine);
      // console.log("myNbrDeBonusDomaine", "compabilisé");
    };

    // console.log("myNbrDeBonusSpecialite", myNbrDeBonusSpecialite);
    if (specialiteflag) {
      defence += parseInt(myNbrDeBonusSpecialite);
      // console.log("myNbrDeBonusSpecialite", "compabilisé");
    };


    /*
    Ici, on vérifie la validité de tous les bonus et on les applique ; et on soustrait les jetons en conséquence.
    */

    let myBonusSupplem = parseInt(myBonusApplique);
    let myMalusSupplem = parseInt(myMalusApplique) - parseInt(myMalusAIgnorer);
    if (myMalusSupplem < 0) {myMalusSupplem = 0;};
    var mySuccesAutoSupplem = parseInt(mySuccesAuto);


    // Application des bonus valides et des malus

    // Si c'est via le prompt débridé, myBonusApplique comptabilise déjà les points de myPlusDeuxDesDAttaque
    if (myShaktiSuffisanteFlag && jetLibel == "attck" && !(myVersionDebloqueeFlag)) {
      myBonusSupplem += 2 * parseInt(myPlusDeuxDesDAttaque);
    }

    // Si c'est via le prompt débridé, myMalusApplique comptabilise déjà les points de myIgnoreMalus
    // et mySuccesAuto, ceux de myPlusUnSuccesAuto
    if (myconvictionSuffisanteFlag && !(myVersionDebloqueeFlag)) {
      myMalusSupplem -= parseInt(myIgnoreMalus);
      if (myMalusSupplem < 0) { myMalusSupplem = 0;};

      mySuccesAutoSupplem += parseInt(myPlusUnSuccesAuto);
    }


    defence += myBonusSupplem;
    defence -= myMalusSupplem;

    d6_A = mySuccesAutoSupplem;



    // Traitement du cas des malus de blessures

    let myNombreDeMalusBlessure = 0;
    if (myMalusBlessureCheck) {
      for (let item of myActor.items.filter(item => item.type === 'blessureoustatut')) {
        if (item.system.subtype == "0") { // si le type est blessure
          myNombreDeMalusBlessure += Math.abs(item.system.value);
        }
      }
    };
    defence -= myNombreDeMalusBlessure;


    // Traitement du cas des malus de statuts

    let myNombreDeMalusStatut = 0;
    if (myMalusStatutCheck) {
      let j = 0;
      for (let i=0; i<6; i++) {
        if (tabDomainLibel[i] == "@domains." + domainLibel) {
          j = i;
        }
      };
      for (let item of myActor.items.filter(item => item.type === 'blessureoustatut')) {
        if (item.system.subtype == "1") { // si le type est statut
          if (item.system.domain == j) { // si le domaine correspond
            myNombreDeMalusStatut += Math.abs(item.system.value);
          }
        }
      }
    };
    defence -= myNombreDeMalusStatut;
    


    console.log("defence = ", defence);

    //////////////////////////////////////////////////////////////////
    if (defence <= 0) {
      ui.notifications.warn(game.i18n.localize("DEVASTRA.Error1"));
      return;
      };
    //////////////////////////////////////////////////////////////////



    // Soustraction des jetons si en nombre suffisant, sinon "return"
    let myErrorTokenNbr = 0;
    if ((jetLibel == "attck") && parseInt(myPlusDeuxDesDAttaque)) {
      if (myShaktiSuffisanteFlag) {
        await myActor.update({ "system.shakti.piledejetons":  parseInt(myActor.system.shakti.piledejetons) - parseInt(myPlusDeuxDesDAttaque) });
        ui.notifications.info(game.i18n.localize("DEVASTRA.Info4"));
      } else {
        ui.notifications.error(game.i18n.localize("DEVASTRA.Error4"));
        myErrorTokenNbr++;
      }
    }
    if (parseInt(myIgnoreMalus) + parseInt(myPlusUnSuccesAuto)) {
      if (myconvictionSuffisanteFlag) {
        await myActor.update({ "system.conviction.piledejetons":  parseInt(myActor.system.conviction.piledejetons - (parseInt(myIgnoreMalus) + parseInt(myPlusUnSuccesAuto))) });
        ui.notifications.info(game.i18n.localize("DEVASTRA.Info5"));
      } else {
        ui.notifications.error(game.i18n.localize("DEVASTRA.Error5"));
        myErrorTokenNbr++;
      }
    }
    if (myErrorTokenNbr) { return };



    // Ici on traite le cas des dés non-explosifs
    if (myDesNonExplo == 2) {
      myCinqExploFlag = false;
      mySixExploFlag = false;
    } else if ((myDesNonExplo == 1) && myCinqExploFlag) {
      myCinqExploFlag = false;
    } else if ((myDesNonExplo == 1) && !(myCinqExploFlag)) {
      mySixExploFlag = false;
    };


      if (suite.length >= 2) {
      suite += "%";
      suite = suite.replace(', %', ']');
    } else {
      suite = "";
    };

    var n = {
      myReussite: 0,
      myND: myND,
      mySixExplo: mySixExploFlag,
      myCinqExplo: myCinqExploFlag,
      nbrRelance: defence,
      d6_1: 0,
      d6_2: 0,
      d6_3: 0,
      d6_4: 0,
      d6_5: 0,
      d6_6: 0

    };

    var msg;

    let myRoll = "";

    do {
      let myRoll = "";
      myRoll +=  n.nbrRelance+"d6cs>="+n.myND;
      d6_1 = 0;
      d6_2 = 0;
      d6_3 = 0;
      d6_4 = 0;
      d6_5 = 0;
      d6_6 = 0;

      const r = new Roll(myRoll, myActor.getRollData());
      await r.evaluate();
      console.log(r);
      let myRDice = r.dice;
      console.log(myRDice);
      console.log(myRDice[0]);
      for (let key in myRDice) {
        console.log(myRDice[key]);
        for (let i=0; i<myRDice[key].number; i++) {
          let myD = myRDice[key].results[i].result;
          console.log(myD);
          switch ( myD ) {
            case 1: d6_1++;
            break;
            case 2: d6_2++;
            break;
            case 3: d6_3++;
            break;
            case 4: d6_4++;
            break;
            case 5: d6_5++;
            break;
            case 6: d6_6++;
            break;
            default: console.log("C'est bizarre !");
          };
          n.nbrRelance = 0;
          if (n.mySixExplo) {
            n.nbrRelance += d6_6;
            if (n.myCinqExplo) {
              n.nbrRelance += d6_5;
            }
          }
        }
      };


      n.d6_1 += d6_1;
      n.d6_2 += d6_2;
      n.d6_3 += d6_3;
      n.d6_4 += d6_4;
      n.d6_5 += d6_5;
      n.d6_6 += d6_6;


      n.myReussite = parseInt(n.myReussite) + parseInt(r._total);

      // r._total = "0";

      const myTypeOfThrow = game.settings.get("core", "rollMode"); // Type de Lancer
      console.log("myTypeOfThrow", myTypeOfThrow);

      msg = await r.toMessage({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        rollMode: myTypeOfThrow
      });

      await new Promise(w => setTimeout(w, 2750));

    } while (n.nbrRelance);

    const rModif = new Roll("0[Defense Réussites]", myActor.getRollData());
    await rModif.evaluate();
    rModif._total  = parseInt(n.myReussite) + parseInt(mySuccesAuto); // On ajoute les succès automatiques

    var theDefence = parseInt(n.myReussite) + parseInt(mySuccesAuto);

    const myTypeOfThrow = game.settings.get("core", "rollMode"); // Type de Lancer
    console.log("myTypeOfThrow", myTypeOfThrow);

    msg = await rModif.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: myActor }),
      rollMode: myTypeOfThrow
    });

      
    var d_successes = parseInt(n.myReussite) + parseInt(mySuccesAutoSupplem); // On ajoute les succès automatiques

    // Smart Message
    /*
    let opponentActorId = "";
    let opponentActorName = "";
    if (opponentActor) {
      opponentActorId = opponentActor.id;
      opponentActorName = opponentActor.name;
    };
    */
    let smartTemplate = 'systems/devastra/templates/form/dice-result.html';
    if (jetLibel == "defnc") {
      smartTemplate = 'systems/devastra/templates/form/defence-result.html';
    };

    /*
    let myDefence = "xxx";
    let myDefenceType = "xxx";
    */

    const myDefence = theDefence; // calculé (lancer de dés)
    const myDefenceType = defencetype; // calculé (lancer de dés)
  
  
    if (ouijet) {

      const smartData = {
        nd: myND,
        total: total,
        attaquantficheId: attaquantficheId,
        opposantficheId: opposantficheId,
        consideropponentprotection: consideropponentprotection,

        isinventory: isinventory,
        selectedinventory: selectedinventory,
        selectedinventorydevastra: selectedinventorydevastra,
        selectedinventorypower: selectedinventorypower,
        selectedinventorymagic: selectedinventorymagic,
        damage: damage,
        damagetype: damagetype,
        
        defence: defence,
        defencetype: defencetype,

        domaine: domains,
        jet: jet,
        succes: d_successes,
        d1: n.d6_1,
        d2: n.d6_2,
        d3: n.d6_3,
        d4: n.d6_4,
        d5: n.d6_5,
        d6: n.d6_6,
        dA: mySuccesAutoSupplem
      }
      console.log("smartData avant retour func = ", smartData);
      const smartHtml = await renderTemplate(smartTemplate, smartData);
        
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartHtml,
        rollMode: myTypeOfThrow
      });






  
    } else {

      const shaktidefenceTemplate = 'systems/devastra/templates/form/skill-dice-prompt-shakti.html';
      const shaktidefenceTitle = game.i18n.localize("DEVASTRA.Shakti de défense");
      const shaktidefenceDialogOptions  = {
        classes: ["devastra", "sheet"]
      };
      myResultDialog = await _skillEnterShaktiDefence (
        myActor, shaktidefenceTemplate, shaktidefenceTitle, shaktidefenceDialogOptions, myND, myTotal, myAttaquantficheId, myOpposantficheId,
        myConsideropponentprotection, myIsinventory, mySelectedinventory, mySelectedinventorydevastra, mySelectedinventorypower,
        mySelectedinventorymagic, myDamage, myDamagetype, myDefence, myDefenceType
      );


      //////////////////////////////////////////////////////////////////
      if (!(myResultDialog)) {
        ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
        return;
        };
      //////////////////////////////////////////////////////////////////
    
    };
    
  }

}


async function _skillEnterShaktiDefence(
  myActor, shaktidefenceTemplate, shaktidefenceTitle, shaktidefenceDialogOptions, myND, myTotal, myAttaquantficheId, myOpposantficheId,
  myConsideropponentprotection, myIsinventory, mySelectedinventory, mySelectedinventorydevastra, mySelectedinventorypower,
  mySelectedinventorymagic, myDamage, myDamagetype, myDefence, myDefenceType
  ) {

  // Render modal dialog

  const template = shaktidefenceTemplate;
  const myActorID = myActor;
  const title = shaktidefenceTitle;
  const dialogOptions = shaktidefenceDialogOptions;

  const nd = myND;
  const total = myTotal;
  const attaquantficheId = myAttaquantficheId;
  const opposantficheId = myOpposantficheId;
  const consideropponentprotection = myConsideropponentprotection;
  const isinventory = myIsinventory;
  const selectedinventory = mySelectedinventory;
  const selectedinventorydevastra = mySelectedinventorydevastra;
  const selectedinventorypower = mySelectedinventorypower;
  const selectedinventorymagic = mySelectedinventorymagic;
  const damage =  myDamage;
  const damagetype = myDamagetype;

  const defence = myDefence;
  const defencetype = myDefenceType;

  var dialogData = {
    nd: nd,
    /*
    total: rModif._total,
    */
    attaquantficheId: attaquantficheId,
    opposantficheId: opposantficheId,

    consideropponentprotection: consideropponentprotection,
    isinventory: isinventory,
    selectedinventory: selectedinventory,
    selectedinventorydevastra: selectedinventorydevastra,
    selectedinventorypower: selectedinventorypower,
    selectedinventorymagic: selectedinventorymagic,
    damage: damage,
    damagetype: damagetype,

  
    defence: defence,
    defencetype: defencetype
  

  }

  const html = await renderTemplate(template, dialogData);
  // Create the Dialog window
  let prompt = await new Promise((resolve) => {
    new Dialog(
      {
        title: title,
        content: html,
        buttons: {
          validateBtn: {
            icon: `<div class="tooltip"><i class="fas fa-check"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Validate')}</span></div>`,
            callback: (html) => resolve( dialogData = _computeResult(myActorID, dialogData, html) )
          },
          cancelBtn: {
            icon: `<div class="tooltip"><i class="fas fa-cancel"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Cancel')}</span></div>`,
            callback: (html) => resolve( null )
          }
        },
        default: 'validateBtn',
        close: () => resolve( null )
    },
    dialogOptions
    ).render(true, {
      width: 300,
      height: "auto"
    });
  });

  if (prompt == null) {
    dialogData = null;
  };

  return dialogData;

  //////////////////////////////////////////////////////////////
  async function _computeResult(myActor, myDialogData, myHtml) {
    const editedData = {
      defenseshakti: myHtml.find("select[name='defenseshakti']").val(),
    };
    return editedData;
  }



}
  

async function _skillDiceRollDefenceDialog(
  myActor, template, myTitle, myDialogOptions, myND, myTotal, myAttaquantficheId, myOpposantficheId,
  myConsideropponentprotection, myIsinventory, mySelectedinventory, mySelectedinventorydevastra, mySelectedinventorypower,
  mySelectedinventorymagic, myDamage, myDamagetype
  ) {

  // Render modal dialog
  template = template || 'systems/devastra/templates/form/skill-dice-prompt-defence.html';
  const myActorID = myActor;
  const title = myTitle;
  const dialogOptions = myDialogOptions;
  const nd = myND;
  const total = myTotal;
  const attaquantficheId = myAttaquantficheId;
  const opposantficheId = myOpposantficheId;
  const consideropponentprotection = myConsideropponentprotection;
  const isinventory = myIsinventory;
  const selectedinventory = mySelectedinventory;
  const selectedinventorydevastra = mySelectedinventorydevastra;
  const selectedinventorypower = mySelectedinventorypower;
  const selectedinventorymagic = mySelectedinventorymagic;
  const damage =  myDamage;
  const damagetype = myDamagetype;

  const myNbrDeBonusSpecialite = 1;
  const mySpecialiteCheck = false;
  const myBonusDomaineCheck = true;
  const mySixExploFlag = (myActorID.system.prana.value <= myActorID.system.prana.tenace); // si Tenace ou moins
  const myPlus1SuccesAutoFlag = (myActorID.system.prana.value > myActorID.system.prana.tenace); // si Vaillant
  const myShaktiRestanteFlag = (myActorID.system.shakti.piledejetons); // s'il reste des jetons de Shakti
  const myconvictionRestanteFlag = (myActorID.system.conviction.piledejetons); // s'il reste des jetons de Conviction

  const myNbrDeDomaineDPh = myActorID.system.domains.dph.value;
  const myNbrDeBonusDomaineDPh = myActorID.system.domains.dph.bonusdice;

  const myNbrDeDomaineDMa = myActorID.system.domains.dma.value;
  const myNbrDeBonusDomaineDMa = myActorID.system.domains.dma.bonusdice;

  const myNbrDeDomaineDIn = myActorID.system.domains.din.value;
  const myNbrDeBonusDomaineDIn = myActorID.system.domains.din.bonusdice;

  const myNbrDeDomaineDSo = myActorID.system.domains.dso.value;
  const myNbrDeBonusDomaineDSo = myActorID.system.domains.dso.bonusdice;

  const myNbrDeDomaineDMy = myActorID.system.domains.dmy.value;
  const myNbrDeBonusDomaineDMy = myActorID.system.domains.dmy.bonusdice;

  let myNombreDeMalusBlessure = 0;
  for (let item of myActor.items.filter(item => item.type === 'blessureoustatut')) {
    if (item.system.subtype == "0") { // si le type est blessure
      myNombreDeMalusBlessure += Math.abs(item.system.value);
    }
  };
  myNombreDeMalusBlessure *= -1;
  let myMalusBlessureCheck = false;

  let myNombreDeMalusStatutDPh = 0;
  let myNombreDeMalusStatutDMa = 0;
  let myNombreDeMalusStatutDIn = 0;
  let myNombreDeMalusStatutDSo = 0;
  let myNombreDeMalusStatutDMy = 0;
  let j;
  for (let item of myActor.items.filter(item => item.type === 'blessureoustatut')) {
    if (item.system.subtype == "1") { // si le type est statut
      j = item.system.domain;
      switch (j) {
        case '1': myNombreDeMalusStatutDPh++;
        break;
        case '2': myNombreDeMalusStatutDMa++;
        break;
        case '3': myNombreDeMalusStatutDIn++;
        break;
        case '4': myNombreDeMalusStatutDSo++;
        break;
        case '5': myNombreDeMalusStatutDMy++;
        break;
        default: console.log(`Sorry, that's an error.`);
      }
    }
  };
  myNombreDeMalusStatutDPh *= -1;
  myNombreDeMalusStatutDMa *= -1;
  myNombreDeMalusStatutDIn *= -1;
  myNombreDeMalusStatutDSo *= -1;
  myNombreDeMalusStatutDMy *= -1;

  let myMalusStatutCheck = true;

  var dialogData = {
    nd: nd,
  
    domains: "dma",
    throw: "defnc",
    systemData: myActorID.system,
    nbrdedomainedph: myNbrDeDomaineDPh,
    nbrdedomainedma: myNbrDeDomaineDMa,
    nbrdedomainedin: myNbrDeDomaineDIn,
    nbrdedomainedso: myNbrDeDomaineDSo,
    nbrdedomainedmy: myNbrDeDomaineDMy,
    nbrdebonusdomainedph: myNbrDeBonusDomaineDPh,
    nbrdebonusdomainedma: myNbrDeBonusDomaineDMa,
    nbrdebonusdomainedin: myNbrDeBonusDomaineDIn,
    nbrdebonusdomainedso: myNbrDeBonusDomaineDSo,
    nbrdebonusdomainedmy: myNbrDeBonusDomaineDMy,
    bonusdomainecheck: myBonusDomaineCheck,
    nbrdebonusspecialite: myNbrDeBonusSpecialite,
    specialitecheck: mySpecialiteCheck,
    defencend: nd,
    malusblessurecheck: myMalusBlessureCheck,
    nbrdemalusblessure: myNombreDeMalusBlessure,
    malusstatutcheck: myMalusStatutCheck,
    nbrdemalusstatutdph: myNombreDeMalusStatutDPh,
    nbrdemalusstatutdma: myNombreDeMalusStatutDMa,
    nbrdemalusstatutdin: myNombreDeMalusStatutDIn,
    nbrdemalusstatutdso: myNombreDeMalusStatutDSo,
    nbrdemalusstatutdmy: myNombreDeMalusStatutDMy,
    shaktirestanteflag: myShaktiRestanteFlag,
    convictionrestanteflag: myconvictionRestanteFlag,
    plus1succesautoflag : myPlus1SuccesAutoFlag,
    sixexplo: mySixExploFlag,
    cinqexplo: false,
    desnonexplo: 0,
    versiondebloquee: false
  };
  const html = await renderTemplate(template, dialogData);
  // Create the Dialog window
  let prompt = await new Promise((resolve) => {
    new ModifiedDialog(
      {
        title: title,
        content: html,
        buttons: {
          validateBtn: {
            icon: `<div class="tooltip"><i class="fas fa-check"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Validate')}</span></div>`,
            callback: (html) => resolve( dialogData = _computeResult(myActorID, dialogData, html) )
          },
          cancelBtn: {
            icon: `<div class="tooltip"><i class="fas fa-cancel"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Cancel')}</span></div>`,
            callback: (html) => resolve( null )
          }
        },
        default: 'validateBtn',
        close: () => resolve( null )
    },
    dialogOptions
    ).render(true, {
      width: 500,
      height: "auto"
    });
  });

  if (prompt == null) {
    dialogData = null;
  };

  return dialogData;

  //////////////////////////////////////////////////////////////
  async function _computeResult(myActor, myDialogData, myHtml) {
    const editedData = {
      nd: myDialogData.nd,
      
      domains: myHtml.find("select[name='domains']").val(),
      throw: "defnc",
      ouijet: myHtml.find("input[value='ouijet']").is(':checked'),
      defencend: myHtml.find("select[name='defencend']").val(),
      ouishaktidefense: myHtml.find("input[value='ouishaktidefense']").is(':checked'),
      bonusdomainecheck: myHtml.find("input[name='bonusdomainecheck']").is(':checked'),
      specialitecheck: myHtml.find("input[name='specialitecheck']").is(':checked'),
      malusblessurecheck: myHtml.find("input[value='malusblessurecheck']").is(':checked'),
      malusstatutcheck: myHtml.find("input[value='malusstatutcheck']").is(':checked'),
      nbrdedomainedph: myDialogData.nbrdedomainedph,
      nbrdedomainedma: myDialogData.nbrdedomainedma,
      nbrdedomainedin: myDialogData.nbrdedomainedin,
      nbrdedomainedso: myDialogData.nbrdedomainedso,
      nbrdedomainedmy: myDialogData.nbrdedomainedmy,
      nbrdebonusdomainedph: myDialogData.nbrdebonusdomainedph,
      nbrdebonusdomainedma: myDialogData.nbrdebonusdomainedma,
      nbrdebonusdomainedin: myDialogData.nbrdebonusdomainedin,
      nbrdebonusdomainedso: myDialogData.nbrdebonusdomainedso,
      nbrdebonusdomainedmy: myDialogData.nbrdebonusdomainedmy,
      nbrdemalusstatutdph: myDialogData.nbrdemalusstatutdph,
      nbrdemalusstatutdma: myDialogData.nbrdemalusstatutdma,
      nbrdemalusstatutdin: myDialogData.nbrdemalusstatutdin,
      nbrdemalusstatutdso: myDialogData.nbrdemalusstatutdso,
      nbrdemalusstatutdmy: myDialogData.nbrdemalusstatutdmy,
      nbrdebonusspecialite: myDialogData.nbrdebonusspecialite,
      bonusapplique: myHtml.find("select[name='bonusapplique']").val(),
      plusdeuxdesdattaque: myHtml.find("select[name='plusdeuxdesdattaque']").val(),
      malususapplique: myHtml.find("select[name='malususapplique']").val(),
      ignoremalus: myHtml.find("select[name='ignoremalus']").val(),
      malususaignorer: myHtml.find("select[name='malususaignorer']").val(),
      succesauto: myHtml.find("select[name='succesauto']").val(),
      plusunsuccesauto: myHtml.find("select[name='plusunsuccesauto']").val(),
      sixexplo: myHtml.find("input[name='sixexplo']").is(':checked'),
      cinqexplo: myHtml.find("input[name='cinqexplo']").is(':checked'),
      desnonexplo: myHtml.find("select[name='desnonexplo']").val(),
      versiondebloquee: myHtml.find("input[name='versiondebloquee']").is(':checked')
    };
    return editedData;
  }
  
}

async function _skillDiceRollDefenceDialogDeblocked(
  myActor, template, myTitle, myDialogOptions, myND, myTotal, myAttaquantficheId, myOpposantficheId,
  myConsideropponentprotection, myIsinventory, mySelectedinventory, mySelectedinventorydevastra, mySelectedinventorypower,
  mySelectedinventorymagic, myDamage, myDamagetype
  ) {

  // Render modal dialog
  template = template || 'systems/devastra/templates/form/skill-dice-prompt-defence-debride.html';
  const myActorID = myActor;
  const title = myTitle;
  const dialogOptions = myDialogOptions;
  const nd = myND;
  const total = myTotal;
  const attaquantficheId = myAttaquantficheId;
  const opposantficheId = myOpposantficheId;
  const consideropponentprotection = myConsideropponentprotection;
  const isinventory = myIsinventory;
  const selectedinventory = mySelectedinventory;
  const selectedinventorydevastra = mySelectedinventorydevastra;
  const selectedinventorypower = mySelectedinventorypower;
  const selectedinventorymagic = mySelectedinventorymagic;
  const damage =  myDamage;
  const damagetype = myDamagetype;

  const myNbrDeBonusSpecialite = 1;
  const mySpecialiteCheck = false;
  const myBonusDomaineCheck = true;
  const mySixExploFlag = (myActorID.system.prana.value <= myActorID.system.prana.tenace); // si Tenace ou moins
  const myPlus1SuccesAutoFlag = (myActorID.system.prana.value > myActorID.system.prana.tenace); // si Vaillant
  const myShaktiRestanteFlag = (myActorID.system.shakti.piledejetons); // s'il reste des jetons de Shakti
  const myconvictionRestanteFlag = (myActorID.system.conviction.piledejetons); // s'il reste des jetons de Conviction

  const myNbrDeDomaineDPh = myActorID.system.domains.dph.value;
  const myNbrDeBonusDomaineDPh = myActorID.system.domains.dph.bonusdice;

  const myNbrDeDomaineDMa = myActorID.system.domains.dma.value;
  const myNbrDeBonusDomaineDMa = myActorID.system.domains.dma.bonusdice;

  const myNbrDeDomaineDIn = myActorID.system.domains.din.value;
  const myNbrDeBonusDomaineDIn = myActorID.system.domains.din.bonusdice;

  const myNbrDeDomaineDSo = myActorID.system.domains.dso.value;
  const myNbrDeBonusDomaineDSo = myActorID.system.domains.dso.bonusdice;

  const myNbrDeDomaineDMy = myActorID.system.domains.dmy.value;
  const myNbrDeBonusDomaineDMy = myActorID.system.domains.dmy.bonusdice;

  let myNombreDeMalusBlessure = 0;
  for (let item of myActor.items.filter(item => item.type === 'blessureoustatut')) {
    if (item.system.subtype == "0") { // si le type est blessure
      myNombreDeMalusBlessure += Math.abs(item.system.value);
    }
  };
  myNombreDeMalusBlessure *= -1;
  let myMalusBlessureCheck = false;

  let myNombreDeMalusStatutDPh = 0;
  let myNombreDeMalusStatutDMa = 0;
  let myNombreDeMalusStatutDIn = 0;
  let myNombreDeMalusStatutDSo = 0;
  let myNombreDeMalusStatutDMy = 0;
  let j;
  for (let item of myActor.items.filter(item => item.type === 'blessureoustatut')) {
    if (item.system.subtype == "1") { // si le type est statut
      j = item.system.domain;
      switch (j) {
        case '1': myNombreDeMalusStatutDPh++;
        break;
        case '2': myNombreDeMalusStatutDMa++;
        break;
        case '3': myNombreDeMalusStatutDIn++;
        break;
        case '4': myNombreDeMalusStatutDSo++;
        break;
        case '5': myNombreDeMalusStatutDMy++;
        break;
        default: console.log(`Sorry, that's an error.`);
      }
    }
  };
  myNombreDeMalusStatutDPh *= -1;
  myNombreDeMalusStatutDMa *= -1;
  myNombreDeMalusStatutDIn *= -1;
  myNombreDeMalusStatutDSo *= -1;
  myNombreDeMalusStatutDMy *= -1;

  let myMalusStatutCheck = true;

  var dialogData = {
    nd: nd,
  
    domains: "dma",
    throw: "defnc",
    systemData: myActorID.system,
    nbrdedomainedph: myNbrDeDomaineDPh,
    nbrdedomainedma: myNbrDeDomaineDMa,
    nbrdedomainedin: myNbrDeDomaineDIn,
    nbrdedomainedso: myNbrDeDomaineDSo,
    nbrdedomainedmy: myNbrDeDomaineDMy,
    // nbrdebonusdomainedph: myNbrDeBonusDomaineDPh,
    // nbrdebonusdomainedma: myNbrDeBonusDomaineDMa,
    // nbrdebonusdomainedin: myNbrDeBonusDomaineDIn,
    // nbrdebonusdomainedso: myNbrDeBonusDomaineDSo,
    // nbrdebonusdomainedmy: myNbrDeBonusDomaineDMy,
    bonusdomainecheck: myBonusDomaineCheck,
    nbrdebonusspecialite: myNbrDeBonusSpecialite,
    specialitecheck: mySpecialiteCheck,
    defencend: nd,
    malusblessurecheck: myMalusBlessureCheck,
    nbrdemalusblessure: myNombreDeMalusBlessure,
    malusstatutcheck: myMalusStatutCheck,
    nbrdemalusstatutdph: myNombreDeMalusStatutDPh,
    nbrdemalusstatutdma: myNombreDeMalusStatutDMa,
    nbrdemalusstatutdin: myNombreDeMalusStatutDIn,
    nbrdemalusstatutdso: myNombreDeMalusStatutDSo,
    nbrdemalusstatutdmy: myNombreDeMalusStatutDMy,
    shaktirestanteflag: myShaktiRestanteFlag,
    convictionrestanteflag: myconvictionRestanteFlag,
    plus1succesautoflag : myPlus1SuccesAutoFlag,
    sixexplo: mySixExploFlag,
    cinqexplo: false,
    desnonexplo: 0,
    versiondebloquee: false
  };
  const html = await renderTemplate(template, dialogData);
  // Create the Dialog window
  let prompt = await new Promise((resolve) => {
    new ModifiedDialog(
      {
        title: title,
        content: html,
        buttons: {
          validateBtn: {
            icon: `<div class="tooltip"><i class="fas fa-check"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Validate')}</span></div>`,
            callback: (html) => resolve( dialogData = _computeResult(myActorID, dialogData, html) )
          },
          cancelBtn: {
            icon: `<div class="tooltip"><i class="fas fa-cancel"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Cancel')}</span></div>`,
            callback: (html) => resolve( null )
          }
        },
        default: 'validateBtn',
        close: () => resolve( null )
    },
    dialogOptions
    ).render(true, {
      width: 500,
      height: "auto"
    });
  });

  if (prompt == null) {
    dialogData = null;
  };

  return dialogData;

  //////////////////////////////////////////////////////////////
  async function _computeResult(myActor, myDialogData, myHtml) {
    const editedData = {
      nd: myDialogData.nd,
      
      domains: myHtml.find("select[name='domains']").val(),
      throw: "defnc",
      ouijet: myHtml.find("input[value='ouijet']").is(':checked'),
      defencend: myHtml.find("select[name='defencend']").val(),
      ouishaktidefense: myHtml.find("input[value='ouishaktidefense']").is(':checked'),
      bonusdomainecheck: myHtml.find("input[name='bonusdomainecheck']").is(':checked'),
      specialitecheck: myHtml.find("input[name='specialitecheck']").is(':checked'),
      malusblessurecheck: myHtml.find("input[value='malusblessurecheck']").is(':checked'),
      malusstatutcheck: myHtml.find("input[value='malusstatutcheck']").is(':checked'),
      nbrdedomainedph: myDialogData.nbrdedomainedph,
      nbrdedomainedma: myDialogData.nbrdedomainedma,
      nbrdedomainedin: myDialogData.nbrdedomainedin,
      nbrdedomainedso: myDialogData.nbrdedomainedso,
      nbrdedomainedmy: myDialogData.nbrdedomainedmy,
      // nbrdebonusdomainedph: myDialogData.nbrdebonusdomainedph,
      // nbrdebonusdomainedma: myDialogData.nbrdebonusdomainedma,
      // nbrdebonusdomainedin: myDialogData.nbrdebonusdomainedin,
      // nbrdebonusdomainedso: myDialogData.nbrdebonusdomainedso,
      // nbrdebonusdomainedmy: myDialogData.nbrdebonusdomainedmy,
      nbrdemalusstatutdph: myDialogData.nbrdemalusstatutdph,
      nbrdemalusstatutdma: myDialogData.nbrdemalusstatutdma,
      nbrdemalusstatutdin: myDialogData.nbrdemalusstatutdin,
      nbrdemalusstatutdso: myDialogData.nbrdemalusstatutdso,
      nbrdemalusstatutdmy: myDialogData.nbrdemalusstatutdmy,
      nbrdebonusspecialite: myDialogData.nbrdebonusspecialite,
      bonusapplique: myHtml.find("select[name='bonusapplique']").val(),
      plusdeuxdesdattaque: myHtml.find("select[name='plusdeuxdesdattaque']").val(),
      malususapplique: myHtml.find("select[name='malususapplique']").val(),
      ignoremalus: myHtml.find("select[name='ignoremalus']").val(),
      malususaignorer: myHtml.find("select[name='malususaignorer']").val(),
      succesauto: myHtml.find("select[name='succesauto']").val(),
      plusunsuccesauto: myHtml.find("select[name='plusunsuccesauto']").val(),
      sixexplo: myHtml.find("input[name='sixexplo']").is(':checked'),
      cinqexplo: myHtml.find("input[name='cinqexplo']").is(':checked'),
      desnonexplo: myHtml.find("select[name='desnonexplo']").val(),
      versiondebloquee: myHtml.find("input[name='versiondebloquee']").is(':checked')
    };
    return editedData;
  }
  
}


async function _treatSkillDiceRollDefenceNPCDialog(
  myActor, template, myTitle, myDialogOptions, myND, myTotal, myAttaquantficheId, myOpposantficheId,
  myConsideropponentprotection, myIsinventory, mySelectedinventory, mySelectedinventorydevastra, mySelectedinventorypower,
  mySelectedinventorymagic, myDamage, myDamagetype
) {
  console.log("Il s'agit d'un PNJ ou d'un monstre")
  let myResultDialog =  await _skillDiceRollDefenceNPCDialog(
    myActor, template, myTitle, myDialogOptions, myND, myTotal, myAttaquantficheId, myOpposantficheId,
    myConsideropponentprotection, myIsinventory, mySelectedinventory, mySelectedinventorydevastra, mySelectedinventorypower,
    mySelectedinventorymagic, myDamage, myDamagetype
  );

  //////////////////////////////////////////////////////////////////
  if (!(myResultDialog)) {
    ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
    return;
  };
  //////////////////////////////////////////////////////////////////

  let myVersionDebloqueeFlag = (myResultDialog.versiondebloquee == 1);
  if (myVersionDebloqueeFlag) {


    myResultDialog = await _skillDiceRollDefenceNPCDialogDeblocked (
      myActor, template, myTitle, myDialogOptions, myND, myTotal, myAttaquantficheId, myOpposantficheId,
      myConsideropponentprotection, myIsinventory, mySelectedinventory, mySelectedinventorydevastra, mySelectedinventorypower,
      mySelectedinventorymagic, myDamage, myDamagetype
    );
 

    //////////////////////////////////////////////////////////////////
    if (!(myResultDialog)) {
      ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
      return;
      };
    //////////////////////////////////////////////////////////////////


    var nd = myND;
    var total = myTotal;
    var attaquantficheId = myAttaquantficheId;
    var opposantficheId = myOpposantficheId;
    var consideropponentprotection = myConsideropponentprotection;
    var isinventory = myIsinventory;
    var selectedinventory = mySelectedinventory;
    var selectedinventorydevastra = mySelectedinventorydevastra;
    var selectedinventorypower = mySelectedinventorypower;
    var selectedinventorymagic = mySelectedinventorymagic;
    var damage =  myDamage;
    var damagetype = myDamagetype;

    var domains = myResultDialog.domains;
    var jet = myResultDialog.jet;

    var ouijet = myResultDialog.ouijet;
    var defencend = myResultDialog.defencend;
    var ouishaktidefense = myResultDialog.ouishaktidefense;
    var bonusdomaineflag = myResultDialog.bonusdomainecheck;
    var specialiteflag = myResultDialog.specialitecheck;
    var malusblessureflag = myResultDialog.malusblessurecheck;
    var malusstatutflag = myResultDialog.malusstatutcheck;
    var nbrdedomainedph = myResultDialog.nbrdedomainedph;
    var nbrdedomainedma = myResultDialog.nbrdedomainedma;
    var nbrdedomainedin = myResultDialog.nbrdedomainedin;
    var nbrdedomainedso = myResultDialog.nbrdedomainedso;
    var nbrdedomainedmy = myResultDialog.nbrdedomainedmy;
    // var nbrdebonusdomainedph = myResultDialog.nbrdebonusdomainedph;
    // var nbrdebonusdomainedma = myResultDialog.nbrdebonusdomainedma;
    // var nbrdebonusdomainedin = myResultDialog.nbrdebonusdomainedin;
    // var nbrdebonusdomainedso = myResultDialog.nbrdebonusdomainedso;
    // var nbrdebonusdomainedmy = myResultDialog.nbrdebonusdomainedmy;
    // var nbrdemalusstatutdph = myResultDialog.nbrdemalusstatutdph;
    var nbrdemalusstatutdma = myResultDialog.nbrdemalusstatutdma;
    var nbrdemalusstatutdin = myResultDialog.nbrdemalusstatutdin;
    var nbrdemalusstatutdso = myResultDialog.nbrdemalusstatutdso;
    var nbrdemalusstatutdmy = myResultDialog.nbrdemalusstatutdmy;
    var nbrdebonusspecialite = myResultDialog.nbrdebonusspecialite;

    var defencend = myResultDialog.defencend;
    var malusblessureflag = false;
    var malusstatutflag = false;
    var bonusdomaineflag = myResultDialog.bonusdomainecheck;
    var bonusapplique = myResultDialog.bonusapplique;
    var plusdeuxdesdattaque = myResultDialog.plusdeuxdesdattaque; // en fait, uniquement nbre jetons Shakti à enlever
    var malususapplique = myResultDialog.malususapplique;
    var ignoremalus = myResultDialog.ignoremalus;
    var malusAignorer = 0;
    var succesauto = myResultDialog.succesauto;
    var plusunsuccesauto = myResultDialog.plusunsuccesauto; // en fait, uniquement nbre jetons Conviction à enlever
    var desnonexplo = 0;
    var sixexploflag = myResultDialog.sixexplo;
    var cinqexploflag = myResultDialog.cinqexplo;

    var defencetype = domains;


    // console.log("myPlusDeuxDesDAttaque", myPlusDeuxDesDAttaque);
    // console.log("myIgnoreMalus", myIgnoreMalus);
    // console.log("myPlusUnSuccesAuto", myPlusUnSuccesAuto);
    // console.log("myActor.system.conviction.piledejetons", myActor.system.conviction.piledejetons);

    var shaktisuffisanteFlag = (plusdeuxdesdattaque <= myActor.system.shakti.piledejetons); // s'il reste assez de jetons de Shakti
    // var convictionsuffisanteflag = ((ignoremalus + plusunsuccesauto) <= myActor.system.conviction.piledejetons); // s'il reste assez de jetons de Conviction

  } else {

    var nd = myND;
    var total = myTotal;
    var attaquantficheId = myAttaquantficheId;
    var opposantficheId = myOpposantficheId;
    var consideropponentprotection = myConsideropponentprotection;
    var isinventory = myIsinventory;
    var selectedinventory = mySelectedinventory;
    var selectedinventorydevastra = mySelectedinventorydevastra;
    var selectedinventorypower = mySelectedinventorypower;
    var selectedinventorymagic = mySelectedinventorymagic;
    var damage =  myDamage;
    var damagetype = myDamagetype;

    var domains = myResultDialog.domains;
    var jet = myResultDialog.throw;

    var ouijet = myResultDialog.ouijet;
    var defencend = myResultDialog.defencend;
    var ouishaktidefense = myResultDialog.ouishaktidefense;
    var bonusdomaineflag = myResultDialog.bonusdomainecheck;
    var specialiteflag = myResultDialog.specialitecheck;
    var malusblessureflag = myResultDialog.malusblessurecheck;
    var malusstatutflag = myResultDialog.malusstatutcheck;
    var nbrdedomainedph = myResultDialog.nbrdedomainedph;
    var nbrdedomainedma = myResultDialog.nbrdedomainedma;
    var nbrdedomainedin = myResultDialog.nbrdedomainedin;
    var nbrdedomainedso = myResultDialog.nbrdedomainedso;
    var nbrdedomainedmy = myResultDialog.nbrdedomainedmy;
    // var nbrdebonusdomainedph = myResultDialog.nbrdebonusdomainedph;
    // var nbrdebonusdomainedma = myResultDialog.nbrdebonusdomainedma;
    // var nbrdebonusdomainedin = myResultDialog.nbrdebonusdomainedin;
    // var nbrdebonusdomainedso = myResultDialog.nbrdebonusdomainedso;
    // var nbrdebonusdomainedmy = myResultDialog.nbrdebonusdomainedmy;
    var nbrdemalusstatutdph = myResultDialog.nbrdemalusstatutdph;
    var nbrdemalusstatutdma = myResultDialog.nbrdemalusstatutdma;
    var nbrdemalusstatutdin = myResultDialog.nbrdemalusstatutdin;
    var nbrdemalusstatutdso = myResultDialog.nbrdemalusstatutdso;
    var nbrdemalusstatutdmy = myResultDialog.nbrdemalusstatutdmy;
    var nbrdebonusspecialite = myResultDialog.nbrdebonusspecialite;

    var defencend = myResultDialog.defencend;
    var malusblessureflag = myResultDialog.malusblessurecheck;
    var malusstatutflag = myResultDialog.malusstatutcheck;
    var bonusdomaineflag = myResultDialog.bonusdomainecheck;
    var specialiteflag = myResultDialog.specialitecheck;
    var nbrdebonusspecialite = myResultDialog.nbrdebonusspecialite;
    var bonusapplique = myResultDialog.bonusapplique;
    var plusdeuxdesdattaque = myResultDialog.plusdeuxdesdattaque;
    var malususapplique = myResultDialog.malususapplique;
    var ignoremalus = myResultDialog.ignoremalus;
    var ignoremalus = myResultDialog.malususaignorer;
    var succesauto = myResultDialog.succesauto;
    var plusunsuccesauto = myResultDialog.plusunsuccesauto;
    var desnonexplo = myResultDialog.desnonexplo;
    var sixexplo = myResultDialog.sixexplo;
    var cinqexplo = myResultDialog.cinqexplo;

    var defencetype = domains;


    // console.log("myIgnoreMalus", myIgnoreMalus);
    // console.log("myPlusUnSuccesAuto", myPlusUnSuccesAuto);
    // console.log("myActor.system.conviction.piledejetons", myActor.system.conviction.piledejetons);

    var shaktisuffisanteflag = (plusdeuxdesdattaque <= myActor.system.shakti.piledejetons); // s'il reste assez de jetons de Shakti
    // var convictionsuffisanteflag = ((ignoremalus + plusunsuccesauto) <= myActor.system.conviction.piledejetons); // s'il reste assez de jetons de Conviction
  
  }


  let myNbrDeDomaine = 0;
  let myNbrDeBonusDomaine = 0;
  switch (domains) {
    case "dph":
      myNbrDeDomaine = parseInt(nbrdedomainedph);
      // myNbrDeBonusDomaine = parseInt(nbrdebonusdomainedph);

    break;
    case "dma":
      myNbrDeDomaine = parseInt(nbrdedomainedma);
      // myNbrDeBonusDomaine = parseInt(nbrdebonusdomainedma);

    break;
    case "din":
      myNbrDeDomaine = parseInt(nbrdedomainedin);
      // myNbrDeBonusDomaine = parseInt(nbrdebonusdomainedin);

    break;
    case "dso":
      myNbrDeDomaine = parseInt(nbrdedomainedso);
      // myNbrDeBonusDomaine = parseInt(nbrdebonusdomainedso);

    break;
    case "dmy":
      myNbrDeDomaine = parseInt(nbrdedomainedmy);
      // myNbrDeBonusDomaine = parseInt(nbrdebonusdomainedmy);

    break;
    default: console.log("C'est bizarre !");
  }
  if (!(parseInt(bonusdomaineflag))) {
    myNbrDeBonusDomaine = 0;
  }
  let myNbrDeBonusSpecialite = 0;
  if (parseInt(specialiteflag)) {
    myNbrDeBonusSpecialite = parseInt(nbrdebonusspecialite);
  }
  let myBonusApplique = parseInt(bonusapplique);
  let myMalusApplique = parseInt(malususapplique);
  // let myMalusAIgnorer = parseInt(malususaignorer);
  let myMalusAIgnorer = 0;
  let mySuccesAuto = parseInt(succesauto);
  let myShaktiSuffisanteFlag = parseInt(shaktisuffisanteflag);
  let jetLibel = jet;
  let myPlusDeuxDesDAttaque = parseInt(plusdeuxdesdattaque);
  // let myconvictionSuffisanteFlag = parseInt(convictionsuffisanteflag);
  let myconvictionSuffisanteFlag = false;
  let myIgnoreMalus = parseInt(ignoremalus);
  let myPlusUnSuccesAuto = parseInt(plusunsuccesauto);
  let myCinqExploFlag = parseInt(cinqexplo);
  let mySixExploFlag = parseInt(sixexplo);
  let myMalusBlessureCheck = parseInt(malusblessureflag);
  let myMalusStatutCheck = parseInt(malusstatutflag);
  let myDesNonExplo = parseInt(desnonexplo);

  /***********************************************************************************
  * 
  * {N} : nombre de dés lancés
  * {S} : seuil à atteindre (Niveau de Difficulté)
  * {A} : nombre de réussites automatiques
  * 
  * /r {N}d6cs>={S} : roll N d6, count successes (>=S), no dice results are explosive
  * /r {N}d6x=6cs>={S} : roll N d6, count successes (>=S), only 6 are explosive
  * /r {N}d6x>=5cs>={S} : roll N d6, count successes (>=S), 5 and 6 are explosive
  * 
  * nombre de 1 = ?
  * nombre de 2 = ?
  * nombre de 3 = ?
  * nombre de 4 = ?
  * nombre de 5 = ?
  * nombre de 6 = ?
  * nombre de réussites automatiques = {A}
  * defence nombre de réussites = roll.result+{A}
  * 
  ************************************************************************************/


  let d6_1 = 0;
  let d6_2 = 0;
  let d6_3 = 0;
  let d6_4 = 0;
  let d6_5 = 0;
  let d6_6 = 0;
  let d6_A = 0;

  let suite = "[";

  let defence = parseInt(myNbrDeDomaine);

  // console.log("myNbrDeBonusDomaine", myNbrDeBonusDomaine);
  if (bonusdomaineflag) {
    defence += parseInt(myNbrDeBonusDomaine);
    // console.log("myNbrDeBonusDomaine", "compabilisé");
  };

  // console.log("myNbrDeBonusSpecialite", myNbrDeBonusSpecialite);
  if (specialiteflag) {
    defence += parseInt(myNbrDeBonusSpecialite);
    // console.log("myNbrDeBonusSpecialite", "compabilisé");
  };


  /*
  Ici, on vérifie la validité de tous les bonus et on les applique ; et on soustrait les jetons en conséquence.
  */

  let myBonusSupplem = parseInt(myBonusApplique);
  let myMalusSupplem = parseInt(myMalusApplique) - parseInt(myMalusAIgnorer);
  if (myMalusSupplem < 0) {myMalusSupplem = 0;};
  var mySuccesAutoSupplem = parseInt(mySuccesAuto);


  // Application des bonus valides et des malus

  // Si c'est via le prompt débridé, myBonusApplique comptabilise déjà les points de myPlusDeuxDesDAttaque
  if (myShaktiSuffisanteFlag && jetLibel == "attck" && !(myVersionDebloqueeFlag)) {
    myBonusSupplem += 2 * parseInt(myPlusDeuxDesDAttaque);
  }

  // Si c'est via le prompt débridé, myMalusApplique comptabilise déjà les points de myIgnoreMalus
  // et mySuccesAuto, ceux de myPlusUnSuccesAuto
  if (myconvictionSuffisanteFlag && !(myVersionDebloqueeFlag)) {
    myMalusSupplem -= parseInt(myIgnoreMalus);
    if (myMalusSupplem < 0) { myMalusSupplem = 0;};

    mySuccesAutoSupplem += parseInt(myPlusUnSuccesAuto);
  }


  defence += myBonusSupplem;
  defence -= myMalusSupplem;

  d6_A = mySuccesAutoSupplem;



  // Traitement du cas des malus de blessures

  let myNombreDeMalusBlessure = 0;
  if (myMalusBlessureCheck) {
    for (let item of myActor.items.filter(item => item.type === 'blessureoustatut')) {
      if (item.system.subtype == "0") { // si le type est blessure
        myNombreDeMalusBlessure += Math.abs(item.system.value);
      }
    }
  };
  defence -= myNombreDeMalusBlessure;


  // Traitement du cas des malus de statuts

  let myNombreDeMalusStatut = 0;
  if (myMalusStatutCheck) {
    let j = 0;
    for (let i=0; i<6; i++) {
      if (tabDomainLibel[i] == "@domains." + domainLibel) {
        j = i;
      }
    };
    for (let item of myActor.items.filter(item => item.type === 'blessureoustatut')) {
      if (item.system.subtype == "1") { // si le type est statut
        if (item.system.domain == j) { // si le domaine correspond
          myNombreDeMalusStatut += Math.abs(item.system.value);
        }
      }
    }
  };
  defence -= myNombreDeMalusStatut;
  


  console.log("defence = ", defence);

  //////////////////////////////////////////////////////////////////
  if (defence <= 0) {
    ui.notifications.warn(game.i18n.localize("DEVASTRA.Error1"));
    return;
    };
  //////////////////////////////////////////////////////////////////



  // Soustraction des jetons si en nombre suffisant, sinon "return"
  let myErrorTokenNbr = 0;
  if ((jetLibel == "attck") && parseInt(myPlusDeuxDesDAttaque)) {
    if (myShaktiSuffisanteFlag) {
      await myActor.update({ "system.shakti.piledejetons":  parseInt(myActor.system.shakti.piledejetons) - parseInt(myPlusDeuxDesDAttaque) });
      ui.notifications.info(game.i18n.localize("DEVASTRA.Info4"));
    } else {
      ui.notifications.error(game.i18n.localize("DEVASTRA.Error4"));
      myErrorTokenNbr++;
    }
  }
  if (parseInt(myIgnoreMalus) + parseInt(myPlusUnSuccesAuto)) {
    if (myconvictionSuffisanteFlag) {
      await myActor.update({ "system.conviction.piledejetons":  parseInt(myActor.system.conviction.piledejetons - (parseInt(myIgnoreMalus) + parseInt(myPlusUnSuccesAuto))) });
      ui.notifications.info(game.i18n.localize("DEVASTRA.Info5"));
    } else {
      ui.notifications.error(game.i18n.localize("DEVASTRA.Error5"));
      myErrorTokenNbr++;
    }
  }
  if (myErrorTokenNbr) { return };



  // Ici on traite le cas des dés non-explosifs
  if (myDesNonExplo == 2) {
    myCinqExploFlag = false;
    mySixExploFlag = false;
  } else if ((myDesNonExplo == 1) && myCinqExploFlag) {
    myCinqExploFlag = false;
  } else if ((myDesNonExplo == 1) && !(myCinqExploFlag)) {
    mySixExploFlag = false;
  };


    if (suite.length >= 2) {
    suite += "%";
    suite = suite.replace(', %', ']');
  } else {
    suite = "";
  };

  var n = {
    myReussite: 0,
    myND: myND,
    mySixExplo: mySixExploFlag,
    myCinqExplo: myCinqExploFlag,
    nbrRelance: defence,
    d6_1: 0,
    d6_2: 0,
    d6_3: 0,
    d6_4: 0,
    d6_5: 0,
    d6_6: 0

  };

  var msg;

  let myRoll = "";

  do {
    let myRoll = "";
    myRoll +=  n.nbrRelance+"d6cs>="+n.myND;
    d6_1 = 0;
    d6_2 = 0;
    d6_3 = 0;
    d6_4 = 0;
    d6_5 = 0;
    d6_6 = 0;

    const r = new Roll(myRoll, myActor.getRollData());
    await r.evaluate();
    console.log(r);
    let myRDice = r.dice;
    console.log(myRDice);
    console.log(myRDice[0]);
    for (let key in myRDice) {
      console.log(myRDice[key]);
      for (let i=0; i<myRDice[key].number; i++) {
        let myD = myRDice[key].results[i].result;
        console.log(myD);
        switch ( myD ) {
          case 1: d6_1++;
          break;
          case 2: d6_2++;
          break;
          case 3: d6_3++;
          break;
          case 4: d6_4++;
          break;
          case 5: d6_5++;
          break;
          case 6: d6_6++;
          break;
          default: console.log("C'est bizarre !");
        };
        n.nbrRelance = 0;
        if (n.mySixExplo) {
          n.nbrRelance += d6_6;
          if (n.myCinqExplo) {
            n.nbrRelance += d6_5;
          }
        }
      }
    };


    n.d6_1 += d6_1;
    n.d6_2 += d6_2;
    n.d6_3 += d6_3;
    n.d6_4 += d6_4;
    n.d6_5 += d6_5;
    n.d6_6 += d6_6;


    n.myReussite = parseInt(n.myReussite) + parseInt(r._total);

    // r._total = "0";

    const myTypeOfThrow = game.settings.get("core", "rollMode"); // Type de Lancer
    console.log("myTypeOfThrow", myTypeOfThrow);

    msg = await r.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: myActor }),
      rollMode: myTypeOfThrow
    });

    await new Promise(w => setTimeout(w, 2750));

  } while (n.nbrRelance);

  const rModif = new Roll("0[Defense Réussites]", myActor.getRollData());
  await rModif.evaluate();
  rModif._total  = parseInt(n.myReussite) + parseInt(mySuccesAuto); // On ajoute les succès automatiques

  var theDefence = parseInt(n.myReussite) + parseInt(mySuccesAuto);

  const myTypeOfThrow = game.settings.get("core", "rollMode"); // Type de Lancer
  console.log("myTypeOfThrow", myTypeOfThrow);

  msg = await rModif.toMessage({
    user: game.user.id,
    speaker: ChatMessage.getSpeaker({ actor: myActor }),
    rollMode: myTypeOfThrow
  });

    
  var d_successes = parseInt(n.myReussite) + parseInt(mySuccesAutoSupplem); // On ajoute les succès automatiques

  // Smart Message
  /*
  let opponentActorId = "";
  let opponentActorName = "";
  if (opponentActor) {
    opponentActorId = opponentActor.id;
    opponentActorName = opponentActor.name;
  };
  */
  let smartTemplate = 'systems/devastra/templates/form/dice-result.html';
  if (jetLibel == "defnc") {
    smartTemplate = 'systems/devastra/templates/form/defence-result.html';
  };

  /*
  let myDefence = "xxx";
  let myDefenceType = "xxx";
  */
  if (ouijet) {

    const myDefence = theDefence; // calculé (lancer de dés)
    const myDefenceType = defencetype; // calculé (lancer de dés)

    const smartData = {
      nd: myND,
      total: total,
      attaquantficheId: attaquantficheId,
      opposantficheId: opposantficheId,
      consideropponentprotection: consideropponentprotection,

      isinventory: isinventory,
      selectedinventory: selectedinventory,
      selectedinventorydevastra: selectedinventorydevastra,
      selectedinventorypower: selectedinventorypower,
      selectedinventorymagic: selectedinventorymagic,
      damage: damage,
      damagetype: damagetype,
      
      defence: defence,
      defencetype: defencetype,

      domaine: domains,
      jet: jet,
      succes: d_successes,
      d1: n.d6_1,
      d2: n.d6_2,
      d3: n.d6_3,
      d4: n.d6_4,
      d5: n.d6_5,
      d6: n.d6_6,
      dA: mySuccesAutoSupplem
    }
    console.log("smartData avant retour func = ", smartData);
    const smartHtml = await renderTemplate(smartTemplate, smartData);
      
    ChatMessage.create({
      user: game.user.id,
      // speaker: ChatMessage.getSpeaker({ token: this.actor }),
      speaker: ChatMessage.getSpeaker({ actor: myActor }),
      content: smartHtml,
      rollMode: myTypeOfThrow
    });

  } else {

    const shaktidefenceTemplate = 'systems/devastra/templates/form/skill-dice-prompt-shakti.html';
    const shaktidefenceTitle = game.i18n.localize("DEVASTRA.Shakti de défense");
    const shaktidefenceDialogOptions  = {
      classes: ["devastra", "sheet"]
    };
    myResultDialog = await _skillEnterShaktiDefence (
      myActor, shaktidefenceTemplate, shaktidefenceTitle, shaktidefenceDialogOptions, myND, myTotal, myAttaquantficheId, myOpposantficheId,
      myConsideropponentprotection, myIsinventory, mySelectedinventory, mySelectedinventorydevastra, mySelectedinventorypower,
      mySelectedinventorymagic, myDamage, myDamagetype, myDefence, myDefenceType
    );


    //////////////////////////////////////////////////////////////////
    if (!(myResultDialog)) {
      ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
      return;
      };
    //////////////////////////////////////////////////////////////////
    
  };

}



async function _skillDiceRollDefenceNPCDialog(
  myActor, template, myTitle, myDialogOptions, myND, myTotal, myAttaquantficheId, myOpposantficheId,
  myConsideropponentprotection, myIsinventory, mySelectedinventory, mySelectedinventorydevastra, mySelectedinventorypower,
  mySelectedinventorymagic, myDamage, myDamagetype
  ) {

  // Render modal dialog
  template = template || 'systems/devastra/templates/form/skill-dice-prompt-defence-npc.html';
  const myActorID = myActor;
  const title = myTitle;
  const dialogOptions = myDialogOptions;
  const nd = myND;
  const total = myTotal;
  const attaquantficheId = myAttaquantficheId;
  const opposantficheId = myOpposantficheId;
  const consideropponentprotection = myConsideropponentprotection;
  const isinventory = myIsinventory;
  const selectedinventory = mySelectedinventory;
  const selectedinventorydevastra = mySelectedinventorydevastra;
  const selectedinventorypower = mySelectedinventorypower;
  const selectedinventorymagic = mySelectedinventorymagic;
  const damage =  myDamage;
  const damagetype = myDamagetype;

  const myNbrDeBonusSpecialite = 1;
  const mySpecialiteCheck = false;
  const myBonusDomaineCheck = true;
  const mySixExploFlag = (myActorID.system.prana.value <= myActorID.system.prana.tenace); // si Tenace ou moins
  const myPlus1SuccesAutoFlag = (myActorID.system.prana.value > myActorID.system.prana.tenace); // si Vaillant
  const myShaktiRestanteFlag = (myActorID.system.shakti.value); // s'il reste des points de Shakti

  const myNbrDeDomaineDPh = myActorID.system.domains.dph.value;

  const myNbrDeDomaineDMa = myActorID.system.domains.dma.value;

  const myNbrDeDomaineDIn = myActorID.system.domains.din.value;

  const myNbrDeDomaineDSo = myActorID.system.domains.dso.value;

  const myNbrDeDomaineDMy = myActorID.system.domains.dmy.value;

  let myNombreDeMalusBlessure = 0;
  for (let item of myActor.items.filter(item => item.type === 'blessureoustatut')) {
    if (item.system.subtype == "0") { // si le type est blessure
      myNombreDeMalusBlessure += Math.abs(item.system.value);
    }
  };
  myNombreDeMalusBlessure *= -1;
  let myMalusBlessureCheck = false;

  let myNombreDeMalusStatutDPh = 0;
  let myNombreDeMalusStatutDMa = 0;
  let myNombreDeMalusStatutDIn = 0;
  let myNombreDeMalusStatutDSo = 0;
  let myNombreDeMalusStatutDMy = 0;
  let j;
  for (let item of myActor.items.filter(item => item.type === 'blessureoustatut')) {
    if (item.system.subtype == "1") { // si le type est statut
      j = item.system.domain;
      switch (j) {
        case '1': myNombreDeMalusStatutDPh++;
        break;
        case '2': myNombreDeMalusStatutDMa++;
        break;
        case '3': myNombreDeMalusStatutDIn++;
        break;
        case '4': myNombreDeMalusStatutDSo++;
        break;
        case '5': myNombreDeMalusStatutDMy++;
        break;
        default: console.log(`Sorry, that's an error.`);
      }
    }
  };
  myNombreDeMalusStatutDPh *= -1;
  myNombreDeMalusStatutDMa *= -1;
  myNombreDeMalusStatutDIn *= -1;
  myNombreDeMalusStatutDSo *= -1;
  myNombreDeMalusStatutDMy *= -1;

  let myMalusStatutCheck = true;

  var dialogData = {
    nd: nd,
  
    domains: "dma",
    throw: "defnc",
    systemData: myActorID.system,
    nbrdedomainedph: myNbrDeDomaineDPh,
    nbrdedomainedma: myNbrDeDomaineDMa,
    nbrdedomainedin: myNbrDeDomaineDIn,
    nbrdedomainedso: myNbrDeDomaineDSo,
    nbrdedomainedmy: myNbrDeDomaineDMy,
    // nbrdebonusdomainedph: myNbrDeBonusDomaineDPh,
    // nbrdebonusdomainedma: myNbrDeBonusDomaineDMa,
    // nbrdebonusdomainedin: myNbrDeBonusDomaineDIn,
    // nbrdebonusdomainedso: myNbrDeBonusDomaineDSo,
    // nbrdebonusdomainedmy: myNbrDeBonusDomaineDMy,
    bonusdomaineflag: myBonusDomaineCheck,
    nbrdebonusspecialite: myNbrDeBonusSpecialite,
    specialiteflag: mySpecialiteCheck,
    defencend: nd,
    malusblessureflag: myMalusBlessureCheck,
    nbrdemalusblessure: myNombreDeMalusBlessure,
    malusstatutflag: myMalusStatutCheck,
    nbrdemalusstatutdph: myNombreDeMalusStatutDPh,
    nbrdemalusstatutdma: myNombreDeMalusStatutDMa,
    nbrdemalusstatutdin: myNombreDeMalusStatutDIn,
    nbrdemalusstatutdso: myNombreDeMalusStatutDSo,
    nbrdemalusstatutdmy: myNombreDeMalusStatutDMy,
    shaktirestanteflag: myShaktiRestanteFlag,
    // convictionrestanteflag: myconvictionRestanteFlag,
    plus1succesautoflag : myPlus1SuccesAutoFlag,
    sixexplo: mySixExploFlag,
    cinqexplo: false,
    desnonexplo: 0,
    versiondebloquee: false
  };

  const html = await renderTemplate(template, dialogData);
  // Create the Dialog window
  let prompt = await new Promise((resolve) => {
    new ModifiedDialog(
      {
        title: title,
        content: html,
        buttons: {
          validateBtn: {
            icon: `<div class="tooltip"><i class="fas fa-check"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Validate')}</span></div>`,
            callback: (html) => resolve( dialogData = _computeResult(myActorID, dialogData, html) )
          },
          cancelBtn: {
            icon: `<div class="tooltip"><i class="fas fa-cancel"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Cancel')}</span></div>`,
            callback: (html) => resolve( null )
          }
        },
        default: 'validateBtn',
        close: () => resolve( null )
    },
    dialogOptions
    ).render(true, {
      width: 500,
      height: "auto"
    });
  });

  if (prompt == null) {
    dialogData = null;
  };

  return dialogData;

  //////////////////////////////////////////////////////////////
  async function _computeResult(myActor, myDialogData, myHtml) {
    const editedData = {
      nd: myDialogData.nd,
      
      domains: myHtml.find("select[name='domains']").val(),
      throw: "defnc",
      ouijet: myHtml.find("input[value='ouijet']").is(':checked'),
      defencend: myHtml.find("select[name='defencend']").val(),
      ouishaktidefense: myHtml.find("input[value='ouishaktidefense']").is(':checked'),
      bonusdomainecheck: myHtml.find("input[name='bonusdomainecheck']").is(':checked'),
      specialitecheck: myHtml.find("input[name='specialitecheck']").is(':checked'),
      malusblessurecheck: myHtml.find("input[value='malusblessurecheck']").is(':checked'),
      malusstatutcheck: myHtml.find("input[value='malusstatutcheck']").is(':checked'),
      nbrdedomainedph: myDialogData.nbrdedomainedph,
      nbrdedomainedma: myDialogData.nbrdedomainedma,
      nbrdedomainedin: myDialogData.nbrdedomainedin,
      nbrdedomainedso: myDialogData.nbrdedomainedso,
      nbrdedomainedmy: myDialogData.nbrdedomainedmy,
      // nbrdebonusdomainedph: myDialogData.nbrdebonusdomainedph,
      // nbrdebonusdomainedma: myDialogData.nbrdebonusdomainedma,
      // nbrdebonusdomainedin: myDialogData.nbrdebonusdomainedin,
      // nbrdebonusdomainedso: myDialogData.nbrdebonusdomainedso,
      // nbrdebonusdomainedmy: myDialogData.nbrdebonusdomainedmy,
      nbrdemalusstatutdph: myDialogData.nbrdemalusstatutdph,
      nbrdemalusstatutdma: myDialogData.nbrdemalusstatutdma,
      nbrdemalusstatutdin: myDialogData.nbrdemalusstatutdin,
      nbrdemalusstatutdso: myDialogData.nbrdemalusstatutdso,
      nbrdemalusstatutdmy: myDialogData.nbrdemalusstatutdmy,
      nbrdebonusspecialite: myDialogData.nbrdebonusspecialite,
      bonusapplique: myHtml.find("select[name='bonusapplique']").val(),
      plusdeuxdesdattaque: myHtml.find("select[name='plusdeuxdesdattaque']").val(),
      malususapplique: myHtml.find("select[name='malususapplique']").val(),
      ignoremalus: myHtml.find("select[name='ignoremalus']").val(),
      malususaignorer: myHtml.find("select[name='malususaignorer']").val(),
      succesauto: myHtml.find("select[name='succesauto']").val(),
      plusunsuccesauto: myHtml.find("select[name='plusunsuccesauto']").val(),
      sixexplo: myHtml.find("input[name='sixexplo']").is(':checked'),
      cinqexplo: myHtml.find("input[name='cinqexplo']").is(':checked'),
      desnonexplo: myHtml.find("select[name='desnonexplo']").val(),
      versiondebloquee: myHtml.find("input[name='versiondebloquee']").is(':checked')
    };
    return editedData;
  }
  
}

async function  _skillDiceRollDefenceNPCDialogDeblocked(
  myActor, template, myTitle, myDialogOptions, myND, myTotal, myAttaquantficheId, myOpposantficheId,
  myConsideropponentprotection, myIsinventory, mySelectedinventory, mySelectedinventorydevastra, mySelectedinventorypower,
  mySelectedinventorymagic, myDamage, myDamagetype
  ) {

  // Render modal dialog
  template = template || 'systems/devastra/templates/form/skill-dice-prompt-defence-debride-npc.html';
  const myActorID = myActor;
  const title = myTitle;
  const dialogOptions = myDialogOptions;
  const nd = myND;
  const total = myTotal;
  const attaquantficheId = myAttaquantficheId;
  const opposantficheId = myOpposantficheId;
  const consideropponentprotection = myConsideropponentprotection;
  const isinventory = myIsinventory;
  const selectedinventory = mySelectedinventory;
  const selectedinventorydevastra = mySelectedinventorydevastra;
  const selectedinventorypower = mySelectedinventorypower;
  const selectedinventorymagic = mySelectedinventorymagic;
  const damage =  myDamage;
  const damagetype = myDamagetype;

  const myNbrDeBonusSpecialite = 1;
  const mySpecialiteCheck = false;
  const myBonusDomaineCheck = true;
  const mySixExploFlag = (myActorID.system.prana.value <= myActorID.system.prana.tenace); // si Tenace ou moins
  const myPlus1SuccesAutoFlag = (myActorID.system.prana.value > myActorID.system.prana.tenace); // si Vaillant
  const myShaktiRestanteFlag = (myActorID.system.shakti.value); // s'il reste des points de Shakti

  const myNbrDeDomaineDPh = myActorID.system.domains.dph.value;

  const myNbrDeDomaineDMa = myActorID.system.domains.dma.value;

  const myNbrDeDomaineDIn = myActorID.system.domains.din.value;

  const myNbrDeDomaineDSo = myActorID.system.domains.dso.value;

  const myNbrDeDomaineDMy = myActorID.system.domains.dmy.value;

  let myNombreDeMalusBlessure = 0;
  for (let item of myActor.items.filter(item => item.type === 'blessureoustatut')) {
    if (item.system.subtype == "0") { // si le type est blessure
      myNombreDeMalusBlessure += Math.abs(item.system.value);
    }
  };
  myNombreDeMalusBlessure *= -1;
  let myMalusBlessureCheck = false;

  let myNombreDeMalusStatutDPh = 0;
  let myNombreDeMalusStatutDMa = 0;
  let myNombreDeMalusStatutDIn = 0;
  let myNombreDeMalusStatutDSo = 0;
  let myNombreDeMalusStatutDMy = 0;
  let j;
  for (let item of myActor.items.filter(item => item.type === 'blessureoustatut')) {
    if (item.system.subtype == "1") { // si le type est statut
      j = item.system.domain;
      switch (j) {
        case '1': myNombreDeMalusStatutDPh++;
        break;
        case '2': myNombreDeMalusStatutDMa++;
        break;
        case '3': myNombreDeMalusStatutDIn++;
        break;
        case '4': myNombreDeMalusStatutDSo++;
        break;
        case '5': myNombreDeMalusStatutDMy++;
        break;
        default: console.log(`Sorry, that's an error.`);
      }
    }
  };
  myNombreDeMalusStatutDPh *= -1;
  myNombreDeMalusStatutDMa *= -1;
  myNombreDeMalusStatutDIn *= -1;
  myNombreDeMalusStatutDSo *= -1;
  myNombreDeMalusStatutDMy *= -1;

  let myMalusStatutCheck = true;

  var dialogData = {
    nd: nd,
  
    domains: "dma",
    throw: "defnc",
    systemData: myActorID.system,
    nbrdedomainedph: myNbrDeDomaineDPh,
    nbrdedomainedma: myNbrDeDomaineDMa,
    nbrdedomainedin: myNbrDeDomaineDIn,
    nbrdedomainedso: myNbrDeDomaineDSo,
    nbrdedomainedmy: myNbrDeDomaineDMy,
    // nbrdebonusdomainedph: myNbrDeBonusDomaineDPh,
    // nbrdebonusdomainedma: myNbrDeBonusDomaineDMa,
    // nbrdebonusdomainedin: myNbrDeBonusDomaineDIn,
    // nbrdebonusdomainedso: myNbrDeBonusDomaineDSo,
    // nbrdebonusdomainedmy: myNbrDeBonusDomaineDMy,
    bonusdomaineflag: myBonusDomaineCheck,
    nbrdebonusspecialite: myNbrDeBonusSpecialite,
    specialiteflag: mySpecialiteCheck,
    defencend: nd,
    malusblessureflag: myMalusBlessureCheck,
    nbrdemalusblessure: myNombreDeMalusBlessure,
    malusstatutflag: myMalusStatutCheck,
    nbrdemalusstatutdph: myNombreDeMalusStatutDPh,
    nbrdemalusstatutdma: myNombreDeMalusStatutDMa,
    nbrdemalusstatutdin: myNombreDeMalusStatutDIn,
    nbrdemalusstatutdso: myNombreDeMalusStatutDSo,
    nbrdemalusstatutdmy: myNombreDeMalusStatutDMy,
    shaktirestanteflag: myShaktiRestanteFlag,
    // convictionrestanteflag: myconvictionRestanteFlag,
    plus1succesautoflag : myPlus1SuccesAutoFlag,
    sixexplo: mySixExploFlag,
    cinqexplo: false,
    desnonexplo: 0,
    versiondebloquee: false
  };

  const html = await renderTemplate(template, dialogData);
  // Create the Dialog window
  let prompt = await new Promise((resolve) => {
    new ModifiedDialog(
      {
        title: title,
        content: html,
        buttons: {
          validateBtn: {
            icon: `<div class="tooltip"><i class="fas fa-check"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Validate')}</span></div>`,
            callback: (html) => resolve( dialogData = _computeResult(myActorID, dialogData, html) )
          },
          cancelBtn: {
            icon: `<div class="tooltip"><i class="fas fa-cancel"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Cancel')}</span></div>`,
            callback: (html) => resolve( null )
          }
        },
        default: 'validateBtn',
        close: () => resolve( null )
    },
    dialogOptions
    ).render(true, {
      width: 500,
      height: "auto"
    });
  });

  if (prompt == null) {
    dialogData = null;
  };

  return dialogData;

  //////////////////////////////////////////////////////////////
  async function _computeResult(myActor, myDialogData, myHtml) {
    const editedData = {
      nd: myDialogData.nd,
      
      domains: myHtml.find("select[name='domains']").val(),
      throw: "defnc",
      ouijet: myHtml.find("input[value='ouijet']").is(':checked'),
      defencend: myHtml.find("select[name='defencend']").val(),
      ouishaktidefense: myHtml.find("input[value='ouishaktidefense']").is(':checked'),
      bonusdomainecheck: myHtml.find("input[name='bonusdomainecheck']").is(':checked'),
      specialitecheck: myHtml.find("input[name='specialitecheck']").is(':checked'),
      malusblessurecheck: myHtml.find("input[value='malusblessurecheck']").is(':checked'),
      malusstatutcheck: myHtml.find("input[value='malusstatutcheck']").is(':checked'),
      nbrdedomainedph: myDialogData.nbrdedomainedph,
      nbrdedomainedma: myDialogData.nbrdedomainedma,
      nbrdedomainedin: myDialogData.nbrdedomainedin,
      nbrdedomainedso: myDialogData.nbrdedomainedso,
      nbrdedomainedmy: myDialogData.nbrdedomainedmy,
      // nbrdebonusdomainedph: myDialogData.nbrdebonusdomainedph,
      // nbrdebonusdomainedma: myDialogData.nbrdebonusdomainedma,
      // nbrdebonusdomainedin: myDialogData.nbrdebonusdomainedin,
      // nbrdebonusdomainedso: myDialogData.nbrdebonusdomainedso,
      // nbrdebonusdomainedmy: myDialogData.nbrdebonusdomainedmy,
      nbrdemalusstatutdph: myDialogData.nbrdemalusstatutdph,
      nbrdemalusstatutdma: myDialogData.nbrdemalusstatutdma,
      nbrdemalusstatutdin: myDialogData.nbrdemalusstatutdin,
      nbrdemalusstatutdso: myDialogData.nbrdemalusstatutdso,
      nbrdemalusstatutdmy: myDialogData.nbrdemalusstatutdmy,
      nbrdebonusspecialite: myDialogData.nbrdebonusspecialite,
      bonusapplique: myHtml.find("select[name='bonusapplique']").val(),
      plusdeuxdesdattaque: myHtml.find("select[name='plusdeuxdesdattaque']").val(),
      malususapplique: myHtml.find("select[name='malususapplique']").val(),
      ignoremalus: myHtml.find("select[name='ignoremalus']").val(),
      malususaignorer: myHtml.find("select[name='malususaignorer']").val(),
      succesauto: myHtml.find("select[name='succesauto']").val(),
      plusunsuccesauto: myHtml.find("select[name='plusunsuccesauto']").val(),
      sixexplo: myHtml.find("input[name='sixexplo']").is(':checked'),
      cinqexplo: myHtml.find("input[name='cinqexplo']").is(':checked'),
      desnonexplo: myHtml.find("select[name='desnonexplo']").val(),
      versiondebloquee: myHtml.find("input[name='versiondebloquee']").is(':checked')
    };
    return editedData;
  }
  
}
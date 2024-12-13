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
  const woundscalculateButton = html[0].querySelector("[class='smart-blue-button wounds-calculate-click']");
  // const woundsapplyButton = html[0].querySelector("[class='smart-blue-button wounds-apply-click']");



  if (defencecalculateButton != undefined && defencecalculateButton != null) {
    defencecalculateButton.addEventListener('click', () => {

      // La joueuse ou le PNJ calcule depuis le Tchat sa défense contre une attaque
      // On vérifie d'abord que c'est la bonne joueuse ou PNJ, sinon on ne fait rien


      /*
      Ici on fait remplir les paramètres de lancer de dés
      */
      const myActorId = html[0].querySelector("span[class='opposantficheId']").textContent;
      let myActor = game.actors.get(myActorId);

      if (myActor == undefined) {
        ui.notifications.warn(game.i18n.localize("DEVASTRA.Error7"));
        return;
      };

      let myUserId = game.user.id;
      let isOwner = (myActor.ownership[myUserId] == CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER);

      /* if (game.user.isGM) {
        isOwner = true;
      }
      */

      if (!(isOwner)) {
        ui.notifications.warn(game.i18n.localize("DEVASTRA.Error3"));
        return;
      };

      let myTitle = game.i18n.localize("DEVASTRA.Jet de défense titre").replace("^0", myActor.name);
      let myDialogOptions = {
        classes: ["devastra", "sheet"]
      };
      let template = "";

      const nd = html[0].querySelector("span[class='nd']").textContent;

      if (myActor.type == 'npc' || myActor.type == 'monster') {

        _treatSkillDiceRollDefenceNPCDialog(
          myActor, template, myTitle, myDialogOptions, nd
        );

      } else {

        _treatSkillDiceRollDefenceDialog(
          myActor, template, myTitle, myDialogOptions, nd
        );

      }
    
    })
  
  }



  /*
  if (woundsapplyButton != undefined && woundsapplyButton != null) {
    woundsapplyButton.addEventListener('click', () => {

      // La joueuse applique depuis le Tchat les blessures infiligées à son PJ par le PNJ
      // On vérifie d'abord que c'est la bonne joueuse, sinon on ne fait rien

      console.log('Je suis dans woundsapplytoPCButton')

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
  
    })

  }
  */


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
  

  if (woundscalculateButton != undefined && woundscalculateButton != null) {
    woundscalculateButton.addEventListener('click', () => {

      // La joueuse effectue depuis le Tchat le calcul des blessures infligées
      // On vérifie d'abord que c'est la bonne joueuse, sinon on ne fait rien

      console.log('Je suis dans woundscalculateButton')

      const typeofthrow = html[0].querySelector("div[class='typeofthrow']").textContent;

      const numberofdice = html[0].querySelector("div[class='numberofdice']").textContent;
      const skill = html[0].querySelector("div[class='skill']").textContent;
      const bonus = html[0].querySelector("div[class='bonus']").textContent;
      const rolldifficulty = html[0].querySelector("div[class='rolldifficulty']").textContent;

      const youwin = html[0].querySelector("div[class='youwin']").textContent;
      const yourplayerid = html[0].querySelector("div[class='yourplayerid']").textContent;
      const youractorid = html[0].querySelector("div[class='youractorid']").textContent;
      const yourdamage = html[0].querySelector("div[class='yourdamage']").textContent;
      const yourprotection = html[0].querySelector("div[class='yourprotection']").textContent;
      const youropponent = html[0].querySelector("div[class='youropponent']").textContent;
      const youropponentid = html[0].querySelector("div[class='youropponentid']").textContent;
      const youropponentdamage = html[0].querySelector("div[class='youropponentdamage']").textContent;
      const youropponentprotection = html[0].querySelector("div[class='youropponentprotection']").textContent;

      let NPCwoundedtotal = 1+parseInt(yourdamage)-parseInt(youropponentprotection);
      if (NPCwoundedtotal < 0) {NPCwoundedtotal = 0};
      let PCwoundedtotal = 1+parseInt(youropponentdamage)-parseInt(yourprotection);
      if (PCwoundedtotal < 0) {PCwoundedtotal = 0};
      let autoWoundsNPC = game.settings.get("devastra", "autoWoundsNPC");

      // console.log("autoWoundsNPC = ", autoWoundsNPC);

      const myUser = game.user;
      // console.log("game.user.id = ", game.user.id);
      // console.log("yourplayerid = ", yourplayerid);
      if (!(game.user.id == yourplayerid)) {console.log("TADAM !") ;return;}; // Pas le bon utilisateur !

      const myActor = game.actors.get(youractorid);
      if (myActor == null) {console.log("TADAM !") ;return;};

      const myTypeOfThrow = parseInt(typeofthrow);

      // Smart Message
      const smartTemplate = 'systems/devastra/templates/form/dice-result-wounds.html';
      const smartData = 
      {
        typeofthrow: myTypeOfThrow,

        youwin: (youwin == 'true'),
        yourplayerid: yourplayerid,
        youractorid: youractorid,
        yourdamage: yourdamage,
        yourprotection: yourprotection,
        youropponent: youropponent,
        youropponentid: youropponentid,
        youropponentdamage: youropponentdamage,
        youropponentprotection: youropponentprotection,

        NPCwoundedtotal: NPCwoundedtotal,
        PCwoundedtotal: PCwoundedtotal,
        autoWoundsNPC: autoWoundsNPC
      };

    // console.log("smartData = ", smartData);

    _showCalculateWoundsInChat (myActor, myTypeOfThrow, smartTemplate, smartData);

    })
  }


})


/* -------------------------------------------- */

async function _showCalculateWoundsInChat (myActor, myTypeOfThrow, smartTemplate, smartData) {
  
  const smartHtml = await renderTemplate(smartTemplate, smartData);

  switch ( myTypeOfThrow ) {
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


/* -------------------------------------------- */
/*  Dialogue de lancer de défense               */
/* -------------------------------------------- */
async function _treatSkillDiceRollDefenceDialog(
  myActor, template, myTitle, myDialogOptions, nd
) {
  let myResultDialog =  await _skillDiceRollDefenceDialog(
    myActor, template, myTitle, myDialogOptions, nd
  );

  //////////////////////////////////////////////////////////////////
  if (!(myResultDialog)) {
    ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
    return;
  };
  //////////////////////////////////////////////////////////////////

}


async function _skillDiceRollDefenceDialog(
  myActor, template, myTitle, myDialogOptions, myND
  ) {

  // Render modal dialog
  template = template || 'systems/devastra/templates/form/skill-dice-prompt-defence.html';
  const myActorID = myActor;
  const title = myTitle;
  const dialogOptions = myDialogOptions;
  const nd = myND;
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
    domains: "dma",
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
    nd: nd,
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
      domains: myHtml.find("select[name='domains']").val(),
      ouijet: myHtml.find("input[name='ouijet']").is(':checked'),
      nonjet: myHtml.find("input[name='nonjet']").is(':checked'),
      nd: myHtml.find("select[name='nd']").val(),
      ouishaktidefense: myHtml.find("input[name='ouishaktidefense']").is(':checked'),
      nonshaktidefense: myHtml.find("input[name='nonshaktidefense']").is(':checked'),
      defenseshakti: myHtml.find("select[name='defenseshakti']").val(),
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


async function _treatSkillDiceRollDefenceNPCDialog(
  myActor, template, myTitle, myDialogOptions, nd
) {
  let myResultDialog =  await _skillDiceRollDefenceNPCDialog(
    myActor, template, myTitle, myDialogOptions, nd
  );

  //////////////////////////////////////////////////////////////////
  if (!(myResultDialog)) {
    ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
    return;
  };
  //////////////////////////////////////////////////////////////////

}


async function _skillDiceRollDefenceNPCDialog(
  myActor, template, myTitle, myDialogOptions, myND
  ) {

  // Render modal dialog
  template = template || 'systems/devastra/templates/form/skill-dice-prompt-defence-npc.html';
  const myActorID = myActor;
  const title = myTitle;
  const dialogOptions = myDialogOptions;
  const nd = myND;
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
    domains: "dma",
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
    nd: nd,
    malusblessurecheck: myMalusBlessureCheck,
    nbrdemalusblessure: myNombreDeMalusBlessure,
    malusstatutcheck: myMalusStatutCheck,
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
      domains: myHtml.find("select[name='domains']").val(),
      ouijet: myHtml.find("input[name='ouijet']").is(':checked'),
      nonjet: myHtml.find("input[name='nonjet']").is(':checked'),
      nd: myHtml.find("select[name='nd']").val(),
      ouishaktidefense: myHtml.find("input[name='ouishaktidefense']").is(':checked'),
      nonshaktidefense: myHtml.find("input[name='nonshaktidefense']").is(':checked'),
      defenseshakti: myHtml.find("select[name='defenseshakti']").val(),
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
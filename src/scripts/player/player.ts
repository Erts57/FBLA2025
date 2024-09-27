import Phaser from "phaser";
import _ from "lodash";
import type DropShadowPostFxPipeline from "phaser3-rex-plugins/plugins/dropshadowpipeline";

import type { IGame } from "../game";
import Hand, { IHand } from "./hand";
import RenderLayers from "../util/layers";
import { getImage } from "../util/util";
import { ShadowSettings } from "../client_constants";

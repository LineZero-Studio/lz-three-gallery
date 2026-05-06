import type { EffectDefinition } from './types'

import BulgeScene from './bulge/Scene'
import { meta as bulgeMeta } from './bulge/meta'
import BinarySlitScene from './binary-slit/Scene'
import { meta as binarySlitMeta } from './binary-slit/meta'
import BitplaneShiftScene from './bitplane-shift/Scene'
import { meta as bitplaneShiftMeta } from './bitplane-shift/meta'
import CellMembraneScene from './cell-membrane/Scene'
import { meta as cellMembraneMeta } from './cell-membrane/meta'
import ChargeMapScene from './charge-map/Scene'
import { meta as chargeMapMeta } from './charge-map/meta'
import CursorGravityScene from './cursor-gravity/Scene'
import { meta as cursorGravityMeta } from './cursor-gravity/meta'
import DepthCardsScene from './depth-cards/Scene'
import { meta as depthCardsMeta } from './depth-cards/meta'
import JourneyScene from './journey/Scene'
import { meta as journeyMeta } from './journey/meta'
import LiquidScene from './liquid/Scene'
import { meta as liquidMeta } from './liquid/meta'
import ConstellationScene from './constellation/Scene'
import { meta as constellationMeta } from './constellation/meta'
import FallingBarsScene from './falling-bars/Scene'
import { meta as fallingBarsMeta } from './falling-bars/meta'
import FieldLinesScene from './field-lines/Scene'
import { meta as fieldLinesMeta } from './field-lines/meta'
import FieldPulseScene from './field-pulse/Scene'
import { meta as fieldPulseMeta } from './field-pulse/meta'
import GridMagnetScene from './grid-magnet/Scene'
import { meta as gridMagnetMeta } from './grid-magnet/meta'
import HingeFieldScene from './hinge-field/Scene'
import { meta as hingeFieldMeta } from './hinge-field/meta'
import HyphaeTraceScene from './hyphae-trace/Scene'
import { meta as hyphaeTraceMeta } from './hyphae-trace/meta'
import InkBarsScene from './ink-bars/Scene'
import { meta as inkBarsMeta } from './ink-bars/meta'
import InkRegisterScene from './ink-register/Scene'
import { meta as inkRegisterMeta } from './ink-register/meta'
import NoiseWindScene from './noise-wind/Scene'
import { meta as noiseWindMeta } from './noise-wind/meta'
import OrbitDotsScene from './orbit-dots/Scene'
import { meta as orbitDotsMeta } from './orbit-dots/meta'
import OrbitFieldScene from './orbit-field/Scene'
import { meta as orbitFieldMeta } from './orbit-field/meta'
import ParticleRainScene from './particle-rain/Scene'
import { meta as particleRainMeta } from './particle-rain/meta'
import PixelSortFakeScene from './pixel-sort-fake/Scene'
import { meta as pixelSortFakeMeta } from './pixel-sort-fake/meta'
import PhaseLockScene from './phase-lock/Scene'
import { meta as phaseLockMeta } from './phase-lock/meta'
import ProbeGridScene from './probe-grid/Scene'
import { meta as probeGridMeta } from './probe-grid/meta'
import RadialPulseScene from './radial-pulse/Scene'
import { meta as radialPulseMeta } from './radial-pulse/meta'
import ReactionPosterScene from './reaction-poster/Scene'
import { meta as reactionPosterMeta } from './reaction-poster/meta'
import RippleFieldScene from './ripple-field/Scene'
import { meta as rippleFieldMeta } from './ripple-field/meta'
import ScanGridScene from './scan-grid/Scene'
import { meta as scanGridMeta } from './scan-grid/meta'
import SandSplineScene from './sand-spline/Scene'
import { meta as sandSplineMeta } from './sand-spline/meta'
import SignalCutScene from './signal-cut/Scene'
import { meta as signalCutMeta } from './signal-cut/meta'
import SliceLockScene from './slice-lock/Scene'
import { meta as sliceLockMeta } from './slice-lock/meta'
import SoftBlobsScene from './soft-blobs/Scene'
import { meta as softBlobsMeta } from './soft-blobs/meta'
import ScopeTraceScene from './scope-trace/Scene'
import { meta as scopeTraceMeta } from './scope-trace/meta'
import ThresholdMapScene from './threshold-map/Scene'
import { meta as thresholdMapMeta } from './threshold-map/meta'
import TunnelLinesScene from './tunnel-lines/Scene'
import { meta as tunnelLinesMeta } from './tunnel-lines/meta'
import TypeDriftScene from './type-drift/Scene'
import { meta as typeDriftMeta } from './type-drift/meta'
import TopoSlicesScene from './topo-slices/Scene'
import { meta as topoSlicesMeta } from './topo-slices/meta'
import WaveCurtainScene from './wave-curtain/Scene'
import { meta as waveCurtainMeta } from './wave-curtain/meta'
import WireTerrainScene from './wire-terrain/Scene'
import { meta as wireTerrainMeta } from './wire-terrain/meta'
import FeedbackPlanesScene from './feedback-planes/Scene'
import { meta as feedbackPlanesMeta } from './feedback-planes/meta'
import MagneticFieldScene from './magnetic-field/Scene'
import { meta as magneticFieldMeta } from './magnetic-field/meta'
import LiquidGridScene from './liquid-grid/Scene'
import { meta as liquidGridMeta } from './liquid-grid/meta'
import LiquidMaskScene from './liquid-mask/Scene'
import { meta as liquidMaskMeta } from './liquid-mask/meta'
import ScrollStripesScene from './scroll-stripes/Scene'
import { meta as scrollStripesMeta } from './scroll-stripes/meta'
import VeinMapScene from './vein-map/Scene'
import { meta as veinMapMeta } from './vein-map/meta'

export const effects = [
  { ...magneticFieldMeta, Scene: MagneticFieldScene },
  { ...liquidMeta, Scene: LiquidScene },
  { ...gridMagnetMeta, Scene: GridMagnetScene },
  { ...fallingBarsMeta, Scene: FallingBarsScene },
  { ...inkBarsMeta, Scene: InkBarsScene },
  { ...cursorGravityMeta, Scene: CursorGravityScene },
  { ...liquidGridMeta, Scene: LiquidGridScene },
  { ...probeGridMeta, Scene: ProbeGridScene },
  { ...hingeFieldMeta, Scene: HingeFieldScene },
  { ...signalCutMeta, Scene: SignalCutScene },
  { ...sliceLockMeta, Scene: SliceLockScene },
  { ...fieldLinesMeta, Scene: FieldLinesScene },
  { ...hyphaeTraceMeta, Scene: HyphaeTraceScene },
  { ...chargeMapMeta, Scene: ChargeMapScene },
  { ...inkRegisterMeta, Scene: InkRegisterScene },
  { ...liquidMaskMeta, Scene: LiquidMaskScene },
  { ...fieldPulseMeta, Scene: FieldPulseScene },
  { ...binarySlitMeta, Scene: BinarySlitScene },
  { ...scopeTraceMeta, Scene: ScopeTraceScene },
  { ...thresholdMapMeta, Scene: ThresholdMapScene },
  { ...phaseLockMeta, Scene: PhaseLockScene },
  { ...veinMapMeta, Scene: VeinMapScene },
  { ...cellMembraneMeta, Scene: CellMembraneScene },
  { ...sandSplineMeta, Scene: SandSplineScene },
  { ...reactionPosterMeta, Scene: ReactionPosterScene },
  { ...typeDriftMeta, Scene: TypeDriftScene },
  { ...rippleFieldMeta, Scene: RippleFieldScene },
  { ...particleRainMeta, Scene: ParticleRainScene },
  { ...pixelSortFakeMeta, Scene: PixelSortFakeScene },
  { ...depthCardsMeta, Scene: DepthCardsScene },
  { ...orbitDotsMeta, Scene: OrbitDotsScene },
  { ...constellationMeta, Scene: ConstellationScene },
  { ...softBlobsMeta, Scene: SoftBlobsScene },
  { ...topoSlicesMeta, Scene: TopoSlicesScene },
  { ...bitplaneShiftMeta, Scene: BitplaneShiftScene },
  { ...orbitFieldMeta, Scene: OrbitFieldScene },
  { ...noiseWindMeta, Scene: NoiseWindScene },
  { ...waveCurtainMeta, Scene: WaveCurtainScene },
  { ...feedbackPlanesMeta, Scene: FeedbackPlanesScene },
  { ...scrollStripesMeta, Scene: ScrollStripesScene },
  { ...bulgeMeta, Scene: BulgeScene },
  { ...wireTerrainMeta, Scene: WireTerrainScene },
  { ...scanGridMeta, Scene: ScanGridScene },
  { ...tunnelLinesMeta, Scene: TunnelLinesScene },
  { ...radialPulseMeta, Scene: RadialPulseScene },
  { ...journeyMeta, Scene: JourneyScene },
] satisfies EffectDefinition[]

export const mainEffects = effects.filter((effect) => effect.placement === 'main')
export const archiveEffects = effects.filter((effect) => effect.placement === 'archive')

export function getEffect(slug: string) {
  return effects.find((effect) => effect.slug === slug)
}

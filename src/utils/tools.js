import {
  Layers, Square, RectangleHorizontal, Droplets, BoxSelect, Grid3x3,
  Scissors, SlidersHorizontal, Play, Spline, Type, Palette, Triangle,
  Blend, Repeat, MousePointerClick, Variable, Move3d, Box, MousePointer2,
  CircleDashed, Shapes, Waves, Sparkles, Ruler, Smartphone, Maximize2,
  AlignVerticalSpaceAround, CaseSensitive, Contrast, SearchCheck, RectangleEllipsis, LayoutTemplate, Wand2,
} from 'lucide-react'

import GradientGenerator from '../tools/GradientGenerator.jsx'
import BoxShadowGenerator from '../tools/BoxShadowGenerator.jsx'
import BorderRadiusGenerator from '../tools/BorderRadiusGenerator.jsx'
import BorderGenerator from '../tools/BorderGenerator.jsx'
import GlassmorphismGenerator from '../tools/GlassmorphismGenerator.jsx'
import NeumorphismGenerator from '../tools/NeumorphismGenerator.jsx'
import FlexboxPlayground from '../tools/FlexboxPlayground.jsx'
import GridGenerator from '../tools/GridGenerator.jsx'
import ClipPathGenerator from '../tools/ClipPathGenerator.jsx'
import FilterGenerator from '../tools/FilterGenerator.jsx'
import AnimationGenerator from '../tools/AnimationGenerator.jsx'
import CubicBezierGenerator from '../tools/CubicBezierGenerator.jsx'
import TextShadowGenerator from '../tools/TextShadowGenerator.jsx'
import GradientPalette from '../tools/GradientPalette.jsx'
import TriangleGenerator from '../tools/TriangleGenerator.jsx'
import BackdropFilterGenerator from '../tools/BackdropFilterGenerator.jsx'
import PatternGenerator from '../tools/PatternGenerator.jsx'
import ScrollbarStyler from '../tools/ScrollbarStyler.jsx'
import CssVariablesGenerator from '../tools/CssVariablesGenerator.jsx'
import TransformGenerator from '../tools/TransformGenerator.jsx'
import PerspectiveGenerator from '../tools/PerspectiveGenerator.jsx'
import CursorGenerator from '../tools/CursorGenerator.jsx'
import OutlineGenerator from '../tools/OutlineGenerator.jsx'
import MaskGenerator from '../tools/MaskGenerator.jsx'
import ShapeGenerator from '../tools/ShapeGenerator.jsx'
import WaveGenerator from '../tools/WaveGenerator.jsx'
import NoiseGenerator from '../tools/NoiseGenerator.jsx'
import UnitConverter from '../tools/UnitConverter.jsx'
import BreakpointGenerator from '../tools/BreakpointGenerator.jsx'
import ClampGenerator from '../tools/ClampGenerator.jsx'
import SpacingScaleGenerator from '../tools/SpacingScaleGenerator.jsx'
import TypographyScaleGenerator from '../tools/TypographyScaleGenerator.jsx'
import ContrastChecker from '../tools/ContrastChecker.jsx'
import GradientAnalyzer from '../tools/GradientAnalyzer.jsx'
import ButtonGenerator from '../tools/ButtonGenerator.jsx'
import CardBuilder from '../tools/CardBuilder.jsx'
import ComponentStudio from '../tools/ComponentStudio.jsx'

export const CATEGORIES = [
  {
    name: 'Composite',
    tools: [
      { id: 'component-studio', label: 'Component Studio', icon: Wand2, component: ComponentStudio },
      { id: 'card-builder', label: 'Card Builder', icon: LayoutTemplate, component: CardBuilder },
    ],
  },
  {
    name: 'Visual Effects',
    tools: [
      { id: 'gradient', label: 'Gradient', icon: Blend, component: GradientGenerator },
      { id: 'box-shadow', label: 'Box Shadow', icon: Square, component: BoxShadowGenerator },
      { id: 'border-radius', label: 'Border Radius', icon: RectangleHorizontal, component: BorderRadiusGenerator },
      { id: 'border', label: 'Border', icon: BoxSelect, component: BorderGenerator },
      { id: 'outline', label: 'Outline', icon: RectangleEllipsis, component: OutlineGenerator },
      { id: 'glassmorphism', label: 'Glassmorphism', icon: Droplets, component: GlassmorphismGenerator },
      { id: 'neumorphism', label: 'Neumorphism', icon: Layers, component: NeumorphismGenerator },
      { id: 'text-shadow', label: 'Text Shadow', icon: Type, component: TextShadowGenerator },
      { id: 'filter', label: 'Filter', icon: Palette, component: FilterGenerator },
      { id: 'backdrop-filter', label: 'Backdrop Filter', icon: Layers, component: BackdropFilterGenerator },
      { id: 'mask', label: 'Mask', icon: CircleDashed, component: MaskGenerator },
      { id: 'noise', label: 'Noise / Grain', icon: Sparkles, component: NoiseGenerator },
    ],
  },
  {
    name: 'Layout',
    tools: [
      { id: 'flexbox', label: 'Flexbox', icon: SlidersHorizontal, component: FlexboxPlayground },
      { id: 'grid', label: 'Grid', icon: Grid3x3, component: GridGenerator },
      { id: 'clip-path', label: 'Clip Path', icon: Scissors, component: ClipPathGenerator },
      { id: 'transform', label: 'Transform', icon: Move3d, component: TransformGenerator },
      { id: 'perspective', label: 'Perspective / 3D', icon: Box, component: PerspectiveGenerator },
    ],
  },
  {
    name: 'Shapes & Patterns',
    tools: [
      { id: 'triangle', label: 'Triangle', icon: Triangle, component: TriangleGenerator },
      { id: 'shape', label: 'Blob / Shape', icon: Shapes, component: ShapeGenerator },
      { id: 'wave', label: 'Wave', icon: Waves, component: WaveGenerator },
      { id: 'pattern', label: 'Pattern', icon: Repeat, component: PatternGenerator },
    ],
  },
  {
    name: 'Animation',
    tools: [
      { id: 'animation', label: 'Animation', icon: Play, component: AnimationGenerator },
      { id: 'cubic-bezier', label: 'Cubic Bezier', icon: Spline, component: CubicBezierGenerator },
    ],
  },
  {
    name: 'Colors',
    tools: [
      { id: 'gradient-palette', label: 'Gradient Palette', icon: Palette, component: GradientPalette },
      { id: 'gradient-analyzer', label: 'Gradient Analyzer', icon: SearchCheck, component: GradientAnalyzer },
      { id: 'contrast', label: 'Contrast Checker', icon: Contrast, component: ContrastChecker },
      { id: 'css-variables', label: 'CSS Variables', icon: Variable, component: CssVariablesGenerator },
    ],
  },
  {
    name: 'Typography & Sizing',
    tools: [
      { id: 'unit-converter', label: 'Unit Converter', icon: Ruler, component: UnitConverter },
      { id: 'clamp', label: 'Clamp Generator', icon: Maximize2, component: ClampGenerator },
      { id: 'breakpoints', label: 'Breakpoints', icon: Smartphone, component: BreakpointGenerator },
      { id: 'spacing-scale', label: 'Spacing Scale', icon: AlignVerticalSpaceAround, component: SpacingScaleGenerator },
      { id: 'typography-scale', label: 'Typography Scale', icon: CaseSensitive, component: TypographyScaleGenerator },
    ],
  },
  {
    name: 'UI Elements',
    tools: [
      { id: 'button', label: 'Button', icon: MousePointer2, component: ButtonGenerator },
      { id: 'scrollbar', label: 'Scrollbar', icon: MousePointerClick, component: ScrollbarStyler },
      { id: 'cursor', label: 'Cursor', icon: MousePointer2, component: CursorGenerator },
    ],
  },
]

export const TOOLS = CATEGORIES.flatMap((c) => c.tools)
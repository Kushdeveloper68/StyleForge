import {
  Layers, Square, RectangleHorizontal, Droplets, BoxSelect, Grid3x3,
  Scissors, SlidersHorizontal, Play, Spline, Type, Palette, Triangle,
  Blend, Repeat, MousePointerClick, Variable,
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

export const TOOLS = [
  { id: 'gradient', label: 'Gradient', icon: Blend, component: GradientGenerator },
  { id: 'box-shadow', label: 'Box Shadow', icon: Square, component: BoxShadowGenerator },
  { id: 'border-radius', label: 'Border Radius', icon: RectangleHorizontal, component: BorderRadiusGenerator },
  { id: 'border', label: 'Border', icon: BoxSelect, component: BorderGenerator },
  { id: 'glassmorphism', label: 'Glassmorphism', icon: Droplets, component: GlassmorphismGenerator },
  { id: 'neumorphism', label: 'Neumorphism', icon: Layers, component: NeumorphismGenerator },
  { id: 'flexbox', label: 'Flexbox', icon: SlidersHorizontal, component: FlexboxPlayground },
  { id: 'grid', label: 'Grid', icon: Grid3x3, component: GridGenerator },
  { id: 'clip-path', label: 'Clip Path', icon: Scissors, component: ClipPathGenerator },
  { id: 'filter', label: 'Filter', icon: Palette, component: FilterGenerator },
  { id: 'animation', label: 'Animation', icon: Play, component: AnimationGenerator },
  { id: 'cubic-bezier', label: 'Cubic Bezier', icon: Spline, component: CubicBezierGenerator },
  { id: 'text-shadow', label: 'Text Shadow', icon: Type, component: TextShadowGenerator },
  { id: 'gradient-palette', label: 'Gradient Palette', icon: Palette, component: GradientPalette },
  { id: 'triangle', label: 'Triangle', icon: Triangle, component: TriangleGenerator },
  { id: 'backdrop-filter', label: 'Backdrop Filter', icon: Layers, component: BackdropFilterGenerator },
  { id: 'pattern', label: 'Pattern', icon: Repeat, component: PatternGenerator },
  { id: 'scrollbar', label: 'Scrollbar', icon: MousePointerClick, component: ScrollbarStyler },
  { id: 'css-variables', label: 'CSS Variables', icon: Variable, component: CssVariablesGenerator },
]
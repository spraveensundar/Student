// themecontext.ts
import { createContext } from 'react';
import type { ThemeType } from './theme';
import theme from './theme';

const defaultTheme: ThemeType = theme.light;

const ThemeContext = createContext<ThemeType>(defaultTheme);

export default ThemeContext;
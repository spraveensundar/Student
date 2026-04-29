// themecontext.ts
import { createContext } from 'react';
import theme, { ThemeType } from './theme';

const defaultTheme: ThemeType = theme.light;

const ThemeContext = createContext<ThemeType>(defaultTheme);

export default ThemeContext;
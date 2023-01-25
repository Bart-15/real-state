import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const useDarkMode = () : { isDark: boolean, setDark: (isDark: boolean) => void } => {    
    const { setTheme } = useTheme();
    const [ isDark, setDark ] = useState<boolean>(false);

	useEffect(() => {
        isDark ? setTheme('dark') : setTheme('light');    

	}, [isDark]);

    return {
        isDark,
        setDark
    }
}

export default useDarkMode;
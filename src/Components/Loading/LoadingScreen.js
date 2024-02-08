import './LoadingScreen.css';
import { useEffect } from 'react';
import { useProgress } from "@react-three/drei";
import useLocalStorage from 'use-local-storage';
import { useTranslation } from "react-i18next";

export const LoadingScreen = (props) => {
    const { t } = useTranslation();
    const { started, setStarted } = props;
    const { progress, total, loaded, item } = useProgress();
    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [ isDark ] = useLocalStorage('isDark', preference);

    useEffect(() => {
        if (progress === 100) {
            setTimeout(() => {
                setStarted(true);
            }, 1000)
        }
    }, [progress, total, loaded, item, setStarted])

    return (
        <div className={`loadingScreen ${started ? 'loadingScreen--started' : ''} ${isDark ? 'dark' : ''}`}>
            <div className="loadingScreen__progress">
                <div
                    className={`loadingScreen__progress__value ${isDark ? 'dark' : ''}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="loadingScreen__board">
                <div className="loadingScreen__scrollProgress">
                    <div className={`cat ${isDark ? 'dark' : ''}`}>
                        <div className={`cat__body ${isDark ? 'dark' : ''}`}></div>
                        <div className={`cat__body ${isDark ? 'dark' : ''}`}></div>
                        <div className={`cat__tail ${isDark ? 'dark' : ''}`}></div>
                        <div className={`cat__head ${isDark ? 'dark' : ''}`}></div>
                    </div>
                </div>
                <div className={`loadingScreen__title text-progress ${isDark ? 'dark' : ''}`}>
                    {t('main.loading')}
                    <div className={`overlay ${isDark ? 'dark' : ''}`} style={{ width: `${progress}%` }}>
                        {t('main.loading')}
                    </div>
                </div>
            </div>
        </div>
    )
}
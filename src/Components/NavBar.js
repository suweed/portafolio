import { useTranslation } from "react-i18next";
import React from "react";
import { Link } from "react-router-dom";
import useLocalStorage from 'use-local-storage';
import { Toggle } from './Toggletheme/Toggle';


const locales = {
    en: { title: "EN" },
    es: { title: "ES" }
};

const NavBar = () => {

    const { t, i18n } = useTranslation();
    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDark, setIsDark] = useLocalStorage('isDark', preference);

    function closeMenu() {
        var burgerMenu = document.getElementById('burger-menu');
        var overlay = document.getElementById('menu');

        burgerMenu.classList.toggle("close");
        overlay.classList.toggle("overlay");
    }

    function activeLanguage(locale) {
        let btns = document.querySelectorAll(".lang-btn");
        btns.forEach(btn => {
            btn.getAttribute("attr-locale") === locale ? btn.classList.add("active") : btn.classList.remove("active");
        });
        i18n.changeLanguage(locale)
    }

    return(
        <div className="nav">
            <div id="burger-menu" className="nav-item" onClick={() => closeMenu()}>
                <span></span>
            </div>
            <div className="nav-item">
                <div className="nav-toggle">
                    <Toggle
                    isChecked={isDark}
                    handleChange={() => setIsDark(!isDark)}
                />
                </div>
                {Object.keys(locales).map((locale) => (
                    <div key={locale}>
                        <button
                            className={`lang-btn ${locale} ${i18n.language === locale ? "active" : ""}`}
                            type="submit"
                            attr-locale={locale}
                            onClick={() => activeLanguage(locale)}
                        >
                            {locales[locale].title}
                        </button>
                    </div>
                ))}
            </div>
            <div id="menu">
                <ul>
                    <li>
                        <Link className="nav-link" onClick={() => closeMenu()} to="/">{t('main.home')}</Link>
                    </li>
                    <li>
                        <Link className="nav-link" onClick={() => closeMenu()} to="/about">{t('main.about')}</Link>
                    </li>
                    <li>
                        <Link className="nav-link" onClick={() => closeMenu()} to="/work">{t('main.work')}</Link>
                    </li>
                    <li>
                        <Link className="nav-link" onClick={() => closeMenu()} to="/contact">{t('main.contact')}</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;
import MainPage from "../pages/MainPage/MainPage";
import Welcome from "../pages/Welcome/Welcome";

export const USER_ID = 'FRIEND 1';
export const BLANK_USER_ID = -1;

export const WELCOME_SCREEN = 'WELCOME';
export const MAIN_SCREEN = 'MAIN';


export const PAGES = {
    [WELCOME_SCREEN]: Welcome,
    [MAIN_SCREEN]: MainPage
}
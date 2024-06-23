import React, { useState } from "react";

export const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { }
});


const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        setIsLoggedIn(false);
    };


    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
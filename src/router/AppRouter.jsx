import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

    const { startCheckAuthToken, status } = useAuthStore();

    useEffect(() => {
        startCheckAuthToken();
    }, [])
    
    if( status === 'checking' ) {
        return <h2>Cargando...</h2>
    }
    
    return (
        <Routes>
            {
                ( status === 'not-authenticated' )
                    ?  (
                            <>
                                <Route path="/auth/*" element={ <LoginPage /> } />
                                <Route path='/*' element={ <Navigate to="/auth/login" /> } />
                            </>
                        )
                    :  (
                            <>
                                <Route path='/' element={ <CalendarPage /> } />
                                <Route path='/*' element={ <Navigate to="/" /> } />
                            </>
                        )
            }

            <Route path='/*' element={ <Navigate to="/auth/login" /> } />
                  
        </Routes>
    )
}

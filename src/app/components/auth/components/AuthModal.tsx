"use client"
import { Button } from "../../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import SignInForm from "./signIn";
import SignUpForm from "./SignUp";
import { useAuthStore } from "../store/authStore";
import { UserDetails } from "../user/userDetail";

interface AuthModalProps {
    isOpen: boolean;
    onClose?: () => void;
}

type LoginForm = {
    name?: string,
    email: string,
    password: string,
    check: boolean,
    role: string,
}

export default function AuthModal ( { isOpen, onClose }: AuthModalProps ) {

    const login = useAuthStore((state) => state.login);

    const [ isSignIn, setIsSignIn ] = useState(true);
    const [ isSignUp, setIsSignUp ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isSuccess, setIsSuccess ] = useState(false);

    const [ formData, setFormData ] = useState<LoginForm>({
                name: '',
                email: '',
                password: '',
                check: false,
                role: '',
            })
    const isValid = isSignIn ? 
        formData.email.trim() && formData.password.trim()
        : formData.name?.trim() && formData.email.trim() && formData.password.trim()


    const handleDemoLogin = () => {
        const { id, name, email, password, profile, check, role } = UserDetails;
        login({
            id, name, email, password, profile, check, role
        })
        setIsLoading(true);

        setTimeout(() => {
            setIsSuccess(true)
            setTimeout(() => {
                setIsLoading(false)
                setIsSuccess(false)
                onClose?.();
            }, 1000)
        }, 2000)
    }

    const signInToggle = () => {
        setIsSignIn(true);
        setIsSignUp(false);
    }

    const signUpToggle = () => {
        setIsSignIn(false);
        setIsSignUp(true);
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-20 flex justify-end">
                    <motion.div id="overlay" className="absolute inset-0 bg-black/60" onClick={ onClose }
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    ></motion.div>

                    <motion.div id="auth-modal" className="w-2/6 p-4 bg-white rounded-xl font-inter fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{scale: 0.8, opacity: 0}}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Button
                            variant="transparent"
                            size="xs"
                            aria-label="Close checkout"
                            icon={<X className="text-gray-500 w-4 hover:text-gray-950"/>}
                            onClick={onClose}
                            className="absolute top-2 right-3"
                        >
                            <span className="sr-only">Close Login Modal</span>
                        </Button>

                        <h1 className="text-center text-xl text-gray-700 font-bold mb-4">Welcome to Minimal</h1>

                        {/* Sign In and Sign Up toggle buttons */}
                        <div className="bg-gray-200 w-3/4 rounded-lg mx-auto flex p-0.5 gap-0.5 mb-5">
                            <Button 
                                variant="transparent" 
                                size="sm" 
                                onClick={signInToggle}
                                className={`flex-1 font-medium rounded-lg ${isSignIn ? 'bg-white text-gray-800' : 'text-slate-500'}`}
                            >
                                Sign In
                            </Button>
                            <Button 
                                variant="transparent"
                                size="sm" 
                                onClick={signUpToggle}
                                className={`flex-1 font-medium rounded-lg ${isSignUp ? 'bg-white text-gray-800' : 'text-slate-500'}`}
                            >
                                Sign Up
                            </Button>
                        </div>

                        {/* Sign In Content */}
                        {isSignIn && <SignInForm form={formData} setForm={setFormData} />}
                        
                        {/* Sign Up Content */}
                        {isSignUp && <SignUpForm form={formData} setForm={setFormData} />}

                        {/* Sign In or Sign Up buttons */}
                        <Button
                            variant="main"
                            size="sm"
                            onClick={handleDemoLogin}
                            disabled={!isValid}
                            className="w-full mt-5 font-medium"
                        >
                            {isSignIn ? "Sign In as Demo User" : "Sign Up as Demo User"}
                        </Button>
                        <div className="relative my-5">
                            <div className="absolute inset-0 flex items-center">
                                <div id="separator" className="w-full h-[1px] bg-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <p className="text-center text-xs text-gray-500 bg-white px-1">OR CONTINUE WITH</p>
                            </div>
                        </div>
                        <div className="flex gap-4 text-gray-800 mb-2">
                            <Button 
                                variant="transparent" 
                                size="sm" 
                                icon={<img src="/google.svg" className="w-4 h-4" />}    
                                className="flex-1 rounded-xl border border-black/20 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-gray-600 hover:text-white"
                            >
                                Google
                            </Button>
                            <Button 
                                variant="transparent" 
                                size="sm" 
                                icon={<img src="/facebook.svg" className="w-4 h-4" />}
                                className="flex-1 rounded-xl border border-black/20 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-gray-600 hover:text-white"
                            >
                                Facebook
                            </Button>
                        </div>

                        {/* Loading & Success Modal */}
                        {isLoading && <span className="loading fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"></span>}
                        {isSuccess && (
                            <div className="absolute bg-black/60 rounded-xl w-full h-full inset-0 flex items-center justify-center font-inter z-40">
                                <div className="bg-white w-2xs h-40 p-6 rounded-lg shadow-lg text-center">
                                    <p className="text-gray-800 text-xl uppercase font-medium my-2">{ isSignIn ? "Welcome back!" : "Welcome!"}</p>
                                    <p className="text-gray-800 text-lg font-medium">Hello, {UserDetails.name}</p>
                                </div>
                            </div> 
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )

}
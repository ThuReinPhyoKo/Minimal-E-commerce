'use client';
import { Button } from "@/app/components/ui/button";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { UserDetails } from "../user/userDetail";

export default function SignInForm() {
    const [ showPassword, setShowPassword ] = useState(false);
    const [ formData, setFormData ] = useState({
        email: '',
        password: '',
        check: false,
        role: '',
    })

    const fillDemoData = () => {
        setFormData({
            email: UserDetails.email,
            password: UserDetails.password,
            check: UserDetails.check,
            role: UserDetails.role,
        })

    }

    return (
        <>
            <div className="flex flex-col gap-2">
                <label htmlFor='email' className='text-sm text-gray-500 font-medium'>
                    Email
                    <button onClick={fillDemoData} className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer ml-1.5">Use Demo Account</button>
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                        id='email'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        aria-label="Email Address"
                        placeholder="Enter your email"
                        required
                        className="h-9 w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5 pl-10"
                    />
                </div>
                <label htmlFor='password' className='text-sm text-gray-500 font-medium'>
                    Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                        id='password'
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        aria-label="Password"
                        placeholder="Enter your password"
                        required
                        className="h-9 w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5 pl-10"
                    />
                    <Button onClick={() => setShowPassword(!showPassword)} variant="none" size="sm" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {showPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                    </Button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <label htmlFor='role' className='text-sm text-gray-500 font-medium'>
                        Role:
                    </label>
                    <div className="flex gap-4 text-gray-800">
                        <label htmlFor="user" className="flex items-center justify-center cursor-pointer">
                          <input
                            id="user"
                            name="role"
                            type="radio"
                            value="customer"
                            checked={formData.role === 'customer'}
                            onChange={() => setFormData({ ...formData, role: 'customer' })}
                            className="appearance-none w-3 h-3 border border-gray-400 rounded-full cursor-pointer checked:bg-yellow-300"
                          />
                          <span className="ml-2 text-gray-500 text-sm">Customer</span>
                        </label>
                        <label htmlFor="seller" className="flex items-center justify-center cursor-pointer">
                          <input
                            id="seller"
                            name="role"
                            type="radio"
                            value="seller"
                            checked={formData.role === 'seller'}
                            onChange={() => setFormData({ ...formData, role: 'seller' })}
                            className="appearance-none w-3 h-3 border border-gray-400 rounded-full cursor-pointer checked:bg-yellow-300"
                          />
                          <span className="ml-2 text-gray-500 text-sm">Seller</span>
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input 
                            id="remember-me" 
                            type="checkbox" 
                            checked={formData.check} 
                            onChange={(e) => setFormData({...formData, check: e.target.checked})} 
                            className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500" 
                        />
                        <label htmlFor="remember-me" className="text-sm text-gray-500 font-medium">Remember me</label>
                    </div>
                    <Button variant="transparent" size="sm" className="text-xs text-blue-600 hover:underline">Forgot Password?</Button>
                </div>

            </div>
        </>
    )
}